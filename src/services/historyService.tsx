import { Directory, File, FileInfo, Paths } from "expo-file-system";
import { ApiResponse, SongStems } from "../types/types";
import { Alert } from "react-native";
import { UnmixService } from "./unmixService";
import { unzip } from "react-native-zip-archive";

const AppDirectory = new Directory(Paths.document, "Unmix");
const APIUrl = "http://10.134.142.87:3000";
export const historyService = {
  initHistoryFile: async () => {
    try {
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
      const zipDir = new Directory(AppDirectory, "stems");
      if (!zipDir.exists) {
        zipDir.create({ intermediates: true });
      }
      const zipFile = new File(
        zipDir,
        song.title.replace(/\.[^/.]+$/, "") + ".zip"
      );
      const file = await File.downloadFileAsync(
        APIUrl + "/download/" + song.id,
        zipFile
      );

      if (file.exists) {
        // unzip(
        //   file.uri,
        //   new Directory(zipDir, song.title.replace(/\.[^/.]+$/, "")).uri
        // )
        //   .then((path) => {
        //     console.log(`Décompression réussie dans: ${path}`);
        //   })
        //   .catch((err: any) => {
        //     console.error("Erreur unzip:", err);
        //   });
      }

      //   //  save to AppDirectory/stems
      //   //  copy the stem path into the correspondig song in the history file
      // } else {
      //   console.log(file.message, file.status);
      // }
    } catch (e: any) {
      console.error(e.message);
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
