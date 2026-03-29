export interface Feature {
  name: string;
  description: string;
}

export interface Specification {
  name: string;
  value: string;
}

export interface ProductCategory {
  id: string;
  title: string;
  description: string;
  features: Feature[];
  specifications?: Specification[];
  applications: string[];
  subcategories: {
    id: string;
    name: string;
    description: string;
    features: Feature[];
    specifications?: Specification[];
    applications: string[];
  }[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  features: Feature[];
  process: {
    step: number;
    title: string;
    description: string;
  }[];
  benefits: string[];
}
