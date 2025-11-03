import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { XIcon } from "lucide-react";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Step {
  distance: number;
  duration: number;
  instruction: string;
  geometry?: [number, number]; // optional, can attach first point of step
}

interface TripData {
  geometry: [number, number][]; // array of lat/lng
  steps: Step[];
  origin: [number, number];
  pickup: [number, number];
  dropoff: [number, number];
  bbox: [number, number, number, number];
}

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: TripData;
}

const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose, trip }) => {
  if (!isOpen) return null;

  const { geometry, steps, bbox, origin, dropoff, pickup } = trip;

  console.log(origin, dropoff, pickup);

  // Usage:

  // Custom marker
  const markerIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
  const stepIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });

  // Center from bbox
  const center: [number, number] = [
    (bbox[1] + bbox[3]) / 2, // avg lat
    (bbox[0] + bbox[2]) / 2, // avg lng
  ];

  return (
    <div
      className={`absolute top-0 left-0 w-full h-full flex items-center justify-center z-50`}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-1 w-11/12 max-w-5xl h-[80vh] relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[1000] text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white font-bold"
        >
          <XIcon />
        </button>

        {/* MapContainer fills parent div */}
        <div className="w-full h-full rounded-lg">
          <MapContainer
            center={center}
            zoom={12}
            scrollWheelZoom={false}
            className="w-full h-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {geometry
              .filter(
                (_, idx) =>
                  idx % Math.ceil(geometry.length / steps.length) === 0
              )
              .map(([lng, lat], idx) => (
                <Marker key={idx} position={[lat, lng]} icon={stepIcon}>
                  <Popup>
                    <div>
                      <strong>Step {idx + 1}</strong>
                      <br />
                      {steps[idx]?.instruction}
                      <br />
                      Distance: {steps[idx]?.distance} m, Duration:{" "}
                      {steps[idx]?.duration} s
                    </div>
                  </Popup>
                </Marker>
              ))}
            {/* Origin marker */}
            <Marker position={[origin[1], origin[0]]} icon={markerIcon}>
              <Popup>Origin</Popup>
            </Marker>
            Pickup marker
            <Marker position={[pickup[1], pickup[0]]} icon={markerIcon}>
              <Popup>Pickup</Popup>
            </Marker>
            {/* Dropoff marker */}
            <Marker position={[dropoff[1], dropoff[0]]} icon={markerIcon}>
              <Popup>End</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
