import { useState } from "react";
import { useNavigate } from "react-router";
import { RealGeographicMap } from "../components/RealGeographicMap";

export function GestaoPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"territorial" | "notificados" | "campo">("territorial");

  const metrics = {
    totalCases: 210,
    urgentAreas: 3,
    alertAreas: 5
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-neutral-950 p-6 font-sans transition-colors duration-200">
      <div className="mx-auto max-w-7xl space-y-6">
        
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200/60 dark:border-neutral-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#64748b] dark:text-neutral-400">
              <span>Gestão de Saúde Municipal</span>
              <span className="text-slate-300">•</span>
              <span>Vigilância Epidemiológica</span>
              <span className="text-slate-300">•</span>
              <span>03/07/2026</span>
            </div>
            <h1 className="text-2xl font-bold text-[#1e293b] dark:text-neutral-50 mt-1 flex items-center gap-2">
              SentiNela Saúde
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200/30">
                <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse"></span> SISTEMA ATIVO
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 px-4 py-2 rounded-xl text-center shadow-xs">
              <p className="text-[20px] font-bold text-slate-800 dark:text-neutral-50">{metrics.totalCases}</p>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Total de Casos</p>
            </div>
            <div className="bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 px-4 py-2 rounded-xl text-center shadow-xs">
              <p className="text-[20px] font-bold text-red-600 dark:text-red-400">{metrics.urgentAreas}</p>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Áreas Urgentes</p>
            </div>
            <div className="bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 px-4 py-2 rounded-xl text-center shadow-xs">
              <p className="text-[20px] font-bold text-amber-500 dark:text-amber-400">{metrics.alertAreas}</p>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Em Alerta</p>
            </div>
            <button 
              onClick={() => navigate("/triagem")}
              className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-xs shadow-md hover:bg-blue-700 cursor-pointer"
            >
              RA
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 border-b border-slate-200/60 dark:border-neutral-800 pb-px">
          <button
            onClick={() => setActiveTab("territorial")}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === "territorial"
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            🗺 Painel Territorial
          </button>
          <button
            onClick={() => setActiveTab("notificados")}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === "notificados"
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            🛡 Casos Notificados
          </button>
          <button
            onClick={() => setActiveTab("campo")}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === "campo"
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            📢 Ações de Campo
          </button>
        </div>

        {activeTab === "territorial" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            <div className="lg:col-span-3 bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 rounded-xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-neutral-100">Mapa de Calor Territorial</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Análise e monitoramento automatizado de focos de contágio</p>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-semibold">
                  <span className="flex items-center gap-1 text-emerald-600"><span className="h-2 w-2 rounded-full bg-emerald-500/20 border border-emerald-500"></span> Estável</span>
                  <span className="flex items-center gap-1 text-amber-500"><span className="h-2 w-2 rounded-full bg-amber-500/20 border border-amber-500"></span> Alerta</span>
                  <span className="flex items-center gap-1 text-red-600"><span className="h-2 w-2 rounded-full bg-red-500/20 border border-red-500"></span> Urgente</span>
                </div>
              </div>

              <div className="w-full h-[450px] mt-2">
                <RealGeographicMap />
              </div>
            </div>

            <div className="space-y-6">
              
              <div className="bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 rounded-xl p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-2">
                  <h4 className="text-xs font-bold text-slate-500 dark:text-neutral-400 uppercase tracking-wider">Postos de Saúde</h4>
                  <span className="text-[10px] text-slate-400 font-bold">5/6 online</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-neutral-800/50">
                    <div>
                      <p className="font-bold text-slate-700 dark:text-neutral-200">UBS Centro</p>
                      <p className="text-[10px] text-slate-400">2 méd • 4 enf</p>
                    </div>
                    <span className="text-emerald-500">●</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-neutral-800/50">
                    <div>
                      <p className="font-bold text-slate-700 dark:text-neutral-200">UBS Jardim Esperança</p>
                      <p className="text-[10px] text-slate-400">1 méd • 3 enf</p>
                    </div>
                    <span className="text-emerald-500">●</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-neutral-800/50">
                    <div>
                      <p className="font-bold text-slate-700 dark:text-neutral-200">UBS São José</p>
                      <p className="text-[10px] text-red-400">Sistema Offline</p>
                    </div>
                    <span className="text-slate-300">●</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 rounded-xl p-4 shadow-xs space-y-3">
                <h4 className="text-xs font-bold text-slate-500 dark:text-neutral-400 uppercase tracking-wider border-b border-slate-100 dark:border-neutral-800 pb-2">Tendências Sindrômicas</h4>
                <div className="space-y-2.5 pt-1">
                  <div>
                    <div className="flex justify-between text-[11px] font-medium text-slate-600 dark:text-neutral-300 mb-1"><span>Respiratória (IRA)</span><span className="font-bold">75%</span></div>
                    <div className="w-full bg-slate-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden"><div className="bg-blue-600 h-full rounded-full" style={{ width: "75%" }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-medium text-slate-600 dark:text-neutral-300 mb-1"><span>Febril / Dengue</span><span className="font-bold">50%</span></div>
                    <div className="w-full bg-slate-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden"><div className="bg-amber-500 h-full rounded-full" style={{ width: "50%" }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-medium text-slate-600 dark:text-neutral-300 mb-1"><span>Gastrointestinal</span><span className="font-bold">20%</span></div>
                    <div className="w-full bg-slate-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden"><div className="bg-purple-500 h-full rounded-full" style={{ width: "20%" }}></div></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === "notificados" && (
          <div className="bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 rounded-xl shadow-xs overflow-hidden">
            <div className="m-5 flex gap-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/20 p-4 border border-amber-100 dark:border-amber-900/30">
              <span className="text-amber-600 shrink-0">🛡</span>
              <p className="text-xs font-medium text-amber-800 dark:text-amber-400 leading-relaxed">
                <span className="font-bold">Proteção de Dados (LGPD) —</span> Os dados exibidos estão totalmente anonimizados na visão de gestão coletiva. O acesso a informações nominais é restrito, auditado e registrado conforme a Lei nº 13.709/2018.
              </p>
            </div>

            <div className="px-5 pb-4 flex items-center justify-between border-b border-slate-100 dark:border-neutral-800">
              <input
                type="text"
                placeholder="Buscar por ID, síndrome, unidade..."
                className="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-[#f8fafc] dark:bg-neutral-800 px-3.5 py-2 text-xs w-72 focus:outline-none"
              />
              <span className="text-xs text-slate-400 font-medium">8 registros encontrados</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 dark:bg-neutral-800/40 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100 dark:border-neutral-800">
                    <th className="p-4">ID do Alerta</th>
                    <th className="p-4">Iniciais</th>
                    <th className="p-4">CPF Mascarado</th>
                    <th className="p-4">Síndrome</th>
                    <th className="p-4">Unidade de Saúde</th>
                    <th className="p-4">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-neutral-800 font-medium text-slate-700 dark:text-neutral-300">
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 text-blue-600 dark:text-blue-400 font-bold">ALT-2026-0891</td>
                    <td className="p-4">Ma******</td>
                    <td className="p-4">03*.***.**0-**</td>
                    <td className="p-4"><span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-100 text-[10px] font-bold">IRA / Respiratória</span></td>
                    <td className="p-4">UBS Centro</td>
                    <td className="p-4"><button onClick={() => alert("Auditando acesso ao prontuário...")} className="border border-slate-200 px-2.5 py-1 rounded-md text-[11px] hover:bg-slate-50 cursor-pointer">👁 Visualizar</button></td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 text-blue-600 dark:text-blue-400 font-bold">ALT-2026-0892</td>
                    <td className="p-4">Ca******</td>
                    <td className="p-4">09*.***.**4-**</td>
                    <td className="p-4"><span className="bg-orange-50 text-orange-700 px-2.5 py-0.5 rounded-full border border-orange-100 text-[10px] font-bold">Febril / Dengue-like</span></td>
                    <td className="p-4">UBS Jardim Esperança</td>
                    <td className="p-4"><button onClick={() => alert("Auditando acesso ao prontuário...")} className="border border-slate-200 px-2.5 py-1 rounded-md text-[11px] hover:bg-slate-50 cursor-pointer">👁 Visualizar</button></td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 text-blue-600 dark:text-blue-400 font-bold">ALT-2026-0893</td>
                    <td className="p-4">Jo******</td>
                    <td className="p-4">05*.***.**7-**</td>
                    <td className="p-4"><span className="bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded-full border border-purple-100 text-[10px] font-bold">Gastrointestinal</span></td>
                    <td className="p-4">UBS Vila Nova</td>
                    <td className="p-4"><button onClick={() => alert("Auditando acesso ao prontuário...")} className="border border-slate-200 px-2.5 py-1 rounded-md text-[11px] hover:bg-slate-50 cursor-pointer">👁 Visualizar</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "campo" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-neutral-100">Microáreas Críticas Ativas</h3>
                <p className="text-xs text-slate-400 mt-0.5">Alertas de bloqueio territorial prontos para envio via WhatsApp</p>
              </div>
            </div>

            <div className="space-y-4">
              
              <div className="bg-white dark:bg-neutral-900 border border-red-100 dark:border-neutral-800 rounded-xl p-5 shadow-xs flex flex-col md:flex-row justify-between gap-4 items-start">
                <div className="space-y-3 w-full md:max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-red-500">📍</span>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-neutral-50">Jardim Esperança</h4>
                    <span className="bg-red-50 text-red-600 font-bold px-2 py-0.5 rounded text-[10px] uppercase">Urgente</span>
                  </div>
                  <p className="text-xs text-slate-400">28 notificações recentes • Síndrome: <span className="font-bold text-red-600">Respiratória</span></p>
                  
                  <div className="bg-slate-50 dark:bg-neutral-800 p-3 rounded-lg border border-slate-100 dark:border-neutral-700 font-mono text-[11px] text-slate-600 dark:text-neutral-300 space-y-1">
                    <p>🚨 *ALERTA SANITÁRIO — AGENTES DE SAÚDE*</p>
                    <p>📍 Microárea: *Jardim Esperança*</p>
                    <p>📋 Síndrome predominante: *Respiratória*</p>
                    <p>💬 Foco: Visitas de bloqueio e busca ativa residencial imediata nas quadras A e B.</p>
                  </div>
                </div>
                <button 
                  onClick={() => alert("Abrindo API do WhatsApp com o texto formatado do alerta...")}
                  className="bg-[#005c53] hover:bg-[#044c45] text-white font-bold text-xs px-4 py-2.5 rounded-lg inline-flex items-center gap-2 cursor-pointer shrink-0"
                >
                  💬 Gerar Alerta WhatsApp
                </button>
              </div>

              <div className="bg-white dark:bg-neutral-900 border border-red-100 dark:border-neutral-800 rounded-xl p-5 shadow-xs flex flex-col md:flex-row justify-between gap-4 items-start">
                <div className="space-y-3 w-full md:max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-red-500">📍</span>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-neutral-50">Centro Histórico</h4>
                    <span className="bg-red-50 text-red-600 font-bold px-2 py-0.5 rounded text-[10px] uppercase">Urgente</span>
                  </div>
                  <p className="text-xs text-slate-400">41 notificações recentes • Síndrome: <span className="font-bold text-amber-600">Febril</span></p>
                  
                  <div className="bg-slate-50 dark:bg-neutral-800 p-3 rounded-lg border border-slate-100 dark:border-neutral-700 font-mono text-[11px] text-slate-600 dark:text-neutral-300 space-y-1">
                    <p>🚨 *ALERTA SANITÁRIO — AGENTES DE SAÚDE*</p>
                    <p>📍 Microárea: *Centro Histórico*</p>
                    <p>📋 Síndrome predominante: *Febril / Suspeita de Dengue*</p>
                    <p>💬 Foco: Eliminação de criadouros e aplicação de larvicidas em reservatórios.</p>
                  </div>
                </div>
                <button 
                  onClick={() => alert("Abrindo API do WhatsApp com o texto formatado do alerta...")}
                  className="bg-[#005c53] hover:bg-[#044c45] text-white font-bold text-xs px-4 py-2.5 rounded-lg inline-flex items-center gap-2 cursor-pointer shrink-0"
                >
                  💬 Gerar Alerta WhatsApp
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}