import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import RootLayout from "../pages/admin/Layout";
import NotFound from "../pages/NotFound";
import Spinner from "../components/ui/Spinner";


const DashboardPage = lazy(() => import("../pages/admin/Home"));
const AddQuestions = lazy(()=> import ("../components/admin/forms/AddQuestions"));
//const QuestionsTable = lazy (()=> import("../components/admin/tables/QuestionsTable"));

const Admin = () => {
  return (
    <Suspense fallback={<Spinner />}>
    <Routes>
      <Route path="/" element={<RootLayout />}>
       <Route index element={<DashboardPage />} />
        <Route path="/add-interview-question" element={<AddQuestions />} />
         {/* <Route path="/view-interview-question" element={<QuestionsTable />} /> */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Suspense>
  );
};

export default Admin;
