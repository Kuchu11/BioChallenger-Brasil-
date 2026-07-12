import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const outbreakIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface FocusArea {
  name: string;
  syndrome: string;
  cases: number;
  status: "Alerta" | "Surto Confirmado";
  position: [number, number];
  description: string;
}

export function RealGeographicMap() {
  const centerPosition: [number, number] = [-3.7435, -38.6560];

  const outbreakPoints: FocusArea[] = [
    {
      name: "Jurema / Parque Soledade",
      syndrome: "Síndrome Febril (Suspeita Dengue)",
      cases: 41,
      status: "Surto Confirmado",
      position: [-3.7410, -38.6480],
      description: "Alta concentração de focos em terrenos baldios próximos à Av. Integração."
    },
    {
      name: "Nova Cigana / Campo do Jayme",
      syndrome: "Síndrome Respiratória (IRA)",
      cases: 28,
      status: "Surto Confirmado",
      position: [-3.7385, -38.6595],
      description: "Aumento de casos infantis de bronquite na microárea do campo."
    },
    {
      name: "Lago Verde",
      syndrome: "Síndrome Gastrointestinal",
      cases: 15,
      status: "Alerta",
      position: [-3.7490, -38.6620],
      description: "Análise de potabilidade da água em andamento pela vigilância."
    }
  ];

  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-slate-200 dark:border-neutral-800 relative z-10">
      <MapContainer 
        center={centerPosition} 
        zoom={14} 
        style={{ width: "100%", height: "100%" }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="dark:invert dark:hue-rotate-180 dark:opacity-85"
        />

        {outbreakPoints.map((point, idx) => (
          <Marker 
            key={idx} 
            position={point.position} 
            icon={point.status === "Surto Confirmado" ? outbreakIcon : customIcon}
          >
            <Popup>
              <div className="p-1 font-sans space-y-1">
                <h4 className="font-bold text-slate-900 text-sm m-0">{point.name}</h4>
                <p className="text-xs text-red-600 font-bold m-0">🚨 {point.status}</p>
                <div className="text-[11px] text-slate-600 mt-1 space-y-0.5">
                  <p className="m-0"><b>Predomínio:</b> {point.syndrome}</p>
                  <p className="m-0"><b>Notificações:</b> {point.cases} casos ativos</p>
                  <p className="m-0 text-slate-400 italic pt-1 border-t border-slate-100">{point.description}</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}