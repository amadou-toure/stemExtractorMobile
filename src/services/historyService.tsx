import { Directory, File, FileInfo, Paths } from "expo-file-system";
import { ApiResponse, SongStems, StemFile } from "../types/types";
import { Alert } from "react-native";
import { UnmixService } from "./unmixService";
import { unzip } from "react-native-zip-archive";
import { apiClient } from "./apiClient";

const AppDirectory = new Directory(Paths.document, "Unmix");
const Cache = new Directory(Paths.cache);

const APIUrl = "http://192.168.2.20:3000";
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
      const songDir = new Directory(Cache, "songs");
      if (!songDir.exists) {
        songDir.create({ intermediates: true });
      }
      const zipFile = new File(Cache, song.id + ".zip");
      const file = await File.downloadFileAsync(
        APIUrl + "/download/" + song.id,
        zipFile
      );
      //EOF
      //unzip func
      if (file.exists) {
        const stemDir = new Directory(songDir, song.id);
        await unzip(file.uri, stemDir.uri)
          .then((path) => {
            console.log(`Décompression réussie dans: ${path}`);
            console.log("taille: ", stemDir.size);
            // Affiche le nom de tous les fichiers contenus dans stemDir
            const filesInStemDir = new Directory(stemDir, song.id).list();
            const stemFiles: StemFile[] = [];
            filesInStemDir.forEach((f: any) => {
              const file: StemFile = {
                name: f.name,
                duration: 475678758, //to change when i will implement audioservice
                uri: f.uri,
                format: f.name.split(".").pop()?.toLowerCase() || "unknown",
              };

              stemFiles.push(file);
            });
            // console.log(
            //   "songDir files:",
            //   stemFiles.map((f) => f.name)
            // );
            const updatedSong: SongStems = { ...song, stems: stemFiles };
            console.log(updatedSong);
            historyService.updateHistoryItem(updatedSong);
            zipFile.delete();
          })
          .catch((err: any) => {
            console.error("Erreur unzip:", err);
          });
      }
      //EOF
      else {
        console.log("erreur lors du telechargement");
      }
    } catch (e: any) {
      console.error("exception: ", e.message);
    }
  },
};

// const newSong = {
//   id: "7",
//   status: "done",
//   song: {
//     title: "Numb",
//     artist: "Linkin Park",
//     stems: [
//       { stemType: "vocals", uri: "file:///.../vocals.wav", duration: "03:05" },
//       { stemType: "drums", uri: "file:///.../drums.wav", duration: "03:05" },
//     ],
//   },
//   createdAt: new Date().toISOString(),
// };

// await addHistoryItem(newSong);
