import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAttendance } from "../context/AttendanceContext";
import { RealGeographicMap } from "../components/RealGeographicMap";
import { Navbar } from "../components/Navbar";

export function DoctorPage() {
  const { queue, currentPatient, setCurrentPatient, removePatientFromQueue } = useAttendance();
  const navigate = useNavigate();

  const [prescription, setPrescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctorPassword, setDoctorPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const riskColors: Record<string, string> = {
    red: "bg-red-500",
    orange: "bg-orange-500",
    yellow: "bg-amber-500",
    green: "bg-emerald-500",
    blue: "bg-blue-500",
  };

  const labelColors: Record<string, string> = {
    "Síndrome Febril": "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-900/30",
    "Síndrome Respiratória": "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/30",
    "Síndrome GI": "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/30",
    "Síndrome Mista": "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-900/30",
  };

  const handleFinishAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPatient) {
      alert(`Atendimento de ${currentPatient.name} finalizado com sucesso!`);
      removePatientFromQueue(currentPatient.name);
      setPrescription("");
      navigate("/gestao");
    }
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

  const activeSyndrome = currentPatient?.syndromeLabel || "Síndrome Febril";

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-neutral-950 font-sans transition-colors duration-200">
      
      <Navbar userType="doctor" queueLength={queue.length} />

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        <div className="lg:col-span-2 space-y-6">
          
          <div className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-xs">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4 mb-4">
              <div>
                <p className="text-xs font-bold text-[#64748b] dark:text-neutral-400 tracking-wider uppercase">Paciente em Atendimento</p>
                <h2 className="text-xl font-bold text-[#1e293b] dark:text-neutral-50 mt-0.5">
                  {currentPatient ? currentPatient.name : "Nenhum paciente selecionado"}
                </h2>
                {currentPatient && (
                  <p className="text-xs text-slate-400 mt-1">CPF {currentPatient.cpf}</p>
                )}
              </div>
              {currentPatient && (
                <span className={`rounded-full px-3 py-1 text-xs font-bold border ${labelColors[activeSyndrome] || labelColors["Síndrome Febril"]}`}>
                  ⚡ {activeSyndrome}
                </span>
              )}
            </div>

            {currentPatient ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs font-semibold text-slate-400">CPF</p>
                  <p className="font-medium text-slate-700 dark:text-slate-300 mt-0.5">{currentPatient.cpf}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400">Cartão SUS</p>
                  <p className="font-medium text-slate-700 dark:text-slate-300 mt-0.5">{currentPatient.susCard}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs font-semibold text-slate-400 mb-1.5">Sintomas Identificados na Triagem</p>
                  <div className="flex flex-wrap gap-1.5">
                    {currentPatient.symptomsList?.map((symptom, idx) => (
                      <span key={idx} className="rounded-md bg-slate-100 dark:bg-neutral-800 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-neutral-300 border border-slate-200/40 dark:border-neutral-700/50">
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs font-semibold text-slate-400">Observações da Enfermagem</p>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-neutral-800/40 rounded-lg p-3 border border-slate-100 dark:border-neutral-800 leading-relaxed">
                    {currentPatient.symptoms}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-400 italic text-center py-6">Selecione um paciente na lista lateral para iniciar a consulta.</p>
            )}
          </div>

          <form onSubmit={handleFinishAppointment} className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-xs space-y-5">
            <h3 className="text-xs font-bold text-[#475569] dark:text-neutral-400 tracking-wider uppercase border-b border-neutral-100 dark:border-neutral-800 pb-2">Conduta Médica / Evolução e Prescrição</h3>
            <div>
              <textarea
                rows={6}
                placeholder="Descreva a conduta clínica, diagnóstico, medicamentos prescritos, retorno e observações para o prontuário eletrônico..."
                value={prescription}
                onChange={(e) => setPrescription(e.target.value)}
                disabled={!currentPatient}
                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-[#f8fafc] dark:bg-neutral-800 px-4 py-3 text-sm text-[#1e293b] dark:text-neutral-50 focus:border-blue-500 focus:bg-white focus:outline-none leading-relaxed disabled:opacity-50"
                required
              />
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={!currentPatient}
                className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 font-semibold text-sm shadow-xs transition-colors cursor-pointer disabled:opacity-50"
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
              disabled={!currentPatient}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 text-white py-2.5 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
            >
              ⚠ Notificar Alerta Epidemiológico
            </button>
          </div>

          <div className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2">
              <h3 className="text-xs font-bold text-[#475569] dark:text-neutral-400 tracking-wider uppercase">
                Fila de Consultas
              </h3>
              <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{queue.length}</span>
            </div>
            {queue.length === 0 ? (
              <p className="text-xs text-slate-400 italic text-center py-2">Nenhum paciente aguardando.</p>
            ) : (
              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {queue.map((patient, index) => {
                  const isSelected = currentPatient?.name === patient.name;
                  const syndrome = patient.syndromeLabel || "Síndrome Febril";
                  return (
                    <div
                      key={index}
                      onClick={() => setCurrentPatient(patient)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer select-none space-y-2 bg-white dark:bg-neutral-900 ${
                        isSelected 
                          ? "border-blue-600 shadow-md ring-2 ring-blue-500/10" 
                          : "border-neutral-200/70 hover:border-neutral-300 dark:border-neutral-800"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${riskColors[patient.riskLevel] || "bg-blue-500"}`}></span>
                        <div className="font-bold text-slate-800 dark:text-neutral-100 truncate text-sm">
                          {patient.name}
                        </div>
                      </div>
                      
                      <div className="text-[11px] text-slate-400 font-medium">
                        🕒 Chegada: {patient.arrivalInterv || "08:00"}
                      </div>
                      
                      <div className="pt-0.5">
                        <span className={`rounded-md px-2.5 py-0.5 font-bold text-[10px] uppercase border ${labelColors[syndrome] || labelColors["Síndrome Febril"]}`}>
                          {syndrome}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
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
                <p className="text-sm font-bold text-slate-800 mt-0.5">Rua das Aces, 314 — Jd. América</p>
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