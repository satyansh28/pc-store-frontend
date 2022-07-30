import { useState } from 'react';
import styles from './Card.module.css';
import Finalmodal from './Overlay';
import Cart from './Cart';
const Ocard=(props)=>{
    const order=props.order;
    
    const [showdetail,setshowdetail]=useState(false);
    return(
    <>
    {showdetail?<Finalmodal close={setshowdetail}><Cart items={order.products} close={()=>setshowdetail(false)} isorder={true}/></Finalmodal>:""}
    <div className={styles.outer}>
        <div className={styles.para}>
            <p className={styles.name} onClick={()=>{setshowdetail(true)}} ><span className={styles.bluefont}>Order ID: </span>{order._id}</p>
            <p className={styles.price}>Total: ₹{props.total}</p>
            <p className={styles.date}>Ordered at:{order.createdAt}</p>
        </div>
    </div></>)
}
export default Ocard;