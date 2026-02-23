import { NavLink,Outlet,Navigate } from "react-router-dom";
import { LiaUserSolid } from "react-icons/lia";
import { GrContact } from "react-icons/gr";
import { CiViewList } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { useAuth } from "../../Store/auth";
function AdminLayout()
{ 
  const {user,isLoading}=useAuth();
  console.log("Admin Layout",user);

  if(isLoading)
  {
    return<h1>Loading ....</h1>
  }

  if(!user.isAdmin)
  {
    return <Navigate to="/"/>;
  }
     return( 
     <> 
     <headers>
      <div className="container">
      <nav>
      <ul> 
        <li><NavLink to="/admin/users"><LiaUserSolid />Users</NavLink></li>
        <li><NavLink to="/admin/contacts"><GrContact />Contacts</NavLink></li>
        <li><NavLink to="/service"><CiViewList />Services</NavLink></li>
        <li><NavLink to="/"><FaHome />Home</NavLink></li>
      </ul>
      </nav>
      </div>
     </headers>
     {/* For using Nested Route */}
     <Outlet/>
     </>
     );
}
export default AdminLayout;