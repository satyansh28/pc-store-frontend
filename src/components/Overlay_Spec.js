import styles from './Specs.module.css';

const Specs=(props)=>{
    const item=props.item;
    const keys=item.specs?Object.keys(item.specs):undefined;
    return(
    <div className={styles.outer}>
        <div className={styles.cut}><button onClick={props.close}><i className="fa fa-times" aria-hidden="true"/></button></div>
        <div className={styles.head}>
            <img src={item.img} alt='product'/>
            <h2>{item.name}</h2>
        </div>    
        <h3>SPECIFICATIONS</h3>
        <table className={styles.specs}>
            <tbody>
                {keys?keys.map((key)=><tr className={styles.border}>
                    <td className={styles.border}>{key.replace("_"," ")}</td>
                    <td className={styles.border}>{item.specs[key]}</td>
                </tr>):<></>}
            </tbody>
        </table>
    </div>)
}
export default Specs;