# 🔬 SentiNela Saúde

> **Plataforma Integrada de Vigilância Epidemiológica e Inteligência Territorial**  
> Desenvolvido como solução tecnológica para monitoramento ágil de surtos e suporte à Atenção Primária à Saúde (APS).

---

## 💻 Sobre o Projeto

O **SentiNela Saúde** é um ecossistema digital desenvolvido para otimizar o fluxo de captação de dados sintomáticos, triagem clínica e tomada de decisões estratégicas na gestão de saúde pública. Substituindo fluxos manuais por análises territoriais em tempo real, a plataforma conecta a triagem de acolhimento diretamente à gestão epidemiológica municipal.

---

## 🛠️ Arquitetura Funcional do Sistema

O sistema divide-se em três perfis integrados de acesso:

### 1. Fila de Acolhimento & Triagem (Enfermagem)
* **Checklist Sentinela:** Mapeamento imediato de síndromes clínicas divididas em blocos estratégicos (*Febril*, *Respiratório* e *Gastrointestinal*).
* **Integração Territorial:** Coleta e vinculação automatizada de dados pelo Cartão Nacional do SUS, permitindo atualização dinâmica de localização e remapeamento de microáreas críticas por CEP.

### 2. Consultório e Diagnóstico (Médico)
* **Inteligência Territorial Integrada:** O prontuário médico exibe um mapa dinâmico da residência do cidadão com avisos em tempo real indicando se aquela localidade específica enfrenta estabilidade ou risco iminente de surto.
* **Notificação Epidemiológica:** Disparo imediato de alertas clínicos para o painel central da gestão ao identificar padrões suspeitos.

### 3. Painel de Monitoramento Geral (Gestão)
* **Mapa de Calor:** Renderização reativa de focos de contágio geográficos baseados em mapas reais, permitindo navegação fluida e foco interativo por unidade de saúde.
* **Segurança e LGPD:** Anonimização de dados nominais coletivos com acesso restrito e auditado via barreira de autenticação eletrônica (senha de gestor).
* **Ações de Campo Separadas:**
  * **Comunicação Direta:** Disparo automatizado de alertas de prevenção para o WhatsApp dos vigilantes comunitários locais.
  * **Investigação Epidemiológica de Campo:** Modais de autorização assinados eletronicamente para despachar equipes técnicas para busca ativa e controle de surtos.

---

## 🚀 Tecnologias Utilizadas

O ecossistema foi construído utilizando práticas modernas de desenvolvimento web:

* **React** (Componentização reativa e gerenciamento de estados dinâmicos)
* **TypeScript** (Tipagem estática e segurança de compilação)
* **Vite** (Build e Hot Module Replacement ultra veloz)
* **Tailwind CSS** (Estilização utilitária de alta performance e suporte a Dark Mode)
* **React Leaflet / Leaflet** (Renderização e manipulação de mapas geográficos baseados em OpenStreetMap)

---
