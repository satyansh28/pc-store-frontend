import { useState } from 'react';
import styles from './Card.module.css';
import Finalmodal from './Overlay';
import Overlay_Spec from './Overlay_Spec';
const Card=(props)=>{
    const item=props.item;
    const [showspec,setshowspec]=useState(false);
    return(
    <>
    {showspec && !props.iscart?<Finalmodal close={setshowspec}><Overlay_Spec item={item} close={()=>setshowspec(false)}/></Finalmodal>:""}
    <div className={styles.outer+" "+(item.left>0?"":styles.grey)+" "+(props.iscart?styles.iscart:"")}>
        <div className={styles.image}><img src={item.img} height="150px" alt={item.name}/></div>
        <div className={styles.para}>
            <p className={styles.name} onClick={()=>{if(!props.iscart)setshowspec(true)}} >{item.name}</p>
            {item.left>0?"":<h4 className={styles.oos}>Out-of-Stock</h4>}
            <p className={styles.price}>₹{item.price}</p>
            </div>
            <span className={styles.add}><button onClick={()=>props.add(item,1)} disabled={props.iscart?true:false}>+</button>{props.quantity?props.quantity:0}<button onClick={()=>props.add(item,-1)} disabled={props.iscart?true:false}>-</button></span>
    </div></>)
}
export default Card;