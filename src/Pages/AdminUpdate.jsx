import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../Store/auth";
import {toast} from "react-toastify";
function  AdminUpdate()
{
  const [userdata, setData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  //Using params to get the id from the url
  //<Link to={`/admin/users/${curUser._id}/edit`}>

  //useParams() return a object
  const params=useParams();
  //To check what on params
  console.log("params on console",params);
  // Get this method with custom hook that define in Global Access
  const {API}=useAuth(); 
  

 //Update the specific user on delete button
 async function getSingleUserData()
{
 try
 {
   const response=await fetch(
    `${API}/api/admin/users/${params.id}`,
     {
       method:"GET",
       credentials:"include", //Pass the cookie token to the server with fetch()
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
 setData(data);
 toast.success(data);
}
}
catch(error)
    {
      console.log(error);
    }
}

//This method run only once when the page call
useEffect(()=>{
  getSingleUserData();
},[]);

//function to handle the change in input 
function handleChange(event)
{
    const{name,value}=event.target;
    setData({
        ...userdata,
        [name]:value,
    });
}
// To update the data  dynamically in the database
 async function handleSubmit(event)
 {
  event.preventDefault(); //Because form default behaviour to refresh the page  
  try{
    const response=await fetch(`${API}/api/admin/users/update/${params.id}`,
     {
       method:"PATCH",
       headers:{
        "Content-Type":"application/json",
       },
    credentials:"include",
    body:JSON.stringify(userdata),
    });
   if(response.ok)
   {
    toast.success("Update Succesfully");
    }else{
     toast.error("Not updated succesfully");
    }
    }
  catch(error){
    console.log("userUpdate",error);
  }
}
  return(
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Update User Data</h1>
        </div>
    
        <div className="container grid grid-two-cols">
          <section className="section-form">
            <form onSubmit={handleSubmit}>
                {/* Username */}
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={userdata.username}
                  required
                  onChange={handleChange}
                />
              </div>
              {/* Email */}
              <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={userdata.email}
                  required
                  onChange={handleChange}
                />
              </div>
             {/* Message */}
              <div>
                <label htmlFor="message">Phone</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  autoComplete="off"
                  value={userdata.phone}
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <button type="submit">Update</button>
              </div>
            </form>
          </section>
        </div>
        </section>
    </>
    );
}
export default AdminUpdate;