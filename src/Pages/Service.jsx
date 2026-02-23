// import { useAuth } from "../Store/auth";

// function Service(){
//   const { services } = useAuth();
//   console.log(services);
//   return (
//     <section className="section-services">
//       <div className="container">
//         <h1 className="main-heading">Services</h1>
//       </div>
//       <div className="container grid grid-three-cols">
//         {services.map((curElem, index) => {
//             const{provider,service,price,description}=curElem;
//           return (
//             <div className="card" key={index}>
//               <div className="card-img">
//                 <img src="/Images/design.png" alt="designer" width="200" />
//               </div>
//               <div className="card-details">
//                 <div className="grid grid-two-cols">
//                   <p>{provider}</p>
//                   <p>{price}</p>
//                 </div>
//                 <h2>{service}</h2>
//                 <p>{description}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }
// export default Service; 
import { useAuth } from "../Store/auth";

function Service() {
  const { services } = useAuth();
  console.log("Services Data >>>", services);

  // Handle loading or empty state
  if (!services) {
    return (
      <section className="section-services">
        <div className="container">
          <h1 className="main-heading">Services</h1>
          <p>Loading services...</p>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return (
      <section className="section-services">
        <div className="container">
          <h1 className="main-heading">Services</h1>
          <p>No services found.</p>
        </div>
      </section>
    );
  }

  // ✅ Main render after data is loaded
  return (
    <section className="section-services">
      <div className="container">
        <h1 className="main-heading">Services</h1>
      </div>

      <div className="container grid grid-three-cols">
        {services.map((curElem, index) => {
          const { provider, service, price, description } = curElem;
          return (
            <div className="card" key={index}>
              <div className="card-img">
                <img src="/Images/design.png" alt="designer" width="200" />
              </div>

              <div className="card-details">
                <div className="grid grid-two-cols">
                  <p>{provider}</p>
                  <p>{price}</p>
                </div>

                <h2>{service}</h2>
                <p>{description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Service;
