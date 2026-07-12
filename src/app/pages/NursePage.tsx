import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAttendance } from "../context/AttendanceContext";

export function NursePage() {
  const { addPatientToQueue } = useAttendance();
  const navigate = useNavigate();

  // Estados dos inputs de dados do paciente
  const [name, setName] = useState("Maria Aparecida Santos");
  const [cpf, setCpf] = useState("");
  const [susCard, setSusCard] = useState("");
  const [observations, setObservations] = useState("");

  // Estado do Modal de Confirmação com Senha
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Checklist de Sintomas Estruturado
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

  // Mapeamento de chaves para nomes legíveis
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

  // Função auxiliar para marcar/desmarcar sintomas
  const toggleSymptom = (key: keyof typeof symptoms) => {
    setSymptoms((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Coleta dinamicamente os nomes dos sintomas selecionados
  const selectedSymptomsList = Object.keys(symptoms)
    .filter((key) => symptoms[key as keyof typeof symptoms])
    .map((key) => symptomLabels[key as keyof typeof symptoms]);

  // Lógica de classificação automática simples baseada nos sintomas críticos
  const calculateRiskLevel = (): "blue" | "green" | "yellow" | "orange" | "red" => {
    if (symptoms.faltaAr) return "orange";
    if (symptoms.febreAlta && symptoms.vomito) return "yellow";
    if (selectedSymptomsList.length > 0) return "green";
    return "blue";
  };

  // Gatilho do botão principal que abre o modal de validação
  const handleOpenConfirmation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  // Confirmação final após digitar a senha
  const handleFinalSubmit = () => {
    if (!password) {
      alert("Por favor, insira sua senha de confirmação.");
      return;
    }

    // Adiciona o paciente estruturado com o checklist ao contexto
    addPatientToQueue({
      name,
      cpf,
      susCard,
      symptomsList: selectedSymptomsList,
      symptoms: observations,
      riskLevel: calculateRiskLevel(),
    });

    setIsModalOpen(false);
    setPassword("");
    alert(`Triagem concluída! ${name} encaminhada com sucesso.`);
    navigate("/medico");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-neutral-950 p-6 font-sans transition-colors duration-200">
      <div className="mx-auto max-w-5xl rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden">
        
        {/* Cabeçalho - Triagem Ativa */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <p className="text-xs font-bold text-[#475569] dark:text-neutral-400 tracking-wider uppercase">Triagem Ativa</p>
            <h1 className="text-2xl font-bold text-[#1e293b] dark:text-neutral-50 mt-0.5">{name}</h1>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 dark:bg-amber-950/30 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/30">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
            Em atendimento
          </span>
        </div>

        <form onSubmit={handleOpenConfirmation} className="p-8 space-y-8">
          
          {/* Seção 1: Dados do Paciente */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[#475569] dark:text-neutral-400 tracking-wider uppercase">Dados do Paciente</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-semibold text-[#64748b] dark:text-neutral-300 mb-1.5">Nome Completo</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-[#f8fafc] dark:bg-neutral-800 px-3.5 py-2.5 text-sm text-[#1e293b] dark:text-neutral-50 font-medium focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#64748b] dark:text-neutral-300 mb-1.5">CPF</label>
                <input
                  type="text"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-[#f8fafc] dark:bg-neutral-800 px-3.5 py-2.5 text-sm text-[#1e293b] dark:text-neutral-50 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#64748b] dark:text-neutral-300 mb-1.5">Cartão Nacional SUS</label>
                <input
                  type="text"
                  placeholder="000 0000 0000 0000"
                  value={susCard}
                  onChange={(e) => setSusCard(e.target.value)}
                  className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-[#f8fafc] dark:bg-neutral-800 px-3.5 py-2.5 text-sm text-[#1e293b] dark:text-neutral-50 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Seção 2: Checklist de Sintomas */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[#475569] dark:text-neutral-400 tracking-wider uppercase">Checklist de Sintomas — Sentinela</h3>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              
              {/* Coluna Febril */}
              <div className="rounded-xl border border-orange-100 dark:border-orange-950/30 bg-orange-50/30 dark:bg-orange-950/10 p-5 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider mb-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span> FEBRIL
                </div>
                {["febreAlta", "dorCabeca", "dorCorpo"].map((key) => (
                  <div
                    key={key}
                    onClick={() => toggleSymptom(key as keyof typeof symptoms)}
                    className="flex items-center gap-3 bg-white dark:bg-neutral-800/80 p-3 rounded-lg border border-neutral-100 dark:border-neutral-700/50 shadow-xs cursor-pointer select-none hover:bg-orange-50/20"
                  >
                    <input
                      type="checkbox"
                      checked={symptoms[key as keyof typeof symptoms]}
                      readOnly
                      className="h-4 w-4 rounded text-orange-600 border-neutral-300 focus:ring-orange-500 cursor-pointer"
                    />
                    <span className="text-sm font-medium text-[#1e293b] dark:text-neutral-200">{symptomLabels[key as keyof typeof symptoms]}</span>
                  </div>
                ))}
              </div>

              {/* Coluna Respiratório */}
              <div className="rounded-xl border border-blue-100 dark:border-blue-950/30 bg-blue-50/30 dark:bg-blue-950/10 p-5 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span> RESPIRATÓRIO
                </div>
                {["tosse", "coriza", "faltaAr"].map((key) => (
                  <div
                    key={key}
                    onClick={() => toggleSymptom(key as keyof typeof symptoms)}
                    className="flex items-center gap-3 bg-white dark:bg-neutral-800/80 p-3 rounded-lg border border-neutral-100 dark:border-neutral-700/50 shadow-xs cursor-pointer select-none hover:bg-blue-50/20"
                  >
                    <input
                      type="checkbox"
                      checked={symptoms[key as keyof typeof symptoms]}
                      readOnly
                      className="h-4 w-4 rounded text-blue-600 border-neutral-300 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-sm font-medium text-[#1e293b] dark:text-neutral-200">{symptomLabels[key as keyof typeof symptoms]}</span>
                  </div>
                ))}
              </div>

              {/* Coluna Gastrointestinal */}
              <div className="rounded-xl border border-emerald-100 dark:border-emerald-950/30 bg-emerald-50/30 dark:bg-emerald-950/10 p-5 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> GASTROINTESTINAL
                </div>
                {["diarreia", "vomito", "dorAbdominal"].map((key) => (
                  <div
                    key={key}
                    onClick={() => toggleSymptom(key as keyof typeof symptoms)}
                    className="flex items-center gap-3 bg-white dark:bg-neutral-800/80 p-3 rounded-lg border border-neutral-100 dark:border-neutral-700/50 shadow-xs cursor-pointer select-none hover:bg-emerald-50/20"
                  >
                    <input
                      type="checkbox"
                      checked={symptoms[key as keyof typeof symptoms]}
                      readOnly
                      className="h-4 w-4 rounded text-emerald-600 border-neutral-300 focus:ring-emerald-500 cursor-pointer"
                    />
                    <span className="text-sm font-medium text-[#1e293b] dark:text-neutral-200">{symptomLabels[key as keyof typeof symptoms]}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Seção 3: Observações Clínicas */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[#475569] dark:text-neutral-400 tracking-wider uppercase">Observações Clínicas</h3>
            <textarea
              rows={4}
              placeholder="Digite aqui sintomas adicionais, histórico recente de viagens ou observações clínicas gerais..."
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-[#f8fafc] dark:bg-neutral-800 px-4 py-3 text-sm text-[#1e293b] dark:text-neutral-50 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none leading-relaxed"
            />
          </div>

          {/* Rodapé Interno com Contador Dinâmico e Botão Principal */}
          <div className="flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800 pt-6 mt-4">
            <p className="text-sm font-medium text-[#64748b] dark:text-neutral-400">
              {selectedSymptomsList.length === 0
                ? "Nenhum sintoma selecionado"
                : `${selectedSymptomsList.length} sintoma(s) selecionado(s)`}
            </p>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-[#00b074] hover:bg-[#009662] text-white px-5 py-3 font-semibold text-sm shadow-xs transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V19.5a2.25 2.25 0 0 0 2.25 2.25h.002Z" />
              </svg>
              Finalizar e Encaminhar ao Médico →
            </button>
          </div>

        </form>
      </div>

      {/* MODAL DE CONFIRMAÇÃO COM SENHA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl space-y-6 animate-in fade-in zoom-in-95 duration-150">
            
            {/* Header do Modal */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Confirmar Envio da Triagem</h3>
                  <p className="text-xs text-slate-500 font-medium">{name}</p>
                </div>
              </div>
              <button
                onClick={() => { setIsModalOpen(false); setPassword(""); }}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Caixa de Alerta Amarela */}
            <div className="flex gap-3 rounded-xl bg-amber-50/80 p-4 border border-amber-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-amber-600 shrink-0 mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
              <p className="text-xs font-medium text-amber-800 leading-relaxed">
                Ao confirmar, o paciente será encaminhado para a fila médica e os dados de sintomas agregados serão computados para a análise territorial.
              </p>
            </div>

            {/* Campo da Senha */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500 tracking-wider uppercase">Sua Senha de Confirmação</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            {/* Botões de Ação */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => { setIsModalOpen(false); setPassword(""); }}
                className="w-full rounded-xl border border-slate-200 py-3 font-semibold text-sm text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] py-3 font-semibold text-sm text-white shadow-xs transition-colors cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Confirmar e Enviar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}