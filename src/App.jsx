import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Register from "./Users/pages/Register"
import Login from "./Users/pages/Login"
import Home from "./Users/pages/Calendar"
import Layout from "./Users/components/Layout"
import Teams from "./Users/pages/Teams"
import Reserved from "./Users/pages/Reserved"
import Settings from "./Users/pages/Settings"
import Lost from "./Users/pages/P404"

function App() {
  return (
    <Routes>
    <Route path="/" element={<Register/>}/>
    <Route path="*" element={<Lost/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/calendar" element={<Layout Outlet={<Home/>}/>}/>
    <Route path="/teams" element={<Layout Outlet={<Teams/>}/>}/>
    <Route path="/reserved" element={<Layout Outlet={<Reserved/>}/>}/>
    <Route path="/settings" element={<Layout Outlet={<Settings/>}/>}/>
  </Routes>
  )
}

export default App
