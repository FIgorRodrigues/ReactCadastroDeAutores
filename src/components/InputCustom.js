import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import './inputCustom.css';

export default class InputCustom extends Component{

    constructor(){
        super();
        this.state = {
            messageError : ''
        };
    }

    render(){
        return (
        <div className="pure-control-group">
            <label htmlFor={this.props.id}>{this.props.label}</label> 
            <input id={this.props.id} type={this.props.type} name={this.props.name} value={this.props.value} onChange={this.props.onChange}/>
            <span className="error">{this.state.messageError}</span>
        </div>
      )
    }

    componentDidMount(){
        PubSub.subscribe("reset-messages-errors", (topic, stringResetMessagesErrors) => {
            this.setState({
                messageError : stringResetMessagesErrors
            })
        });
        PubSub.subscribe("errors-validation-form", (topic, errors) => {
            if(typeof errors === "object"){
                if(errors.field === this.props.name)
                this.setState({
                    messageError : "* "+errors.defaultMessage
                });
            }
            else{
                this.setState({
                    messageError : errors
                }); 
            }
        });
    }
    
}