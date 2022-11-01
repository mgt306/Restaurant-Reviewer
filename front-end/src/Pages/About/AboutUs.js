import React from 'react';

import '../../Styles/AboutUs.css';
import Ahn from "../../Images/Ahn.PNG"
import Derek from "../../Images/Derek.jpg"
import Michael from "../../Images/Michael.jpg"

const AboutUs=()=>{
    return(
        <>
        <wrapper className="wrapper">
        <about>
        <h1 className='h1-about'>About Us</h1>
        <gall className='gallery-about'>
          <a><img src={Ahn} />
            <p></p>
            <artists>Ahn Tran</artists>
            <desc>Description N/A</desc>
          </a>
          <a><img src={Derek} />
            <p></p>
            <artists>Derek Han</artists>
            <desc>Hi all! I'm currently a 4th year CS Student @ NYU. I use he/him/his pronouns. I am avid about motorcycles, mechanical keyboards, and music.</desc>
          </a>
          <a><img src={Michael} />
            <p></p>
            <artists>Foo Bar</artists>
            <desc>Description N/A</desc>
          </a>
        </gall>
      </about>
      <div className = "aboutProj">
          <h2 className='h2-about'>About the Project</h2>
          <p className='p2-about'>
            This project was created for the final project of the CS Level Elective course "Remote Development" at NYU's College of Arts and Sciences. 
             The project was created by a team of 3 students: Ahn Tran, Derek Han, and Michael Foo. The project was created using React, Expres, Node.js, and MongoDB.
          </p>
      </div>
      </wrapper>
      </>
    )
};

export default AboutUs;

