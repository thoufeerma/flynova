import keralaGeoDataRaw from "./keralaGeoData.json";

export interface DistrictPolygon {
  outer: [number, number][];
  holes?: [number, number][][];
}

export interface DistrictData {
  id: string;
  name: string;
  alias?: string;
  zone: "highlands" | "backwaters" | "coastal" | "sacred";
  zoneName: string;
  zoneColor: string;
  highlightText: string;
  title: string;
  description: string;
  stats: {
    label1: string;
    val1: string;
    label2: string;
    val2: string;
    label3: string;
    val3: string;
    label4: string;
    val4: string;
  };
  flynovaPackages: string[];
  bestSeason: string;
  keySpots: string[];
  color: number; // Hex color for Three.js
  height: number; // Restrained extrusion depth
  centroid: [number, number]; // 2D projected center [x, y]
  polygons: DistrictPolygon[]; // True geographic polygons & holes
}

export interface DistrictDossier {
  geography: string;
  population: string;
  hotspots: string;
  image: string;
  tagline: string;
}

export const DISTRICT_DOSSIERS: Record<string, DistrictDossier> = {
  thiruvananthapuram: {
    geography: "2,192 km²",
    population: "33.01 Lakhs",
    hotspots: "18+ Sites",
    image: "/images/temple-tour-hero.jpg",
    tagline: "Sacred Splendour & Royal Coastlines",
  },
  kollam: {
    geography: "2,491 km²",
    population: "26.35 Lakhs",
    hotspots: "14+ Sites",
    image: "/images/hero-kerala.jpg",
    tagline: "Ashtamudi Waters & Ancient Harbours",
  },
  pathanamthitta: {
    geography: "2,637 km²",
    population: "11.97 Lakhs",
    hotspots: "12+ Sites",
    image: "/images/couple-mountains.jpg",
    tagline: "Sacred Forests & Evergreen Shrines",
  },
  alappuzha: {
    geography: "1,414 km²",
    population: "21.28 Lakhs",
    hotspots: "16+ Sites",
    image: "/images/alleppey-hero.jpg",
    tagline: "Venice of the East & Floating Luxury",
  },
  kottayam: {
    geography: "2,208 km²",
    population: "19.74 Lakhs",
    hotspots: "12+ Sites",
    image: "/images/hero-alleppey-ref.jpg",
    tagline: "Lakeside Sanctuaries & Spice Gardens",
  },
  idukki: {
    geography: "4,358 km²",
    population: "11.09 Lakhs",
    hotspots: "24+ Sites",
    image: "/images/munnar-hero.jpg",
    tagline: "Misty Tea Slopes & Anamudi Horizons",
  },
  ernakulam: {
    geography: "3,068 km²",
    population: "34.28 Lakhs",
    hotspots: "22+ Sites",
    image: "/images/tropical-beach.jpg",
    tagline: "Queen of Arabian Sea & Colonial Heritage",
  },
  thrissur: {
    geography: "3,032 km²",
    population: "31.21 Lakhs",
    hotspots: "15+ Sites",
    image: "/images/temple-tour-hero.jpg",
    tagline: "Cultural Capital & Grand Celebrations",
  },
  palakkad: {
    geography: "4,480 km²",
    population: "28.10 Lakhs",
    hotspots: "14+ Sites",
    image: "/images/hill-train.jpg",
    tagline: "Western Ghats Gap & Silent Valley Wilds",
  },
  malappuram: {
    geography: "3,554 km²",
    population: "41.13 Lakhs",
    hotspots: "12+ Sites",
    image: "/images/hero-india.jpg",
    tagline: "Teak Forests, River Deltas & Heritage",
  },
  kozhikode: {
    geography: "2,344 km²",
    population: "30.86 Lakhs",
    hotspots: "16+ Sites",
    image: "/images/goa-coast.jpg",
    tagline: "Spice Route Ports & Sunset Promenades",
  },
  wayanad: {
    geography: "2,131 km²",
    population: "8.17 Lakhs",
    hotspots: "20+ Sites",
    image: "/images/munnar-tea-bus.jpg",
    tagline: "Cloud Forests, Caves & Wildlife Reserves",
  },
  kannur: {
    geography: "2,966 km²",
    population: "25.23 Lakhs",
    hotspots: "15+ Sites",
    image: "/images/card-goa-ref.jpg",
    tagline: "Theyyam Rituals & Golden Drive-In Shores",
  },
  kasaragod: {
    geography: "1,992 km²",
    population: "13.07 Lakhs",
    hotspots: "11+ Sites",
    image: "/images/card-kerala-ref.jpg",
    tagline: "Oceanic Fortresses & Untouched Lagoons",
  },
};

export const KERALA_DISTRICTS: Record<string, DistrictData> = keralaGeoDataRaw as unknown as Record<string, DistrictData>;
