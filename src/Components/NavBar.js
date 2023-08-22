import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav>
            <h1>
                <Link to="/budget">Welcome to Budgrt</Link>
            </h1>
            <button>
                <Link to="/budget/new">New Transaction</Link>
            </button>
        </nav>
    )
}