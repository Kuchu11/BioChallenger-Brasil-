import React, { useState } from "react";
import { useNavigate } from "react-router";

interface ConsultationData {
  diagnosis: string;
  prescription: string;
  sickLeaveDays: string;
  forwarding: string;
}

export function DoctorPage() {
  const [form, setForm] = useState<ConsultationData>({
    diagnosis: "",
    prescription: "",
    sickLeaveDays: "",
    forwarding: "",
  });

  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    alert("Atendimento médico finalizado e gravado no prontuário!");
    navigate("/gestao");
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-4xl grid grid-cols-1 gap-6 md:grid-cols-3">
        
        <div className="md:col-span-1 rounded-lg border border-border bg-card p-6 shadow-sm h-fit">
          <h2 className="text-lg font-medium text-foreground border-b border-border pb-2 mb-4">
            Dados da Triagem
          </h2>
          <div className="space-y-3 text-sm">
            <p><strong className="text-muted-foreground">Paciente:</strong> <span className="text-foreground block font-medium">João da Silva</span></p>
            <p><strong className="text-muted-foreground">Idade:</strong> <span className="text-foreground block">42 anos</span></p>
            <p><strong className="text-muted-foreground">P.A.:</strong> <span className="text-foreground block">140x90 mmHg</span></p>
            <p><strong className="text-muted-foreground">F.C.:</strong> <span className="text-foreground block">88 bpm</span></p>
            <p><strong className="text-muted-foreground">Temp.:</strong> <span className="text-foreground block">38.2 °C</span></p>
            <div className="mt-4 p-2 rounded bg-yellow-500 text-black font-medium text-center text-xs uppercase tracking-wider">
              Risco: Urgente
            </div>
          </div>
        </div>

        <div className="md:col-span-2 rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="mb-6 border-b border-border pb-4">
            <h1 className="text-2xl font-medium text-foreground">Atendimento Clínico</h1>
            <p className="text-sm text-muted-foreground mt-1">Evolução do prontuário eletrônico e receituário</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Diagnóstico / Avaliação Clínica</label>
              <textarea
                rows={3}
                value={form.diagnosis}
                onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
                className="w-full rounded-md border border-border bg-input-background px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Prescrição Médica</label>
              <textarea
                rows={4}
                placeholder="Medicamentos, dosagem e via de administração..."
                value={form.prescription}
                onChange={(e) => setForm({ ...form, prescription: e.target.value })}
                className="w-full rounded-md border border-border bg-input-background px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Dias de Atestado</label>
                <input
                  type="number"
                  value={form.sickLeaveDays}
                  onChange={(e) => setForm({ ...form, sickLeaveDays: e.target.value })}
                  className="w-full rounded-md border border-border bg-input-background px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Encaminhamento</label>
                <select
                  value={form.forwarding}
                  onChange={(e) => setForm({ ...form, forwarding: e.target.value })}
                  className="w-full rounded-md border border-border bg-input-background px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="">Nenhum</option>
                  <option value="cardio">Cardiologia</option>
                  <option value="orto">Ortopedia</option>
                  <option value="pedi">Pediatria</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-primary py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none"
            >
              Finalizar Atendimento
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}