import { BrowserRouter, Routes,Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";
import Service from "./Pages/Service.jsx";
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";
import Error from "./Pages/Error.jsx";
import Logout from "./Pages/Logout.jsx";
import AdminLayout from "./Components/layouts/Admin-Layout.jsx";
import AdminUsers from "./Pages/AdminUsers.jsx";
import AdminContacts from "./Pages/AdminContacts.jsx";
import AdminUpdate from "./Pages/AdminUpdate.jsx";
function App(){

return(
<>
<BrowserRouter>
<Navbar/>
<Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/about" element={<About/>}/>
  <Route path="/contact" element={<Contact/>}/>
  <Route path="/service" element={<Service/>}/>
  <Route path="/register" element={<Register/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/logout" element={<Logout/>}/>
  <Route path="*" element={<Error/>}/>
  {/* Nested Route */}
  <Route path="/admin" element={<AdminLayout/>}>
  <Route path="users" element={<AdminUsers/>}/>
  <Route path="contacts" element={<AdminContacts/>}/>
  <Route path="users/:id/edit" element={<AdminUpdate/>}/>
  </Route>
</Routes>
<Footer/>
</BrowserRouter>
</>
)
}
export default App;