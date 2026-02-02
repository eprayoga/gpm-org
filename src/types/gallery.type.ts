export type GalleryCategory =
  | "event"
  | "training"
  | "race"
  | "community"
  | "location";

export interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  url: string;
  category: GalleryCategory;
  location: string;
  date: string;
  photographer?: string;
  tags?: string[];
  views?: number;
  width: number;
  height: number;
}
