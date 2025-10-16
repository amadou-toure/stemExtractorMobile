import { Directory, File, FileInfo, Paths } from "expo-file-system";
import { ApiResponse, SongStems, StemFile } from "../types/types";
import { Alert } from "react-native";
import { UnmixService } from "./unmixService";
import { unzip } from "react-native-zip-archive";
import { apiClient } from "./apiClient";

const AppDirectory = new Directory(Paths.document, "Unmix");
const Cache = new Directory(Paths.cache);

const APIUrl = "http://10.222.42.87:3000";
export const historyService = {
  initHistoryFile: async () => {
    try {
      Cache.delete;
      if (!AppDirectory.exists) {
        await AppDirectory.create({ intermediates: true });
      }
      const files = await AppDirectory.list();
      let AlreadyExist: boolean = false;
      files.some((item) =>
        item.name == "history.json"
          ? (AlreadyExist = true)
          : (AlreadyExist = false)
      );
      if (AlreadyExist == false) {
        const historyFile = new File(AppDirectory, "history.json");
        historyFile.create();
      } else {
        null;
        //if the file already exists, do nothing
      }
    } catch (e) {
      console.error("error of initialisation: ", e);
    }
  },

  readHistory: async () => {
    try {
      const HISTORY_FILE = new File(AppDirectory, "history.json");
      const content = await HISTORY_FILE.text();
      return JSON.parse(content); // retourne un tableau d’objets
    } catch (e) {
      console.error("Erreur lecture history.json:", e);
      return [];
    }
  },

  addHistoryItem: async (newItem: SongStems) => {
    const history = await historyService.readHistory();
    const HISTORY_FILE = new File(AppDirectory, "history.json");
    history.push(newItem);
    await HISTORY_FILE.write(JSON.stringify(history, null, 2));
    console.log(await historyService.readHistory());
  },
  updateHistoryItem: async (updatedItem: SongStems) => {
    try {
      const history = await historyService.readHistory();
      const HISTORY_FILE = new File(AppDirectory, "history.json");

      // Cherche l'index de l'élément à modifier
      const index = history.findIndex(
        (item: SongStems) => item.id === updatedItem.id
      );

      if (index !== -1) {
        // Remplace l’ancien élément par le nouveau
        history[index] = updatedItem;

        // Écrit le fichier mis à jour
        await HISTORY_FILE.write(JSON.stringify(history, null, 2));

        console.log("✅ Élément mis à jour:", updatedItem.stems);
      } else {
        console.warn("⚠️ Élément non trouvé pour l’ID:", updatedItem.id);
      }
    } catch (e) {
      console.error("Erreur updateHistoryItem:", e);
    }
  },

  removeHistoryItem: async (id: string) => {
    const history = await historyService.readHistory();
    const HISTORY_FILE = new File(AppDirectory, "history.json");
    const updated = history.filter((item: any) => item.id !== id);
    HISTORY_FILE.write(JSON.stringify(updated, null, 2));
  },
  deleteHistoryItem: async () => {
    try {
      const HISTORY_FILE = new File(AppDirectory, "history.json");
      await HISTORY_FILE.delete();
    } catch (e) {
      console.error("Erreur suppression:", e);
    }
  },

  downloadStem: async (song: SongStems) => {
    try {
      const zipFile = new File(Cache, song.id + ".zip");
      const hasStems = Array.isArray(song.stems) && song.stems.length > 0;

      // Vérifie si un stem déjà présent sur le disque existe
      if (hasStems) {
        const firstStem = new File(song.stems[0].uri);
        if (await firstStem.exists) {
          console.log(
            `⚠️ Le dossier ${song.title} existe déjà, aucune action nécessaire.`
          );
          return;
        }
      }

      // Vérifie si le zip existe déjà
      if (await zipFile.exists) {
        console.log(
          `⚠️ Le fichier ${zipFile.name} existe déjà, décompression en cours...`
        );
      } else {
        console.log(`⬇️ Téléchargement de ${zipFile.name}...`);
        await File.downloadFileAsync(`${APIUrl}/download/${song.id}`, zipFile);
        console.log("✅ Téléchargement terminé :", zipFile.uri);
      }

      // Décompression du zip
      console.log("🧩 Décompression du fichier...");
      await historyService.unzipFile(zipFile, song);
    } catch (e) {
      console.error("❌ Erreur dans downloadStem:", e);
    }
  },
  unzipFile: async (file: File, song: SongStems) => {
    try {
      // Vérifications de base
      const zipExists = await file.exists;
      console.log("zip exists?", zipExists, "uri:", file?.uri);
      if (!zipExists || !file?.uri) {
        throw new Error("Zip introuvable ou URI invalide");
      }

      // Prépare les dossiers: /cache/songs/<song.id>
      const songsDir = new Directory(Cache, "songs");
      if (!(await songsDir.exists)) {
        console.log("Création du dossier songs...");
        await songsDir.create({ intermediates: true });
      }

      const stemDir = new Directory(songsDir, song.id);
      if (await stemDir.exists) {
        // Nettoyage pour éviter les résidus d'une précédente décompression
        console.log("🧹 Dossier déjà présent, suppression...");
        await stemDir.delete();
      }
      await stemDir.create({ intermediates: true });
      console.log("Décompression vers:", stemDir.uri);

      // Android: le module natif préfère les chemins sans "file://"
      const zipPath = file.uri.replace("file://", "");
      const destPath = stemDir.uri.replace("file://", "");

      // Décompression
      const outPath = await unzip(zipPath, destPath);
      console.log(`✅ Décompression réussie: ${outPath}`);

      // Nettoyage du zip
      await file.delete();

      // Listing des fichiers décompressés
      const filesInStemDir = await new Directory(stemDir, song.id).list();
      const stemFiles: StemFile[] = filesInStemDir.map((f: any) => ({
        name: f.name,
        duration: 0, // sera calculé plus tard
        uri: f.uri,
        format: f.name.split(".").pop()?.toLowerCase() || "unknown",
      }));

      // Mise à jour de l'historique
      const updatedSong: SongStems = { ...song, stems: stemFiles };
      console.log(
        "Mise à jour historique pour:",
        updatedSong.id,
        stemFiles.length,
        "fichiers"
      );
      await historyService.updateHistoryItem(updatedSong);
    } catch (e) {
      console.error("Erreur unzipFile:", e);
    }
  },
};
