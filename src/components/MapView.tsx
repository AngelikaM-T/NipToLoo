import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
import InfoMarker from "./InfoMarkers";

const ToiletMap = ({
  location,
  toiletLocations,
  toiletCardVisible,
  markerCoords,
  setTargetedToilet,
  setToiletCardVisible,
  setMarkerCoords,
}) => {
  return (
    <MapView
      style={StyleSheet.absoluteFillObject}
      provider="google"
      showsUserLocation={true}
      region={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.056866,
        longitudeDelta: 0.054757,
      }}
    >
      {toiletLocations.map((location, index) => (
        <InfoMarker
          location={location}
          toiletLocations={toiletLocations}
          index={index}
          toiletCardVisible={toiletCardVisible}
          markerCoords={markerCoords}
          setTargetedToilet={setTargetedToilet}
          setToiletCardVisible={setToiletCardVisible}
          setMarkerCoords={setMarkerCoords}
          key={index}
        />
      ))}
    </MapView>
  );
};

export default ToiletMap;
