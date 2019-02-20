import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './menu.css';

export default class Menu extends Component{

    constructor(){
        super();
        this.state = {
            linkActionAuthor : '',
            linkActionHome : '',
            linkActionBook : ''
        }
        this.actionItemMenuHome = this.actionItemMenuHome.bind(this);
        this.actionItemMenuAuthor = this.actionItemMenuAuthor.bind(this);
        this.actionItemMenuBook = this.actionItemMenuBook.bind(this);
    }

    actionItemMenuHome(){
        this.setState({linkActionHome: 'pure-menu-link-action'})
    }

    actionItemMenuAuthor(){
        this.setState({linkActionAuthor: 'pure-menu-link-action'})
    }

    actionItemMenuBook(){
        this.setState({linkActionBook: 'pure-menu-link-action'})
    }

    render(){
        return (
            <div id="menu">
                <a href="#menu" id="menuLink" className="menu-link">
                    <span></span>
                </a>
                <div className="pure-menu">
                    <a className="pure-menu-heading" href="javascript:void(0);">Livraria</a>
                    <ul className="pure-menu-list">
                        <li className="pure-menu-item">
                            <Link className="pure-menu-link" onClick={this.actionItemMenuHome} to="/">Inicio</Link>
                        </li>
                        <li className="pure-menu-item">
                            <Link className="pure-menu-link" onClick={this.actionItemMenuAuthor} to="/autor">Autor</Link>
                        </li>
                        <li className="pure-menu-item">
                            <Link className="pure-menu-link" onClick={this.actionItemMenuBook} to="/livros">Livros</Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}