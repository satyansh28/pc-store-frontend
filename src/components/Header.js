import styles from './Header.module.css';
import {Button,ClickAwayListener,Menu,MenuItem} from '@mui/material';
import { useState ,useContext, useEffect} from 'react';
import Logincontext from '../store/Logincontext';
import { useHistory } from 'react-router-dom';
const backend=process.env.REACT_APP_BACKEND;

const Header=(props)=>{
    const hist =useHistory();
    const {loginstate,setloginstate}=useContext(Logincontext);
    const[open,setopen]=useState(null);
    const onlogout=async()=>{
        await fetch(backend+'/auth/logout',{
            credentials:"include" ,
            method:"GET"
          })
          .catch(e=>{console.log(e)});
          await setloginstate(false);
          setopen(null);
          hist.push('/login');
    }
    const orders=()=>{
        setopen(null);
        hist.push('/myorders');
    }
    return(<div className={styles.header}>
        <p className={styles.brand}>ss_tech</p>
            
            {!props.state?"":
            <div className={styles.menu}>
            <Button
                id="basic-button"
                aria-controls={Boolean(open) ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(open) ? 'true' : undefined}
                onClick={(event)=>setopen((prev)=>{
                    return(prev===null?event.currentTarget:null)
                })}
            >
            <p><i className="fa fa-user fa-lg"></i> Account</p>
            </Button>
     
            <Menu
                id="basic-menu"
                open={Boolean(open)}
                anchorEl={open}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <ClickAwayListener onClickAway={()=>setopen(null)}><MenuItem onClick={onlogout}>Logout</MenuItem></ClickAwayListener>
                <MenuItem onClick={orders}>Your Orders</MenuItem>
 
            </Menu>
            
            </div>  }
            
         
    </div>);
}
export default Header;