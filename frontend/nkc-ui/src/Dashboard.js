import React from "react";
import { Route, Link } from "react-router-dom";
import UsersContainer from "./UsersContainer";
import CategoriesContainer from "./CategoriesContainer";
import ExpensesContainer from "./ExpensesContainer";
import NKCOrdersContainer from "./NKCOrdersContainer";
import EarningsContainer from "./EarningsContainer";
import Home from "./Home";

const Dashboard = () => {
  return (
    <div>
        <ul>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/expenses">Expenses</Link></li>
            <li><Link to="/nkcOrders">NKCOrders</Link> </li>
            <li><Link to="/earnings">Earnings</Link></li>

            <Route path="/" component={Home} exact={true} />
            <Route path="/users" component={UsersContainer } />
            <Route path="/categories" component={CategoriesContainer } />
            <Route path="/expenses" component={ExpensesContainer} />
            <Route path="/nkcOrders" component={NKCOrdersContainer} />
            <Route path="/earnings" component={EarningsContainer} />
        </ul>
    </div>
  );
};

// const Home = () => {
//     return(
//       <div>
//         <EarningsSummary />
//         <EarningsCurrentMonthTotal />
//         <ExpensesSummary />
//         <ExpensesCurrentMonthTotal />
//         <NKCOrdersSummary />
//         <NKCOrdersCurrentMonthTotal />
//       </div>
//     )
//   }

export default Dashboard;
