import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from "react-router-dom"
import { AppProvider } from "./utils/AppContext"
import Navigation from './components/Navigation.jsx'
import AnimatedRoutes from './components/AnimatedRoutes'

import './App.css'

function App() {
  return (
    <div >
      <AppProvider value={{}}>
        <Navigation />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </AppProvider>
    </div>
  )
}

export default App