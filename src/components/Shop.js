import Sidemenu from "./Sidemenu"
import styles from './Shop.module.css'
import stylesb from './Buildpage.module.css'
import { useRef, useState,useEffect } from "react";
import Card from "./Card";
import Finalmodal from "./Overlay";
import { Button,TextField } from "@mui/material";
import Cart from "./Cart";
import { useHistory } from "react-router-dom";
const backend=process.env.REACT_APP_BACKEND;

const Shop=()=>{
    const default_query={
        sort:"default",
        type:"",
        min_price:"0",
        max_price:"10000000",
        exclude:"0",
        page:1
    };
    const [query,setquery]=useState(default_query);
    const [cart,setcart]=useState([]);
    const [showcart,setshowcart]=useState(false);
    const [render,rerender]=useState(false);
    const [items,setitems]=useState([]);
    const search=useRef(null);
    const hist=useHistory();
    useEffect(()=>{
        let query_string="";
        const keys=Object.keys(query);
        for(let key of keys){
            if(query[key]!=="")
            query_string+=(query_string===""?"":"&")+key+"="+encodeURIComponent(query[key]);
        }
        fetch(backend+'/products?'+(query_string),{
            credentials:"include" ,
            method:"GET"
        }).then(res=>{
            if(res.status===200)
            {
                return(res.json());
            }
            else if(res.status===401)
            {
                hist.replace("/login");
                throw new Error("401");
            }
            else
            { 
                
                alert("An error occured! Try again later");
                throw new Error("400");
            }
        }).then(res=>setitems(res.products))
        .catch(e=>{});
    
       },[query])
        
    const search_click=()=>{
        const text=search.current.value;
        setquery((prev)=>{return({...default_query,search:text})});
    }
    const add_item=(prd,todo)=>{
        let items=cart;
            for(let i=0;i<items.length;i++)
            {
                if(items[i].item._id===prd._id)
                {
                    if(items[i].quantity>=4 && todo===1)
                        return;
                    items[i].quantity+=todo;
                    if(items[i].quantity===0)
                        items.splice(i,1);
                    setcart(items);
                    rerender(p=>!p);
                    return;
                }
            }
            if(todo===1)
            {
                items.push({item:prd,quantity:1});
                setcart(items);
                rerender(p=>!p);
            }
        }
        const get_quantity=(items,id)=>{
            for(let item of items)
            {
                if(item.item._id===id)
                    return(item.quantity);
            }
            return(0);
        }
    const name=useRef(null);
    const address=useRef(null);
    const mobile=useRef(null);
    const [checkout,setcheckout]=useState(false);
    const order=async(items)=>{

        const details={
            name:name.current.value.trim(),
            mobile:mobile.current.value,
            address:address.current.value.trim()
        }
        if(details.name!=="" && details.mobile.match("^[0-9]*$") && details.address!="")
        {
            try{
                fetch(backend+"/order",{
                    method:"POST",
                    headers: { 'Content-Type': 'application/json' },
                    credentials:"include",
                    body:JSON.stringify({details,products:items})
                }).then(res=>{
                    if(res.status===200)
                    {
                        alert('Order placed!');
                        hist.push("/welcome");
                    }
                    else
                        throw new Error(res.status);
                })
                
            }
            catch(e){
                console.log(e);
                alert("Something went wrong please try again later!");
            }
        }
        else{
            alert("Incorrect details");
        }
    }
    const total=(items)=>{
        var t=0;
        for(var item of items)
            t+=item.item.price*item.quantity;
        return(t);
       }
    const back=()=>{
        if(checkout)
            setcheckout(false);
        else
            hist.push("/welcome");
    }
    if(checkout)
    {
    const items=cart;
    return(
        <div className={stylesb.outer}>
        <div className={stylesb.title}>{"Checkout"}</div>
        <p className={stylesb.total+" "+stylesb.details}>ENTER YOUR DETAILS</p>
        <div className={stylesb.form}>
            <TextField inputRef={name} id="outlined-basic" label="Name" variant="filled" />
            <TextField inputRef={mobile} id="outlined-basic" label="Mobile" variant="filled" />
            <TextField inputRef={address} id="outlined-basic" label="Address" multiline={true} variant="filled" />
        </div>
        <p className={stylesb.total}>Total:{total(items)}</p>
        <div className={stylesb.items+" "+stylesb.full}>
            {items.map((item)=><li key={item.item._id}><Card iscart={true} quantity={item.quantity} item={item.item}/></li>)}
        </div>
        
       
        <div className={stylesb.pagination}>
            <button onClick={()=>setcheckout(false)}>Previous</button>
            <button onClick={()=>order(items)}>Confirm</button>
        </div>
        </div>
        );
    }
        else    
    return(
        
    <div className={styles.outer}>
        {showcart?<Finalmodal close={()=>setshowcart(false)}><Cart items={cart} close={()=>setshowcart(false)}/></Finalmodal>:""}
    <div className={styles.top}>
        <Sidemenu opt={["Sort-by",'Exclude out-of-stock','Price','Type']} setquery={setquery} query={query}/>
        <div className={styles.search}><input placeholder="Search..." ref={search}></input><button><i className="fa fa-search" aria-hidden="true" onClick={search_click}/></button></div>
        <Button variant="contained" size="medium" onClick={()=>setshowcart(true)}><b><i className="fa fa-shopping-cart" aria-hidden="true"/> CART</b></Button>
    </div>
    
    <div className={styles.items}>
        {items.map((item)=><li key={item._id}><Card add={add_item} quantity={get_quantity(cart,item._id)} item={item}/></li>)}
    </div>
    <div className={styles.pagination}>
        <button onClick={back}>Previous</button>
        <div style={{display:"flex"}}>
            <button disabled={query.page===1} onClick={()=>setquery(p=>{return{...p,page:(p.page-1)}})}>{'<<'}</button> <p className={styles.pagenum}> {query.page} </p> <button disabled={items.length<10} onClick={()=>setquery(p=>{return{...p,page:(p.page+1)}})}>{'>>'}</button>
        </div>
        <button disabled={!(cart&&cart.length>0)} onClick={()=>setcheckout(true)}>Checkout</button>
    </div>
    
    </div>);
}
export default Shop;