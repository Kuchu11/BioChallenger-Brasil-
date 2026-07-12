import { useState } from "react";
import { useNavigate } from "react-router";

export function GestaoPage() {
  const [period, setPeriod] = useState("hoje");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
          <div>
            <h1 className="text-2xl font-medium text-foreground">Painel de Gestão e Indicadores</h1>
            <p className="text-sm text-muted-foreground mt-1">Monitoramento de fluxo e produtividade da unidade de saúde</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="rounded-md border border-border bg-card px-3 py-2 text-foreground focus:border-primary focus:outline-none text-sm font-medium shadow-sm"
            >
              <option value="hoje">Hoje (Tempo Real)</option>
              <option value="semana">Últimos 7 dias</option>
              <option value="mes">Últimos 30 dias</option>
            </select>

            <button
              onClick={() => navigate("/")}
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 shadow-sm focus:outline-none uppercase tracking-wider"
            >
              Sair
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Total de Atendimentos</p>
            <p className="mt-2 text-3xl font-medium text-foreground">142</p>
            <span className="text-xs font-medium text-emerald-600 font-sans">+12% que ontem</span>
          </div>
          
          <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Em Espera (Triagem)</p>
            <p className="mt-2 text-3xl font-medium text-foreground">8</p>
            <span className="text-xs font-medium text-amber-600 font-sans">Tempo médio: 14 min</span>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Aguardando Médico</p>
            <p className="mt-2 text-3xl font-medium text-foreground">19</p>
            <span className="text-xs font-medium text-blue-600 font-sans">Média: 28 min</span>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Taxa de Conversão de Risco</p>
            <p className="mt-2 text-3xl font-medium text-foreground">94.2%</p>
            <span className="text-xs font-medium text-muted-foreground">Aderência ao Manchester</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm lg:col-span-2">
            <h3 className="text-lg font-medium text-foreground mb-4">Fluxo de Pacientes por Classificação</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium text-foreground flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-600"></span> Emergência (Vermelho)
                  </span>
                  <span className="text-muted-foreground font-medium">3 pacientes (2%)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-red-600 rounded-full" style={{ width: "2%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium text-foreground flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-orange-500"></span> Muito Urgente (Laranja)
                  </span>
                  <span className="text-muted-foreground font-medium">15 pacientes (11%)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: "11%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium text-foreground flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-yellow-500"></span> Urgente (Amarelo)
                  </span>
                  <span className="text-muted-foreground font-medium">54 pacientes (38%)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-yellow-500 rounded-full" style={{ width: "38%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium text-foreground flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-600"></span> Pouco Urgente (Verde)
                  </span>
                  <span className="text-muted-foreground font-medium">62 pacientes (44%)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-green-600 rounded-full" style={{ width: "44%" }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 shadow-sm lg:col-span-1">
            <h3 className="text-lg font-medium text-foreground mb-4">Ocupação de Consultórios</h3>
            <div className="divide-y divide-border">
              <div className="py-3 flex items-center justify-between first:pt-0">
                <span className="text-sm font-medium text-foreground">Consultório 01 (Pediatria)</span>
                <span className="rounded bg-emerald-100 text-emerald-800 px-2 py-0.5 text-xs font-semibold uppercase">Ativo</span>
              </div>
              <div className="py-3 flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Consultório 02 (Clínico Geral)</span>
                <span className="rounded bg-emerald-100 text-emerald-800 px-2 py-0.5 text-xs font-semibold uppercase">Ativo</span>
              </div>
              <div className="py-3 flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Consultório 03 (Clínico Geral)</span>
                <span className="rounded bg-muted text-muted-foreground px-2 py-0.5 text-xs font-semibold uppercase">Inativo</span>
              </div>
              <div className="py-3 flex items-center justify-between last:pb-0">
                <span className="text-sm font-medium text-foreground">Sala de Triagem 01</span>
                <span className="rounded bg-emerald-100 text-emerald-800 px-2 py-0.5 text-xs font-semibold uppercase">Ativo</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}