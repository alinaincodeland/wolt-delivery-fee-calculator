import React, { useState } from 'react';

const DeliveryFeeCalculator: React.FC = () => {

    const [cartValue, setCartValue] = useState("");
    const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
    const [amountOfItems, setAmountOfItems] = useState<number>(0);
    const [orderDay, setOrderDay] = useState<Date>(new Date());
    const [orderTime, setOrderTime] = useState<Date>(new Date());
    const [deliveryPrice, setDeliveryPrice] = useState<number>(0);


    const handleCartValue = (e: any) => {
        e.preventDefault();
        setCartValue(e.target.value)
    }

    console.log(cartValue);
    console.log(typeof cartValue);
    console.log(Number(cartValue))



    const calculateDeliveryFee = (e: any) => {
        e.preventDefault();



        let deliveryFee = 0;

        if (Number(cartValue) < 10) {
            deliveryFee += 10 - Number(cartValue);
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


        if (orderTime.getUTCHours() >= 15 && orderTime.getUTCHours() <= 19 && orderDay.getUTCDay() === 5) {
            deliveryFee *= 1.2
        }


        if (Number(cartValue) >= 100) {
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
                            pattern="[0-9]*"
                            placeholder="Value in Euro"
                            className="input"
                            name="cartValue"
                            value={cartValue}
                            onChange={handleCartValue}
                            required
                        />
                    </label>
                </div>
                <br />
                <div className="input-field">
                    <label>
                        Delivery distance (m)
                        <input
                            type="number"
                            // pattern="[0-9]*"
                            placeholder=""
                            className="input"
                            name="deliveryDistance"
                            value={deliveryDistance || ""}
                            onChange={(e) => {
                                setDeliveryDistance((v) => (e.target.validity.valid ? Number(e.target.value) : v))
                            }}
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
                        Order day
                        <input
                            type="date"
                            className="input"
                            name="orderDay"
                            value={orderDay.toISOString()}
                            onChange={(e) => { setOrderDay(new Date(e.target.value)) }}
                            required
                        />
                        <br />
                    </label>
                </div>
                <br />
                <div className="input-field">

                    <label>
                        Order time
                        <input
                            type="time"
                            className="input"
                            name="orderTime"
                            value={orderTime.toISOString()}
                            onChange={(e) => { setOrderTime(new Date(e.target.value)) }}
                            required
                        />
                        <br />
                    </label>
                </div>
                <br />
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
