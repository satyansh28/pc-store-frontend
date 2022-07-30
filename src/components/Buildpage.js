import Sidemenu from "./Sidemenu"
import styles from './Buildpage.module.css'
import { useEffect, useRef, useState } from "react";
import Card from "./Card";
import Finalmodal from "./Overlay";
import { Button,TextField } from "@mui/material";
import Cart from "./Cart";
import { useHistory } from "react-router-dom";
const backend=process.env.REACT_APP_BACKEND;

const Buildpage=()=>{
    const hist=useHistory();
    const [bcart,setbcart]=useState({
        CPU:[],
        Motherboard:[],
        GPU:[],
        Memory:[],
        Storage:[],
        Thermal_paste:[],
        CPU_cooler:[],
        PSU:[],
        Cabinet:[]
    });
    const search=useRef(null);
    const pages=["CPU","Motherboard","GPU","Memory","Storage","Thermal_paste","CPU_cooler","PSU","Cabinet","Extras","Checkout"];
    const limits=[1,1,1,4,2,1,1,1,1,2];
    const min_limits=[1,1,0,1,1,1,0,1,1,0];
    const default_query={
        sort:"default",
        type:pages[0],
        min_price:"0",
        max_price:"10000000",
        exclude:"0",
        page:1
    };
    const [page,setpage]=useState(0);
    const [showcart,setshowcart]=useState(false);
    const [render,rerender]=useState(false);
    const [items,setitems]=useState([]);
    const [query,setquery]=useState(default_query);
    
   useEffect(()=>{
        if(pages[page]==="Checkout")
            return;
        search.current.value="";
        setquery({...default_query,type:pages[page]});
    },[page]);
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
    
   const total=(items)=>{
    var t=0;
    for(var item of items)
        t+=item.item.price*item.quantity;
    return(t);
   }
    const to_items=(cart)=>{
        const item_keys=Object.keys(cart);
        let items=[];
        for (let key of item_keys){
        items=items.concat(cart[key])
        }
        return(items);
    }
    const search_click=()=>{
        const text=search.current.value;
        setquery((prev)=>{return({...prev,search:text})});
    }
    const get_quantity=(items,id)=>{
        for(let item of items)
        {
            if(item.item._id===id)
                return(item.quantity);
        }
        return(0);
    }
    const add_item=(prd,todo)=>{
        const temp_cart=bcart;
        let items=temp_cart[pages[page]];
        let quant=0;
        for(let item of items)
            quant+=(item.quantity);
        if(quant===limits[page] && todo===1)
            alert("Cannot select more than "+limits[page]+" items");
        else if(quant===0 && todo===(-1))
            return;
        else{
            for(let i=0;i<items.length;i++)
            {
                if(items[i].item._id===prd._id)
                {
                    items[i].quantity+=todo;
                    if(items[i].quantity===0)
                        items.splice(i,1);
                    temp_cart[pages[page]]=items;
                    setbcart(temp_cart);
                    rerender(p=>!p);
                    return;
                }
            }
            if(todo===1)
            {
                items.push({item:prd,quantity:1});
                temp_cart[pages[page]]=items;
                setbcart(temp_cart);
                rerender(p=>!p);
            }
        }
    }
    const check_next=()=>{
        if(pages[page]==="Extras" || bcart[pages[page]].length>=min_limits[page])
            setpage(prev=>{ return(prev+1>=pages.length?prev:prev+1)});
            
    }
    const name=useRef(null);
    const address=useRef(null);
    const mobile=useRef(null);
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
    if(pages[page]==="Checkout")
    {
    const items=to_items(bcart);
    return(
        <div className={styles.outer}>
        <div className={styles.title}>{"Checkout"}</div>
        <p className={styles.total+" "+styles.details}>ENTER YOUR DETAILS</p>
        <div className={styles.form}>
            <TextField inputRef={name} id="outlined-basic" label="Name" variant="filled" />
            <TextField inputRef={mobile} id="outlined-basic" label="Mobile" variant="filled" />
            <TextField inputRef={address} id="outlined-basic" label="Address" multiline={true} variant="filled" />
        </div>
        <p className={styles.total}>Total:{total(items)}</p>
        <div className={styles.items+" "+styles.full}>
            {items.map((item)=><li key={item.item._id}><Card iscart={true} quantity={item.quantity} item={item.item}/></li>)}
        </div>
        
       
        <div className={styles.pagination}>
            <button onClick={()=>setpage(prev=>{ return(prev-1>=0?prev-1:0)})}>Previous</button>
            <button onClick={()=>order(items)}>Confirm</button>
        </div>
        </div>
        );
    }
    else
    return(
    <div className={styles.outer}>
        {showcart?<Finalmodal close={()=>setshowcart(false)}><Cart items={to_items(bcart)} close={()=>setshowcart(false)}/></Finalmodal>:""}
    <div className={styles.title}>{pages[page]}</div>
    <div className={styles.top}>
        <Sidemenu opt={["Sort-by",'Exclude out-of-stock','Price']} setquery={setquery} query={query}/>
        <div className={styles.search}><input placeholder="Search..." ref={search}></input><button onClick={search_click}><i className="fa fa-search" aria-hidden="true"/></button></div>
        <Button variant="contained" size="medium" onClick={()=>setshowcart(true)}><b><i className="fa fa-shopping-cart" aria-hidden="true"/> CART</b></Button>
    </div>
    
    <div className={styles.items}>
        {items.map((item)=><li key={item._id}><Card add={add_item} quantity={get_quantity(to_items(bcart),item._id)} item={item}/></li>)}
    </div>
    <div className={styles.pagination}>
        <button onClick={()=>setpage(prev=>{ return(prev-1>=0?prev-1:0)})}>Previous</button>
        <div style={{display:"flex"}}><button disabled={query.page===1} onClick={()=>setquery(p=>{return{...p,page:(p.page-1)}})}>{'<<'}</button> <p className={styles.pagenum}> {query.page} </p> <button disabled={items.length<10} onClick={()=>setquery(p=>{return{...p,page:(p.page+1)}})}>{'>>'}</button></div>
        <button onClick={()=>check_next()}>Next</button>
        </div>

    </div>
    );
}
export default Buildpage;