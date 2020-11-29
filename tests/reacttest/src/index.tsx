import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// 0. Import Module
import { initializeLinq } from "linq-to-typescript"
// 1. See linq-to-typescript.d.ts for step 1
// 2. Bind Linq Functions to Array and Map
initializeLinq()

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
