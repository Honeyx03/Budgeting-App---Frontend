import BugdetEdit from "../Components/BudgetEdit";
import BudgetTable from "../Components/BudgetTable";

export default function Show({ budget }) {
    return (
        <div className="Show">
            <h2>All Transactions</h2>
            <BudgetTable budget={budget} />
        </div>
    )
    
}