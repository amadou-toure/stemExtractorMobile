// import React, { createContext, useContext, useState, ReactNode } from "react";
// import { SongStems } from "../src/types/types";

// interface SelectedSongContextType {
//   selectedSong: SongStems | undefined;
//   setSelectedSong: React.Dispatch<React.SetStateAction<SongStems | undefined>>;
// }

// const SelectedSongContext = createContext<SelectedSongContextType | undefined>(
//   undefined
// );

// export const SelectedSongProvider = ({ children }: { children: ReactNode }) => {
//   const [selectedSong, setSelectedSong] = useState<SongStems | undefined>(
//     undefined
//   );

//   return (
//     <SelectedSongContext.Provider value={{ selectedSong, setSelectedSong }}>
//       {children}
//     </SelectedSongContext.Provider>
//   );
// };

// export const useSelectedSong = (): SelectedSongContextType => {
//   const context = useContext(SelectedSongContext);
//   if (!context) {
//     throw new Error(
//       "useSelectedSong must be used within a SelectedSongProvider"
//     );
//   }
//   return context;
// };
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  SetStateAction,
} from "react";
import { SongStems, StemFile } from "../src/types/types";
import {
  AudioPlayer,
  useAudioPlayer,
  setAudioModeAsync,
  setIsAudioActiveAsync,
} from "expo-audio";

interface SelectedSongContextType {
  selectedSong: SongStems | undefined;
  setSelectedSong: React.Dispatch<React.SetStateAction<SongStems | undefined>>;
  PlayAll: () => void;
  PauseAll: () => void;
  SeekAll: (val: number) => void;
  position: number;
  setPosition: React.Dispatch<React.SetStateAction<number>>;
  duration: number;
  BassVolume: number;
  setBassVolume: React.Dispatch<React.SetStateAction<number>>;
  DrumsVolume: number;
  setDrumsVolume: React.Dispatch<React.SetStateAction<number>>;
  VocalsVolume: number;
  setVocalsVolume: React.Dispatch<React.SetStateAction<number>>;
  GuitarVolume: number;
  setGuitarVolume: React.Dispatch<React.SetStateAction<number>>;
  OtherVolume: number;
  setOtherVolume: React.Dispatch<React.SetStateAction<number>>;
}

const SelectedSongContext = createContext<SelectedSongContextType | undefined>(
  undefined
);

export const SelectedSongProvider = ({ children }: { children: ReactNode }) => {
  const [selectedSong, setSelectedSong] = useState<SongStems | undefined>(
    undefined
  );

  const audioSources: StemFile[] | undefined = selectedSong?.stems;

  const Bassplayer = useAudioPlayer({
    uri:
      audioSources && audioSources[0]
        ? audioSources[0].uri.replace("file://", "")
        : "",
  });

  const Drumplayer = useAudioPlayer({
    uri:
      audioSources && audioSources[1]
        ? audioSources[1].uri.replace("file://", "")
        : "",
  });

  const Otherplayer = useAudioPlayer({
    uri:
      audioSources && audioSources[2]
        ? audioSources[2].uri.replace("file://", "")
        : "",
  });

  const Voiceplayer = useAudioPlayer({
    uri:
      audioSources && audioSources[3]
        ? audioSources[3].uri.replace("file://", "")
        : "",
  });
  const Guitarplayer: AudioPlayer | null =
    audioSources && audioSources[4]
      ? useAudioPlayer({
          uri: audioSources[4].uri.replace("file://", ""),
        })
      : null;
  const duration = Bassplayer.duration;

  const PlayAll = () => {
    Bassplayer.play();
    Otherplayer.play();
    Drumplayer.play();
    Voiceplayer.play();
    if (Guitarplayer) Guitarplayer.play();
  };
  const PauseAll = () => {
    Bassplayer.pause();
    Otherplayer.pause();
    Drumplayer.pause();
    Voiceplayer.pause();
    if (Guitarplayer) Guitarplayer.pause();
  };
  const SeekAll = (val: number) => {
    PauseAll();
    Bassplayer.seekTo(val);
    Otherplayer.seekTo(val);
    Drumplayer.seekTo(val);
    Voiceplayer.seekTo(val);
    if (Guitarplayer) Guitarplayer.seekTo(val);
    PlayAll();
  };
  const [position, setPosition] = useState(0);
  const [BassVolume, setBassVolume] = useState(1.0);
  const [DrumsVolume, setDrumsVolume] = useState(1.0);
  const [VocalsVolume, setVocalsVolume] = useState(1.0);
  const [GuitarVolume, setGuitarVolume] = useState(1.0);
  const [OtherVolume, setOtherVolume] = useState(1.0);
  useEffect(() => {
    if (!Bassplayer) return;

    const interval = setInterval(() => {
      try {
        if (Bassplayer.playing) {
          setPosition(Bassplayer.currentTime);
        }
      } catch (err) {
        console.warn("Bassplayer non disponible :", err);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [Bassplayer]);

  useEffect(() => {
    if (!Bassplayer) return;
    if (BassVolume <= 0.0002) {
      Bassplayer.muted = true;
    } else {
      Bassplayer.muted = false;
      Bassplayer.volume = BassVolume;
    }
  }, [BassVolume, Bassplayer]);

  useEffect(() => {
    if (!Drumplayer) return;
    if (DrumsVolume <= 0.0002) {
      Drumplayer.muted = true;
    } else {
      Drumplayer.muted = false;
      Drumplayer.volume = DrumsVolume;
    }
  }, [DrumsVolume, Drumplayer]);

  useEffect(() => {
    if (!Voiceplayer) return;
    if (VocalsVolume <= 0.0002) {
      Voiceplayer.muted = true;
    } else {
      Voiceplayer.muted = false;
      Voiceplayer.volume = VocalsVolume;
    }
  }, [VocalsVolume, Voiceplayer]);

  useEffect(() => {
    if (!Otherplayer) return;
    if (OtherVolume <= 0.0002) {
      Otherplayer.muted = true;
    } else {
      Otherplayer.muted = false;
      Otherplayer.volume = OtherVolume;
    }
  }, [OtherVolume, Otherplayer]);

  useEffect(() => {
    if (!Guitarplayer) return;
    if (GuitarVolume <= 0.0002) {
      Guitarplayer.muted = true;
    } else {
      Guitarplayer.muted = false;
      Guitarplayer.volume = GuitarVolume;
    }
  }, [GuitarVolume, Guitarplayer]);

  return (
    <SelectedSongContext.Provider
      value={{
        selectedSong,
        duration,
        setSelectedSong,
        PlayAll,
        PauseAll,
        SeekAll,
        position,
        setPosition,
        BassVolume,
        setBassVolume,
        DrumsVolume,
        setDrumsVolume,
        VocalsVolume,
        setVocalsVolume,
        GuitarVolume,
        setGuitarVolume,
        OtherVolume,
        setOtherVolume,
      }}
    >
      {children}
    </SelectedSongContext.Provider>
  );
};

export const useSelectedSong = (): SelectedSongContextType => {
  const context = useContext(SelectedSongContext);
  if (!context) {
    throw new Error(
      "useSelectedSong must be used within a SelectedSongProvider"
    );
  }
  return context;
};
