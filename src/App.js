import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles.css";

import Senders from "./Senders";
import Conversation from "./Conversation";
import Checklist from "./Checklist";
import SessionsList from "./SessionsList";
import SessionDetail from "./SessionDetail";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Senders} />
        <Route path="/sessions/:id" component={SessionsList} />
        <Route path="/session/:id/:ts" component={SessionDetail} />
        <Route path="/conversation/:id" component={Conversation} />
        <Route path="/checklist/:id" component={Checklist} />
      </Switch>
    </Router>
  );
}
