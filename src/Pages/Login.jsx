// import {useState} from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../Store/auth";
// import {toast} from "react-toastify";
// function Login()
// { 
//    //Destructuring the array
// const[user,setUser]=useState({
//     email:"",
//     password:"",
//   });

//   const navigate=useNavigate();
//   // const {storeTokenInLS,API}=useAuth();
//   function handleChange(event)
//    { 
//     const {name,value}=event.target;
//       //Using spread operator
//       setUser((prevUser)=>{
//         return{
//         ...prevUser,
//         [name]:value,
//         }
//       });
//    }
   
//   //Handling the form submission
//       async function handleSubmit(event)
//       {
//         //Prevent the deafult submission when click the button register
//         event.preventDefault();
//         console.log(user);
//         try
//         {
//           const response=await fetch(`${API}/api/users/login`,{
//             method:"POST",
//             headers:{
//                 "Content-Type":"application/json",
//             },
//             credentials: "include",
//             body:JSON.stringify(user),
//           });
//           //convert JSON to Javascript object res_data
//           const res_data=await response.json();
//           console.log("Response from Server:",res_data.message);
//           console.log("Response from Server:",res_data.extraDetails);
//           if(response.ok)
//           {
//             // console.log(`Response from Server:${JSON.stringify(res_data)}`);
//              // Store the token in Local storage
//             // localStorage.setItem("token",res_data.token);
//             //  storeTokenInLS(res_data.token);
//              toast.success("Login Successfull");
//             //Make the JSON Empty
//              setUser({username:" ",email:" "});
//              //Navigate through Home page directly
//              navigate("/");
//           }
//           else{
//           toast.error(`${res_data.message}\n\n${res_data.extraDetails}`);
//           }
//         }catch(error)
//         {
//          console.log("Login",error);
//         }
//       }
//     return(
//       <section>
//        <main>
//         <div className="section-registration">
//             <div className="container grid grid-two-cols">
//               <div className="registration-image">
//              <img 
//              src="/Images/login.png"
//              alt="Login Form on the Screen"
//              width="450"
//              height="450"
//              />
//               </div>
//               {/* let tackle registation form */}
//               <div className="registration-form">
//                 <h1 className="main-heading mb-3">Login form</h1>
//                 <br/>
//                 <form onSubmit={handleSubmit}>
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
//                     <button type="submit" className="btn btn-submit">Login Now</button>
//                 </form>
//               </div>
//             </div>
//         </div>
//        </main>
//       </section>
//     )
// }
// export default Login;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Store/auth";
import { toast } from "react-toastify";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { API, userAuthentication } = useAuth();
  console.log(API);
  // Handle input change
  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Handle form submit (COOKIE BASED)
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(`${API}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ REQUIRED FOR COOKIES
        body: JSON.stringify(user),
      });

      const res_data = await response.json();

      if (response.ok) {
        toast.success("Login successful");
        await userAuthentication();
        // clear form
        setUser({
          email: "",
          password: "",
        });

        // redirect
        navigate("/");
      } else {
        toast.error(
          `${res_data.message}${res_data.extraDetails ? `\n${res_data.extraDetails}` : ""}`
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <section>
      <main>
        <div className="section-registration">
          <div className="container grid grid-two-cols">
            <div className="registration-image">
              <img
                src="/Images/login.png"
                alt="Login Form on the Screen"
                width="450"
                height="450"
              />
            </div>

            <div className="registration-form">
              <h1 className="main-heading mb-3">Login Form</h1>
              <br />

              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    required
                    autoComplete="off"
                    value={user.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    required
                    autoComplete="off"
                    value={user.password}
                    onChange={handleChange}
                  />
                </div>

                <br />
                <button type="submit" className="btn btn-submit">
                  Login Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}

export default Login;