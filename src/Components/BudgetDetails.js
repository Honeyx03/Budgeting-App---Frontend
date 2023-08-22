import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function BudgetDetails() {
    const [transaction, setTransaction] = useState([]);
    let { index } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API}/budget/${index}`)
        .then((response) => {
            setTransaction(response.data);
            console.log(transaction)
        })
        .catch(()=> {
            navigate('/not-found');
        });
    }, [index, navigate]);

    const handleDelete = () => {
        axios
        .delete(`${API}/budget/${index}`)
        .then(() => {
            navigate('/budget');
        })
        .catch((e) => console.log(e));
    };

    return (
        <article>
            <h3>{transaction.item_name}</h3>
            <p>{transaction.date}</p>
            <h6>Amount: ${transaction.amount}</h6>
            <h6>Category: {transaction.category}</h6>
            <div className="showNavigation">
                <div>
                    <Link to={`/budget`}>
                        <button>Back</button>
                    </Link>
                </div>
                <div>
                    <Link to={`/budget/${index}/edit`}>
                        <button>Edit</button>
                    </Link>
                </div>
                <div>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </article>
    );
}