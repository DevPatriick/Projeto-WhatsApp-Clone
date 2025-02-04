class WhatsAppController { // Criando a classe controller do WhatsApp
    constructor() {
        console.log('Deu bom')

        this.elementsPrototype();
        this.loadElements(); // Metodo para carregador os elementos 
        this.initEvents();
    }


    loadElements() { // metodo para carregar os elementos


        this.el = {}  // el é um objeto que recebe cada um dos id

        document.querySelectorAll('[id]').forEach(element => { // fazendo um forEach para percorrer todos os id do projeto element é o elemento que recebo do forEach
            this.el[Format.getCamelCase(element.id)] = element; // o atributo el recebe o id do elemento e faz o CamelCase dos ids

        })
    }

    elementsPrototype() {
        Element.prototype.hide = function () { // Element é a classe base para todos os elementos HTML no DOM, prototype adiciona metodos e propriedades para todos os elementos HTML 
            // ao chamar esta função ele tira da tela o elemento que receber o prototype hide
            this.style.display = 'none';
            return this; // Retorna o próprio elemento para permitir encadeamento de métodos.
        }

        Element.prototype.show = function () {
            this.style.display = 'block';
            return this;
        }

        Element.prototype.toggle = function () {
            this.style.display = (this.style.display === 'none') ? 'block' : 'none';
            // Verifica se o elemento está oculto ('none'). Se estiver, ele será mostrado ('block');
            // Caso contrário, ele será ocultado ('none').
            return this; // Retorna o próprio elemento para permitir encadeamento de métodos.
        }

        Element.prototype.on = function (events, fn) {
            events.split(' ').forEach(event => {
                this.addEventListener(event, fn)
            })
            return this;
        }

        Element.prototype.css = function (styles) {
            for (let name in styles) {
                // Aplica estilos CSS diretamente ao elemento. Ex: { color: 'red', fontSize: '16px' }
                // cada name vai receber o style 
                // styel[name] recebe styles[name]
                this.style[name] = styles[name];
            }
            return this;
        };

        Element.prototype.addClass = function (name) {
            // O método 'addClass' adiciona uma classe CSS ao elemento.
            this.classList.add(name); // Adiciona a classe ao elemento.
            return this;
        };

        Element.prototype.removeClass = function (name) {
            // O método 'removeClass' remove uma classe CSS do elemento.
            this.classList.remove(name); // Remove a classe do elemento.
            return this;
        };

        Element.prototype.toggleClass = function (name) {
            // O método 'toggleClass' alterna a classe CSS no elemento.
            // Se a classe existir, ela será removida; se não existir, ela será adicionada.
            this.classList.toggle(name)
            return this;
        };

        Element.prototype.hasClass = function (name) {
            return this.classList.contains(name)
        };

        HTMLFormElement.prototype.getForm = function(){ // HTMLFormElement busca os formulário
            // para saber qual lugar buscar o elemento no console posso passar meu elemento dentro do dir para ver ele como um objeto
            // dir(this.el.formPanelAddContact)
            return new FormData(this)
        }

        HTMLFormElement.prototype.toJSON = function(){ // metodo para transformar o formData num json
            let json = {}; // crio o variavel json como um objeto

            this.getForm().forEach((value, key)=>{  // faço um getForm para executar meu prototype, e faço um forEach em todos os campos, com a chave e o valor dela
                // key seria o meu campo e o value o valor do campo, ele passa por todos os campos e atribui o valor de cada um
                json[key] = value;
            })

            return json; // retorna o json
        }
    };

    initEvents() { // metodo para inicializar meus eventos
        this.el.myPhoto.on('click', e => { // detnro dos elementos busco o my-photo que foi convertido para CamelCase myPhoto e passo o on 
            // que é do prototype para adicionar os eventos, quando clicar neste elemento
            // vai fechar todos os paineis que estão dentro do metodo closeAllLeftPanel() 
            this.closeAllLeftPanel();
            // Aqui vai dar um show, para aparecer o elemento panelEditProfile(), show que esta vindo do prototype
            this.el.panelEditProfile.show();
            // aqui tem um delay para que o efeito do css apareça na tela
            setTimeout(() => {
                // adiciono a classe open no elemento depois de 300 milisegundos
                this.el.panelEditProfile.addClass('open');
            }, 300)

        });

        this.el.btnNewContact.on('click', e => {
            this.closeAllLeftPanel()
            this.el.panelAddContact.show()
            setTimeout(() => {
                this.el.panelAddContact.addClass('open');
            }, 300)

        });

        this.el.btnClosePanelEditProfile.on('click', e => {
            this.el.panelEditProfile.removeClass('open');
        });

        this.el.btnClosePanelAddContact.on('click', e => {
            this.el.panelAddContact.removeClass('open');
        })

        this.el.photoContainerEditProfile.on('click', e=>{ // campo da foto 
            this.el.inputProfilePhoto.click() // incluindo o clique para abrir a seleção de arquivos
        })

        this.el.btnSavePanelEditProfile.on('click', e=>{
            console.log(`Digitou: ${this.el.inputNamePanelEditProfile.innerHTML}`)
        })

        this.el.inputNamePanelEditProfile.on('keypress', e=>{ // keypress é usada quando o usuário clicar em algo no teclado
            if(e.key === 'Enter'){  // dentro do e tem o key que se for Enter executa a linha abaixo
                e.preventDefault(); // tira o comportação padrão de carregar a página
                this.el.btnSavePanelEditProfile.click()
            }
        });

        this.el.formPanelAddContact.on('submit', e=>{ // quando o formulário for enviado submit
            e.preventDefault(); // tira o comportação padrão de carregar a página
            let formData = new FormData(this.el.formPanelAddContact); // o form data busca todos os dados do formulário para eu não precisar buscar cada campo do forms
            
        })

    };

    closeAllLeftPanel() { // metodo para fechar os paineis do lado esquerdo da tela
        this.el.panelAddContact.hide();
        this.el.panelEditProfile.hide();
    };


};

