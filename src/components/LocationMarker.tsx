import { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps";

const LocationMarker = ({ location }) => {
  return (
    <>
      <Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
        pinColor="blue"
      ></Marker>
      <Circle
        center={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
        radius={800}
        strokeWidth={2}
        strokeColor="rgba(45, 33, 202, 0.1)"
        fillColor="rgba(45, 33, 202, 0.1)"
      />
    </>
  );
};

export default LocationMarker;
