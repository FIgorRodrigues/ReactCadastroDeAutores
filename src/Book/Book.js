import React, {Component} from 'react';
import InputCustom from '../components/InputCustom';
import SelectCustom from '../components/SelectCustom';
import ButtonCustom from '../components/ButtonCustom';
import $ from 'jquery';

export class Book extends Component{

    constructor(){
        super();
        this.state = {
            title : '',
            price : 0,
            authorId : '',
            listAuthor : []
        };
    
        this.setTitle = this.setTitle.bind(this);
        this.setPrice = this.setPrice.bind(this);
        this.setAuthorId = this.setAuthorId.bind(this);
        this.sendForm = this.sendForm.bind(this);
    }


    sendForm(e){
        e.preventDefault();
        $.ajax({
            url: 'https://cdc-react.herokuapp.com/api/livros',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                titulo : this.state.title,
                preco : this.state.price,
                autorId : this.state.authorId
            })
        }).then(data => {
            console.log(data);
        });
    }

    setTitle(e){
        this.setState({title: e.target.value});
    }

    setPrice(e){
        this.setState({price: e.target.value});
    }

    setAuthorId(e){
        this.setState({authorId: e.target.value});
    }

    componentDidMount(){
        $.ajax({
            url: 'http://cdc-react.herokuapp.com/api/autores',
            type: 'GET',
            dataType: 'json'
        }).then(data => {
            this.setState({listAuthor : data});
        });
    }

    render(){
        return (
            <div id="mainBook">
                <div className="header">
                    <h1>Cadastro de Livros</h1>
                </div>
                <div className="content" id="contentBook">
                    <form className="pure-form pure-form-aligned" method="post" onSubmit={this.sendForm}>
                        <InputCustom id="title" type="text" name="title" value={this.state.title} label="Título" onChange={this.setTitle}/>
                        <InputCustom id="price" type="number" name="price" value={this.state.price} label="Preço" onChange={this.setPrice}/>
                        <SelectCustom id="author" name="author" label="Autor" listAuthor={this.state.listAuthor} onChange={this.setAuthorId}/>
                        <ButtonCustom type="submit" classN="pure-button pure-button-primary" label="Cadastrar"/>
                    </form>
                </div>
            </div>
        );
    }
}