import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ToDoList from "pages/todo_list";

const App = props => {

    return (
            <BrowserRouter>
                <Switch>
                    <Route
                        path="/todolist-react-scss"
                        exact
                        render={(props) => <ToDoList {...props} />}
                    />
                    <Redirect to="/todolist-react-scss" />
                </Switch>
            </BrowserRouter>
    )
}

export default App;