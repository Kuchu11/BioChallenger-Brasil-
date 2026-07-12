import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAttendance } from "../context/AttendanceContext";
import { Navbar } from "../components/Navbar";

interface TriagemPatient {
  id: string;
  name: string;
  cpf: string;
  susCard: string;
  arrivalInterv: string;
}

export function NursePage() {
  const { addPatientToQueue } = useAttendance();
  const navigate = useNavigate();

  const [waitingList, setWaitingList] = useState<TriagemPatient[]>([
    { id: "1", name: "Maria Aparecida Santos", cpf: "", susCard: "", arrivalInterv: "08:14" },
    { id: "2", name: "João Carlos Oliveira", cpf: "", susCard: "", arrivalInterv: "08:31" },
    { id: "3", name: "Ana Paula Ferreira", cpf: "", susCard: "", arrivalInterv: "08:47" },
    { id: "4", name: "Roberto Mendes Lima", cpf: "", susCard: "", arrivalInterv: "09:02" },
    { id: "5", name: "Fatima Regina Costa", cpf: "", susCard: "", arrivalInterv: "09:18" }
  ]);

  const [selectedPatient, setSelectedPatient] = useState<TriagemPatient | null>(waitingList[0]);

  const [cpf, setCpf] = useState("");
  const [susCard, setSusCard] = useState("");
  const [observations, setObservations] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [symptoms, setSymptoms] = useState({
    febreAlta: false,
    dorCabeca: false,
    dorCorpo: false,
    tosse: false,
    coriza: false,
    faltaAr: false,
    diarreia: false,
    vomito: false,
    dorAbdominal: false,
  });

  const symptomLabels: Record<keyof typeof symptoms, string> = {
    febreAlta: "Febre Alta",
    dorCabeca: "Dor de Cabeça",
    dorCorpo: "Dor no Corpo",
    tosse: "Tosse",
    coriza: "Coriza",
    faltaAr: "Falta de Ar",
    diarreia: "Diarreia",
    vomito: "Vômito",
    dorAbdominal: "Dor Abdominal",
  };

  const toggleSymptom = (key: keyof typeof symptoms) => {
    setSymptoms((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const selectedSymptomsList = Object.keys(symptoms)
    .filter((key) => symptoms[key as keyof typeof symptoms])
    .map((key) => symptomLabels[key as keyof typeof symptoms]);

  const calculateRiskLevel = (): "blue" | "green" | "yellow" | "orange" | "red" => {
    if (symptoms.faltaAr) return "orange";
    if (symptoms.febreAlta && symptoms.vomito) return "yellow";
    if (selectedSymptomsList.length > 0) return "green";
    return "blue";
  };

  const handleAddNewPatient = () => {
    const name = prompt("Digite o nome completo do novo paciente:");
    if (!name) return;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    
    const newPatient: TriagemPatient = {
      id: String(waitingList.length + 1),
      name,
      cpf: "",
      susCard: "",
      arrivalInterv: timeString
    };

    setWaitingList((prev) => [...prev, newPatient]);
    setSelectedPatient(newPatient);
  };

  const handleOpenConfirmation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) return;
    setIsModalOpen(true);
  };

  const handleFinalSubmit = () => {
    if (!password) {
      alert("Por favor, insira sua senha de confirmação.");
      return;
    }

    if (selectedPatient) {
      addPatientToQueue({
        name: selectedPatient.name,
        cpf,
        susCard,
        symptomsList: selectedSymptomsList,
        symptoms: observations,
        riskLevel: calculateRiskLevel(),
      });

      setWaitingList((prev) => prev.filter((p) => p.id !== selectedPatient.id));
      alert(`Triagem concluída! ${selectedPatient.name} encaminhada com sucesso.`);
    }

    setIsModalOpen(false);
    setPassword("");
    setCpf("");
    setSusCard("");
    setObservations("");
    setSymptoms({
      febreAlta: false,
      dorCabeca: false,
      dorCorpo: false,
      tosse: false,
      coriza: false,
      faltaAr: false,
      diarreia: false,
      vomito: false,
      dorAbdominal: false,
    });
    
    setSelectedPatient(null);
    navigate("/medico");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-neutral-950 font-sans transition-colors duration-200">
      
      <Navbar userType="nurse" queueLength={waitingList.length} />

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* COLUNA ESQUERDA: FILA DE ACOLHIMENTO */}
        <div className="lg:col-span-1 bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-xl p-5 shadow-xs space-y-4 h-fit">
          <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2">
            <h3 className="text-xs font-bold text-[#475569] dark:text-neutral-400 tracking-wider uppercase flex items-center gap-2">
              Fila de Acolhimento
              <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{waitingList.length}</span>
            </h3>
            <button
              type="button"
              onClick={handleAddNewPatient}
              className="bg-blue-50 hover:bg-blue-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-blue-600 dark:text-blue-400 font-bold text-[11px] px-2 py-1 rounded transition-colors cursor-pointer"
            >
              + Adicionar
            </button>
          </div>

          {waitingList.length === 0 ? (
            <p className="text-xs text-slate-400 italic text-center py-4">Nenhum paciente na fila de acolhimento.</p>
          ) : (
            <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
              {waitingList.map((patient) => {
                const isSelected = selectedPatient?.id === patient.id;
                return (
                  <div
                    key={patient.id}
                    onClick={() => {
                      setSelectedPatient(patient);
                      setCpf(patient.cpf);
                      setSusCard(patient.susCard);
                    }}
                    className={`p-3 rounded-xl border transition-all cursor-pointer select-none flex items-center justify-between bg-white dark:bg-neutral-900 ${
                      isSelected 
                        ? "border-blue-600 shadow-xs ring-2 ring-blue-500/10" 
                        : "border-neutral-200/70 hover:border-neutral-300 dark:border-neutral-800"
                    }`}
                  >
                    <div>
                      <div className="font-bold text-slate-800 dark:text-neutral-100 text-xs truncate max-w-[130px]">
                        {patient.name}
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                        🕒 Chegada: {patient.arrivalInterv}
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`text-[10px] font-bold px-3 py-1.5 rounded-md transition-colors ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-slate-50 text-slate-600 border border-slate-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700"
                      }`}
                    >
                      {isSelected ? "Em triagem →" : "Iniciar →"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* COLUNA CENTRAL E DIREITA: QUADRO DE TRIAGEM ATIVA */}
        <div className="lg:col-span-2">
          {selectedPatient ? (
            <div className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-800">
                <div>
                  <p className="text-xs font-bold text-[#475569] dark:text-neutral-400 tracking-wider uppercase">Triagem Ativa</p>
                  <h1 className="text-xl font-bold text-[#1e293b] dark:text-neutral-50 mt-0.5">{selectedPatient.name}</h1>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 dark:bg-amber-950/30 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                  Em atendimento
                </span>
              </div>

              <form onSubmit={handleOpenConfirmation} className="p-6 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-[#475569] dark:text-neutral-400 tracking-wider uppercase">Dados do Paciente</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-semibold text-[#64748b] dark:text-neutral-300 mb-1.5">Nome Completo</label>
                      <input
                        type="text"
                        value={selectedPatient.name}
                        readOnly
                        className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 px-3 py-2 text-sm text-[#1e293b] dark:text-neutral-400 font-medium outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#64748b] dark:text-neutral-300 mb-1.5">CPF</label>
                      <input
                        type="text"
                        placeholder="000.000.000-00"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-[#f8fafc] dark:bg-neutral-800 px-3 py-2 text-sm text-[#1e293b] dark:text-neutral-50 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#64748b] dark:text-neutral-300 mb-1.5">Cartão Nacional SUS</label>
                      <input
                        type="text"
                        placeholder="000 0000 0000 0000"
                        value={susCard}
                        onChange={(e) => setSusCard(e.target.value)}
                        className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-[#f8fafc] dark:bg-neutral-800 px-3 py-2 text-sm text-[#1e293b] dark:text-neutral-50 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-[#475569] dark:text-neutral-400 tracking-wider uppercase">Checklist de Sintomas — Sentinela</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-orange-100 dark:border-orange-950/30 bg-orange-50/30 dark:bg-orange-950/10 p-4 space-y-2.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider mb-0.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span> FEBRIL
                      </div>
                      {["febreAlta", "dorCabeca", "dorCorpo"].map((key) => (
                        <div
                          key={key}
                          onClick={() => toggleSymptom(key as keyof typeof symptoms)}
                          className="flex items-center gap-2.5 bg-white dark:bg-neutral-800 p-2.5 rounded-lg border border-neutral-100 dark:border-neutral-700 shadow-2xs cursor-pointer select-none hover:bg-orange-50/10"
                        >
                          <input
                            type="checkbox"
                            checked={symptoms[key as keyof typeof symptoms]}
                            readOnly
                            className="h-3.5 w-3.5 rounded text-orange-600 border-neutral-300 focus:ring-orange-500 cursor-pointer"
                          />
                          <span className="text-xs font-medium text-[#1e293b] dark:text-neutral-200">{symptomLabels[key as keyof typeof symptoms]}</span>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-xl border border-blue-100 dark:border-blue-950/30 bg-blue-50/30 dark:bg-blue-950/10 p-4 space-y-2.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-0.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span> RESPIRATÓRIO
                      </div>
                      {["tosse", "coriza", "faltaAr"].map((key) => (
                        <div
                          key={key}
                          onClick={() => toggleSymptom(key as keyof typeof symptoms)}
                          className="flex items-center gap-2.5 bg-white dark:bg-neutral-800 p-2.5 rounded-lg border border-neutral-100 dark:border-neutral-700 shadow-2xs cursor-pointer select-none hover:bg-blue-50/10"
                        >
                          <input
                            type="checkbox"
                            checked={symptoms[key as keyof typeof symptoms]}
                            readOnly
                            className="h-3.5 w-3.5 rounded text-blue-600 border-neutral-300 focus:ring-blue-500 cursor-pointer"
                          />
                          <span className="text-xs font-medium text-[#1e293b] dark:text-neutral-200">{symptomLabels[key as keyof typeof symptoms]}</span>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-xl border border-emerald-100 dark:border-emerald-950/30 bg-emerald-50/30 dark:bg-emerald-950/10 p-4 space-y-2.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-0.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> GASTROINTESTINAL
                      </div>
                      {["diarreia", "vomito", "dorAbdominal"].map((key) => (
                        <div
                          key={key}
                          onClick={() => toggleSymptom(key as keyof typeof symptoms)}
                          className="flex items-center gap-2.5 bg-white dark:bg-neutral-800 p-2.5 rounded-lg border border-neutral-100 dark:border-neutral-700 shadow-2xs cursor-pointer select-none hover:bg-emerald-50/10"
                        >
                          <input
                            type="checkbox"
                            checked={symptoms[key as keyof typeof symptoms]}
                            readOnly
                            className="h-3.5 w-3.5 rounded text-emerald-600 border-neutral-300 focus:ring-emerald-500 cursor-pointer"
                          />
                          <span className="text-xs font-medium text-[#1e293b] dark:text-neutral-200">{symptomLabels[key as keyof typeof symptoms]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-[#475569] dark:text-neutral-400 tracking-wider uppercase">Observações Clínicas</h3>
                  <textarea
                    rows={4}
                    placeholder="Digite aqui sintomas adicionais, histórico recente de viagens ou observações clínicas gerais..."
                    value={observations}
                    onChange={(e) => setObservations(e.target.value)}
                    className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-[#f8fafc] dark:bg-neutral-800 px-4 py-3 text-sm text-[#1e293b] dark:text-neutral-50 focus:border-blue-500 focus:bg-white focus:outline-none leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800 pt-5 mt-2">
                  <p className="text-xs font-medium text-[#64748b] dark:text-neutral-400">
                    {selectedSymptomsList.length === 0
                      ? "Nenhum sintoma selecionado"
                      : `${selectedSymptomsList.length} sintoma(s) selecionado(s)`}
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#00b074] hover:bg-[#009662] text-white px-5 py-2.5 font-semibold text-xs uppercase tracking-wider shadow-2xs transition-colors cursor-pointer"
                  >
                    Finalizar e Encaminhar ao Médico →
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="rounded-xl border border-neutral-200/80 bg-white p-8 text-center text-slate-400 italic">
              Selecione um paciente na fila lateral para iniciar os procedimentos de triagem.
            </div>
          )}
        </div>

      </div>

      {isModalOpen && selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Confirmar Envio da Triagem</h3>
                  <p className="text-xs text-slate-500 font-medium">{selectedPatient.name}</p>
                </div>
              </div>
              <button type="button" onClick={() => { setIsModalOpen(false); setPassword(""); }} className="text-slate-400 hover:text-slate-600 cursor-pointer">✕</button>
            </div>

            <div className="flex gap-3 rounded-xl bg-amber-50/80 p-4 border border-amber-100">
              <p className="text-xs font-medium text-amber-800 leading-relaxed">
                Ao confirmar, o paciente será encaminhado para a fila médica e os dados de sintomas agregados serão computados para a análise territorial.
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500 tracking-wider uppercase">Sua Senha de Confirmação</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-neutral-200 bg-[#f8fafc] py-3 pl-10 pr-10 text-sm text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 cursor-pointer">
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button type="button" onClick={() => { setIsModalOpen(false); setPassword(""); }} className="w-full rounded-xl border border-slate-200 py-3 font-semibold text-sm text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer">
                Cancelar
              </button>
              <button type="button" onClick={handleFinalSubmit} className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 py-3 font-semibold text-sm text-white shadow-xs transition-colors cursor-pointer">
                Confirmar e Enviar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}