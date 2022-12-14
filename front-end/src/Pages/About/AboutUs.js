import React from 'react';

import '../../Styles/AboutUs.css';
import Ahn from "../../Images/Ahn.PNG"
import Derek from "../../Images/Derek.PNG"
import Michael from "../../Images/Michael.jpg"
import '../../Styles/AboutUs.css';

const AboutUs=()=>{
    return(
      <div className='row'>
        <div className='col'>
          
          <div className='gallery-about'>
            <h1 className='h1-about text-center'>About Us!</h1>
          <a><img src={Ahn} alt="anh"/>
            <p></p>
            <h3 className='text-center'>Anh Tran</h3>
            <desc className='text-center'>Hello! I'm currently a 4th year CS Student @ NYU. I use he/him/his pronouns. I love photography and boxing!</desc>
          </a>
          <a><img src={Derek} alt="Derek" />
            <p></p>
            <h3 className='text-center'>Derek Han</h3>
            <desc className='text-center'>Hi all! I'm currently a 4th year CS Student @ NYU. I use he/him/his pronouns. I am avid about motorcycles, mechanical keyboards, and music.</desc>
          </a>
          <a><img src={Michael} alt="Michael"/>
            <p></p>
            <h3 className='text-center'>Michael Thuo</h3>
            <desc className='text-center'>Hey! I'm currently a 4th year CS Student @ NYU. I use he/him/his pronouns. I enjoy cooking and taking long walks around the city.</desc>
          </a>
          </div>
        </div>
        <div className='col'>
          <div className='aboutProj'>
            <h1 className='h1-about'>About the Project!</h1>
            <p className='p2-about'>This project was created for the final project of the CS Level Elective course "Remote Development" at NYU's College of Arts and Sciences. 
             The project was created by a team of 3 students: Anh Tran, Derek Han, and Michael Thuo. The project was created using React, Express, Node.js, and MongoDB, and deployed on Heroku.</p>
          </div>
        </div>
      </div>
    )
};

export default AboutUs;

