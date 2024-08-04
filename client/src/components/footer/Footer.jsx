import styles from './footer.module.css';
import pegi from '../../assets/footer/pegi.png';
import { FaFacebookF, FaYoutube, FaTwitch } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.social}>
                <span><FaFacebookF size={40} /></span>
                <span><FaInstagram size={40} /></span>
                <span><FaXTwitter size={40} /></span>
                <span><FaTwitch size={40} /></span>
                <span><FaYoutube size={40} /></span>
            </div>
            <div className={styles.pegi}>
                <img src={pegi} alt="" />
                <span>PROVISIONAL</span>
            </div>
        </div>
    );
};

export default Footer;