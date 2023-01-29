import React, { useState } from 'react';

const DeliveryFeeCalculator: React.FC = () => {

    const [cartValue, setCartValue] = useState<number>(0);
    const [deliveryDistance, setDeliveryDistance] = useState<number>(1);
    const [amountOfItems, setAmountOfItems] = useState<number>(1);
    const [orderTime, setOrderTime] = useState<Date>(new Date());
    const [deliveryPrice, setDeliveryPrice] = useState<number>(0);



    const calculateDeliveryFee = (e: any) => {
        e.preventDefault();

        console.log("cartvalue==>", cartValue, "deliveryDistance", deliveryDistance, "amountOfItems==>", amountOfItems, "orderTime==>", orderTime)

        let deliveryFee = 0;

        if (cartValue < 10) {
            deliveryFee += 10 - cartValue;
        }

        if (deliveryDistance <= 1000) {
            deliveryFee += 2;
        } else {
            deliveryFee += 2 + Math.ceil((deliveryDistance - 1000) / 500);
        }


        if (amountOfItems >= 5 && amountOfItems < 12) {
            deliveryFee += (amountOfItems - 4) * 0.5;
        } else {
            deliveryFee += (amountOfItems - 4) * 0.5 + 1.2;
        }


        if (orderTime.getUTCHours() >= 15 && orderTime.getUTCHours() <= 19 && orderTime.getUTCDay() === 5) {
            deliveryFee *= 1.2
        }


        if (cartValue >= 100) {
            deliveryFee = 0;
        }

        if (deliveryFee > 15) {
            deliveryFee = 15;
        }

        setDeliveryPrice(deliveryFee);
    }



    return (
        <div className='container'>
            <h1>Checkout</h1>
            <form>
                <div className="input-field">
            <label>
                        Cart value (€)
                <input
                    type="number"
                            min="1"
                            step="any"
                            placeholder="Value in Euro"
                            className="input"
                            name="cartValue"
                            value={cartValue}
                            onChange={(e) => { setCartValue(Number(e.target.value)) }}
                    required
                        />


                    </label>
                </div>
                <br />
                <div className="input-field">
            <label>
                        Delivery distance (m)
                <input
                            type="text"
                            pattern="[0-9]*"
                    placeholder=""
                            className="input"
                    name="deliveryDistance"
                            value={deliveryDistance}
                            onChange={(e) => { setDeliveryDistance((v) => (e.target.validity.valid ? Number(e.target.value) : v)) }}
                    required
                />

                    </label> 
                </div>
                <br />
                <div className="input-field">
            <label>
                Amount of items
                <input
                    type="number"
                            placeholder=""
                            min="1"
                            step="1"
                            className="input"
                            name="amountOfItems"
                            value={amountOfItems}
                            onChange={(e) => {

                                let newValue = e.target.valueAsNumber
                                if (newValue > 0) {
                                    setAmountOfItems(newValue)
                                } else {
                                    setAmountOfItems(amountOfItems)
                                }
                            }}
                    required
                />
                    </label>
                </div>
                <br />
                <div className="input-field">
            <label>
                Time
                <input
                    type="datetime-local"

                            className="input"
                    name="orderTime"
                            value={orderTime.toISOString()}
                            onChange={(e) => { setOrderTime(new Date(e.target.value)) }}
                    required
                />
                <br />
                    </label>
                </div>
                <button className="button" onClick={calculateDeliveryFee}>
                Calculate Delivery Price
                </button>
        </form >
            <br />

            <p>Delivery Price: {deliveryPrice}€</p>
        </div >



    )
}

export default DeliveryFeeCalculator;
