import React from 'react'
import {Header, ImageSlider} from '../../components'
import Home_Top from './Home_Top'
import Key_Features from './Key_Features'
import HowItWorks from './HowItWorks'
import { FaQuestion } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { IoMdTimer } from "react-icons/io";
import { HiUpload } from "react-icons/hi";
import { RxHamburgerMenu } from "react-icons/rx";

import company_logo from '../../assets/company_logos/company_logo'
import Testimonial from './Testimonial'



function Home() {
  return (
    <div>
      <Header />
      <Home_Top />

      <h2 className='text-4xl font-medium mt-15 mb-10'>Key Features</h2>
      <div className="flex justify-around">
        <Key_Features icon={FaQuestion} title="Ask & Retrieve" description="Query your files. CoreMind finds the answers." />
        <Key_Features icon={FaPen} title="Smart File Editing" description="Get answers to your questions quickly." />
        <Key_Features icon={IoMdTimer} title="Real-Time Summarization" description="Summarize and find key info instantly." />
        <Key_Features icon={IoMdTimer} title="Real-Time Summarization" description="Summarize and find key info instantly." />
      </div>

      <h2 className='text-4xl font-medium mt-15 mb-10'>How It Works</h2>
      <div className="flex justify-around">
        <HowItWorks icon={HiUpload} title="Connect Files" />
        <HowItWorks icon={FaQuestion} title="Ask Questions" />
        <HowItWorks icon={RxHamburgerMenu} title="Get Smart Results" />
      </div>

      <hr className="border-t border-custom-blue my-15" />


      <h2 className='text-4xl font-medium mt-15 mb-5'>Trusted Integrations</h2>

        <div className="flex overflow-hidden md:p-5  mb-15"> 
          <div className="auto-scroll flex justify-around">
          {company_logo.map((data, index) => (
            <ImageSlider key={index} imgLink={data.img} imgAlt={data.alt} />
          ))}
          </div>
        </div>

        <Testimonial />


    </div>
  )
}

export default Home