import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useLocalStorageState from "use-local-storage-state";
import { Template } from "./component/template/Template.tsx";
import { Header } from "./component/header/Header.tsx";
import CreateTemplateForm from "./component/template/form/CreateTemplateForm.tsx";
import { Templates } from "./component/templates/Templates.tsx";
import EditTemplateForm from "./component/template/form/EditTemplateForm.tsx";
import AddQuestionForm from "./component/question/form/AddQuestionForm.tsx";
import EditQuestionForm from "./component/question/form/EditQuestionForm.tsx";
import { Login } from "./component/auth/Login.tsx";
import { Signup } from "./component/auth/Signup.tsx";
import { store } from "./app/store/store.ts";
import { setAuth } from "./app/slice/authSlice.ts";
import { Profile } from "./component/profile/Profile.tsx";
import { User } from "./component/profile/user/User.tsx";
import { UserTemplates } from "./component/profile/template/UserTemplates.tsx";
import { EditUserForm } from "./component/profile/user/form/EditUserForm.tsx";
import { TemplateResponses } from "./component/responses/TemplateResponses.tsx";
import { UserResponses } from "./component/responses/UserResponses.tsx";
import { Admin } from "./component/admin/Admin.tsx";

function App() {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const [theme] = useLocalStorageState("theme", { defaultValue: "light" });

  if (token && userId) store.dispatch(setAuth({ token, userId }));

  return (
    <>
        <Header />
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Templates />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/template/create" element={<CreateTemplateForm />} />
            <Route path="/template/:templateId" element={<Template />} />
            <Route path="/template/:templateId/edit" element={<EditTemplateForm />} />
            <Route path="/template/:templateId/responses" element={<TemplateResponses />} />
            <Route path="/template/:templateId/question/create" element={<AddQuestionForm />} />
            <Route path="/template/:templateId/question/:questionId/edit" element={<EditQuestionForm />} />
            <Route path="/profile" element={<Profile />}>
                <Route index element={<Navigate to="user" replace />} />
                <Route path="user" element={<User />} />
                <Route path="templates" element={<UserTemplates />} />
                <Route path="responses" element={<UserResponses />} />
            </Route>
            <Route path="/user/edit" element={<EditUserForm />} />
            <Route path="/admin" element={<Admin />} />
        </Routes>
        <ToastContainer theme={theme} />
    </>
  )
}

export default App
