import { useState } from 'react';
import styles from './purchase.module.css';
import ncoin from '../../assets/shop/ncoin.png'
import CreditCard from '../../components/creditCard/CreditCard';


const Purchase = () => {
    const [selectedDivIndex, setSelectedDivIndex] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [payment,setPayment] = useState(0);
    const [ncoins, setNcoins] = useState(0);

    // const amounts = [500, 1000, 2000, 3000]
    const amounts = [
        {
            amount: 500,
            price: 25
        },
        {
            amount: 1000,
            price: 50
        },
        {
            amount: 2000,
            price: 100
        },
        {
            amount: 3000,
            price: 120
        },
    ];

    const handleSelect = (index) => {
        setSelectedDivIndex(index);
    };

    const handlePayment = () => {
        setPayment(amounts[selectedDivIndex]?.price);
        setNcoins(amounts[selectedDivIndex]?.amount)
        setOpenModal(true);
    };


    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <div className={styles.header}>
                    Purchase
                </div>

                <p>Ncoins after purchase : {amounts[selectedDivIndex]?.amount}</p>

                <div className={styles.amounts}>
                    {amounts.map((amount, index) => (
                        <div
                            key={index}
                            className={`${styles.amount} ${selectedDivIndex === index ? styles.selected : ''}`}
                            data-amount={amount.amount}
                            onClick={() => handleSelect(index)}
                        >
                            <div className={styles.ncoins}>
                                <img src={ncoin} alt="" />
                                {amount.amount}
                            </div>
                            <span>${amount.price}.00</span>
                        </div>
                    ))}
                </div>
                <button onClick={handlePayment}>SELECT</button>
            </div>
                {openModal && <CreditCard price={payment} ncoins={ncoins}/>}
        </div>
    )
}

export default Purchase