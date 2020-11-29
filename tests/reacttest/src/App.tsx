import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import { from } from 'linq-to-typescript';

class App extends Component {

  componentDidMount() {
    setTimeout(() => {
      // You can also do Array Array.from(document.querySelectorAll("div"))
      const divsIterator = document.querySelectorAll("div")[Symbol.iterator]()
      const classList = from(divsIterator)
        .selectMany(function* (x) {
          // I mean you could also do Array.from but this looks cooler
          for (let i = 0; i < x.classList.length; i++) {
            yield x.classList[i].toLocaleUpperCase()
          }
        })
        .distinct()
        .toArray()
      
      console.log(classList)

    }, 250)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
