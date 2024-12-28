import { useEffect, useState, useCallback, useContext } from "react";
import CurrencyContext from "../contexts/CurrencyContext";

function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [output, setOutput] = useState(0);
  const { fromCurrency, toCurrency } = useContext(CurrencyContext);

  useEffect(() => {
    if (amount === "" || isNaN(amount) || amount <= 0) {
      setOutput(0); 
      return;
    }

    const fetchConversion = async () => {
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/5909da65d56037632ad205d8/pair/${fromCurrency}/${toCurrency}`,
          {
            method: "GET",
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch conversion rate");
        }

        const data = await response.json();
        const conversionRate = data.conversion_rate || 0;
        setOutput(amount * conversionRate); 
      } catch (error) {
        console.error("Error fetching conversion rate:", error);
        setOutput(0); 
      }
    };

    fetchConversion();
  }, [fromCurrency, toCurrency, amount]);

  const handleAmountChange = useCallback((event) => {
    setAmount(event.target.value);
  }, []);

  return (
    <>
      <div className="container">
        <input
          value={amount}
          placeholder="Enter amount"
          className="converter-input"
          onChange={handleAmountChange}
        />
        <p>{fromCurrency}</p>
        <p className="equal-sign">=</p>
        <p className="converter-result">
          {amount === "" || isNaN(amount) ? "0" : output}
        </p>
        <p>{toCurrency}</p>
      </div>
    </>
  );
}

export default CurrencyConverter;
