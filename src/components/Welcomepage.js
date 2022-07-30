import { NavLink } from 'react-router-dom';
import styles from './Welcomepage.module.css';
const Welcomepage=()=>{
    return(<div className={styles.outer}>
        <div className={styles.inner}>
            <NavLink className={styles.card+" "+styles.grow} to='/build'>Build a PC</NavLink>
            <NavLink className={styles.card+" "+styles.grow} to='/shop'>Hunt for parts.</NavLink>
        </div>
    </div>);
}
export default Welcomepage;