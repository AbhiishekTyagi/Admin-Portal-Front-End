// import { createContext,useContext,useState,useEffect } from "react";

// const AuthContext=createContext();

// export const AuthProvider=({ children })=>{

//     //Use State Hooks
//     const [token, setToken] = useState(() => localStorage.getItem("token") || "");
//     const [user,setUser]=useState();
//     const[isLoading,setIsLoading]=useState(true);
//     const[services,setServices]=useState([]);
//     const Authorizationtoken=`Bearer ${token}`;

//     //Get the data from the .env file  
//     const API=import.meta.env.VITE_APP_URI_API;


//     //function to stored the token in local storage access in all Components Globally
//     function storeTokenInLS(serverToken){
//       setToken(serverToken);
//       return localStorage.setItem("token", serverToken);
//     };
 
//    //this is the get the value in either true or false in the original state of token
//   let isLoggedIn = !!token;
//   console.log("token", token);
//   console.log("isLoggedin ", isLoggedIn);

//   //to check whether is loggedIn or not
//   // async function LogoutUser() {
//   //   try {
//   //     await fetch(`${API}/api/users/logout`, {
//   //       method: "POST",
//   //       headers: {
//   //         Authorization: Authorizationtoken,
//   //       },
//   //     });
//   //   } catch (error) {
//   //     console.log("Logout API error", error);
//   //   } finally {
//   //     // ✅ clear frontend state ALWAYS
//   //     setToken("");
//   //     localStorage.removeItem("token");
//   //   }
//   // }
  
//   async function LogoutUser() {
//       try {
//         await fetch(`${API}/api/users/logout`, {
//           method: "POST",
//           headers: {
//             Authorization: Authorizationtoken,
//           },
//         });
//       } catch (error) {
//         console.log("Logout API error", error);
//       } finally {
//         // ✅ clear frontend state ALWAYS
//         setToken("");
//         localStorage.removeItem("token");
//       }
//     }

//   // JWT Authentication- to get the currently loggedIn User data
//    async function userAuthentication()
//   {
//       try{
//           setIsLoading(true);
//           const response=await fetch(`${API}/api/users/user`,{
//           method:"GET",
//           headers: {
//             Authorization: Authorizationtoken,
//           },
//         });
//         // Check the response we get or not 
//         console.log(response);
//         if (response.ok) {
//           const data = await response.json();
//           console.log("user data",data.userData);
//           // our main goal is to get the user data 👇
//           setUser(data.userData);
//           setIsLoading(false);
//         } else {
//          console.error("Error fetching user data");
//          setIsLoading(false);
//         }
//       }
//       catch (error) {
//         console.error("Error fetching user data");
//       }
//   };
//   //To fetch the services data from the dataBase
//   async function getServices()
//   {
//     try{
//       const response=await fetch(`${API}/api/users/service`,{
//        method:"GET",
//        });
//      if(response.ok)
//      {
//        const data=await response.json();
//        console.log(data.msg);
//        setServices(data.msg);
//      }
//     }
//     catch(error)
//     { 
//       console.log(`service frontend error:${error}`);
//     }
//   }
//   //Ensure this method run only once 
//   useEffect(() => {
//     if (!token) {
//       // no token → no need to call API
//       return;
//     }
//     getServices();
//     userAuthentication();
//   }, [token]);

//     return(
//       <AuthContext.Provider value={
//         {
//         storeTokenInLS,
//         isLoggedIn,
//         LogoutUser,
//         user,
//         services,
//         Authorizationtoken,
//         isLoading,
//         API,
//         }}>
//       {children}
//       </AuthContext.Provider>
//     );
// };

// //Context Hook
// export const useAuth= () =>{
//     const authContextValue = useContext(AuthContext);
//     if (!authContextValue) {
//       throw new Error("useAuth used outside of the Provider");
//     }
//     return authContextValue;
//   };
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const API = import.meta.env.VITE_APP_URI_API;

  // CHECK USER AUTH (COOKIE BASED)
  async function userAuthentication() {
    try {
      const response = await fetch(`${API}/api/users/user`, {
        method: "GET",
        credentials: "include", // ✅ IMPORTANT
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  }

  // ✅ LOGOUT (COOKIE BASED)
  async function LogoutUser() {
    try {
      await fetch(`${API}/api/users/logout`, {
        method: "POST",
        credentials: "include", // ✅ send cookies with fetch() allow the browser
      });
    } catch (error) {
      console.log("Logout API error", error);
    } finally {
      setUser(null);
      setIsLoggedIn(false);
    }
  }

  // ✅ FETCH SERVICES (PUBLIC)
  async function getServices() {
    try {
      const response = await fetch(`${API}/api/users/service`);
      if (response.ok) {
        const data = await response.json();
        setServices(data.msg);
      }
    } catch (error) {
      console.log("service frontend error:", error);
    }
  }

  //RUN ON APP LOAD
  useEffect(() => {
    userAuthentication();
    getServices();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isLoading,
        services,
        LogoutUser,
        userAuthentication, // ✅ expose this
        API,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// CONTEXT HOOK
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};


