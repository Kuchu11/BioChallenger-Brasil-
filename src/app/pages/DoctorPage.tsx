import { useNavigate } from "react-router";
import { useAttendance } from "../context/AttendanceContext";

export function DoctorPage() {
  const { queue, currentPatient, callNextPatient } = useAttendance();
  const navigate = useNavigate();

  const riskBadges = {
    blue: "bg-blue-600 text-white",
    green: "bg-green-600 text-white",
    yellow: "bg-yellow-500 text-black",
    orange: "bg-orange-500 text-white",
    red: "bg-red-600 text-white",
  };

  const riskLabels = {
    blue: "Não Urgente",
    green: "Pouco Urgente",
    yellow: "Urgente",
    orange: "Muito Urgente",
    red: "Emergência",
  };

  return (
    <div className="min-h-screen bg-background dark:bg-neutral-950 p-6 transition-colors duration-200">
      <div className="mx-auto max-w-5xl space-y-6">
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border dark:border-neutral-800 pb-4">
          <div>
            <h1 className="text-2xl font-medium text-foreground dark:text-neutral-50">Consultório Médico</h1>
            <p className="text-sm text-muted-foreground dark:text-neutral-400 mt-1">Atendimento clínico e prescrição de prontuários</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-950/40 px-3 py-1 text-xs font-semibold text-blue-800 dark:text-blue-300">
              {queue.length} paciente(s) na fila
            </span>
            <button
              onClick={callNextPatient}
              disabled={queue.length === 0}
              className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm focus:outline-none cursor-pointer"
            >
              Chamar Próximo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          
          <div className="rounded-lg border border-border dark:border-neutral-800 bg-card dark:bg-neutral-900 p-6 shadow-sm lg:col-span-2 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-foreground dark:text-neutral-50">
                  {currentPatient ? currentPatient.name : "Nenhum paciente em atendimento"}
                </h3>
                {currentPatient && (
                  <p className="text-sm text-muted-foreground dark:text-neutral-400 mt-0.5">{currentPatient.age} anos</p>
                )}
              </div>
              {currentPatient && (
                <span className={`rounded-md px-3 py-1 text-xs font-bold uppercase tracking-wide ${riskBadges[currentPatient.riskLevel]}`}>
                  {riskLabels[currentPatient.riskLevel]}
                </span>
              )}
            </div>

            {currentPatient ? (
              <>
                <div className="grid grid-cols-3 gap-4 border-t border-b border-border dark:border-neutral-800 py-4">
                  <div className="text-center">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-neutral-400">Pressão Arterial</p>
                    <p className="mt-1 text-lg font-semibold text-foreground dark:text-neutral-50">{currentPatient.bloodPressure} <span className="text-xs font-normal text-muted-foreground">mmHg</span></p>
                  </div>
                  <div className="text-center border-x border-border dark:border-neutral-800">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-neutral-400">Freq. Cardíaca</p>
                    <p className="mt-1 text-lg font-semibold text-foreground dark:text-neutral-50">{currentPatient.heartRate} <span className="text-xs font-normal text-muted-foreground">bpm</span></p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-neutral-400">Temperatura</p>
                    <p className="mt-1 text-lg font-semibold text-foreground dark:text-neutral-50">{currentPatient.temperature} <span className="text-xs font-normal text-muted-foreground">°C</span></p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-foreground dark:text-neutral-200 mb-1">Queixa Principal / Sintomas Relatados:</h4>
                  <p className="text-sm text-muted-foreground dark:text-neutral-300 bg-input-background dark:bg-neutral-800 rounded-md p-3 border border-border dark:border-neutral-700 leading-relaxed">
                    {currentPatient.symptoms}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="block text-sm font-medium text-foreground dark:text-neutral-200">Evolução Clínica / Prescrição Médica</label>
                  <textarea
                    rows={4}
                    placeholder="Digite os achados clínicos, diagnóstico e medicamentos receitados..."
                    className="w-full rounded-md border border-border dark:border-neutral-700 bg-input-background dark:bg-neutral-800 px-3 py-2 text-foreground dark:text-neutral-50 focus:border-primary focus:outline-none text-sm placeholder-neutral-400 dark:placeholder-neutral-500"
                  />
                </div>

                <button
                  onClick={() => {
                    alert("Atendimento finalizado com sucesso! Relatório enviado para o Painel de Gestão.");
                    navigate("/gestao");
                  }}
                  className="w-full rounded-md bg-primary py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none text-sm cursor-pointer"
                >
                  Finalizar Atendimento e Enviar para Gestão
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-muted-foreground dark:text-neutral-500 mb-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                <p className="text-sm font-medium text-muted-foreground dark:text-neutral-400">Aguardando o acionamento do botão "Chamar Próximo" para iniciar.</p>
              </div>
            )}
          </div>

          <div className="rounded-lg border border-border dark:border-neutral-800 bg-card dark:bg-neutral-900 p-6 shadow-sm lg:col-span-1 space-y-4">
            <h3 className="text-base font-medium text-foreground dark:text-neutral-50 border-b border-border dark:border-neutral-800 pb-2">Fila de Espera Geral</h3>
            {queue.length === 0 ? (
              <p className="text-xs text-muted-foreground dark:text-neutral-400 italic text-center py-4">Nenhum paciente aguardando.</p>
            ) : (
              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                {queue.map((patient, index) => (
                  <div key={index} className="flex items-center justify-between p-2.5 rounded-md border border-border dark:border-neutral-700 bg-input-background dark:bg-neutral-800 text-xs">
                    <div className="font-medium text-foreground dark:text-neutral-200 truncate max-w-[120px]">
                      {patient.name}
                    </div>
                    <span className={`rounded px-2 py-0.5 font-semibold text-[10px] uppercase ${riskBadges[patient.riskLevel]}`}>
                      {riskLabels[patient.riskLevel]}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}