import PubSub from 'pubsub-js';

export default class ManageErros{
    publishErros(objErros){
        try{
            let amountErros = objErros.responseJSON.errors.length;
            let erros = objErros.responseJSON.errors;
            for(let e=0; e < amountErros; e++){
                let error = erros[e];
                PubSub.publish("errors-validation-form", error);
            }
        }
        catch(e){
            console.log("(500) Error in server response: " + e.name);
            PubSub.publish( "errors-validation-form", "Erro de conexão com o servidor, tente novamente mais tarde. (500)" );
        }
    }
}
