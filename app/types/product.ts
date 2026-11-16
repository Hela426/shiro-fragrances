export type FragranceFamily =
  | "floral"
  | "woody"
  | "amber"
  | "green"
  | "aquatic";

export type Product = {
  id: string;
  slug: string;
  name: string;
  japaneseName: string;
  meaning: string;
  description: string;
  price: number;
  family: FragranceFamily;
  volume: number;
  image: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  stock: number;
  featured: boolean;
  isNew: boolean;
};