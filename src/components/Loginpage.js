import { useContext, useEffect, useRef } from "react";
import {  useHistory } from "react-router-dom";
import Logincontext from "../store/Logincontext.js";
import styles from './Loginpage.module.css';
import gicon from "../imgs/gicon.svg";
import { Button } from "@mui/material";
const backend=process.env.REACT_APP_BACKEND;
const Loginpage=()=>{
    const {loginstate,setloginstate}=useContext(Logincontext);
    //const email=useRef(null);
    //const pwd=useRef(null);
    const hist=useHistory();
    const google=()=>{
        window.open(backend+"/auth/google","_self")
    }
    /*const onLogin=()=>{
        const inputs={
            email:email.current.value,
            password:pwd.current.value
        }
        if(inputs.email.length===0 || !inputs.email.includes('@'))
        {
            alert('Invalid email');
            email.current.value="";
        }
        else if (inputs.password.length<8)
            alert('Password must be atleast 8 characters long');
        else
        {
            console.log(inputs);
            hist.push('/welcome');
        }
        pwd.current.value="";
    }*/
    useEffect(()=>{
        fetch(backend+'/auth/check',{
            credentials:"include" ,
            method:"GET"
          }).then(res=>setloginstate(res.status===200)).catch(e=>{});
    });
    return(
        /*<div className={styles.outer}>
            <h2>SIGN-IN</h2>
            <label>Email</label>
            <input ref={email} type="text"></input>
            <label>Password</label>
            <input ref={pwd} type="password"></input>
            <button className={styles.grow} onClick={onLogin}>Login</button>
            <button onClick={google} className={styles.google+" "+styles.grow}><i className="fa fa-google" aria-hidden="true"/> Sign-in</button>
            <NavLink className={styles.grow} to="/register">Register</NavLink>
        </div>*/
        <div className={styles.outer}>
            <h2>SIGN-IN</h2>
            <Button onClick={google} className={styles.google}><img src={gicon} alt="google-icon" height={"40px"} style={{backgroundColor:"white",marginRight:"5px",borderRadius:"5px"}}/>  Sign-in with Google</Button>
            
        </div>
    );
}
export default Loginpage;