import {useState,useEffect} from "react";
import { useAuth } from "../Store/auth";
import {toast} from "react-toastify";
function AdminContacts()
{
  const[contactData,setData]=useState([]);
  //Get the Gloabal Authoricationtoken from useAuth() context hook method
  const {API}=useAuth();

const getAllContact=async()=>
    {
  try{
    const response=await fetch(`${API}/api/admin/contacts`,
    {
      method:"GET",
      credentials:"include",
    });
    const contactdata=await response.json();
      if (!response.ok) {
        // yahan toast dikhana better
        toast.error(contactdata.message || "Something went wrong");
        setData([]); // safe rakho
        return;
      }
      console.log("Contact",contactdata);
      setData(contactdata);
      }
      catch(error)
      {
        console.log(error);
      }
  }
//Delete the specific user on delete button
async function deleteContactById(id)
{
 try{
   const response=await fetch(
    `${API}/api/admin/delete/contact/${id}`,
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
else
{
toast.success(data.message);
getAllContact();
}
}
catch(error)
    {
      console.log(error);
    }
}

//This method run only once when the page call
useEffect(()=>{
getAllContact();
},[]);

return (
    <>
      <section className="contact-admin-page">
        <div className="contact-admin-header">
          <h1>Admin Contact Data</h1>
          <div className="underline"></div>
        </div>
  
        <div className="contact-grid">
          {contactData.map((curContactData, index) => {
            const { username, email, message } = curContactData;
            return (
              <div key={index} className="contact-card">
                <p className="contact-field"><span>Username:</span> {username}</p>
                <p className="contact-field"><span>Email:</span> {email}</p>
                <p className="contact-field"><span>Message:</span> {message}</p>
                <button className="modern-btn" onClick={()=>deleteContactById(curContactData._id)}>Delete</button>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
export default AdminContacts;