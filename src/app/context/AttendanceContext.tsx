import React, { createContext, useContext, useState } from "react";

export interface Patient {
  name: string;
  age: string;
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  riskLevel: "blue" | "green" | "yellow" | "orange" | "red";
  symptoms: string;
}

interface AttendanceContextType {
  queue: Patient[];
  addPatientToQueue: (patient: Patient) => void;
  currentPatient: Patient | null;
  callNextPatient: () => void;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export function AttendanceProvider({ children }: { children: React.ReactNode }) {
  const [queue, setQueue] = useState<Patient[]>([]);
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);

  function addPatientToQueue(patient: Patient) {
    setQueue((prevQueue) => [...prevQueue, patient]);
  }

  function callNextPatient() {
    if (queue.length > 0) {
      // Pega o primeiro da fila (pode ser melhorado por prioridade depois!)
      const next = queue[0];
      setCurrentPatient(next);
      setQueue((prevQueue) => prevQueue.slice(1));
    } else {
      setCurrentPatient(null);
    }
  }

  return (
    <AttendanceContext.Provider value={{ queue, addPatientToQueue, currentPatient, callNextPatient }}>
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