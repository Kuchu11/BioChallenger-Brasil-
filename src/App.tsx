import { RouterProvider } from "react-router";
import { router } from "./app/routes";
import "./app/styles/globals.css";

export default function App() {
  return <RouterProvider router={router} />;
}