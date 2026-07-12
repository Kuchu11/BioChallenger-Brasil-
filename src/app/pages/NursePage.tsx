import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAttendance } from "../context/AttendanceContext";

export function NursePage() {
  const { addPatientToQueue } = useAttendance();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    bloodPressure: "",
    heartRate: "",
    temperature: "",
    symptoms: "",
    riskLevel: "blue" as "blue" | "green" | "yellow" | "orange" | "red",
  });

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    
    addPatientToQueue({
      name: form.name,
      age: form.age,
      bloodPressure: form.bloodPressure,
      heartRate: form.heartRate,
      temperature: form.temperature,
      symptoms: form.symptoms,
      riskLevel: form.riskLevel,
    });

    alert(`Triagem concluída! ${form.name} foi enviado para a fila.`);
    navigate("/medico");
  }

  return (
    <div className="min-h-screen bg-background dark:bg-neutral-950 p-6 transition-colors duration-200">
      <div className="mx-auto max-w-4xl rounded-lg border border-border dark:border-neutral-800 bg-card dark:bg-neutral-900 p-6 shadow-sm">
        <div className="mb-6 border-b border-border dark:border-neutral-800 pb-4">
          <h1 className="text-2xl font-medium text-foreground dark:text-neutral-50">Triagem e Classificação de Risco</h1>
          <p className="text-sm text-muted-foreground dark:text-neutral-400 mt-1">Identificação e aferição de sinais vitais do paciente</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-foreground dark:text-neutral-200 mb-1">Nome do Paciente</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-md border border-border dark:border-neutral-700 bg-input-background dark:bg-neutral-800 px-3 py-2 text-foreground dark:text-neutral-50 focus:border-primary focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground dark:text-neutral-200 mb-1">Idade</label>
              <input
                type="number"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                className="w-full rounded-md border border-border dark:border-neutral-700 bg-input-background dark:bg-neutral-800 px-3 py-2 text-foreground dark:text-neutral-50 focus:border-primary focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-foreground dark:text-neutral-200 mb-1">P.A. (mmHg)</label>
              <input
                type="text"
                placeholder="120x80"
                value={form.bloodPressure}
                onChange={(e) => setForm({ ...form, bloodPressure: e.target.value })}
                className="w-full rounded-md border border-border dark:border-neutral-700 bg-input-background dark:bg-neutral-800 px-3 py-2 text-foreground dark:text-neutral-50 placeholder-neutral-400 dark:placeholder-neutral-500 focus:border-primary focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground dark:text-neutral-200 mb-1">F.C. (bpm)</label>
              <input
                type="number"
                placeholder="80"
                value={form.heartRate}
                onChange={(e) => setForm({ ...form, heartRate: e.target.value })}
                className="w-full rounded-md border border-border dark:border-neutral-700 bg-input-background dark:bg-neutral-800 px-3 py-2 text-foreground dark:text-neutral-50 placeholder-neutral-400 dark:placeholder-neutral-500 focus:border-primary focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground dark:text-neutral-200 mb-1">Temp. (°C)</label>
              <input
                type="number"
                step="0.1"
                placeholder="36.5"
                value={form.temperature}
                onChange={(e) => setForm({ ...form, temperature: e.target.value })}
                className="w-full rounded-md border border-border dark:border-neutral-700 bg-input-background dark:bg-neutral-800 px-3 py-2 text-foreground dark:text-neutral-50 placeholder-neutral-400 dark:placeholder-neutral-500 focus:border-primary focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground dark:text-neutral-200 mb-1">Queixa Principal / Sintomas</label>
            <textarea
              rows={3}
              value={form.symptoms}
              onChange={(e) => setForm({ ...form, symptoms: e.target.value })}
              className="w-full rounded-md border border-border dark:border-neutral-700 bg-input-background dark:bg-neutral-800 px-3 py-2 text-foreground dark:text-neutral-50 focus:border-primary focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground dark:text-neutral-200 mb-2">Classificação de Risco (Manchester)</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {(["blue", "green", "yellow", "orange", "red"] as const).map((level) => {
                const colors = {
                  blue: "bg-blue-600 text-white",
                  green: "bg-green-600 text-white",
                  yellow: "bg-yellow-500 text-black",
                  orange: "bg-orange-500 text-white",
                  red: "bg-red-600 text-white",
                };
                const isSelected = form.riskLevel === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setForm({ ...form, riskLevel: level })}
                    className={`rounded-md p-3 font-medium text-sm transition-all uppercase cursor-pointer ${colors[level]} ${
                      isSelected ? "ring-4 ring-offset-2 dark:ring-offset-neutral-900 ring-primary scale-105" : "opacity-40 hover:opacity-75"
                    }`}
                  >
                    {level === "blue" && "Não Urgente"}
                    {level === "green" && "Pouco Urgente"}
                    {level === "yellow" && "Urgente"}
                    {level === "orange" && "Muito Urgente"}
                    {level === "red" && "Emergência"}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-primary py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none cursor-pointer"
          >
            Finalizar Triagem e Enviar para o Médico
          </button>
        </form>
      </div>
    </div>
  );
}