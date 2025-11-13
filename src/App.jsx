import  { Toaster } from 'react-hot-toast';
import CustomeRoutes from './routes/CustomRoutes';
import { Provider } from 'react-redux'
import store from "./redux/store"
import "./App.css"

function App() {

  return (
    <> 
    <Provider store={store}>
      <CustomeRoutes/>
      <Toaster/>
     </Provider> 
      
    </>
  )
}

export default App
