// components/Map.js
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
// Fix for missing marker icons in leaflet
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = (props) => {
  const initialCenter = [props.lat, props.lng];
  return (
    <MapContainer
      center={initialCenter}
      zoom={10}
      style={{ height: "600px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[props.lat, props.lng]}>
        <Popup>
          {props.name} <br /> {props.description}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
