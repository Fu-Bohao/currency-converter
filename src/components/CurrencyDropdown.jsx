import { useEffect, useState, useContext } from "react";
import "./CurrencyStyling.css";
import CurrencyConverter from "./CurrencyConverter";
import CurrencyContext from "../contexts/CurrencyContext";

function CurrencyDropdown() {
    const [currencies, setCurrencies] = useState([]);
    const { fromCurrency, setFromCurrency, toCurrency, setToCurrency } = useContext(CurrencyContext);

    useEffect(() => {
        fetch("https://v6.exchangerate-api.com/v6/5909da65d56037632ad205d8/codes", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => setCurrencies(data.supported_codes))
            .catch((err) => console.log(err));
    }, []);

    const handleSelectOneValue = (event) => {
        setFromCurrency(event.target.value);
    };

    const handleSelectTwoValue = (event) => {
        setToCurrency(event.target.value); 
    };

    return (
        <>
            <div className="container">
                <p>I want to convert</p>
                <select
                    className="from-select"
                    value={fromCurrency} 
                    onChange={handleSelectOneValue}
                >
                    {currencies.map((cur) => (
                        <option key={cur[0]} value={cur[0]}>
                            {cur[1]}
                        </option>
                    ))}
                </select>
                <p>to</p>
                <select
                    className="to-select"
                    value={toCurrency} 
                    onChange={handleSelectTwoValue}
                >
                    {currencies.map((cur) => (
                        <option key={cur[0]} value={cur[0]}>
                            {cur[1]}
                        </option>
                    ))}
                </select>
            </div>
            <CurrencyConverter />
        </>
    );
}

export default CurrencyDropdown;
