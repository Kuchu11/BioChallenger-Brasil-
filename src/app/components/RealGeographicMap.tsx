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

const affectedIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function ChangeMapView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 15, { animate: true, duration: 1 });
  }, [center, map]);
  return null;
}

export function RealGeographicMap() {
  const { currentPatient } = useAttendance();
  const defaultCenter: [number, number] = [-3.7435, -38.6560];
  const activeCenter = currentPatient ? currentPatient.coordinates : defaultCenter;

  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-slate-200 dark:border-neutral-800 relative z-10">
      <MapContainer 
        center={activeCenter} 
        zoom={14} 
        style={{ width: "100%", height: "100%" }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="dark:invert dark:hue-rotate-180 dark:opacity-85"
        />

        <ChangeMapView center={activeCenter} />

        {currentPatient && (
          <Marker 
            position={currentPatient.coordinates} 
            icon={currentPatient.isAreaAffected ? affectedIcon : defaultIcon}
          >
            <Popup>
              <div className="p-1 font-sans space-y-1">
                <h4 className="font-bold text-slate-900 text-sm m-0">Residência do Paciente</h4>
                <p className="text-xs m-0"><b>Nome:</b> {currentPatient.name}</p>
                <div className="text-[11px] mt-1 pt-1 border-t border-slate-100">
                  {currentPatient.isAreaAffected ? (
                    <p className="m-0 text-red-600 font-bold">🚨 Alerta: Esta microárea já está sendo afetada por surto ativo!</p>
                  ) : (
                    <p className="m-0 text-emerald-600 font-bold">🟢 Status: Área estável no momento (sem surtos detectados).</p>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}