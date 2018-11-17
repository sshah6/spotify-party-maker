import React from 'react';

const About = () => {

  return (
    <div className="about">
    <h2 id="aboutHeader">We Are Party Potensh!</h2>
    <h4 id="aboutSubHeader">Say hello in person or message us...</h4>
<div>
    <iframe title='iframe' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d778.2317267085714!2d-121.36738567078885!3d38.71948709872492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809b27383700c321%3A0x744f0e3b547b7e3b!2s4213+Abigail+Ct%2C+Antelope%2C+CA+95843!5e0!3m2!1sen!2sus!4v1541470862812" styles={{ width: "600", height: "450", frameborder: "0", style: "border:0"}}></iframe>
    {/* <iframe title='iframe' src="https://www.google.com/maps/embed?pb=4213+Abigail+Ct,+Antelope,+CA+95843/@38.7194871,-121.3673857,19z/data=!3m1!4b1!4m5!3m4!1s0x809b27383700c321:0x744f0e3b547b7e3b!8m2!3d38.7194871!4d-121.3668385" styles={{width: "600", height: "450", frameborder: "0", style: "border:0"}}></iframe> */}
    </div>
    <form id="aboutForm">
      <textarea id="contactComment" name="contactUs" placeholder="Tell us what's up!"> </textarea>
      <input id="contactEmail" type="email" placeholder="Email Address"/>
        <input id="contactSubmit" type="submit"/>

        </form>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>

      </div>

      )
};
export default About;
