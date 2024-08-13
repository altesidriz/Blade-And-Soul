import { RotatingLines } from "react-loader-spinner";
import styles from './loading.module.css';

const Loading = () => {
  return (
    <div className={styles.container}><RotatingLines
      strokeColor="orange"
      strokeWidth="5"
      animationDuration="0.75"
      width={'35%'}
      height={'35%'}
      visible={true}
    /></div>
  )
}

export default Loading;