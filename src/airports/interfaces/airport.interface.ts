export interface Airport {
    id: string;
    name: string;
    code: string;
    description: string;
    location: string;
    imageUrl: string;
    stats: {
      flights: number;
      destinations: number;
    };
    features: string[];
  }