import React from 'react';
import { useState } from 'react';

const DeliveryFeeCalculator: React.FC = () => {

    const [cartValue, setCartValue] = useState<number>(0);
    const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
    const [amountOfItems, setAmountOfItems] = useState<number>(0);
    const [orderTime, setOrderTime] = useState<Date>(new Date());
    const [deliveryPrice, setDeliveryPrice] = useState<number>(0);



    const calculateDeliveryFee = () => {
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

        setDeliveryDistance(deliveryFee);
    }



    return (
        <main>
        <form>
            <label>
                Cart value
                <input
                    type="number"
                    // min="0.01"
                    // step="0.01"
                    placeholder=""
                    className="form--input"
                    name="cartValue"
                    required
                />
                €
            </label>
            <br />
            <label>
                Delivery distance
                <input
                    type="number"
                    placeholder=""
                    className="form--input"
                    name="deliveryDistance"
                    required
                />
                m
                </label> 
            <br />
            <label>
                Amount of items
                <input
                    type="number"
                    placeholder=""
                    className="form--input"
                    name="amountOfItems"
                    required
                />
            </label>
            <br />
            <label>
                Time
                <input
                    type="datetime-local"
                    placeholder=""
                    className="form--input"
                    name="orderTime"
                    required
                />
                <br />
            </label>
            <button className="form--button" onClick={calculateDeliveryFee}>
                Calculate Delivery Price
                </button>
        </form >
            <br />

            <p>Delivery Price: {deliveryPrice}</p>
        </main>


    )
}

export default DeliveryFeeCalculator;
