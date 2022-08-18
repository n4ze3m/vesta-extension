import { Route, Routes } from "react-router-dom";
import AddPage from "./add";

export const Routing = () => (
    <Routes>
      <Route path="/" element={<AddPage />} />
    </Routes>
  )