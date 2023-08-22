import { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";

export default function BudgetNew() {
    const API = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const { index } = useParams(); //Get the index parameter from the URL
    const [transaction, setTransaction] = useState({
        item_name: "",
        amount: 0,
        date: "",
        isDeduction: false,
        category: "",
    });

    const handleTextChange = (e) => {
        const { id, value } = e.target;

        if(id === "amount") {
            setTransaction({ ...transaction, [id]: parseFloat(value) });
        } else {
            setTransaction({ ...transaction, [id]: value })
        }
    };/* in the server side, the validations are set to check the data type of value in the budget object. For amount, the data type is expecting a number however when using "event.target.value" to retrieve the text input JS treats the incoming data as a string. Thus, I was getting a 400 bad request error. To fix this I am using object destructuring to retreive the data via id and value. I am using parseFloat to make the value is treated a s a number by explicitly coveritng it to a num using parseFloat(). 
    */

    const handleCheckboxChange = () => {
        setTransaction({ ...transaction, isDeduction: !transaction.isDeduction });
    };

    const addTransaction = (newTransaction) => {
        axios
        .post(`${API}/budget`, newTransaction)
        .then(() => {
            console.log(newTransaction)
            navigate("/budget");//go back to BudgetTable and add a useEffect so that everytime a new transaction is added the page reloads to show the latest data.
        })
        .catch((c) => console.error("catch", c));
    };
    /* the addTransaction fxn takes 2 parameters:
    1.the URL where the request will be sent 
    2. newTransaction, a variable that represents the data of the new transaction to be added to the server
    */

    const handleSubmit = (e) => {
        e.preventDefault();
        addTransaction(transaction);
        //call the addTransaction fxn with the transaction data and not "newTransaction" because the form data is stored in transaction from our useState fxn not "newTransaction". So, when we want to call the addTransaction fxn, we should pass the transaction data as an argument.
    }

    return (
            <div className="Edit">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input
                        id="item_name"
                        value={transaction.item_name}
                        type="text"
                        onChange={handleTextChange}
                        placeholder="Item name"
                        required
                    />
                    <label htmlFor="amount">Amout:</label>
                    <input
                        id="amount"
                        value={transaction.amount}
                        type="number"
                        onChange={handleTextChange}
                        placeholder="Enter amount"
                        required
                    />
                    <label htmlFor="isDeduction">Is this transaction a eduction?</label>
                    <p>Does this take away from total income? If yes, check the box. If no, leave box unchecked.</p>
                    <input
                        id="isDeduction"
                        value={transaction.isDeduction}
                        type="checkbox"
                        onChange={handleCheckboxChange}
                    />
                    <br />

                    <label htmlFor="date">Date:</label>
                    <p>Enter as mm/dd/yyyy</p>
                    <input
                        id="date"
                        value={transaction.date}
                        type="text"
                        onChange={handleTextChange}
                        placeholder="Date of transaction"
                        required
                    />
                    <label htmlFor="category">Category: </label>
                    <input
                        id="category"
                        value={transaction.category}
                        type="text"
                        onChange={handleTextChange}
                        placeholder="What is this for?"
                        required
                    />
                    <br />
    
                    <input type="submit" />
                </form>
                <Link to={`/budget/${index}`}>
                    <button>Nevermind!</button>
                </Link>
            </div>
    );
}