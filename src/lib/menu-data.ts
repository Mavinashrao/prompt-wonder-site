export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  veg: boolean;
  rating: number;
  prepTime: number;
  popular?: boolean;
  isNew?: boolean;
};

export const CATEGORIES = [
  "All",
  "Breakfast",
  "South Indian",
  "North Indian",
  "Biryani",
  "Chinese",
  "Snacks",
  "Beverages",
  "Desserts",
] as const;

export const MENU: MenuItem[] = [
  { id: "m1", name: "Masala Dosa", description: "Crispy rice crepe filled with spiced potato masala, served with sambar & chutneys.", price: 120, image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&q=80", category: "South Indian", veg: true, rating: 4.8, prepTime: 15, popular: true },
  { id: "m2", name: "Hyderabadi Chicken Biryani", description: "Fragrant basmati layered with tender chicken, saffron, and slow-cooked in dum style.", price: 320, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80", category: "Biryani", veg: false, rating: 4.9, prepTime: 30, popular: true },
  { id: "m3", name: "Paneer Butter Masala", description: "Silky tomato-cashew gravy with cottage cheese cubes and a swirl of cream.", price: 260, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=80", category: "North Indian", veg: true, rating: 4.7, prepTime: 20 },
  { id: "m4", name: "Veg Fried Rice", description: "Wok-tossed rice with garden vegetables and house-made schezwan.", price: 180, image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80", category: "Chinese", veg: true, rating: 4.5, prepTime: 15 },
  { id: "m5", name: "Idli Sambar", description: "Steamed rice-lentil cakes with piping hot sambar and coconut chutney.", price: 90, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80", category: "Breakfast", veg: true, rating: 4.6, prepTime: 10 },
  { id: "m6", name: "Chicken 65", description: "Crispy fried chicken tossed in curry leaves, chillies, and yogurt marinade.", price: 240, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80", category: "Snacks", veg: false, rating: 4.7, prepTime: 20, popular: true },
  { id: "m7", name: "Butter Naan", description: "Tandoor-baked flatbread brushed with pure ghee.", price: 60, image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800&q=80", category: "North Indian", veg: true, rating: 4.6, prepTime: 8 },
  { id: "m8", name: "Gulab Jamun", description: "Warm milk-solid dumplings soaked in rose-cardamom syrup.", price: 80, image: "https://images.unsplash.com/photo-1601303516534-bf9d43e5f68c?w=800&q=80", category: "Desserts", veg: true, rating: 4.9, prepTime: 5 },
  { id: "m9", name: "Filter Coffee", description: "Traditional South Indian decoction with frothy milk in a steel tumbler.", price: 50, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80", category: "Beverages", veg: true, rating: 4.8, prepTime: 5, popular: true },
  { id: "m10", name: "Veg Biryani", description: "Aromatic basmati with mixed vegetables, saffron and whole spices.", price: 240, image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80", category: "Biryani", veg: true, rating: 4.6, prepTime: 25 },
  { id: "m11", name: "Chilli Chicken", description: "Indo-Chinese classic — crispy chicken in a glossy chilli-garlic sauce.", price: 260, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80", category: "Chinese", veg: false, rating: 4.7, prepTime: 20, isNew: true },
  { id: "m12", name: "Mango Lassi", description: "Chilled yogurt shake blended with sweet Alphonso mango pulp.", price: 90, image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=800&q=80", category: "Beverages", veg: true, rating: 4.7, prepTime: 5 },
  { id: "m13", name: "Poori Bhaji", description: "Fluffy fried pooris served with spiced potato bhaji.", price: 110, image: "https://images.unsplash.com/photo-1626500155168-9c60d3a44f7f?w=800&q=80", category: "Breakfast", veg: true, rating: 4.5, prepTime: 12 },
  { id: "m14", name: "Samosa (2 pcs)", description: "Golden pastry parcels stuffed with spiced potato and peas.", price: 40, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80", category: "Snacks", veg: true, rating: 4.6, prepTime: 8 },
  { id: "m15", name: "Kulfi Falooda", description: "Traditional saffron-pistachio kulfi with rose vermicelli.", price: 130, image: "https://images.unsplash.com/photo-1571506165871-ee72a35bc9d4?w=800&q=80", category: "Desserts", veg: true, rating: 4.8, prepTime: 5, isNew: true },
  { id: "m16", name: "Tandoori Chicken", description: "Half-bird marinated in yogurt & spices, charred in the clay oven.", price: 340, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80", category: "North Indian", veg: false, rating: 4.8, prepTime: 30, popular: true },
];
