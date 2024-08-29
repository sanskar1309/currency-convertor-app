import { useState } from 'react';

import { InputBox } from './components';
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {
    const [amount, setAmount] = useState(0);
    const [from, setFrom] = useState('usd');
    const [to, setTo] = useState('inr');
    const [convertedAmount, setConvertedAmount] = useState(0);

    const currencyInfo = useCurrencyInfo();
    const options = Object.keys(currencyInfo);

    const swap = () => {
        // Swap currencies
        const newFrom = to;
        const newTo = from;

        // Calculate new converted amount
        let newAmount = convertedAmount;
        if (currencyInfo[newFrom] && currencyInfo[newTo]) {
            newAmount = convertedAmount * (currencyInfo[newFrom] / currencyInfo[newTo]);
        }

        setFrom(newFrom);
        setTo(newTo);
        setAmount(newAmount);
        setConvertedAmount(convertedAmount);
    };

    const convert = () => {
        if (from === 'inr') {
            if (currencyInfo[to]) {
                setConvertedAmount(amount * currencyInfo[to]);
            } else {
                setConvertedAmount(0);
            }
        } 
        else if (to === 'inr') {
            if (currencyInfo[from]) {
                setConvertedAmount(amount / currencyInfo[from]);
            } else {
                setConvertedAmount(0);
            }
        } 
        else {
            if (currencyInfo[from] && currencyInfo[to]) {
                setConvertedAmount(amount * (currencyInfo[to] / currencyInfo[from]));
            } else {
                setConvertedAmount(0);
            }
        }
    };

    return (
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url('https://images.pexels.com/photos/4968382/pexels-photo-4968382.jpeg')`,
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convert();
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount}
                                currencyOptions={options}
                                onCurrencyChange={(currency) => setFrom(currency)}
                                selectCurrency={from}
                                onAmountChange={(amount) => setAmount(amount)}
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertedAmount}
                                currencyOptions={options}
                                onCurrencyChange={(currency) => setTo(currency)}
                                selectCurrency={to}
                                amountDisable
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                            Convert {from.toUpperCase()} to {to.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;



