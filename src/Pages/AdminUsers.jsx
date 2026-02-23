import {useEffect,useState} from "react";
import {toast} from "react-toastify"
import { useAuth } from "../Store/auth";
import {Link} from "react-router-dom";

//Admin User Page
function AdminUsers()
{
 // Use useState() to store the data come from server response
 const [users,setUser]=useState([]); 

 const {API}=useAuth();

 //controller for get all user data
 const getAllUsersData=async()=>{
  try{
  const response=await fetch(`${API}/api/admin/users`,{
    method:"GET",
    credentials:"include", //Allow the browser send the token with fetch() request
  });
   // Network stream
  const data=await response.json();
  if (!response.ok) {
    // yahan toast dikhana better
    toast.error(data.message || "Something went wrong");
    setUser([]); // safe rakho
    return;
  }
  console.log("users",data);
  setUser(data);
  }
  catch(error)
  {
    console.log(error);
  }
 }

//Delete the specific user on delete button
 async function deleteUser(id)
{
 try{
   const response=await fetch(
    `${API}/api/admin/delete/${id}`,
     {
       method:"DELETE",
       credentials:"include",
   },
);
const data=await response.json();
//when response is ok:false
if(!response.ok)
{
    toast.error(data.message);
}
//when response is ok:true
 else if(response.ok)
{
//This method run twice when the delete users
getAllUsersData();
toast.success(data.message);
console.log(data);
}
}
catch(error)
    {
      console.log(error);
    }
}

//This method run only twice once when the page load and after delete or update data
useEffect(()=>{
  getAllUsersData();
},[]);
  return(
    <>
    <section className="admin-users-section">
    <div className="container">
    <h1>Admin User data</h1>    
    </div>    
    <div className="container admin-users">
     <table>
        <thead>
            <tr>
                <th>Name </th>
                <th>Email </th>
                <th>Phone </th>
                <th>Update</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
        {users.map((curUser,index)=>{
        return <tr key={index}>
            <td>{curUser.username}</td>
            <td>{curUser.email}</td>
            <td>{curUser.phone}</td>
            <td><Link to={`/admin/users/${curUser._id}/edit`} className="cool-button">✏️ Edit</Link></td>
            <td><button onClick={()=>deleteUser(curUser._id)}>Delete</button></td>
        </tr>
    })}
        </tbody>
     </table>
    </div>
    </section>
    </>
  )
}
export default AdminUsers;