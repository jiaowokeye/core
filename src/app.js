import React, { Component } from 'react'
import Page from './routerMap'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
// import thunkMiddleware from 'redux-thunk'
import { HashRouter as Router } from 'react-router-dom'
const initState = {
    "type": "ADD_NNN",
    "value": 1
}
const reducer = (state=initState,action)=>{
    switch (action.type) {
        case "ADD_NNN":
            return {
                "type": "ADD_NNN",
                "value": 2
            }
            break;
    
        default:
            return state;
            break;
    }
}

const store = createStore(reducer);


const App = ()=>(
    <Provider store={store}>
        <Router>
            <Page />
        </Router>
    </Provider>
)

export default App;
