import { Navigate, Route, Routes } from "react-router-dom";

import { AppLayout } from "./components/layout/AppLayout";
import { CompaniesPage } from "./pages/companies/CompaniesPage";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { LotsPage } from "./pages/lots/LotsPage";
import { ProjectsPage } from "./pages/projects/ProjectsPage";
import { ProjectDetailPage } from "./pages/projects/ProjectDetailPage";
import { ClientsPage } from "./pages/people/ClientsPage";
import { SalesTeamPage } from "./pages/people/SalesTeamPage";
import { UsersPage } from "./pages/people/UsersPage";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/lots" element={<LotsPage />} />
        <Route path="/people/clients" element={<ClientsPage />} />
        <Route path="/people/sales-team" element={<SalesTeamPage />} />
        <Route path="/people/users" element={<UsersPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
