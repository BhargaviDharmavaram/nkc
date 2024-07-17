import React from "react";
import { Route, Link } from "react-router-dom";
import UsersContainer from "./UsersContainer";
import CategoriesContainer from "./CategoriesContainer";
import ExpensesContainer from "./ExpensesContainer";
import TotalExpensesList from './TotalExpensesList'
import NKCOrdersContainer from "./NKCOrdersContainer";
import TotalNKCOrdersList from "./TotalNKCOrdersList";
import DailyEarningsForm from "./DailyEarningsForm";
import EarningsSummary from "./TotalEarningsSummary";

const Dashboard = () => {
  return (
    <div>
        <ul>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/expenses">Expenses</Link></li>
            <li><Link to="/nkcOrders">NKCOrders</Link> </li>

            <Route path="/" component={Home} exact={true} />
            <Route path="/users" component={UsersContainer } />
            <Route path="/categories" component={CategoriesContainer } />
            <Route path="/expenses" component={ExpensesContainer} />
            <Route path="/nkcOrders" component={NKCOrdersContainer} />
        </ul>
    </div>
  );
};

const Home = () => {
    return(
      <div>
        <DailyEarningsForm />
        <EarningsSummary />
        <TotalExpensesList />
        <TotalNKCOrdersList />
      </div>
    )
  }

export default Dashboard;
