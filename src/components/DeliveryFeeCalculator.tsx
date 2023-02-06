import React, { FC, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';

const DeliveryFeeCalculator: FC = () => {

    const [cartValue, setCartValue] = useState<number>(0);
    const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
    const [amountOfItems, setAmountOfItems] = useState<number>(0);
    const [orderDate, setOrderDate] = useState<Date>(new Date());
    const [deliveryPrice, setDeliveryPrice] = useState<string>("0");

    //TODO 1. Improve inputs validation logic 

    const isEmptyOrZero = (field: number) => {
        return field.toString() === "" || field === 0;
    }

    // const cartValueIsValid = cartValue.toString() !== "" && cartValue !== 0;
    // const distanceIsValid = deliveryDistance.toString() !== "" && deliveryDistance !== 0;
    // const amountItemsIsValid = amountOfItems.toString() !== "" && amountOfItems !== 0;

    const handleCartValue = (value: string | undefined) => {
        let newCartValue = Number(value)
        if (!newCartValue) {
            setCartValue(0);
        } else if (newCartValue !== cartValue) {
            setCartValue(Number(newCartValue));
        }
    }


    const getValidNumberValue = (e: any) => {
        let newValue = e.target.value;
        if (newValue.charAt(0) === '0') {
            newValue = newValue.slice(1);
        }
        const isValid = /^\d+$/.test(newValue) && newValue > 0
        return isValid ? newValue : '';
    } 

    const handleDeliveryDistance = (e: any) => {
        setDeliveryDistance(getValidNumberValue(e));
    }

    const handleAmountOfItems = (e: any) => {
        setAmountOfItems(getValidNumberValue(e));

    }

    const handleOrderDate = (e: any) => {
        setOrderDate(new Date(e.target.value))
    }


    const calculateDeliveryFee = (e: any) => {
        e.preventDefault();

        if (!cartValue || !deliveryDistance || !amountOfItems || !orderDate) {
            return;
        }

        let deliveryFee = 0;

        if (Number(cartValue) < 10) {
            deliveryFee += 10 - Number(cartValue);
        }

        if (deliveryDistance <= 1000) {
            deliveryFee += 2;
        } else {
            deliveryFee += 2 + Math.ceil((deliveryDistance - 1000) / 500);
        }

        let amountOfItemsValue = Number(amountOfItems)

        if (amountOfItemsValue >= 5 && amountOfItemsValue < 12) {
            deliveryFee += (amountOfItemsValue - 4) * 0.5;
        } else {
            deliveryFee += (amountOfItemsValue - 4) * 0.5 + 1.2;
        }

        if (orderDate.getUTCHours() >= 15 && orderDate.getUTCHours() <= 19 &&
            orderDate.getUTCDay() === 5) {
            deliveryFee *= 1.2;
        }

        if (Number(cartValue) >= 100) {
            deliveryFee = 0;
        }

        if (deliveryFee > 15) {
            deliveryFee = 15;
        }


        setDeliveryPrice(deliveryFee.toFixed(2));
    }


    return (
        <div className='container'>
            <h1>Checkout</h1>
            <hr />
            <form>
                <div className="input-field">
                    <label>
                        Cart value (€)
                    </label >
                    <div className='input-info-field'>
                        <CurrencyInput
                            suffix=" €"
                            decimalSeparator="."
                            allowNegativeValue={false}
                            id="input-currency-field"
                            data-testid="input-currency-field"
                            name="input-currency-field"
                            step={0.01}
                            defaultValue={cartValue}
                            onValueChange={handleCartValue}
                            placeholder="Type the cart value"
                        />
                        <div className="info-message">{isEmptyOrZero(cartValue) && "Enter cart value"}</div>
                    </div>
                </div>
                <div className="input-field">
                    <label>
                        Delivery distance (m)
                    </label>
                    <div className='input-info-field'>
                        <input
                            type="text"
                            pattern="[0-9]*"
                            min="1"
                            inputMode="decimal"
                            placeholder="Type the delivery distance in meters"
                            className="input"
                            name="deliveryDistance"
                            value={deliveryDistance}
                            onChange={handleDeliveryDistance}
                            required
                        />
                        <div className="info-message">{isEmptyOrZero(deliveryDistance) && "Enter delivery distance"}</div>
                    </div>
                </div>
                <div className="input-field">
                    <label>
                        Amount of items
                    </label>
                    <div className='input-info-field'>
                        <input
                            type="text"
                            pattern="[0-9]*"
                            inputMode="decimal"
                            placeholder="Type the amount of items"
                            min="1"
                            className="input"
                            name="amountOfItems"
                            data-testid="amount-items-field"
                            value={amountOfItems}
                            onChange={handleAmountOfItems}
                            required
                        />
                        <div className="info-message">{isEmptyOrZero(amountOfItems) && "Enter amount of items"}</div>
                    </div>
                </div>
                <div className="input-field">
                    <label>
                        Order date and time
                    </label>
                    <div className='input-info-field'>
                        <input
                            type="datetime-local"
                            className="input"
                            name="orderDate"
                            value={orderDate.toISOString().split('.')[0]}
                            onChange={handleOrderDate}
                            required />
                    </div>
                </div>
                <br />
                <button className="button"
                    onClick={calculateDeliveryFee}
                >
                    Calculate delivery price
                </button>
            </form >
            <br />
            <div className="delivery-price">
                <h2>Delivery price </h2>
                <h2 className='delivery-price-calculated'>{deliveryPrice}€</h2>
            </div>
        </div >
    )
}

export default DeliveryFeeCalculator;
