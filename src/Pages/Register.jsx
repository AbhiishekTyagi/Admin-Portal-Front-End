// import {useState} from "react";
// import { useNavigate } from "react-router-dom"; 
// import { useAuth } from "../Store/auth";
// import {toast} from "react-toastify";
// function Register()
// {
// //Destructuring the array
// const[user,setUser]=useState({
//     username:"",
//     email:"",
//     phone:"",
//     password:"",
//   });

//   const navigate= useNavigate();
//   const {API}=useAuth();

//   function handleChange(event)
//    { 
//     //Destructuring the object that was return by event.target
//     const {name,value}=event.target;
//       //Using spread operator
//       setUser((prevUser)=>{
//         return{
//         ...prevUser,
//         [name]:value,
//         }
//       });
//    }
// //    Handling the form submission
//       async function handleSubmit(event)
//       {
//         //Prevent the deafult submission when click the button register
//         event.preventDefault();
//         console.log(user);
//         try
//         {
//           const response=await fetch(`${API}/api/users/register`,{
//             method:"POST",
//             headers:{
//                 "Content-Type":"application/json",
//             },
//             body:JSON.stringify(user),
//           });
//           const res_data=await response.json();
//           console.log("Response from Server:",res_data.message);
//           console.log("Response from Server:",res_data.extraDetails);
          // console.log(response);
//           if(response.ok)
//           {
//             //console.log(`Response from Server:${JSON.stringify(res_data)}`);
//             // Store the token in Local storage
//             // localStorage.setItem("token",res_data.token);
//             // Global Acces of method use
//             //  storeTokenInLS(res_data.token);
//              toast.success("Registration successfull");
//             //Make the JSON Empty
//              setUser({username:" ",email:" ",phone:" ",password:" "});
//              //Navigate through Login page directly
//              navigate("/login");
//           }
//          else
//          {
//           toast.error(`${res_data.message}\n\n${res_data.extraDetails}`);
//          }
//         }
//         catch(error)
//         {
//           console.log("register",error);
//         }
//       }
//     return(
//       <section>
//        <main>
//         <div className="section-registration">
//             <div className="container grid grid-two-cols">
//               <div className="registration-image">
//              <img 
//              src="/Images/register.png"
//              alt="Registration Form on the Screen"
//              width="500"
//              height="500"
//              />
//               </div>
//               {/* let tackle registation form */}
//               <div className="registration-form">
//                 <h1 className="main-heading mb-3">Registration form</h1>
//                 <br/>
//                 <form onSubmit={handleSubmit}>
//                     <div>
//                     <label htmlFor="username">Username </label>
//                     <input
//                     type="text"
//                     name="username"
//                     placeholder="username"
//                     id="username"
//                     required
//                     autoComplete="off"
//                     value={user.username}
//                     onChange={handleChange}
//                     />        
//                     </div>
//                     <div>
//                     <label htmlFor="email">Email </label>
//                     <input
//                     type="email"
//                     name="email"
//                     placeholder="Enter your email"
//                     id="email"
//                     required
//                     autoComplete="off"
//                     value={user.email}
//                     onChange={handleChange}
//                     />        
//                     </div>
//                     <div>
//                     <label htmlFor="phone">Phone </label>
//                     <input
//                     type="number"
//                     name="phone"
//                     placeholder="phone"
//                     id="phone"
//                     required
//                     autoComplete="off"
//                     value={user.phone}
//                     onChange={handleChange}
//                     />        
//                     </div>
//                     <div>
//                     <label htmlFor="password">Password </label>
//                     <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     id="password"
//                     required
//                     autoComplete="off"
//                     value={user.password}
//                     onChange={handleChange}
//                     />        
//                     </div>
//                     <br/>
//                     <button type="submit" className="btn btn-submit">Register Now</button>
//                 </form>
//               </div>
//             </div>
//         </div>
//        </main>
//       </section>
//     )
// }
// export default Register;

import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../Store/auth";
import {toast} from "react-toastify";

function Register()
{
  //Destructuring the array
  const[user,setUser]=useState({
   username:"",
   email:"",
   phone:"",
   password:"",
  });

  const navigate=useNavigate();
  const {API}=useAuth();

  function handleChange(event)
  {
    //Destructuring the object that was return by event.target
    const{name,value}=event.target;
    //Using spread operator
    setUser((prevUser)=>{
    return{
      ...prevUser,
      [name]:value,
    }
    });
  }

async function handleSubmit(event)
{
    //Prevent from Default reloading the page
    event.preventDefault();
    // console.log(user);
    try
    {
    const response= await fetch(`${API}/api/users/register`,
      {
        method:"POST",
        headers:{
         "content-Type":"application/json",
        },
        body:JSON.stringify(user),
      });
      // Response body को JSON → JavaScript object में convert करता है।
    const res_data=await response.json();
    console.log(response);
    if(response.ok)
    {
      toast.success("Registration Succesfull");
      //Make the Json empty again
      setUser({
       username:"",
       email:"",
       phone:"",
       password:"",
      })
      navigate("/login");
    }
    else
    {
     toast.error(`${res_data.message}\n\n${res_data.extraDetails}`)
    }
    }
    catch(error)
    {
       console.log("register",error);
    }
}
  return(
          <section>
           <main>
            <div className="section-registration">
                <div className="container grid grid-two-cols">
                  <div className="registration-image">
                 <img 
                 src="/Images/register.png"
                 alt="Registration Form on the Screen"
                 width="500"
                 height="500"
                 />
                  </div>
              {/* let tackle registration form  */}
              <div className="registration-form">
                 <h1 className="main-heading mb-3">Registration form</h1>
                 <br/>
                 <form onSubmit={handleSubmit}>
                  <div>
                  <label htmlFor="username">Username</label> 
                  <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  id="username"
                  required
                  autoComplete="off"
                  value={user.username}
                  onChange={handleChange}
                  />
                  </div>
                  <div>
                  <label htmlFor="email">Email</label>
                  <input
                  type="email"
                  name="email"
                  placeholder="Enter your Email"
                  id="email"
                  required
                  autoComplete="off"
                  value={user.email}
                  onChange={handleChange}
                  />
                  </div>
                  <div>
                  <label htmlFor="phone">Phone</label>
                  <input
                  type="number"
                  name="phone"
                  placeholder="Enter your Phone number"
                  id="phone"
                  required
                  autoComplete="off"
                  value={user.phone}
                  onChange={handleChange}
                  />
                  </div>
                  <div>
                  <label htmlFor="password">Password</label>
                  <input
                  type="password"
                  name="password"
                  placeholder="Enter your passsword"
                  id="password"
                  required
                  autoComplete="off"
                  value={user.password}
                  onChange={handleChange}
                  />
                  </div>
                  <br/>
                  <button type="submit" className="btn btn-submit">Register Now</button>
                 </form>
                 </div>
                </div>  
               </div>
          </main>
          </section>
  )
}
export default Register;



