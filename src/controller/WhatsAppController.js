


class WhatsAppController { // Criando a classe controller do WhatsApp
    constructor() {
        console.log('Deu bom')


        this.loadElements(); // Metodo para carregador os elementos 
    }


    loadElements() { // metodo para carregar os elementos


        this.el = {}  // el é um objeto que recebe cada um dos id

        document.querySelectorAll('[id]').forEach(element => { // fazendo um forEach para percorrer todos os id do projeto element é o elemento que recebo do forEach
            this.el[Format.getCamelCase(element.id)] = element; // o atributo el recebe o id do elemento e faz o CamelCase dos ids

        })
    }
}