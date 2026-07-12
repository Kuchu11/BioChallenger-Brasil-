import React, { useState } from "react";
import { useNavigate } from "react-router";

export function LoginPage() {
  const navigate = useNavigate();
  
  // Estados para controlar o select de perfil personalizado
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [password, setPassword] = useState("");

  const profiles = [
    { id: "enfermeiro", label: "Enfermeiro(a)", route: "/triagem" },
    { id: "medico", label: "Médico(a)", route: "/medico" },
    { id: "gestor", label: "Gestão", route: "/gestao" },
  ];

  const handleSelectProfile = (label: string) => {
    setSelectedProfile(label);
    setIsDropdownOpen(false);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProfile) {
      alert("Por favor, selecione um perfil de acesso.");
      return;
    }

    // Encontra o perfil selecionado e faz o redirecionamento dinâmico correto
    const currentProfile = profiles.find(p => p.label === selectedProfile);
    if (currentProfile) {
      navigate(currentProfile.route);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-3 font-sans bg-[#f8fafc] dark:bg-neutral-950 transition-colors duration-200">
      
      {/* COLUNA DA ESQUERDA: BANNER INFORMATIVO (Ocupa 1/3 da tela) */}
      <div className="relative hidden md:flex md:col-span-1 bg-gradient-to-b from-[#1b437e] to-[#0f2952] p-10 flex-col justify-between text-white overflow-hidden">
        {/* Efeito Quadriculado de Fundo sutil igual ao Figma */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        {/* Topo do Banner */}
        <div className="space-y-8 z-10">
          <div className="flex items-center gap-2">
            <span className="bg-white/10 border border-white/20 text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase">
              🟢 GOV.BR
            </span>
            <span className="text-white/40 text-xs font-semibold">•</span>
            <span className="text-white/80 text-[11px] font-medium tracking-wide">Ministério da Saúde</span>
          </div>

          <div className="space-y-1.5">
            <p className="text-[10px] font-bold tracking-widest text-blue-300 uppercase">SISTEMA</p>
            <h2 className="text-2xl font-bold tracking-tight">SentiNela Saúde</h2>
          </div>

          <p className="text-xs text-blue-100/70 leading-relaxed font-medium">
            Plataforma integrada de vigilância epidemiológica e registro de triagem para unidades da Atenção Primária à Saúde.
          </p>

          {/* Lista de Vantagens com os marcadores verdes */}
          <ul className="space-y-3.5 pt-4 text-xs font-semibold text-blue-50">
            <li className="flex items-center gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-[10px]">✓</span>
              Triagem epidemiológica em tempo real
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-[10px]">✓</span>
              Integração com Cartão Nacional de Saúde
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-[10px]">✓</span>
              Alertas automáticos de surtos locais
            </li>
          </ul>
        </div>

        {/* Rodapé do Banner */}
        <div className="text-[10px] text-blue-300/60 font-medium z-10">
          © 2026 Ministério da Saúde — DATASUS
        </div>
      </div>

      {/* COLUNA CENTRAL/DIREITA: FORMULÁRIO DE LOGIN (Ocupa 2/3 da tela) */}
      <div className="md:col-span-2 flex flex-col items-center justify-center p-6 relative">
        <div className="w-full max-w-md bg-white dark:bg-neutral-900 border border-slate-200/70 dark:border-neutral-800 rounded-2xl p-8 shadow-xs space-y-6">
          
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-800 dark:text-neutral-50">Acesso ao Sistema</h3>
            <p className="text-xs font-medium text-slate-400">Identifique-se para continuar</p>
          </div>

          {/* Botão Integrado Gov.br */}
          <button
            type="button"
            onClick={() => alert("Redirecionando para a API de autenticação única do Gov.br...")}
            className="w-full bg-[#1351b4] hover:bg-[#0f4192] text-white py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded text-white font-bold">gov.br</span>
            Entrar com Gov.br
          </button>

          {/* Divisor Visual */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-100 dark:border-neutral-800"></div>
            <span className="flex-shrink mx-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">ou acesse com sua credencial institucional</span>
            <div className="flex-grow border-t border-slate-100 dark:border-neutral-800"></div>
          </div>

          {/* Formulário de Credenciais customizado do Figma */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            
            {/* Custom Select Dropdown */}
            <div className="space-y-1.5 relative">
              <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase">Perfil de Acesso</label>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-[#f8fafc] dark:bg-neutral-800 px-3.5 py-3 text-sm text-left text-slate-700 dark:text-neutral-200 font-medium flex items-center justify-between focus:bg-white focus:outline-none"
              >
                <span>{selectedProfile || "Selecione seu perfil..."}</span>
                <span className="text-xs text-slate-400 transition-transform duration-150">
                  {isDropdownOpen ? "▲" : "▼"}
                </span>
              </button>

              {/* Menu suspenso do Dropdown */}
              {isDropdownOpen && (
                <div className="absolute left-0 right-0 mt-1.5 z-30 bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-xl shadow-lg overflow-hidden py-1">
                  {profiles.map((profile) => (
                    <div
                      key={profile.id}
                      onClick={() => handleSelectProfile(profile.label)}
                      className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-neutral-200 hover:bg-slate-50 dark:hover:bg-neutral-700/60 cursor-pointer flex items-center gap-2.5"
                    >
                      <input 
                        type="checkbox" 
                        checked={selectedProfile === profile.label} 
                        readOnly 
                        className="rounded border-slate-300 text-blue-600 h-3.5 w-3.5"
                      />
                      {profile.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Input da Senha */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase">Sua Senha</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  🔒
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-[#f8fafc] dark:bg-neutral-800 py-3 pl-10 pr-4 text-sm text-slate-900 dark:text-neutral-50 focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Botão de Envio Principal */}
            <button
              type="submit"
              disabled={!selectedProfile}
              className="w-full rounded-xl bg-slate-200 text-slate-400 disabled:opacity-70 dark:bg-neutral-800 dark:text-neutral-500 py-3.5 font-bold text-xs uppercase tracking-wider transition-all disabled:cursor-not-allowed enabled:bg-blue-600 enabled:text-white enabled:hover:bg-blue-700 cursor-pointer mt-2"
            >
              Entrar no Sistema
            </button>
          </form>

        </div>

        {/* Rodapé Restrito */}
        <p className="text-[10px] text-slate-400 font-medium mt-6">
          Acesso restrito a profissionais autorizados pelo DATASUS
        </p>
      </div>

    </div>
  );
}