import { RouterProvider } from "react-router";
import { router } from "./app/routes";
import { ThemeToggle } from "./app/components/ThemeToggle";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ThemeToggle />
    </>
  );
}