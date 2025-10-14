import React from 'react'
import { Border_Light } from '../../../components'
import google from "../../../assets/company_logos/google.svg";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../firebase/firebase';

function Google_Login() {
   const googleProvider = new GoogleAuthProvider();
   const handleLogin = async () => {
     try {
       await signInWithPopup(auth, googleProvider);
     } catch (error) {
       console.error("Error signing in with Google:", error);
     }
   };

   const signupWithGoogle = () => {
     handleLogin();
     signInWithPopup(auth, googleProvider)
   }

  return (
    <div className='mb-8 cursor-pointer hover:scale-105 transition-transform duration-200'>
      <Border_Light className='!p-0 !rounded-xl'>
         <button onClick={signupWithGoogle}>
        <div className="flex gap-3 pl-1">
          <img src={google} alt="Google logo" className="w-6"  />

        </div>
        </button>
      </Border_Light>

    </div>
  )
}

export default Google_Login