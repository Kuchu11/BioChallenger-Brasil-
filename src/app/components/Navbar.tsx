import { useNavigate } from "react-router";

interface NavbarProps {
  userType: "nurse" | "doctor" | "gestor";
  queueLength: number;
}

export function Navbar({ userType, queueLength }: NavbarProps) {
  const navigate = useNavigate();

  const userConfig = {
    nurse: { name: "Enf. Maria Silva", unit: "UBS Jardim América" },
    doctor: { name: "Dr. Ricardo Almeida", unit: "CRM 54.302-SP • UBS Jardim América" },
    gestor: { name: "Gestor Municipal", unit: "Vigilância Epidemiológica" },
  };

  const currentInfo = userConfig[userType];

  return (
    <div className="w-full bg-white dark:bg-neutral-900 border-b border-slate-200 dark:border-neutral-800 font-sans select-none">
      
      {/* PRIMEIRA BARRA: INFOS DO SISTEMA E USUÁRIO */}
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-neutral-400">
            <span className="text-emerald-500">●</span> GOV.BR
          </div>
          <span className="text-slate-300 dark:text-neutral-700">|</span>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-blue-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
            </svg>
            <span className="font-bold text-sm text-slate-800 dark:text-neutral-50 tracking-tight">
              SentiNela Saúde
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-blue-50 dark:bg-neutral-800 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
              🩺
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-slate-800 dark:text-neutral-100">{currentInfo.name}</p>
              <p className="text-[10px] text-slate-400 font-medium">{currentInfo.unit}</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-red-500 transition-colors cursor-pointer"
          >
            ↪ Sair
          </button>
        </div>
      </div>

      {/* SEGUNDA BARRA: SUB-BARRA INFORMATIVA AZUL */}
      <div className="w-full bg-[#1351b4] text-white">
        <div className="max-w-7xl mx-auto px-6 h-10 flex items-center gap-6 text-xs font-bold">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
            <span>{queueLength} pacientes aguardando triagem</span>
          </div>
          <div className="flex items-center gap-1.5 text-blue-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span>22:52</span>
          </div>
        </div>
      </div>

    </div>
  );
}