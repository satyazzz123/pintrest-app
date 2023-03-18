import { useState, useEffect } from "react";
import {auth,provider,db} from '../firebase';
import { addDoc, collection } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
  deleteObject 
} from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css';
import { signOut} from "firebase/auth";
import Cookies from 'universal-cookie';

import { BsCloudUpload } from 'react-icons/bs'

import { FiLogOut } from 'react-icons/fi'
const cookies = new Cookies();
export default function Upload(props) {
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const[name,setname]=useState("");
    const[photo,setphoto]=useState("");
  
    const {setisAuth}=props
  
    // const imageRef1 = ref(storage, `images/${imageUpload.name + v4()+" "+auth.currentUser.displayName}`);
    const imagesListRef = ref(storage, "images/");
    const uploadFile =async () => {
      if (imageUpload == null) return;
      const imageRef = ref(storage, `images/${imageUpload.name + v4()+" "+auth.currentUser.displayName}`);
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrls((prev) => [...prev, url]);
         
    
        });
   
        
      });
      const postscollectionref=collection(db,"posts")
      await addDoc(postscollectionref,{url:imageUrls,id:auth.currentUser.uid})
      
    };
    const signuserout=async()=>{
      await signOut(auth);
      cookies.remove("auth-token");
      setisAuth(false)
    }
    const deleteentry=async ()=>{
      const imageRef = ref(storage, `images/${imageUpload.name + v4()+" "+auth.currentUser.displayName}`);
      await deleteObject(imageRef).then(()=>{
        alert("deleted successfully")
      }
      
      )
      
    }
  
    useEffect(() => {
      listAll(imagesListRef).then((response) => {
        
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImageUrls((prev) => [...prev, url]);
            setname(auth.currentUser.displayName);
            setphoto(auth.currentUser.photoURL)
          });
        });
      });
    }, []);
  return (
    <div id="upload" >
      <div className="dashboard">Welcome {name} <a onClick={signuserout}><FiLogOut/>Logout</a></div>
    <form action="">
  <label htmlFor="files">
  <input
  id="files"
      type="file"
    
      onChange={(event) => {
        setImageUpload(event.target.files[0]);}}/>
    
        <div id="icon" >  <BsCloudUpload/> </div>
        <div>Uplaod your pics here</div>
  </label>
    <a onClick={uploadFile} style={{ fontSize:"5.2rem"}} > <BsCloudUpload/></a>
    </form>
    <div className="image_grid">
    {imageUrls.map((url) => {
          
          return( 
          <>
        <Zoom>
        <div className="img_wrap">
         
          <img src={url} className="image_display" />
         
          </div>
        </Zoom>
        
      
         
            
          </>
        
          
          )
        })}
    </div>
  
  </div>
  )
}
