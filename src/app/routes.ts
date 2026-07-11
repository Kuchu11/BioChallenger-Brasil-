import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { LoginPage } from "./pages/LoginPage";
import { NursePage } from "./pages/NursePage";
import { DoctorPage } from "./pages/DoctorPage";
import { GestaoPage } from "./pages/GestaoPage";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: LoginPage },
      { path: "triagem", Component: NursePage },
      { path: "medico", Component: DoctorPage },
      { path: "gestao", Component: GestaoPage },
      { path: "*", Component: NotFound },
    ],
  },
]);