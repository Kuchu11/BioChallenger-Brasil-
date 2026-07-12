import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useAttendance } from "../context/AttendanceContext";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const ubsIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function ChangeMapView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 16, { animate: true, duration: 1.2 });
    }
  }, [center, map]);
  return null;
}

interface MapProps {
  customCenter?: [number, number];
  popupText?: string;
}

export function RealGeographicMap({ customCenter, popupText }: MapProps) {
  const { currentPatient } = useAttendance();
  const defaultCenter: [number, number] = [-3.7390, -38.6540];
  
  const activeCenter = customCenter 
    ? customCenter 
    : (currentPatient ? currentPatient.coordinates : defaultCenter);

  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-slate-200 dark:border-neutral-800 relative z-10">
      <MapContainer 
        center={defaultCenter} 
        zoom={15} 
        style={{ width: "100%", height: "100%" }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="dark:invert dark:hue-rotate-180 dark:opacity-85"
        />

        <ChangeMapView center={activeCenter} />

        {customCenter ? (
          <Marker position={customCenter} icon={ubsIcon}>
            <Popup>
              <div className="p-1 font-sans">
                <h4 className="font-bold text-slate-900 text-sm m-0">{popupText || "Unidade de Saúde"}</h4>
                <p className="text-xs text-slate-500 m-0 mt-1">Monitoramento de infraestrutura ativo.</p>
              </div>
            </Popup>
          </Marker>
        ) : (
          currentPatient && (
            <Marker position={currentPatient.coordinates} icon={defaultIcon}>
              <Popup>
                <div className="p-1 font-sans space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm m-0">Residência do Paciente</h4>
                  <p className="text-xs m-0"><b>Nome:</b> {currentPatient.name}</p>
                </div>
              </Popup>
            </Marker>
          )
        )}
      </MapContainer>
    </div>
  );
}