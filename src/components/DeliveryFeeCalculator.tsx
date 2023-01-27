import React from 'react';
import { useState } from 'react';

const DeliveryFeeCalculator: React.FC = () => {

    const [cartValue, setCartValue] = useState<number>(0);
    const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
    const [amountOfItems, setAmountofItems] = useState<number>(0);
    const [orderTime, setOrderTime] = useState<Date>(new Date());
    const [deliveryPrice, setDeliveryPrice] = useState<number>(0);



    function calculateDeliveryFee() {
        let surcharge = 0;

        if (cartValue < 10) {
            surcharge = 10 - cartValue;
            console.log("surcharge is...", surcharge)
        }

        let deliveryPrice = 0;

        if (deliveryDistance < 1000) {
            deliveryPrice = 2;

        }

    }




    return (
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
            <br />
            <label>
                Delivery price
                <input
                    type="number"
                    placeholder=""
                    className="form--input"
                    name="deliveryPrice"
                    disabled
                />
            </label>
        </form >

    )
}

export default DeliveryFeeCalculator;
