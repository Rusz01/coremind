import React from 'react'
import { Border_Light } from '../../../components'
import github from "../../../assets/company_logos/github.svg";
import { auth, githubProvider, signInWithPopup } from '../../../firebase/firebase';
import { ensureUserDoc } from '../../../utils/ensureUserDoc';
import { useNavigate } from 'react-router-dom';

function Github_Login() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { user } = await signInWithPopup(auth, githubProvider);
      await ensureUserDoc(user);
      navigate("/chat");
    } catch (e) {
      console.error("GitHub sign-in error:", e);
      alert(e?.message || "GitHub sign-in failed");
    }
  };

  return (
    <button className='mb-8 cursor-pointer hover:scale-105 transition-transform duration-200' onClick={handleLogin}>
      <Border_Light className='!p-0 !rounded-xl'>
            <div className="flex gap-3 pl-1">
               <img src={github} alt="Github logo" className="w-6" />

            </div>
         </Border_Light>

      </button>
   )
}

export default Github_Login