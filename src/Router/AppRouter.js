import { BrowserRouter, Form } from "react-router-dom";
import SetData from "../components/SetData";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route to="/" />
        <Route to="/create" element={<Form />} />
        <Route to="/edit/:id" element={<Form />} />
        <Route to="/target" element={<SetData />} />
        <Route to="/transfer" element={<SetData />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
