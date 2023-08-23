interface Weight {
  imperial: string;
  metric: string;
}

interface Image {
  id: string;
  width: number;
  height: number;
  url: string;
}

export interface CatData {
  weight: Weight;
  id: string;
  name: string;
  adaptability: number;
  affection_level: number;
  alt_names: string;
  cfa_url: string;
  child_friendly: number;
  country_code: string;
  country_codes: string;
  description: string;
  dog_friendly: number;
  energy_level: number;
  experimental: number;
  grooming: number;
  hairless: number;
  health_issues: number;
  hypoallergenic: number;
  image: Image;
  indoor: number;
  intelligence: number;
  lap: number;
  life_span: string;
  natural: number;
  origin: string;
  rare: number;
  reference_image_id: string;
  rex: number;
  shedding_level: number;
  short_legs: number;
  social_needs: number;
  stranger_friendly: number;
  suppressed_tail: number;
  temperament: string;
  vcahospitals_url: string;
  vetstreet_url: string;
  vocalisation: number;
  wikipedia_url: string;
}