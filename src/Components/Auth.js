import React from 'react';
import {auth,provider} from '../firebase';
import { signInWithPopup } from "firebase/auth";
import { AiFillGoogleCircle} from 'react-icons/ai';
import TypeWriterEffect from 'react-typewriter-effect';
import Cookies from "universal-cookie";
const cookies = new Cookies();
export default function Auth(props) {
    const {setisAuth}=props
    const signinwithgoogle=async()=>{
try {
    const result=  await signInWithPopup(auth,provider)
    cookies.set("auth-token",result.user.refreshToken)
    setisAuth(true)

} catch (error) {
    console.log(error);
}
    }
  return (
    <div className='sign_up'>
     
        <div className="login" id="right">
       <div style={{fontSize:"3.2rem", transform:"translate(0,-7rem)",fontWeight:"bold"}}>
       <TypeWriterEffect
            textStyle={{ fontFamily: 'Red Hat Display',fontSize:"3.8rem" }}
            startDelay={100}
            cursorColor="black"
            text="Join with  us in viewng the adventures of others through eyes of many"
            typeSpeed={80}
   
          />
        
         </div>
       <button onClick={signinwithgoogle} className='login_btn'> <span>< AiFillGoogleCircle style={{transform:"translate(-0.75rem,0.2rem) scale(1.5)"}}/>  Sign in using google</span></button>
        </div>
    </div>
  )
}
