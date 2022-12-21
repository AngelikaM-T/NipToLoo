import axios from "axios";

interface ToiletLocation {
  lat: number;
  lng: number;
}

interface Geometry {
  location: ToiletLocation;
  viewport: object;
}

interface Toilet {
  name: any;
  rating: any;
  geometry: Geometry;
}

interface Coords {
  latitude: number;
  longitude: number;
}

export const fetchLocations = async (location: Coords | null = null) => {
  try {
    const response = await axios.get<{ results: Toilet[] }>(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?location=${location?.latitude}%2C${location?.longitude}&query=toilet&key=AIzaSyDFKThqSRUAWN85xGITOvRB1RPYm44N4Bc`
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};
