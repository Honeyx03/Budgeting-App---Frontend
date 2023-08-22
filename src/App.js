//DEPENDENCIES
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from "axios";

//COMPONENTS
import NavBar from './Components/NavBar';
import TotalDisplay from './Components/TotalDisplay';

//PAGES
import Show from './Pages/Show';
import Index from "./Pages/Index";
import Edit from './Pages/Edit';
import New from './Pages/New';

//BASE URL 
//Start all variable names with REACT_APP_
const API = process.env.REACT_APP_API_URL;
console.log(API)//log to make sure it works

function App() {
  const [budget, setBudget] = useState([]);

    useEffect(() => {
        axios.get(`${API}/budget`)
          .then((response) => {
            setBudget(response.data);
          })
          .catch((e) => console.error("catch", e));
      }, [budget]);

      const totalAmount = (budget) => {
        let total; 
    
        let deducationTrue = budget
        .filter(item => item.isDeduction)
        .reduce((total, item) => total + item.amount, 0);
    
        let deducationFalse = budget
        .filter(item => !item.isDeduction)
        .reduce((total, item) => total + item.amount, 0)
    
        return total = deducationFalse - deducationTrue;
    }

    const total = totalAmount(budget);

  return (
    <div className="App">
      <Router>
        <NavBar />
        <TotalDisplay total={total}/>
        <main>
          <Routes>
            <Route path="/budget" element={<Show budget={budget} />} />
            <Route path="/budget/:index" element={<Index />} />
            <Route path="/budget/:index/edit" element={<Edit />} />
            <Route path="/budget/new" element={<New />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;

/*NOTES: 
if there are any issues with Link, Browser, Router etc, make sure react-router-dom is a dependency in the package.json. If it is not present, do "npm install react-router dom"

to use Link without the application crashing it must be wrapped in a Router. Make sure somewhere in the application there is an import of {Browser, Router, Routes, and Route} this should preferrably be in the App.js (parent component); If not, you will get an error message referring to "basename." 

an alternative to Link is the traditional <a> tag with an href. This will not break the application nor does it have to be wrapped in Browser Router. 
*/
