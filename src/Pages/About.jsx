import {useAuth} from "../Store/auth.jsx";

function About()
{
  const{ user }=useAuth();
    return(
     <>  
    <main>
     <section className="section-hero">
     <div className="container grid grid-two-cols">

     {/* hero Content */}
     <div className="hero-content">
     <p>Welcome, {user? `${user.username} to our Website`:`to our Website`}</p>
     <h1>Why Choose Us?</h1>
     <p>
       Expertise: Our team consists of experienced IT professionals who are
       passionate about staying up-to-date with the latest industry trends.
     </p>
     <p>
       Customization: We understand that every business is unique. That's why
       we create solutions that are tailored to your specific needs and goals. 
     </p>
     <p>
       Customer-Centric Approach: We prioritize your satisfaction and provide
       top-notch support to address your IT concern.
     </p>
     <p>
       Affordability: We offer Competitive pricing without compromising on the 
       quality of services.
     </p>
     <p>
       Reliability: Count on us to be there when you need us. We're committed
       to ensuring your IT environment is reliable and available 24/7.
     </p>

     <div className="btn btn-group">
     <a href="/contact"><button className="btn">Connect Now</button></a>
     <a href="/services"><button className="btn secondary-btn">Learn More</button></a>
     </div>
     </div>

      {/* hero image */}
      <div className="hero-image">
      <img 
      src="/Images/about.png"
      alt="Coding together"
      width="400"
      height="500"/>
       
      </div>
     </div>
     </section>
    </main>

    {/* Analytics section */}
    <section  className="section-analytics">
     <div className="container grid grid-four-cols">
        {/* div 1 */}
        <div className="div1">
         <h2>50+</h2>
         <p>Company Registers</p>
        </div>
        {/* div 2 */}
        <div className="div1">
         <h2>150+</h2>
         <p>Project Done</p>
        </div>
        {/* div 3 */}
        <div className="div1">
         <h2>250+</h2>
         <p>Happy Clients</p>
        </div>
         {/* div 3 */}
         <div className="div1">
         <h2>650K+</h2>
         <p>Youtube Subscribers</p>
        </div>
     </div>
    </section>
    </>
);
}
export default About;