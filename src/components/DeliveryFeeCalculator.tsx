import React, { FC, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';

const DeliveryFeeCalculator: FC = () => {

    const [cartValue, setCartValue] = useState<number>(0);
    const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
    const [amountOfItems, setAmountOfItems] = useState<number>(0);
    const [orderDate, setOrderDate] = useState<Date>(new Date());
    const [deliveryPrice, setDeliveryPrice] = useState<string>("0");


    /**
     * Returns true if a field is empty or zero.
     * 
     * @param {number} field - The input field to be checked.
     * @returns {boolean} True if the field is empty or zero, false otherwise.
     */

    const isEmptyOrZero = (field: number) => {
        return field.toString() === "" || field === 0;
    }

    /**
     * Updates the cartValue state variable with a new value.
     * 
     * @param {string | undefined} value - The new value to update the cartValue state variable.
     */

    const handleCartValue = (value: string | undefined) => {
        let newCartValue = Number(value)
        if (!newCartValue) {
            setCartValue(0);
        } else if (newCartValue !== cartValue) {
            setCartValue(Number(newCartValue));
        }
    }


    /**
     * Returns the numeric value of an input event if it is valid, 
     * otherwise returns an empty string.
     * 
     * @param {any} e - The input event.
     * @returns {string} The numeric value of the input event if it is valid, 
     * otherwise returns an empty string.
     */

    const getValidNumberValue = (e: any) => {
        let newValue = e.target.value;
        if (newValue.charAt(0) === '0') {
            newValue = newValue.slice(1);
        }
        const isValid = /^\d+$/.test(newValue) && newValue > 0
        return isValid ? newValue : '';
    }

    /**
     * Updates the deliveryDistance state variable with a new value.
     * 
     * @param {any} e - The input event that triggers the update.
     */

    const handleDeliveryDistance = (e: any) => {
        setDeliveryDistance(getValidNumberValue(e));
    }

    /**
     * Updates the amountOfItems state variable with a new value.
     * 
     * @param {any} e - The input event that triggers the update.
     */

    const handleAmountOfItems = (e: any) => {
        setAmountOfItems(getValidNumberValue(e));

    }

    /**
     * Updates the orderDate state variable with a new value.
     * 
     * @param {any} e - The input event that triggers the update.
     */

    const handleOrderDate = (e: any) => {
        setOrderDate(new Date(e.target.value))
    }


    /**
    * Calculates and sets the delivery fee based on the current cart value, delivery distance,
    * amount of items, and order date
     * 
     * @param {any} e - The submit event.
     */

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
