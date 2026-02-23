import { useState,useEffect } from "react";
import {useAuth} from "../Store/auth.jsx";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
export const Contact = () => {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });
 

  const[userData,setUserData]=useState(true);
  // Get this method with custom hook that define in Global Access
  const { user,API }=useAuth();
  const navigate=useNavigate();

  //  That the logic for Automatic fill  login user details like [username,email] on contact page if both true
  useEffect(()=>{
  if(userData && user)
  {
    setContact({
      username:user.username,
      email:user.email,
      message:"",
    });
    setUserData(false);
  }
},[userData,user]);

  // lets tackle our handleInput
  const handleInput = (event) => {
    // Destructuring of object
    const{name,value}=event.target;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  // handle fomr getFormSubmissionInfo
   async function handleSubmit(event){
      event.preventDefault();
    // when we connect with database
    try
        {
          const response=await fetch(`${API}/api/users/contact`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            credentials: "include", // ✅ REQUIRED FOR COOKIES
            body:JSON.stringify(contact),
          });
          const res_data=await response.json();
          console.log("Response from Server Message:",res_data.message);
          console.log("Response from Server Path:",res_data.extraDetails);
          if(response.ok)
          {
            //console.log(`Response from Server:${JSON.stringify(res_data)}`);
            toast.success(`${res_data.message}\n\n${res_data.extraDetails}`);
            //Make the JSON Empty
             setContact({username:"", email:"", message:""});
             //Navigate through Login page directly
             navigate("/");
          }
          else{
            toast.error(`${res_data.message}\n\n${res_data.extraDetails}`);
          }
        }
        catch(error)
        {
            console.log("Contact",error);
        }
    }
  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Contact us</h1>
        </div>
        {/* contact page main  */}
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img 
            src="/Images/support.png"
            alt="We are always ready to help"
            width="400"
            height="400"
            />
          </div>

          {/* contact form content actual  */}
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={contact.username}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={contact.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="message">message</label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  value={contact.message}
                  onChange={handleInput}
                  required
                  cols="30"
                  rows="6"
                ></textarea>
              </div>

              <div>
                <button type="submit">submit</button>
              </div>
            </form>
          </section>
        </div>

        <section className="mb-3">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.8567987967344!2d77.44301787571995!3d28.634053675663953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cee22c60837b7%3A0x7c35343eceb7bde0!2sABES%20Engineering%20College!5e0!3m2!1sen!2sin!4v1764672618034!5m2!1sen!2sin"
          width="100%"
          height="450"
          allowFullscreen=""
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </section>
      </section>
    </>
  );
};
export default Contact;