class WhatsAppController { // Criando a classe controller do WhatsApp
    constructor() {
        console.log('Deu bom')

        this.elementsPrototype();
        this.loadElements(); // Metodo para carregador os elementos 
    }


    loadElements() { // metodo para carregar os elementos


        this.el = {}  // el é um objeto que recebe cada um dos id

        document.querySelectorAll('[id]').forEach(element => { // fazendo um forEach para percorrer todos os id do projeto element é o elemento que recebo do forEach
            this.el[Format.getCamelCase(element.id)] = element; // o atributo el recebe o id do elemento e faz o CamelCase dos ids

        })
    }

    elementsPrototype(){
        Element.prototype.hide = function(){ // Element é a classe base para todos os elementos HTML no DOM, prototype adiciona metodos e propriedades para todos os elementos HTML 
            // ao chamar esta função ele tira da tela o elemento que receber o prototype hide
            this.style.display = 'none';
            return this; // Retorna o próprio elemento para permitir encadeamento de métodos.
        }

        Element.prototype.show = function(){
            this.style.display = 'block';
            return this;
        }

        Element.prototype.toggle = function(){
            this.style.display = (this.style.display === 'none') ? 'block' : 'none';
            // Verifica se o elemento está oculto ('none'). Se estiver, ele será mostrado ('block');
            // Caso contrário, ele será ocultado ('none').
            return this; // Retorna o próprio elemento para permitir encadeamento de métodos.
        }

        Element.prototype.on = function(events, fn){
            events.split(' ').forEach(event=>{
                this.addEventListener(event, fn)
            })
            return this;
        }

        Element.prototype.css = function(styles){
            for (let name in styles){
                 // Aplica estilos CSS diretamente ao elemento. Ex: { color: 'red', fontSize: '16px' }
                 // cada name vai receber o style 
                 // styel[name] recebe styles[name]
                this.style[name] = styles[name];
            }
            return this;
        }

        Element.prototype.addClass = function(name){
            // O método 'addClass' adiciona uma classe CSS ao elemento.
           this.classList.add(name); // Adiciona a classe ao elemento.
           return this;
        }

        Element.prototype.removeClass = function(name){
            // O método 'removeClass' remove uma classe CSS do elemento.
            this.classList.remove(name); // Remove a classe do elemento.
            return this;
        }

        Element.prototype.toggleClass = function(name){
            // O método 'toggleClass' alterna a classe CSS no elemento.
            // Se a classe existir, ela será removida; se não existir, ela será adicionada.
            this.classList.toggle(name)
            return this;
        }

        Element.prototype.hasClass = function(name){
            return this.classList.contains(name)
        }
    }
}