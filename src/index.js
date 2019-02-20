import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Home from './Home/Home';
import AuthorBox from './Author/Author';
//import Error404 from './Errors/Error404';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Book } from './Book/Book';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <App>
                <Route path="/" exact={true} component={Home} />
                <Route path="/autor" component={AuthorBox} />
                <Route path="/livros" component={Book} />
            </App>        
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);
//Add in Switch Component a new route with componet of book - <Route path="/livro" component={Book}/>
//Add in Switch Component a new route with componet of error 404 - <Route path="*" component={Error404}/>
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
