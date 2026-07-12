import React, { createContext, useContext, useState } from "react";

export interface Patient {
  name: string;
  cpf: string;
  susCard: string;
  symptomsList: string[];
  symptoms: string;
  riskLevel: "blue" | "green" | "yellow" | "orange" | "red";
  arrivalInterv?: string;
  syndromeLabel?: string;
}

interface AttendanceContextType {
  queue: Patient[];
  addPatientToQueue: (patient: Patient) => void;
  currentPatient: Patient | null;
  setCurrentPatient: (patient: Patient | null) => void;
  removePatientFromQueue: (name: string) => void;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export function AttendanceProvider({ children }: { children: React.ReactNode }) {
  const [queue, setQueue] = useState<Patient[]>([
    {
      name: "Maria Aparecida Santos",
      cpf: "342.891.020-15",
      susCard: "7081 2034 9871",
      symptomsList: ["Febre Alta", "Dor de Cabeça", "Dor no Corpo"],
      symptoms: "Paciente relata que voltou de viagem ao Nordeste há 5 dias. Febre iniciou ontem à noite, 38.9°C.",
      riskLevel: "red",
      arrivalInterv: "08:14",
      syndromeLabel: "Síndrome Febril"
    },
    {
      name: "João Carlos Oliveira",
      cpf: "123.456.789-00",
      susCard: "7043 1122 3344",
      symptomsList: ["Tosse", "Coriza"],
      symptoms: "Sintomas respiratórios leves há 3 dias. Sem falta de ar.",
      riskLevel: "yellow",
      arrivalInterv: "08:31",
      syndromeLabel: "Síndrome Respiratória"
    },
    {
      name: "Ana Paula Ferreira",
      cpf: "987.654.321-11",
      susCard: "7050 9988 7766",
      symptomsList: ["Diarreia", "Dor Abdominal"],
      symptoms: "Paciente com episódios de diarreia desde a manhã de hoje.",
      riskLevel: "green",
      arrivalInterv: "08:47",
      syndromeLabel: "Síndrome GI"
    },
    {
      name: "Roberto Mendes Lima",
      cpf: "456.123.789-22",
      susCard: "7001 5566 4433",
      symptomsList: ["Febre Alta", "Falta de Ar", "Vômito"],
      symptoms: "Quadro agudo com desconforto respiratório importante e náuseas.",
      riskLevel: "red",
      arrivalInterv: "09:02",
      syndromeLabel: "Síndrome Mista"
    }
  ]);

  const [currentPatient, setCurrentPatient] = useState<Patient | null>(queue[0]);

  function addPatientToQueue(patient: Patient) {
    const now = new Date();
    const timeString = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    
    const formattedPatient = {
      ...patient,
      arrivalInterv: timeString,
      syndromeLabel: patient.riskLevel === "red" || patient.riskLevel === "orange" ? "Síndrome Mista" : "Síndrome Febril"
    };

    setQueue((prev) => [...prev, formattedPatient]);
    if (!currentPatient) {
      setCurrentPatient(formattedPatient);
    }
  }

  function removePatientFromQueue(name: string) {
    setQueue((prev) => {
      const updated = prev.filter((p) => p.name !== name);
      if (currentPatient?.name === name) {
        setCurrentPatient(updated.length > 0 ? updated[0] : null);
      }
      return updated;
    });
  }

  return (
    <AttendanceContext.Provider value={{ queue, addPatientToQueue, currentPatient, setCurrentPatient, removePatientFromQueue }}>
      {children}
    </AttendanceContext.Provider>
  );
}

export function useAttendance() {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error("useAttendance deve ser usado dentro de um AttendanceProvider");
  }
  return context;
}