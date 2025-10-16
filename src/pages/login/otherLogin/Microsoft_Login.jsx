import React from 'react'
import { Border_Light } from '../../../components'
import microsoft from "../../../assets/company_logos/microsoft.svg";
import { auth, microsoftProvider, signInWithPopup } from '../../../firebase/firebase';
import { ensureUserDoc } from '../../../utils/ensureUserDoc';
import { useNavigate } from 'react-router-dom';


function Microsoft_Login() {
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const { user } = await signInWithPopup(auth, microsoftProvider);
      await ensureUserDoc(user);
      navigate("/chat");
    } catch (e) {
      console.error("Microsoft sign-in error:", e);
      alert(e?.message || "Microsoft sign-in failed");
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