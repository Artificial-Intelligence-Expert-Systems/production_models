import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
// import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
// import InterfacePage from "./InterfacePage";
// import MainPage from "./MainPage";

const baseUrl = 'http://localhost:5000';

function App() {
  const [facts, setFacts] = useState([]);
  const [productions, setProductions] = useState([]);
  const [conclusions, setConclusions] = useState([]);

  useEffect(async () => {
    const response = await axios.get(`${baseUrl}/api/fact/get_all`);
  }, []);

  return (
      'ddddd'
  );
}

export default App;
