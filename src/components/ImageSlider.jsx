import React from 'react'

function ImageSlider({imgLink, imgAlt}) {
  return (
      <img className='h-10 md:h-13 lg:h-21 rounded-lg mx-1 md:mx-10 p-2 hover:scale-105 transition-transform' src={imgLink} alt={imgAlt} />
  )
}

export default ImageSlider