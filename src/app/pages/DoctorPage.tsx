import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAttendance } from "../context/AttendanceContext";
import { RealGeographicMap } from "../components/RealGeographicMap";

export function DoctorPage() {
  const { queue, currentPatient } = useAttendance();
  const navigate = useNavigate();

  const [prescription, setPrescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctorPassword, setDoctorPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const getSyndromeLabel = () => {
    if (!currentPatient) return "Síndrome Febril";
    const list = currentPatient.symptomsList || [];
    const hasFebril = list.some(s => ["Febre Alta", "Dor de Cabeça", "Dor no Corpo"].includes(s));
    const hasResp = list.some(s => ["Tosse", "Coriza", "Falta de Ar"].includes(s));
    const hasGastro = list.some(s => ["Diarreia", "Vômito", "Dor Abdominal"].includes(s));

    if ((hasFebril && hasResp) || (hasFebril && hasGastro) || (hasResp && hasGastro)) return "Síndrome Mista";
    if (hasFebril) return "Síndrome Febril";
    if (hasResp) return "Síndrome Respiratória";
    if (hasGastro) return "Síndrome Gastrointestinal";
    return "Síndrome Febril";
  };

  const syndromeColors = {
    "Síndrome Febril": "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-900/30",
    "Síndrome Respiratória": "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/30",
    "Síndrome Gastrointestinal": "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/30",
    "Síndrome Mista": "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-900/30",
  };

  const handleFinishAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Atendimento de ${currentPatient?.name || "Maria Aparecida Santos"} finalizado com sucesso!`);
    setPrescription("");
    navigate("/gestao");
  };

  const handleConfirmNotification = () => {
    if (!doctorPassword) {
      alert("Por favor, insira sua senha de confirmação médica.");
      return;
    }
    alert("Notificação compulsória enviada em tempo real para a Vigilância Sanitária Municipal com sucesso!");
    setIsModalOpen(false);
    setDoctorPassword("");
  };

  const currentSyndrome = getSyndromeLabel() as keyof typeof syndromeColors;

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-neutral-950 p-6 font-sans transition-colors duration-200">
      <div className="mx-auto max-w-7xl grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        <div className="lg:col-span-2 space-y-6">
          
          <div className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-xs">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4 mb-4">
              <div>
                <p className="text-xs font-bold text-[#64748b] dark:text-neutral-400 tracking-wider uppercase">Paciente em Atendimento</p>
                <h2 className="text-xl font-bold text-[#1e293b] dark:text-neutral-50 mt-0.5">
                  {currentPatient ? currentPatient.name : "Maria Aparecida Santos"}
                </h2>
                <p className="text-xs text-slate-400 mt-1">42 anos • CPF 342.891.020-15</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-bold border ${syndromeColors[currentSyndrome] || syndromeColors["Síndrome Febril"]}`}>
                ⚡ {currentSyndrome || "Síndrome Febril"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs font-semibold text-slate-400">CPF</p>
                <p className="font-medium text-slate-700 dark:text-slate-300 mt-0.5">{currentPatient?.cpf || "342.891.020-15"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400">Cartão SUS</p>
                <p className="font-medium text-slate-700 dark:text-slate-300 mt-0.5">{currentPatient?.susCard || "7081 2034 9871"}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs font-semibold text-slate-400 mb-1.5">Sintomas Identificados na Triagem</p>
                <div className="flex flex-wrap gap-1.5">
                  {currentPatient?.symptomsList && currentPatient.symptomsList.length > 0 ? (
                    currentPatient.symptomsList.map((symptom, idx) => (
                      <span key={idx} className="rounded-md bg-slate-100 dark:bg-neutral-800 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-neutral-300 border border-slate-200/40 dark:border-neutral-700/50">
                        {symptom}
                      </span>
                    ))
                  ) : (
                    <>
                      <span className="rounded-md bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400 px-2.5 py-1 text-xs font-medium border border-red-100 dark:border-red-900/20">Febre Alta</span>
                      <span className="rounded-md bg-slate-50 text-slate-600 dark:bg-neutral-800 px-2.5 py-1 text-xs font-medium border border-slate-200/60 dark:border-neutral-700">Dor de Cabeça</span>
                      <span className="rounded-md bg-slate-50 text-slate-600 dark:bg-neutral-800 px-2.5 py-1 text-xs font-medium border border-slate-200/60 dark:border-neutral-700">Dor no Corpo</span>
                    </>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs font-semibold text-slate-400">Observações da Enfermagem</p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-neutral-800/40 rounded-lg p-3 border border-slate-100 dark:border-neutral-800 leading-relaxed">
                  {currentPatient?.symptoms || "Paciente relata que voltou de viagem ao Nordeste há 5 dias. Febre iniciou ontem à noite, 38.9°C."}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleFinishAppointment} className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-xs space-y-5">
            <h3 className="text-xs font-bold text-[#475569] dark:text-neutral-400 tracking-wider uppercase border-b border-neutral-100 dark:border-neutral-800 pb-2">Conduta Médica / Evolução e Prescrição</h3>
            
            <div className="space-y-2">
              <textarea
                rows={6}
                placeholder="Descreva a conduta clínica, diagnóstico, medicamentos prescritos, retorno e observações para o prontuário eletrônico..."
                value={prescription}
                onChange={(e) => setPrescription(e.target.value)}
                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-[#f8fafc] dark:bg-neutral-800 px-4 py-3 text-sm text-[#1e293b] dark:text-neutral-50 focus:border-blue-500 focus:bg-white focus:outline-none leading-relaxed"
                required
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 font-semibold text-sm shadow-xs transition-colors cursor-pointer"
              >
                Finalizar Atendimento Padrão →
              </button>
            </div>
          </form>

        </div>

        <div className="space-y-6">
          
          <div className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2">
              <h3 className="text-xs font-bold text-[#475569] dark:text-neutral-400 tracking-wider uppercase flex items-center gap-1.5">
                Inteligência Territorial
              </h3>
            </div>

            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Mapa da Microárea (Caucaia)</div>

            <div className="w-full h-56 mt-2 rounded-lg overflow-hidden">
              <RealGeographicMap />
            </div>
            
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 text-white py-2.5 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              ⚠ Notificar Alerta Epidemiológico
            </button>
          </div>

          <div className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2">
              <h3 className="text-xs font-bold text-[#475569] dark:text-neutral-400 tracking-wider uppercase">
                Fila de Consultas
              </h3>
              <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">1</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-neutral-100 dark:border-neutral-800 bg-[#f8fafc] dark:bg-neutral-800/60 text-xs">
                <div className="font-semibold text-slate-700 dark:text-neutral-200 truncate max-w-[140px]">
                  {currentPatient ? currentPatient.name : "Maria Aparecida Santos"}
                </div>
                <span className="rounded px-2 py-0.5 font-bold text-[10px] uppercase bg-orange-100 text-orange-800 dark:bg-orange-950/40 dark:text-orange-300">
                  {currentSyndrome || "Síndrome Febril"}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl space-y-5">
            
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Confirmação de Notificação Compulsória</h3>
                  <p className="text-xs text-slate-500 font-medium">Dr. Ricardo Almeida · CRM 54.302-SP</p>
                </div>
              </div>
              <button
                onClick={() => { setIsModalOpen(false); setDoctorPassword(""); }}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex gap-3 rounded-xl bg-red-50/80 p-4 border border-red-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-red-600 shrink-0 mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
              <p className="text-xs text-slate-600 leading-relaxed">
                <span className="font-bold text-red-700">Atenção:</span> Esta ação enviará um alerta em tempo real para o Painel da Gestão Municipal / Vigilância Sanitária sobre uma alteração sanitária nesta microárea. <span className="font-bold text-red-700">Esta ação será auditada</span> e vinculada ao seu CRM.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3.5 border border-slate-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Microárea notificada</p>
                <p className="text-sm font-bold text-slate-800 mt-0.5">Rua das Acácias, 314 — Jd. América</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500 tracking-wider uppercase">Senha do Médico Responsável</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  🔒
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={doctorPassword}
                  onChange={(e) => setDoctorPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-neutral-200 bg-[#f8fafc] py-3 pl-10 pr-10 text-sm text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => { setIsModalOpen(false); setDoctorPassword(""); }}
                className="w-full rounded-xl border border-slate-200 py-3 font-semibold text-sm text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmNotification}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-red-600 hover:bg-red-700 py-3 font-semibold text-sm text-white shadow-xs transition-colors cursor-pointer"
              >
                ⚠ Confirmar e Notificar Gestão
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}