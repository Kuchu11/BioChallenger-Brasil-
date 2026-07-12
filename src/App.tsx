import { RouterProvider } from "react-router";
import { router } from "./app/routes";
import { ThemeToggle } from "./app/components/ThemeToggle";
import { AttendanceProvider } from "./app/context/AttendanceContext";

export default function App() {
  return (
    <AttendanceProvider>
      <RouterProvider router={router} />
      <ThemeToggle />
    </AttendanceProvider>
  );
}