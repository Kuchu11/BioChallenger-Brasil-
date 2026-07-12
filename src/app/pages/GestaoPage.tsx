import { useState } from "react";
import { useNavigate } from "react-router";
import { RealGeographicMap } from "../components/RealGeographicMap";
import { Navbar } from "../components/Navbar";

interface DetailedPatient {
  id: string;
  name: string;
  cpf: string;
  susCard: string;
  syndrome: string;
  unit: string;
  date: string;
  details: string;
}

interface UbsLocation {
  name: string;
  staff: string;
  status: "online" | "offline";
  coordinates: [number, number];
}

interface FieldAction {
  id: string;
  location: string;
  notifications: number;
  syndrome: string;
  severity: "Urgente" | "Alerta";
  vigilanteName: string;
  vigilantePhone: string;
  quadras: string;
  focusText: string;
}

export function GestaoPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"territorial" | "notificados" | "campo">("territorial");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCase, setSelectedCase] = useState<DetailedPatient | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [mapFocus, setMapFocus] = useState<[number, number] | undefined>(undefined);
  const [ubsName, setUbsName] = useState<string>("");

  const metrics = {
    totalCases: 210,
    urgentAreas: 3,
    alertAreas: 5
  };

  const ubsList: UbsLocation[] = [
    {
      name: "UBS Centro",
      staff: "2 méd • 4 enf",
      status: "online",
      coordinates: [-3.7345, -38.6520] as [number, number]
    },
    {
      name: "UBS Jardim Esperança",
      staff: "1 méd • 3 enf",
      status: "online",
      coordinates: [-3.7385, -38.6575] as [number, number]
    },
    {
      name: "UBS São José",
      staff: "Sistema Offline",
      status: "offline",
      coordinates: [-3.7355, -38.6445] as [number, number]
    }
  ];

  const fieldActionsList: FieldAction[] = [
    {
      id: "1",
      location: "Jardim Esperança",
      notifications: 28,
      syndrome: "Respiratória",
      severity: "Urgente",
      vigilanteName: "Carlos Souza (Vigilante 04)",
      vigilantePhone: "5585999999999",
      quadras: "Quadras A e B",
      focusText: "Visitas de bloqueio e busca ativa residencial imediata nas quadras A e B."
    },
    {
      id: "2",
      location: "Centro Histórico",
      notifications: 41,
      syndrome: "Febril",
      severity: "Urgente",
      vigilanteName: "Ana Beatriz (Vigilante 11)",
      vigilantePhone: "5585988888888",
      quadras: "Reservatórios da Zona Central",
      focusText: "Eliminação de criadouros e aplicação de larvicidas em reservatórios."
    }
  ];

  const casesList: DetailedPatient[] = [
    {
      id: "ALT-2026-0891",
      name: "Maria Aparecida Santos",
      cpf: "342.891.020-15",
      susCard: "7081 2034 9871",
      syndrome: "IRA / Respiratória",
      unit: "UBS Centro",
      date: "03/07/2026",
      details: "Paciente apresentou tosse produtiva, coriza e relato de febre há 3 dias. Microárea sob monitoramento de surto."
    },
    {
      id: "ALT-2026-0892",
      name: "Carlos Eduardo Oliveira",
      cpf: "092.415.884-02",
      susCard: "7043 8899 1122",
      syndrome: "Febril / Dengue-like",
      unit: "UBS Jardim Esperança",
      date: "03/07/2026",
      details: "Febre alta súbita, cefaleia e dores retro-orbitárias. Busca ativa de criadouros iniciada no quarteirão."
    },
    {
      id: "ALT-2026-0893",
      name: "João Carlos Ferreira",
      cpf: "051.772.397-88",
      susCard: "7050 4433 2211",
      syndrome: "Gastrointestinal",
      unit: "UBS Vila Nova",
      date: "02/07/2026",
      details: "Quadro de diarreia agenda e desidratação leve. Coleta de amostra de água realizada na residência."
    }
  ];

  const handleOpenLock = (item: DetailedPatient) => {
    setSelectedCase(item);
    setIsModalOpen(true);
    setIsAuthenticated(false);
    setPassword("");
  };

  const handleVerifyPassword = () => {
    if (!password) {
      alert("Por favor, insira sua credencial de segurança.");
      return;
    }
    setIsAuthenticated(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCase(null);
    setIsAuthenticated(false);
    setPassword("");
  };

  const handleSendWhatsApp = (action: FieldAction) => {
    const message = `🚨 *ALERTA SANITÁRIO — VIGILÂNCIA* \n\n` +
                    `👤 *Vigilante Escalado:* ${action.vigilanteName}\n` +
                    `📍 *Microárea:* ${action.location} (${action.quadras})\n` +
                    `📋 *Síndrome:* ${action.syndrome}\n` +
                    `💬 *Foco da Ação:* ${action.focusText}`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?phone=${action.vigilantePhone}&text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-neutral-950 font-sans transition-colors duration-200">
      
      <Navbar userType="gestor" queueLength={metrics.totalCases} />

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200/60 dark:border-neutral-800 pb-5">
          <div>
            <h1 className="text-xl font-bold text-[#1e293b] dark:text-neutral-50 mt-1 flex items-center gap-2">
              Painel de Monitoramento Geral
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
                <RealGeographicMap customCenter={mapFocus} popupText={ubsName} />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 rounded-xl p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-2">
                  <h4 className="text-xs font-bold text-slate-500 dark:text-neutral-400 uppercase tracking-wider">Postos de Saúde</h4>
                  <span className="text-[10px] text-slate-400 font-bold">5/6 online</span>
                </div>
                <div className="space-y-2 text-xs">
                  {ubsList.map((posto, index) => (
                    <div 
                      key={index}
                      onClick={() => {
                        setMapFocus([...posto.coordinates]);
                        setUbsName(posto.name);
                      }}
                      className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-neutral-800/50 cursor-pointer hover:bg-slate-100 dark:hover:bg-neutral-800 transition-all select-none"
                    >
                      <div>
                        <p className="font-bold text-slate-700 dark:text-neutral-200">{posto.name}</p>
                        <p className={`text-[10px] ${posto.status === "offline" ? "text-red-400" : "text-slate-400"}`}>{posto.staff}</p>
                      </div>
                      <span className={posto.status === "offline" ? "text-slate-300" : "text-emerald-500"}>●</span>
                    </div>
                  ))}
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
              <span className="text-xs text-slate-400 font-medium">{casesList.length} registros encontrados</span>
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
                  {casesList.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50">
                      <td className="p-4 text-blue-600 dark:text-blue-400 font-bold">{item.id}</td>
                      <td className="p-4">{item.name.substring(0, 2)}******</td>
                      <td className="p-4">{item.cpf.substring(0, 3)}*.***.**4-**</td>
                      <td className="p-4">
                        <span className="bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 px-2.5 py-0.5 rounded-full border border-blue-100 dark:border-blue-900/30 text-[10px] font-bold">
                          {item.syndrome}
                        </span>
                      </td>
                      <td className="p-4">{item.unit}</td>
                      <td className="p-4">
                        <button 
                          type="button"
                          onClick={() => handleOpenLock(item)} 
                          className="border border-slate-200 dark:border-neutral-700 px-2.5 py-1 rounded-md text-[11px] hover:bg-slate-50 dark:hover:bg-neutral-800 cursor-pointer flex items-center gap-1"
                        >
                          👁 Visualizar
                        </button>
                      </td>
                    </tr>
                  ))}
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
                <p className="text-xs text-slate-400 mt-0.5">Escalamento de Vigilância Comunitária por Área Crítica</p>
              </div>
            </div>

            <div className="space-y-4">
              {fieldActionsList.map((action) => (
                <div key={action.id} className="bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 rounded-xl p-5 shadow-xs flex flex-col md:flex-row justify-between gap-4 items-start">
                  <div className="space-y-3 w-full md:max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">📍</span>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-neutral-50">{action.location}</h4>
                      <span className="bg-red-50 text-red-600 font-bold px-2 py-0.5 rounded text-[10px] uppercase">{action.severity}</span>
                    </div>
                    
                    <p className="text-xs text-slate-400 font-medium">
                      {action.notifications} notificações recentes • Síndrome: <span className="font-bold text-red-600">{action.syndrome}</span>
                    </p>

                    <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-neutral-800/60 text-blue-700 dark:text-blue-400 px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-100 dark:border-neutral-700">
                      <span>👤 Vigilante Setorial:</span>
                      <span className="text-slate-700 dark:text-neutral-200 font-semibold">{action.vigilanteName}</span>
                    </div>

                    <div className="bg-slate-50 dark:bg-neutral-800 p-3 rounded-lg border border-slate-100 dark:border-neutral-700 font-mono text-[11px] text-slate-600 dark:text-neutral-300 space-y-1">
                      <p>🚨 *ALERTA SANITÁRIO — AGENTES DE SAÚDE*</p>
                      <p>👤 Vigilante Escalado: *{action.vigilanteName}*</p>
                      <p>📍 Microárea: *{action.location} (${action.quadras})*</p>
                      <p>📋 Síndrome predominante: *{action.syndrome}*</p>
                      <p>💬 Foco: {action.focusText}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleSendWhatsApp(action)}
                    className="bg-[#005c53] hover:bg-[#044c45] text-white font-bold text-xs px-4 py-2.5 rounded-lg inline-flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    💬 Chamar Vigilante no WhatsApp
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {isModalOpen && selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl space-y-5">
            
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  🛡️
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Auditoria e Acesso Prontuário</h3>
                  <p className="text-xs text-slate-500 font-medium">Registro do Alerta: {selectedCase.id}</p>
                </div>
              </div>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600 cursor-pointer">✕</button>
            </div>

            {!isAuthenticated ? (
              <>
                <div className="flex gap-3 rounded-xl bg-amber-50/80 p-4 border border-amber-100">
                  <p className="text-xs text-amber-800 font-medium leading-relaxed">
                    ⚠️ <b>Aviso de Privacidade:</b> Esta ação revelará informações nominais do cidadão. Para prosseguir e registrar seu acesso no log de auditoria da LGPD, insira sua senha de gestor.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-500 tracking-wider uppercase">Sua Senha de Gestor</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">🔒</span>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-neutral-200 bg-[#f8fafc] py-3 pl-10 pr-10 text-sm text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none"
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
                  <button onClick={handleCloseModal} className="w-full rounded-xl border border-slate-200 py-3 font-semibold text-sm text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer">
                    Cancelar
                  </button>
                  <button onClick={handleVerifyPassword} className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 py-3 font-semibold text-sm text-white shadow-xs transition-colors cursor-pointer">
                    Autenticar e Desbloquear
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div>
                    <p className="font-bold text-slate-400 uppercase">Nome Completo</p>
                    <p className="text-sm font-bold text-slate-800 mt-0.5">{selectedCase.name}</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-400 uppercase">Data da Entrada</p>
                    <p className="text-sm font-bold text-slate-800 mt-0.5">{selectedCase.date}</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-400 uppercase">CPF Unmasked</p>
                    <p className="text-sm font-bold text-slate-800 mt-0.5">{selectedCase.cpf}</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-400 uppercase">Cartão SUS</p>
                    <p className="text-sm font-bold text-slate-800 mt-0.5">{selectedCase.susCard}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase">Histórico e Evolução Clínica Mapeada</p>
                  <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed font-medium">
                    {selectedCase.details}
                  </p>
                </div>

                <div className="flex justify-end pt-2">
                  <button onClick={handleCloseModal} className="rounded-xl bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 font-semibold text-xs uppercase tracking-wider cursor-pointer">
                    Fechar Prontuário
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}