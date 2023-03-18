
import { useState,useEffect } from 'react';
import Cookies from 'universal-cookie';
import './App.css';
import Auth from './Components/Auth';
import Upload from './Components/Upload';
import { signOut} from "firebase/auth";
import { auth } from './firebase';
const cookies = new Cookies();

function App() {
  const[isAuth,setisAuth]=useState(cookies.get("auth-token"))
  const[name,setname]=useState("")
  const[photo,setphoto]=useState("")
  const signuserout=async()=>{
    await signOut(auth);
    cookies.remove("auth-token");
    setisAuth(false)
  }

  if(!isAuth){
    return (
      <div>
     <Auth setisAuth={setisAuth}/>
      </div>
    );
  }

  return(
    <div className='app'>
    <div >
 
   
    {/* <a onClick={signuserout}>sign-out</a> */}
    </div>
      <Upload setisAuth={setisAuth}/>
    </div>
  )
 
}

export default App;
