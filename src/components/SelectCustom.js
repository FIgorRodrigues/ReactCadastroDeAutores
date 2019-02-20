import React, {Component} from 'react';

export default class SelectCustom extends Component{

    constructor(){
        super();
        this.state = {
            listAuthor : [],
            messageError : ''
        };
    }

    render(){
        return (
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label> 
                <select id={this.props.id} name={this.props.name} value={this.props.value} onChange={this.props.onChange}>
                    <option value="">Selecione</option>
                    {
                        this.props.listAuthor.map(author => {
                            return <option key={author.id} value={author.id}>{author.nome}</option>
                        })
                    }
                </select>
                <span className="error">{this.state.messageError}</span>
            </div>
        );
    }
}