import React from "react";
import { Route, Link } from "react-router-dom";
import UsersContainer from "./UsersContainer";
import CategoriesContainer from "./CategoriesContainer";
import ExpensesContainer from "./ExpensesContainer";
import TotalExpensesList from './TotalExpensesList'

const Dashboard = () => {
  return (
    <div>
        <ul>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/expenses">Expenses</Link></li>

            <Route path="/" component={Home} exact={true} />
            <Route path="/users" component={UsersContainer } />
            <Route path="/categories" component={CategoriesContainer } />
            <Route path="/expenses" component={ExpensesContainer} />
        </ul>
    </div>
  );
};

const Home = () => {
    return(
      <div>
        <h1>Welcome to NKC</h1>
        <TotalExpensesList />
      </div>
    )
  }

export default Dashboard;
