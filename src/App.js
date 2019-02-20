import React, { Component } from 'react';
import Menu from './Menu/Menu';

export default class App extends Component {

  render() {
    return (
      <div id="layout">
        <Menu/>
        <div id="main">
            {this.props.children}
        </div>
      </div>
    );
  }
}