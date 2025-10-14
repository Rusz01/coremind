import React from 'react'
import { Border_Light } from '../../../components'
import google from "../../../assets/company_logos/google.svg";

function Google_Login() {
  return (
    <div className='mb-8 cursor-pointer hover:scale-105 transition-transform duration-200'>
      <Border_Light className='!p-0 !rounded-xl'>
        <div className="flex gap-3 pl-1">
          <img src={google} alt="Google logo" className="w-6"  />

        </div>
      </Border_Light>

    </div>
  )
}

export default Google_Login