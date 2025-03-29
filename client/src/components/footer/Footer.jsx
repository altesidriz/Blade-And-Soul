import styles from './footer.module.css';
import pegi from './assets/footer/pegi.png';
import ncImg from './assets/footer/logo-plaync.png';
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
            <div className={styles.separator}></div>
            <div className={styles.links}>
                <a href="#">Careers</a>
                <a href="#">Legal Documentation</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Cookie Policy</a>
            </div>
            <div className={styles.nc}>
                <div className={styles.logoNc}>
                    <img src={ncImg} alt="" />
                </div>
                <span>&copy; NCSOFT Corporation. All rights reserved.</span>
            </div>
        </div>
    );
};

export default Footer;