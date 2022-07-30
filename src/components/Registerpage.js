import { useRef,useEffect,useContext } from "react";
import { NavLink } from "react-router-dom";
import styles from './Loginpage.module.css';
import Logincontext from "../store/Logincontext";
const backend=process.env.REACT_APP_BACKEND;

const Registerpage=()=>{
    const {loginstate,setloginstate}=useContext(Logincontext);
    const email=useRef(null);
    const pwd=useRef(null);
    const name=useRef(null);
    const onRegister=()=>{
        const inputs={
            email:email.current.value,
            password:pwd.current.value,
            name:name.current.value
        }
        if(inputs.name.length===0)
        {
            alert('Name cannot be empty.');
            name.current.value="";
        }
        else if(inputs.email.length===0 || !inputs.email.includes('@'))
        {
            alert('Invalid email');
            email.current.value="";
        }
        else if (inputs.password.length<8)
            alert('Password must be atleast 8 characters long');
        else
        {
            console.log(inputs);
        }
        pwd.current.value="";
    }
    const google=()=>{
        window.open(backend+"/auth/google","_self")
    }
    useEffect(()=>{
        fetch(backend+'/auth/check',{
            credentials:"include" ,
            method:"GET"
          }).then(res=>setloginstate(res.status===200)).catch(e=>{});
    });
    return(
        <div className={styles.outer}>
            <h2>REGISTER</h2>
            <label>Name</label>
            <input ref={name}type="text"></input>
            <label>Email</label>
            <input ref={email} type="text"></input>
            <label>Password</label>
            <input ref={pwd} type="password"></input>
            <button onClick={onRegister}className={styles.grow}>Register</button>
            <button onClick={google} className={styles.google+" "+styles.grow}><i className="fa fa-google" aria-hidden="true"/> Sign-up</button>
            <NavLink className={styles.grow} to="/login">Sign-in</NavLink>
        </div>
    );
}
export default Registerpage;