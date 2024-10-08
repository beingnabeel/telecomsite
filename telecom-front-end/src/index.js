import React from "react";
import ReactDOM from "react-dom/client";
// import './index.css';      //we will make our own css file
import App from "./App";
// import reportWebVitals from './reportWebVitals';
import { createStore } from "redux"; // get createStore method so we can create a redux store.
import { Provider } from "react-redux"; // get the Provider component to wrap around our whole app.
import rootReducer from "./redux-elements/reducers/rootReducer";
const theStore = createStore(rootReducer);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={theStore}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
