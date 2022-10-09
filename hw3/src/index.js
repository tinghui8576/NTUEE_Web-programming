import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import Layout from './App';
import reportWebVitals from './reportWebVitals';

var todo_list =[];
todo_list.push({id: 1, text:"1", state: false})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Layout initItems={todo_list}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
