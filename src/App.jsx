import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./App.css"
import CustomeRoutes from "./routes/CustomRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Provider store={store}>

      <BrowserRouter>
        <CustomeRoutes/>
        <Toaster/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
