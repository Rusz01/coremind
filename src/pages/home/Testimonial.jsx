import React, { useState } from 'react'
import { Border_Light } from '../../components'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Testimonial() {
    const testimonials = [
    {
      quote: "CoreMind has saved our team hours every week. From pulling meeting summaries to editing reports on the fly, it’s like having an AI project assistant 24/7.",
      name: "Priya Sharma",
      title: "Senior Project Manager, Vertex Corp",
    },
    {
      quote: "The automation features are a game-changer. We’ve cut down so much repetitive work.",
      name: "James Lee",
      title: "Operations Lead, NovaTech",
    },
    {
      quote: "It feels like my productivity has doubled. I can’t imagine managing projects without it.",
      name: "Maria Gonzalez",
      title: "Product Owner, Horizon Systems",
    },
  ];

  const [current, setCurrent] = useState(0);

  const prevTestimonial = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  return (
    <div>
      <Border_Light>
         <div className='relative p-10 text-center gap-5 flex flex-col'>
         <h2 className='text-2xl font-bold'>Testimonial</h2>
         <p className='italic text-lg text-white px-10'>“{testimonials[current].quote}”</p>
         <p>- {testimonials[current].name}, {testimonials[current].title}</p>


        <button onClick={prevTestimonial} className='absolute left-5 top-1/2 transform -translate-y-1/2 transition-all duration-200 hover:scale-105 hover:cursor-pointer'>
          <IoIosArrowBack className='text-white w-12 h-12' />
        </button>
        <button onClick={nextTestimonial} className='absolute right-5 top-1/2 transform -translate-y-1/2 transition-all duration-200 hover:scale-105 hover:cursor-pointer'>
          <IoIosArrowForward className='text-white w-12 h-12' />
        </button>
         </div>

         
      </Border_Light>

    </div>
  )
}

export default Testimonial