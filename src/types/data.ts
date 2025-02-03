export interface RoyaltyData {
  TRIMESTRE: string;
  ARTISTA: string;
  MÚSICA: string;
  PLATAFORMA: string;
  ROYALTIES: number;
}

export interface FilterState {
  trimestre: string;
  artista: string;
  plataforma: string;
}