import React, { Component } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Naslovna from "./components/Naslovna";

import Kockice from "./containers/diceRoll/Kockice";

import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import pocetnoStanjeIzFilea from "./services/pocetnoStanje";

export default class App extends Component {
  constructor(props) {
    super(props);
    const stanjeIzBrowsera = JSON.parse(localStorage.getItem("stanje"));
    const inicijalnoStanje = {
      highscore: stanjeIzBrowsera
        ? stanjeIzBrowsera.highscore
        : pocetnoStanjeIzFilea.highscore,
      brojPokusaja: 0,
      feedback: "",
      username: "",
      inputName: "",
      zamisljeniBroj: Math.floor(Math.random() * 101),
    };
    this.state = inicijalnoStanje;
  }

  handleLogin = (username = "", inputName = "") => {
    this.setState((state) => {
      return { username: username, inputName: inputName };
    });
  };

  render() {
    return (
      <div id="nasApp">
        <Header />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                this.state.username === "" ? (
                  <Navigate to="/login" replace={true} />
                ) : (
                  <Naslovna />
                )
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  inputName={this.state.inputName}
                  handleLogin={(username, inputName) =>
                    this.handleLogin(username, inputName)
                  }
                />
              }
            />

            <Route
              path="/tinovaIgra"
              element={
                this.state.username === "" ? (
                  <Navigate to="/login" replace={true} />
                ) : (
                  <Kockice username={this.state.username} />
                )
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    );
  }
}
