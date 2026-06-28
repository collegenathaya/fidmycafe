export type CafeCategory = 'Coffee Shop' | 'WFC' | 'Aestetic';

export interface Cafe {
  id: string;
  name: string;
  category: CafeCategory;
  facilities: string[];
  address: string;
  imageUrl?: string; // Optional elegant placeholder visual
}

export interface Review {
  id: string;
  cafeId: string;
  username: string;
  rating: number; // 1 to 5
  comment: string;
  createdAt: string;
}

export interface User {
  username: string;
}
