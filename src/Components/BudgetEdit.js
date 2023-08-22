import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function BugdetEdit() {
    let { index } = useParams();
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState({
        item_name: "",
        amount: 0,
        date: "",
        isDeduction: false,
        category: "",
    });

    useEffect(() => {
        axios
        .get(`${API}/budget/${index}`)
        .then((response) => {
            setTransaction(response.data);
            console.log(transaction);
        })
        .catch((e) => console.error(e));
    }, [index]);

    const handleTextChange = (event) => {
        const { id, value } = event.target;

        if (id === "amount") {
            setTransaction({ ...transaction, [id]: parseFloat(value) });
        } else {
            setTransaction({...transaction, [id]: value });
        };
    };/* in the server side, the validations are set to check the data type of value in the budget object. For amount, the data type is expecting a number however when using "event.target.value" to retrieve the text input JS treats the incoming data as a string. Thus, I was getting a 400 bad request error. To fix this I am using object destructuring to retreive the data via id and value. I am using parseFloat to make the value is treated a s a number by explicitly coveritng it to a num using parseFloat(). 
    */

    const handleCheckboxChange = () => {
        setTransaction({ ...transaction, isDeduction: !transaction.isDeduction })
    };

    const editBudget = () => {
        axios
        .put(`${API}/budget/${index}`, transaction)
        .then((response) => {
            setTransaction(response.data);
            navigate(`/budget/${index}`);
        })
        .catch((c) => console.warn("catch", c));
    };//editBudget does not need to take any parameter link addBudget b/c the editBudget fxn is use the budget state variable that already holds data.
    //axios.PUT is making a put request to the server. the 1st argument is to the URL where the request is sent. the 2nd argument is "budget" which represents the data that willl be sent to the server. The budget data is the data that contains the updated information the user wants to save to the server

    const handleSubmit = (event) => {
        event.preventDefault();
        editBudget();
    };

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
                <label htmlFor="deduction">Is this transaction a deduction?</label>
                <p>Does this add or take away from total income?</p>
                <input
                    id="deduction"
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    checked={transaction.isDeduction}
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
