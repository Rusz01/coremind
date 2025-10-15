import React from 'react'
import { Border_Light } from '../../../components'
import microsoft from "../../../assets/company_logos/microsoft.svg";
import { OAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../firebase/firebase';


function Microsoft_Login() {
  const microsoftProvider = new OAuthProvider('microsoft.com');

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, microsoftProvider);
    } catch (error) {
      console.error("Error signing in with Microsoft:", error);
    }
  };



  return (
    <button className='mb-8 cursor-pointer hover:scale-105 transition-transform duration-200' onClick={handleLogin}>
      <Border_Light className='!p-0 !rounded-xl'>
        <div className="flex gap-3 pl-1">
          <img src={microsoft} alt="Microsoft logo" className="w-6" />

        </div>
      </Border_Light>

    </button>
  )
}

export default Microsoft_Login