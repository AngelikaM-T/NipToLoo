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

const toiletApi = axios.create({
  baseURL: "https://cyan-cormorant-gear.cyclic.app/api",
});

export const postToilet = (toilet: Object) => {
  return toiletApi.post(`/toilets`, toilet);
};

export const getReviewsByToilet = (toilet_id: String) => {
  return toiletApi.get(`/toilets/${toilet_id}/reviews`).then((res) => {
    return res.data.reviews;
  });
};

export const postReviewByToilet = (toilet_id: String, review: String, author: String) => {
  const reqBody = {
      body: review,
      author: author,
      toilet_id: toilet_id,
  }
  return toiletApi.post(`/toilets/${toilet_id}/reviews`, reqBody).then((res) => {
    console.log(res.data.reviews);
  });;
};

export const getUsers = () => {
  return toiletApi.get(`/users`).then((res) => {
    return res.data.users;
  });
};
