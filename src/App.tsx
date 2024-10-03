import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterForm from "./comonents/RegisterForm/RegisterForm.tsx";
import LoginForm from "./comonents/LoginForm/LoginForm.tsx";
import { FC } from "react";
import WelcomePage from "./pages/WelcomePage.tsx";
import MainPage from "./pages/MainPage.tsx";
import ContestPage from "./pages/ContestPage.tsx";
import { Provider } from "react-redux";
import store from "./services/store/store.ts";

const App: FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/main/contest/:id" element={<ContestPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
