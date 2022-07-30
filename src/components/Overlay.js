import dom from 'react-dom';
import styles from './Overlay.module.css';
const destination=document.getElementById("overlay");
const Overlay=(props)=>{
    return(<>
    <div className={styles.backdrop} onClick={()=>{props.close(false);console.log("t");}}>
        
    </div>
    <div className={styles.upper}>{props.children}</div>
    </>);
}
const Finalmodal=(props)=>{
    return(<>{dom.createPortal(<Overlay {...props}/>,destination)}</>)
}

export default Finalmodal;