export interface MovieDetails {
    id: string;
    sources: { url: string }[];
    trailer?: { url: string };
  }

export interface EpisodeDetails {
  sources: { url: string }[];
  trailer?: { url: string };
}
