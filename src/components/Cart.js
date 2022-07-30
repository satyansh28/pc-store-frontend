
import Card from './Card';
import styles from './Cart.module.css';
const cart=(props)=>{
    
    const items=props.items;
    var total=0;
    for(var item of items)
    {
        total+=item.item.price*item.quantity;
    }
    return(<div className={styles.items}>
        <div className={styles.cut}><button onClick={props.close}><i className="fa fa-times" aria-hidden="true"/></button></div>
        <p className={styles.heading}>{props.isorder?"Your Order":"Your Cart"}</p>
        {items.map((item)=><li key={item.item._id}><Card iscart={true} quantity={item.quantity} item={item.item}/></li>)}
        <div className={styles.total}>Total: ₹{total}</div>
    </div>)
}
export default cart;