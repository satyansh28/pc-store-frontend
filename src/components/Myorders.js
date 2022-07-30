import styles from './Buildpage.module.css'
import { useEffect, useState } from "react";
import Ordercard from './Ordercard';
import { useHistory } from 'react-router-dom';
const backend=process.env.REACT_APP_BACKEND;
const Orderspage=()=>{
    const hist=useHistory();
    const [page,setpage]=useState(1);
    const [items,setitems]=useState([/*{
        user_id:"12345",
        _id:"67890",
        products:[],
        details:{
            name:"Satya",
            mobile:"6386278110",
            address:"Home"
        }
    },
    {
        user_id:"12345",
        _id:"63890",
        products:[],
        details:{
            name:"Satya",
            mobile:"6386278110",
            address:"Home"
        }
    }
*/]);
    const total=(items)=>{
        let t=0;
        console.log(items);
        for(var i of items)
            t+=i.item.price*i.quantity;
        return(t);
    }
    useEffect(()=>{
        fetch(backend+'/myorders',{
            method:"GET",
            credentials:"include",
            headers:{ 'Content-Type': 'application/json' },
        }).then(res=>{
            if(res.status===200)
                return res.json();
            else if(res.status===401)
            {
                hist.push('/login');
                throw new Error();
            }
            else    
            {
                alert("Something went wrong,try again later!")
                throw new Error();
            }
        }).then(res=>setitems(res.orders)).catch(e=>{});
    },[page])
    return(
        <div className={styles.outer}>
            
            <div className={styles.title}>YOUR ORDERS</div>
            <div className={styles.items}>
                {items.map((item)=><li key={item._id}><Ordercard order={item} total={total(item.products)}/></li>)}
            </div>
            <div className={styles.pagination}>
                <div style={{display:"flex"}}><button disabled={page===1} onClick={()=>setpage(p=>(p-1>1?p-1:1))}>{'<<'}</button> <p className={styles.pagenum}> {page} </p> <button disabled={items.length<10} onClick={()=>setpage(p=>p+1)}>{'>>'}</button></div>
            </div>
    
        </div>

    )
}
export default Orderspage;