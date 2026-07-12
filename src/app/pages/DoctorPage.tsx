import { useNavigate } from "react-router";
import { useAttendance } from "../context/AttendanceContext";

export function DoctorPage() {
  const { queue, currentPatient, callNextPatient } = useAttendance();
  const navigate = useNavigate();

  // Define as cores dos crachás com base no nível de risco do paciente real
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
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
          <div>
            <h1 className="text-2xl font-medium text-foreground">Consultório Médico</h1>
            <p className="text-sm text-muted-foreground mt-1">Atendimento clínico e prescrição de prontuários</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
              {queue.length} paciente(s) na fila
            </span>
            <button
              onClick={callNextPatient}
              disabled={queue.length === 0}
              className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm focus:outline-none"
            >
              Chamar Próximo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          
          {/* Detalhes do Paciente Atual */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm lg:col-span-2 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  {currentPatient ? currentPatient.name : "Nenhum paciente em atendimento"}
                </h3>
                {currentPatient && (
                  <p className="text-sm text-muted-foreground mt-0.5">{currentPatient.age} anos</p>
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
                <div className="grid grid-cols-3 gap-4 border-t border-b border-border py-4">
                  <div className="text-center">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Pressão Arterial</p>
                    <p className="mt-1 text-lg font-semibold text-foreground">{currentPatient.bloodPressure} <span className="text-xs font-normal text-muted-foreground">mmHg</span></p>
                  </div>
                  <div className="text-center border-x border-border">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Freq. Cardíaca</p>
                    <p className="mt-1 text-lg font-semibold text-foreground">{currentPatient.heartRate} <span className="text-xs font-normal text-muted-foreground">bpm</span></p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Temperatura</p>
                    <p className="mt-1 text-lg font-semibold text-foreground">{currentPatient.temperature} <span className="text-xs font-normal text-muted-foreground">°C</span></p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">Queixa Principal / Sintomas Relatados:</h4>
                  <p className="text-sm text-muted-foreground bg-input-background rounded-md p-3 border border-border leading-relaxed">
                    {currentPatient.symptoms}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="block text-sm font-medium text-foreground">Evolução Clínica / Prescrição Médica</label>
                  <textarea
                    rows={4}
                    placeholder="Digite os achados clínicos, diagnóstico e medicamentos receitados..."
                    className="w-full rounded-md border border-border bg-input-background px-3 py-2 text-foreground focus:border-primary focus:outline-none text-sm"
                  />
                </div>

                <button
                  onClick={() => {
                    alert("Atendimento finalizado com sucesso! Relatório enviado para o Painel de Gestão.");
                    navigate("/gestao");
                  }}
                  className="w-full rounded-md bg-primary py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none text-sm"
                >
                  Finalizar Atendimento e Enviar para Gestão
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-muted-foreground mb-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                <p className="text-sm font-medium text-muted-foreground">Aguardando o acionamento do botão "Chamar Próximo" para iniciar.</p>
              </div>
            )}
          </div>

          {/* Lista Visual da Fila de Espera ao Lado */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm lg:col-span-1 space-y-4">
            <h3 className="text-base font-medium text-foreground border-b border-border pb-2">Fila de Espera Geral</h3>
            {queue.length === 0 ? (
              <p className="text-xs text-muted-foreground italic text-center py-4">Nenhum paciente aguardando.</p>
            ) : (
              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                {queue.map((patient, index) => (
                  <div key={index} className="flex items-center justify-between p-2.5 rounded-md border border-border bg-input-background text-xs">
                    <div className="font-medium text-foreground truncate max-w-[120px]">
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