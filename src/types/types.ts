export type ApiResponse<T = any> = {
  status: boolean;
  data?: T;
  message: string;
};
export type StemFile = {
  name: string; // Nom du stem (ex: "guitar", "drums", "vocals")
  duration: number; // Durée en secondes
  uri: string; // Lien local (file://…) ou distant (http://…)
  format: string; // Format du fichier (mp3, wav, flac…)
  size?: number; // Taille en bytes (optionnel)
};

export type SongStems = {
  id: string; // Identifiant unique de la chanson
  title: string; // Nom de la chanson
  status: string;
  artist?: string; // (optionnel) Artiste
  stems: StemFile[]; // Liste des stems
  zipUri?: string; // Optionnel: chemin vers le .zip si tu veux le garder
  creationDate?: string;
};

export type RenderIconProps = {
  iconName: string;
  size: number;
  color: string;
};
