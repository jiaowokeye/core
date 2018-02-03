import React, { Component } from 'react'
import Page from './routerMap'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducer'
import { HashRouter as Router } from 'react-router-dom'

function configureStore(initialState) {
    const enhancer = compose(
        applyMiddleware(
            thunkMiddleware,
        )
    );
    return createStore(reducer, initialState, enhancer);
}
const store = configureStore({});
console.log(store.getState());
const App = ()=>(
    
    <Provider store={store}>
        <Router>
            <Page />
        </Router>
    </Provider>
)

export default App;
