import {
    withGoogleMap,
    GoogleMap,
    Marker,
    withScriptjs
  } from "react-google-maps";
  
  const MapWithAMarker = withGoogleMap(props =>
    <GoogleMap
      defaultZoom={2}
      defaultCenter={{ lat: 19.082346, lng: 73.011475 }}
    >
        {    console.log("propssss", props)
}
      <Marker
        position={{ lat: 19.082346, lng: 73.011475 }}
      />
    </GoogleMap>
  );

  export default MapWithAMarker;