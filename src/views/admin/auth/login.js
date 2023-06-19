import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'

const LoginView = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [AllowSubmit, setAllowSubmit] = useState(false)
    
    const submitHandler = (e) =>{
        e.preventDefault()
        if (email.length === 0){
            toast.error("Email field should not be empty.")
        } else {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
                toast.success("Logged in successfully.")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorMessage)
            });
        }
    }

    useEffect(() => {
        if(password.length >= 8){
            setAllowSubmit(true)
        } else {
            setAllowSubmit(false)
        }
    }, [password])
    
    
  return (
    <div className='bg-primaryDark h-screen'>
        <div className='fixed bg-white rounded-md p-5 w-[300px] md:w-[500px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <img src='/assets/logo.png' alt='Kadam Myagdi' className='w-[250px] mx-auto'/>
            <h1 className='text-center text-2xl font-bold my-2'>Login to Admin Portal</h1>
            <form>
                <div className='mb-2'>
                    <label>Email</label>
                    <input type='text' name='email' className='bg-transparent rounded-md p-2 w-full border-2 border-primaryDark' onChange={(e) => setemail(e.target.value)}></input>
                </div>
                <div className='mb-2'>
                    <label>Password</label>
                    <input type='password' name='password' className='bg-transparent rounded-md p-2 w-full border-2 border-primaryDark' onChange={(e) => setpassword(e.target.value)}></input>
                </div>
                <button 
                    className='bg-primaryD px-5 py-2 rounded-md text-white my-2 hover:bg-primaryDark cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-700'
                    onClick={submitHandler}
                    disabled={!AllowSubmit}
                >Login</button>
            </form>
        </div>
    </div>
  )
}

export default LoginView