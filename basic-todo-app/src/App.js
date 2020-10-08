import React from "react";
import TodoList from "./components/todo/Index";
import Todo from "./components/todo/Show";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/">
            <TodoList />
          </Route>
          <Route exact path="/task/:id">
            <Todo />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
