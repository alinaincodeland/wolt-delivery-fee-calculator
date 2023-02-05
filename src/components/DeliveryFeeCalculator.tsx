import React, { FC, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';

const DeliveryFeeCalculator: FC = () => {

    const [cartValue, setCartValue] = useState<number>(0);
    const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
    const [amountOfItems, setAmountOfItems] = useState<number>(0);
    const [orderDate, setOrderDate] = useState<Date>(new Date());
    const [deliveryPrice, setDeliveryPrice] = useState<number>(0);


    const handleCartValue = (value: string | undefined) => {

        let newCartValue = Number(value)

        if (!newCartValue) {
            setCartValue(0);
        } else if (newCartValue !== cartValue) {
            setCartValue(Number(newCartValue));
        }
    }


    const handleDeliveryDistance = (e: any) => {
        const newValue = e.target.value;
        const isValid = /^\d+$/.test(newValue) && newValue > 0;
        setDeliveryDistance(isValid ? newValue : '');
        console.log(newValue)

    }

    const handleAmountOfItems = (e: any) => {
        const newValue = e.target.value;
        const isValid = /^\d+$/.test(newValue) && newValue > 0;
        setAmountOfItems(isValid ? newValue : '');
        console.log(newValue)

    }

    const calculateDeliveryFee = (e: any) => {
        e.preventDefault();

        if (!cartValue || !deliveryDistance || !amountOfItems || !orderDate) {
            alert('Please insert all values');
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
            deliveryFee *= 1.2
        }

        if (Number(cartValue) >= 100) {
            deliveryFee = 0;
        }

        if (deliveryFee > 15) {
            deliveryFee = 15;
        }

        deliveryFee.toFixed(2)

        setDeliveryPrice(deliveryFee);
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
                </div>
                <br />
                <div className="input-field">
                    <label>
                        Delivery distance (m)
                    </label>

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
                </div>
                <br />
                <div className="input-field">
                    <label>
                        Amount of items
                    </label>
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
                </div>
                <br />
                <div className="input-field">
                    <label>
                        Order date and time
                    </label>
                    <input
                        type="datetime-local"
                        className="input"
                        name="orderDate"
                        value={orderDate.toISOString().split('.')[0]}
                        onChange={e => setOrderDate(new Date(e.target.value))}
                        required />
                </div>
                <br />
                <button className="button"
                    onClick={calculateDeliveryFee}
                >
                    Calculate the delivery price
                </button>
            </form >
            <br />
            <div className="delivery-price">
                <h3>Delivery Price </h3>
                <h3 className='delivery-price-calculated'>{deliveryPrice}€</h3>
            </div>
        </div >
    )
}

export default DeliveryFeeCalculator;
