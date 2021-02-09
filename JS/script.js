let validation = new Validation();
let form = document.getElementById('form_register');
let submit = document.getElementById('bottom_submit');


class Validation {

    constructor() { 
        this.validation = [
            'data-required',
            'data-min-length',
            'data-max-length',
            'data-email-validate',
            'data-only-letters',
            'data-equal',
            'data-password-validate'
            
        ]
    }
    // iniciar validação de todos os dados
    validation(form) {

        // resgata todas as validações
        let currentValidation = document.querySelectorAll('form .error-validation');

        if (currentValidation.length > 0) {
            this.cleanValidation(currentValidation);
        }


        //pegar os inputs
        let inputs = form.getElementsByTagName('input');

        //tranformo uma HTML Collection -> array
        let inputsArray = [...inputs];

        //loop nos input e validação ao que for encontrado
        inputsArray.forEach(function(input){
            console.log('input'); 

            //loop em todas as validações
            for(let i = 0; this.validation.length > i; i++) {

                //verifica se a validação atual  existe no input
                if(input.getAttribute(this.validation[i]) != null ) {

                    //data-min-length > minlength (ou seja, estou lipando a string para virar um método)
                    let method = this.validation[i].replace('data','').replace('-','');

                    // valor do input
                    let value = input.getAttribute(this.validation[i]);

                    //invocando o método
                    this[method](input, value);

                }
            }

        }, this);
    }

    //verifica se um input tem o n° minimo de caracteres
    minlength(input, minValue){

        let inputLength = input.value.length;
    
        errorMessage = 'Esse campo necessita ter pelo menos ${minValue} caracteres';
    
        if(inputLength < minValue) {
            this.printMessage(input, errorMessage);
        }
    
    }

    //verifica se o input passou do limite de caracteres
    maxlength(input, maxValue) {

        let inputLength = input.value.length;
    
        errorMessage = 'Esse campo necessita ter pelo menos ${maxValue} caracteres';
    
        if(inputLength > maxValue) {
            this.printMessage(input, errorMessage);
        }


    }

    //valida email
    emailvalidate(input) {
        
        //email@email.com
        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = 'insira o e-mail de acordo com o padrão alvaro@gmail.com';

        if(!re.test(email)) {
            this.printMessage(input, errorMessage);
        }

    }

    //valida apenas letras 
    onlyletter(input) {

        //apenas letras maiusculas e minusculas
        let re = /^[A-Za-z]+$/;

        let inputValue = input.value;

        let errorMessage = 'Inserir apenas LETRAS'

        if(!re.test(inputValue)) {
            this.printMessage(input, errorMessage);
        }



    }

    // metódo utilizado para imprimir mensagens de erro
    printMessage(input, msg) {

        //Quantida de erros por input

        let errorQty = input.parentNode.querySelector('.error-validation');

        if(errorQty === null) {

            let template = document.querySelector('error_validation').cloneNode(true); 

            template.textContent = msg;

            let inputParent = input.parentNode;

            template.classlist.remove('template');

            inputParent.appendChild(template);
        }

    }

    //verifica se o input é requirido
    required(input) {

        let inputValue = input.value;

        if(inputValue === '') {

            let errorMessage = 'Esse campo é obrigatório';

            this.printMessage(input, errorMessage);
        }
    }

    //verifica se dois campos são igual, no caso os da senha 

    equal(input, inputName) {

        let inputToCompare = document.getElementsByName(inputName)[0];


        let errorMessage = 'Sua senha deve ser a mesma que a ${inputName} ';

        if(input.value != inputToCompare.value) {
            this.printMessage(input, errorMessage);
        }

    }

    //valida o campo de senha
    passwordvalidate(input) {

        // transformar string em array
        let charArr = input.value.split('');

        let uppercases = 0;
        let numbers = 0;

        for(let i=0; charArr.length > i; i++) {
            if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
                uppercases++;
            } else if (!isNaN(parseInt(charArr[i]))) {
                numbers++;
            }
        }
    }

    //limpa as validações
    cleanValidation(validation) {validation.forEach( el => el.remove()); }

}


// TRIGGER VALIDATIONS 

// envento que dispara validações
submit.addEventListener('click', function(e) {

    e.preventDefault();
    

    // function error
    validation.validate(form);

});




 