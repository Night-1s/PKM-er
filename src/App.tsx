import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import TypeRunPage from "@/pages/TypeRunPage";
import MechanicsPage from "@/pages/MechanicsPage";
import PokedexPage from "@/pages/PokedexPage";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/types/:typeId" element={<TypeRunPage />} />
          <Route path="/mechanics" element={<MechanicsPage />} />
          <Route path="/pokedex" element={<PokedexPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}
