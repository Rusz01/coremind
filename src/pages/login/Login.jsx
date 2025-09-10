import React, {useState} from 'react'
import { Border_Card, Header } from '../../components'
import Other_Login from './Other_Login'
import { useParams, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';


import google from '../../assets/company_logos/google.svg'
import microsoft from '../../assets/company_logos/microsoft.svg'

function Login() {

  // Firebase Authentication
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');


  const handleSignUp = async (e) => {
    e.preventDefault();
    try{
      await createUserWithEmailAndPassword(auth, email, password, fullName);
      setMsg('User created successfully!');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      setMsg(errorMessage);
    }
  };


  const handleLogin = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message; 
        console.log(errorCode, errorMessage);
        setMsg(errorMessage);
      });
  };


  // Login or Register

  const { mode } = useParams();      
  const navigate = useNavigate();

  return (
    <div className='pt-10 lg:px-40 lg:max-w-400 mx-auto'>
      <Header />

      <div className="flex justify-center items-center mt-20">
        <div className="md:w-150 ">
          <Border_Card>
            <div className="px-5 py-5">
              <h2 className='text-4xl text-center font-medium mb-10'>{mode}</h2>

              <form className='mt-5 flex flex-col justify-center items-center text-xl' onSubmit={mode === 'Register' ? handleSignUp : handleLogin}>
                {mode === 'Register' && (
                  <input
                    type="text"
                    placeholder="Full Name"
                    className='border border-custom-blue rounded-xl p-2 px-4 w-full mb-6 text-white'
                    onChange={(e) => setFullName(e.target.value)}
                  />
                )}

                <input
                  type="email"
                  placeholder="Email"
                  className='border border-custom-blue rounded-xl p-2 px-4 w-full mb-6 text-white'
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Password"
                  className='border border-custom-blue rounded-xl p-2 px-4 w-full mb-8 text-white'
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={() => navigate('/chat')} type="submit" className='bg-blue-500 text-white p-2 w-50 rounded-4xl cursor-pointer hover:scale-105 transition-transform duration-200'>
                  {mode}
                </button>
              </form>

              {mode === 'Login' ? (
                <>
                  <p className='text-accent-blue text-center text-xl mt-8 font-semibold cursor-pointer hover:scale-105 transition-transform duration-200'>
                    <a href="#">Forgot Password?</a>
                  </p>

                  <p className='text-center text-white text-xl mt-5'>
                    Don't have an account?{" "}
                    <span
                      onClick={() => navigate('/auth/Register')}
                      className='text-accent-blue font-semibold cursor-pointer hover:scale-105 transition-transform duration-200'
                    >
                      Register Now
                    </span>
                  </p>
                </>
              ) : (
                <p className='text-center text-white text-xl mt-5'>
                  Already have an account?{" "}
                  <span
                    onClick={() => navigate('/auth/Login')}
                    className='text-accent-blue font-semibold cursor-pointer hover:scale-105 transition-transform duration-200'
                  >
                    Login Now
                  </span>
                </p>
              )}

              <div className="flex items-center justify-center mt-5 mb-7">
                <hr className='border-white w-2/4' />
                <p className='mx-5'>OR</p>
                <hr className='border-white w-2/4' />
              </div>

              <Other_Login img={google} text="Google" />
              <Other_Login img={microsoft} text="Microsoft" />

              <p className='text-center mt-15'>&copy; {new Date().getFullYear()} CoreMind. All rights reserved.</p>
            </div>
          </Border_Card>
        </div>
      </div>
    </div>
  )
}

export default Login
