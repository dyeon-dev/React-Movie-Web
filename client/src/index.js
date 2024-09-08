import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.css";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import { thunk } from "redux-thunk";
import Reducer from "./components/_reducers/index";

const root = ReactDOM.createRoot(document.getElementById("root"));

// redux는 객체밖에 못받기 때문에 function, promise를 받았을 때를 대처해야 한다.
// redux-thunk - Functions 을 받는 방법을 dispatch한테 알려주는 역할
// redux-promise - Promise을 받는 방법을 dispatch한테 알려주는 역할
const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  thunk
)(createStore);

root.render(
    <Provider
      store={createStoreWithMiddleware(
        Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
    >
      <App />
    </Provider>
);
