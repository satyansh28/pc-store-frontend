import { TextField ,Checkbox,Button,Drawer, FormControl, FormLabel, RadioGroup,FormControlLabel,Radio } from "@mui/material";
import { useEffect, useState } from "react";
import styles from './Sidemenu.module.css';
/*          sort:"",
            type:pages[page],
            min_price:"",
            max_price:"",
            eoos:"", 
*/
const Filters=(props)=>{
  const max=1000000;
  const setfilter=props.setfilter;
  console.log(props.query);
    const sort=()=>{
        return(<li key="sort">
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group"><b>Sort-by</b></FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={props.filter.sort}
              onChange={(e)=>setfilter((p)=>{return({...p,sort:e.target.value})})}
            >
              <FormControlLabel value="default" control={<Radio />} label="Default" />
              <FormControlLabel value="newest" control={<Radio />} label="Newest" />
              <FormControlLabel value="price-high" control={<Radio />} label="Price:High>Low" />
              <FormControlLabel value="price-low" control={<Radio />} label="Price:Low>High" />
            </RadioGroup>
          </FormControl>
        </li>)
    }
    const exclude=()=>{
      return(<li key="exclude">
        <FormControlLabel control={<Checkbox checked={props.filter.exclude==="1"?true:false} onChange={()=>setfilter((prev)=>{return{...prev,exclude:(prev.exclude==="1"?"0":"1")}})}/>} label="Exclude out-of-stock" />
      </li>)
    }
    const price=()=>{
      return(<li key="price" className={styles.prices}>  
        <FormLabel id="price-range"><b>Price:<br/></b></FormLabel>
        <TextField  value={props.filter.min_price} id="min" className={styles.inputs} onChange={(e)=>
          setfilter((prev)=>{return({...prev,min_price:(e.target.value)})})
        } size="small" label="Min" variant="outlined" />
        <TextField value={props.filter.max_price} id="max" className={styles.inputs} onChange={(e)=>
        setfilter((prev)=>{return({...prev,max_price:(e.target.value)})})
        } size="small" label="Max" variant="outlined" />  
      </li>)
    }
    const type=()=>
      {
        const types=["CPU","Motherboard","GPU","Memory","Storage","Thermal_paste","CPU_cooler","PSU","Cabinet"];
        return(<li key="type">
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group"><b>Type:</b></FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={props.filter.type}
              onChange={(e)=>setfilter((p)=>{return({...p,type:e.target.value})})}
            >
              {types.map(type=><FormControlLabel key={type} value={type} control={<Radio />} label={type.replace("_"," ")} />)}
            </RadioGroup>
          </FormControl>
        </li>)
    }
  
    const arr={"Sort-by":sort,"Price":price,"Exclude out-of-stock":exclude,"Type":type};
    return(<div className={styles.inside}>
    {props.opt.map(x=>arr[x]())}</div>);
}
const Sidemenu=(props)=>{
    const [open,setopen]=useState(false);
    const [filter,setfilter]=useState(props.query);
    useEffect(()=>{setfilter(props.query)},[props.query]);
    const onApply=()=>{
      if(!filter.min_price.match('^[0-9]+$') || !filter.max_price.match('^[0-9]+$'))
      {
        alert("Invalid inputs in price");
        return;
      }
        console.log(filter);
        props.setquery(filter);
        setopen(false);
    };
    return(
    <>
    <Button className={styles.drawbutton} variant="contained" onClick={()=>setopen(true)}><b>FILTERS <i className="fa fa-bars fa-small" aria-hidden="true"></i></b></Button>
    <Drawer
      anchor={'left'}
      open={open}
      onClose={()=>{setopen(false)}}
    >
      <Filters opt={props.opt} filter={filter} setfilter={setfilter}/>
      <div className={styles.right}><Button className={styles.apply} variant="contained" onClick={onApply}>APPLY</Button></div>
      
    </Drawer>
    </>);
}
export default Sidemenu;