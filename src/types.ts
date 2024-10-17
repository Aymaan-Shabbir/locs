// src/types/types.ts

export interface MapLocation {
  latitude: number;
  longitude: number;
}

export interface Place {
  name: string;
  slug: string;
  image: string; // Assuming you have an image property
  title: string; // Assuming you have a title property
  description: string; // Assuming you have a description property
  tags: string[]; // Assuming you have tags
  map: MapLocation;
  distance?: number; // Ensure distance is defined as a number
}
export interface SuggestPlacesState {
  suggestions: Place[];
  locationError: string;
  userLocation: {
    latitude: number;
    longitude: number;
  };
}
