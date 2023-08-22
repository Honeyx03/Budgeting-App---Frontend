import { Link } from "react-router-dom";

export default function BudgetTable({ budget }) {
    return (
        <div>
            <table className="Budget">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Item</th>
                        <th>From</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {budget.map((item, index) => {
                        return (
                            <tr key ={index}>
                                <td>{item.date}</td>
                                <td>
                                    <Link to={`/budget/${index}`}>{item.item_name}</Link>
                                </td>
                                <td>{item.category}</td>
                                <td>{item.amount}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

/*NOTES: 
if there are any issues with Link, Browser, Router etc, make sure react-router-dom is a dependency in the package.json. If it is not present, do "npm install react-router dom"

to use Link without the application crashing it must be wrapped in a Router. Make sure somewhere in the application there is an import of {Browser, Router, Routes, and Route} this should preferrably be in the App.js (parent component); If not, you will get an error message referring to "basename." 

an alternative to Link is the traditional <a> tag with an href. This will not break the application nor does it have to be wrapped in Browser Router. 

In order to display the total about in the TotalDisplay component I have to call the TotalAmount fxn with "budget" data as an argument.
*/
