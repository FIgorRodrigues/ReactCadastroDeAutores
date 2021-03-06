import React, {Component} from 'react';
import $ from 'jquery';
import InputCustom from '../components/InputCustom';
import ButtonCustom from '../components/ButtonCustom';
import ManageErros from '../ManageErros/ManageErros';
import PubSub from 'pubsub-js';
import '../css/pure-min.css';
import '../css/side-menu.css';
import Menu from '../Menu/Menu';

export class FormAuthor extends Component{

    constructor(){
        super();
        this.state = {
            name : '',
            email: '',
            password: '',
            errors : ''
        };
        this.sendForm = this.sendForm.bind(this);
        this.setName = this.setName.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    sendForm(e){
        e.preventDefault();
        $.ajax({
            url: 'http://cdc-react.herokuapp.com/api/autores',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            beforeSend : () => {
                PubSub.publish('reset-messages-errors', '');
            },
            data: JSON.stringify({
                nome : this.state.name, 
                email : this.state.email, 
                senha : this.state.password
            })
        }).then(newListing => {
            this.resetForm();
            PubSub.publish('list-authors-updated', newListing);
        }, error => {
            new ManageErros().publishErros(error);
        }); 
    }

    resetForm(){
        this.setState({
            name : '',
            email: '',
            password: '',
            errors : ''}
        );
    }
    
    setName(e){
        this.setState({name : e.target.value});
    }

    setEmail(e){
        this.setState({email : e.target.value});
    }

    setPassword(e){
        this.setState({password : e.target.value});
    }

    render(){
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" method="post" onSubmit={this.sendForm}>
                    <InputCustom id="nome" type="text" name="nome" value={this.state.name} label="Nome" onChange={this.setName}/>
                    <InputCustom id="email" type="email" name="email" value={this.state.email} label="Email" onChange={this.setEmail}/>
                    <InputCustom id="senha" type="password" name="senha" value={this.state.password} label="Senha" onChange={this.setPassword}/>
                    <ButtonCustom type="submit" label="Gravar" classN="pure-button pure-button-primary"/>
                </form>             
            </div>
        );
    }
}

class TableAuthors extends Component{

    render(){
        return (
            <div>            
                <table className="pure-table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>email</th>
                    </tr>
                  </thead>
                  <tbody>    
                    {
                      this.props.list.map(author => {
                        return <tr key={author.id}>
                          <td>{author.nome}</td>                
                          <td>{author.email}</td>                
                        </tr>
                      })
                    }
                  </tbody>
                </table> 
              </div>
        )
    }
}

export default class AuthorBox extends Component{

    constructor(){
        super();
        this.state = {list : []};
    }

    componentDidMount(){
        $.ajax({
            url: 'http://cdc-react.herokuapp.com/api/autores',
            type: 'GET',
            dataType: 'json'
        }).then(data => {
            this.setState({list:data});
        });

        PubSub.subscribe('list-authors-updated', (topic, newListing) => {
            this.setState({list: newListing});
        });
    }

    render(){
        return (
            <div id="mainAuthors">
                <Menu/>
                <div className="header">
                <h1>Cadastro de Autores</h1>
                </div>
                <div className="content" id="contentAuthor">
                    <FormAuthor/>
                    <TableAuthors list={this.state.list}/>
                </div>
            </div>
        );
    }
}