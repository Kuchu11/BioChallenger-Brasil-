import { useNavigate } from "react-router";

export function GestaoPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background dark:bg-neutral-950 p-6 transition-colors duration-200">
      <div className="mx-auto max-w-5xl space-y-6">
        
        <div className="flex items-center justify-between border-b border-border dark:border-neutral-800 pb-4">
          <div>
            <h1 className="text-2xl font-medium text-foreground dark:text-neutral-50">Painel de Gestão Hospitalar</h1>
            <p className="text-sm text-muted-foreground dark:text-neutral-400 mt-1">Métricas de eficiência e fluxo de atendimento</p>
          </div>
          <button
            onClick={() => navigate("/triagem")}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 shadow-sm cursor-pointer"
          >
            Nova Triagem
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div className="rounded-lg border border-border dark:border-neutral-800 bg-card dark:bg-neutral-900 p-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-neutral-400">Total Atendidos</p>
            <p className="mt-2 text-3xl font-semibold text-foreground dark:text-neutral-50">142</p>
          </div>
          <div className="rounded-lg border border-border dark:border-neutral-800 bg-card dark:bg-neutral-900 p-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-neutral-400">Tempo Médio</p>
            <p className="mt-2 text-3xl font-semibold text-foreground dark:text-neutral-50">18 <span className="text-sm font-normal text-muted-foreground">min</span></p>
          </div>
          <div className="rounded-lg border border-border dark:border-neutral-800 bg-card dark:bg-neutral-900 p-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-neutral-400">Casos Críticos</p>
            <p className="mt-2 text-3xl font-semibold text-red-600 dark:text-red-400">3</p>
          </div>
          <div className="rounded-lg border border-border dark:border-neutral-800 bg-card dark:bg-neutral-900 p-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-neutral-400">Taxa de Evasão</p>
            <p className="mt-2 text-3xl font-semibold text-emerald-600 dark:text-emerald-400">0.8%</p>
          </div>
        </div>

        <div className="rounded-lg border border-border dark:border-neutral-800 bg-card dark:bg-neutral-900 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border dark:border-neutral-800">
            <h3 className="text-base font-medium text-foreground dark:text-neutral-50">Últimos Atendimentos Concluídos</h3>
          </div>
          <div className="divide-y divide-border dark:divide-neutral-800">
            <div className="flex items-center justify-between p-4 text-sm bg-input-background dark:bg-neutral-900/50">
              <div>
                <p className="font-medium text-foreground dark:text-neutral-200">Maria das Dores</p>
                <p className="text-xs text-muted-foreground dark:text-neutral-400">Médico: Dr. Daniel • Há 12 min</p>
              </div>
              <span className="rounded bg-green-100 dark:bg-green-950/40 px-2.5 py-1 text-xs font-semibold text-green-800 dark:text-green-300 uppercase">Pouco Urgente</span>
            </div>
            <div className="flex items-center justify-between p-4 text-sm">
              <div>
                <p className="font-medium text-foreground dark:text-neutral-200">Raimundo Nonato</p>
                <p className="text-xs text-muted-foreground dark:text-neutral-400">Médico: Dr. Daniel • Há 24 min</p>
              </div>
              <span className="rounded bg-yellow-100 dark:bg-yellow-950/40 px-2.5 py-1 text-xs font-semibold text-yellow-800 dark:text-yellow-300 uppercase">Urgente</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}