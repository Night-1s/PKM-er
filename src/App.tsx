import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import Dashboard from "@/pages/Dashboard";
import RecordPage from "@/pages/RecordPage";
import MechanicsPage from "@/pages/MechanicsPage";
import PokedexPage from "@/pages/PokedexPage";
import AbilitiesPage from "@/pages/AbilitiesPage";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/runs/:recordId" element={<RecordPage />} />
          <Route path="/mechanics" element={<MechanicsPage />} />
          <Route path="/pokedex" element={<PokedexPage />} />
          <Route path="/abilities" element={<AbilitiesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}
