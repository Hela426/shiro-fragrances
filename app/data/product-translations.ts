import type { Product } from "../types/product";
import type { Language } from "../store/language-store";

type ProductTranslation = Pick<
  Product,
  "meaning" | "description" | "notes"
>;

const spanishProducts: Record<string, ProductTranslation> = {
  yuki: {
    meaning: "Nieve",
    description:
      "Una delicada fragancia inspirada en el silencio de la nieve recién caída.",
    notes: {
      top: ["Té blanco", "Bergamota"],
      heart: ["Jazmín", "Camelia blanca"],
      base: ["Almizcle blanco", "Vainilla"],
    },
  },

  kuro: {
    meaning: "Negro",
    description:
      "Una misteriosa composición de maderas oscuras y texturas ahumadas.",
    notes: {
      top: ["Pimienta negra", "Cardamomo"],
      heart: ["Madera de cedro", "Incienso"],
      base: ["Oud", "Cuero"],
    },
  },

  tsuki: {
    meaning: "Luna",
    description:
      "Una fragancia cálida e íntima inspirada en las noches iluminadas por la luna.",
    notes: {
      top: ["Mandarina", "Azafrán"],
      heart: ["Ámbar", "Rosa"],
      base: ["Vainilla", "Sándalo"],
    },
  },

  sakura: {
    meaning: "Flor de cerezo",
    description:
      "Una suave composición floral que captura la belleza efímera de la primavera.",
    notes: {
      top: ["Pera", "Pimienta rosa"],
      heart: ["Flor de cerezo", "Peonía"],
      base: ["Almizcle blanco", "Madera de cachemira"],
    },
  },

  mori: {
    meaning: "Bosque",
    description:
      "Una fragancia terrosa inspirada en tranquilos paseos por bosques ancestrales.",
    notes: {
      top: ["Té verde", "Albahaca"],
      heart: ["Hinoki", "Ciprés"],
      base: ["Musgo de roble", "Vetiver"],
    },
  },

  ame: {
    meaning: "Lluvia",
    description:
      "Una fragancia fresca y transparente que evoca la lluvia sobre calles silenciosas.",
    notes: {
      top: ["Sal marina", "Bergamota"],
      heart: ["Nenúfar", "Loto"],
      base: ["Madera flotante", "Almizcle blanco"],
    },
  },
};

export const familyTranslations = {
  en: {
    floral: "Floral",
    woody: "Woody",
    amber: "Amber",
    green: "Green",
    aquatic: "Aquatic",
  },

  es: {
    floral: "Floral",
    woody: "Amaderada",
    amber: "Ámbar",
    green: "Verde",
    aquatic: "Acuática",
  },
};

export function getLocalizedProduct(
  product: Product,
  language: Language
): Product {
  if (language === "en") return product;

  return {
    ...product,
    ...spanishProducts[product.slug],
  };
}
