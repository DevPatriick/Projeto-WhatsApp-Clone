import Format from './../utils/Format';
import CameraController from './CameraController.js';
import MicrophoneController from './MicrophoneController.js';
import { DocumentPreviewController } from './DocumentPreviewController.js';
import { Firebase } from '../utils/Firebase.js';
import User from '../model/User.js';

export default class WhatsAppController { // Criando a classe controller do WhatsApp
    constructor() {
        console.log('WhatsAppController Instanciado')

        this._firebase = new Firebase();
        this.initAuth();
        this.elementsPrototype(); // Chama o método que adiciona novos métodos aos elementos HTML
        this.loadElements(); // Metodo para carregador os elementos 
        this.initEvents(); // Método que inicializa os eventos

    }

    initAuth() {
        this._firebase.initAuth().
            then(response => {

                this._user = new User(response.user.email);

                this._user.on('datachange', data => {
                    document.querySelector('title').innerHTML = `${data.name} - WhatsApp Clone`;

                    this.el.inputNamePanelEditProfile.innerHTML = data.name;

                    if (data.photo) {
                        let photo = this.el.imgPanelEditProfile;
                        photo.src = data.photo;
                        photo.show();
                        this.el.imgDefaultPanelEditProfile.hide();


                        let photo2 = this.el.myPhoto.querySelector('img')
                        photo2.src = data.photo;
                        photo2.show();
                    }

                    this.initContacts();
                })

                this._user.name = response.user.displayName;
                this._user.email = response.user.email;
                this._user.photo = response.user.photoURL;

                this._user.save().then(() => {
                    this.el.appContent.css({
                        display: 'flex'
                    })
                })

            })
            .catch(err => {
                console.error(err)
            })
    }

    initContacts() {
        let div = document.createElement('div');



        this._user.on('contactschange', docs => {
            this.el.contactsMessagesList.innerHTML = ''

            docs.forEach(doc => {
                let contact = doc.data();
                div.className = 'contact-item';

                div.innerHTML = `
                                                    <div class="dIyEr">
                                                        <div class="_1WliW" style="height: 49px; width: 49px;">
                                                            <img src="#" class="Qgzj8 gqwaM photo" style="display:none;">
                                                            <div class="_3ZW2E">
                                                                <span data-icon="default-user" class="">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 212" width="212" height="212">
                                                                        <path fill="#DFE5E7" d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z">
                                                                        </path>
                                                                        <g fill="#FFF">
                                                                            <path d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z">
                                                                            </path>
                                                                        </g>
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="_3j7s9">
                                                        <div class="_2FBdJ">
                                                            <div class="_25Ooe">
                                                                <span dir="auto" title="${contact.name}" class="_1wjpf">${contact.name}</span>
                                                            </div>
                                                            <div class="_3Bxar">
                                                                <span class="_3T2VG">${contact.lastMessageTime}</span>
                                                            </div>
                                                        </div>
                                                        <div class="_1AwDx">
                                                            <div class="_itDl">
                                                                <span title="digitando…" class="vdXUe _1wjpf typing" style="display:none">digitando…</span>
    
                                                                <span class="_2_LEW last-message">
                                                                    <div class="_1VfKB">
                                                                        <span data-icon="status-dblcheck" class="">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18">
                                                                                <path fill="#263238" fill-opacity=".4" d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z">
                                                                                </path>
                                                                            </svg>
                                                                        </span>
                                                                    </div>
                                                                    <span dir="ltr" class="_1wjpf _3NFp9">${contact.lastMessage}</span>
                                                                    <div class="_3Bxar">
                                                                        <span>
                                                                            <div class="_15G96">
                                                                                <span class="OUeyt messages-count-new" style="display:none;">1</span>
                                                                            </div>
                                                                    </span></div>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                `
                if (contact.photo) {
                    let img = div.querySelector('.photo');
                    img.src = contact.photo;
                    img.show()
                }

                this.el.contactsMessagesList.appendChild(div)
            })
        })

        this._user.getContacts();
    }


    loadElements() { // Metodo para carregar os elementos


        this.el = {}  // el é um objeto que recebe cada um dos id

        document.querySelectorAll('[id]').forEach(element => { // Fazendo um forEach para percorrer todos os id do projeto element é o elemento que recebo do forEach
            this.el[Format.getCamelCase(element.id)] = element; // O atributo el recebe o id do elemento e faz o CamelCase dos ids

        })
    }

    elementsPrototype() { // metodo do prototype
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

        HTMLFormElement.prototype.getForm = function () { // HTMLFormElement busca os formulário
            // para saber qual lugar buscar o elemento no console posso passar meu elemento dentro do dir para ver ele como um objeto
            // dir(this.el.formPanelAddContact)
            return new FormData(this)
        }

        HTMLFormElement.prototype.toJSON = function () { // metodo para transformar o formData num json
            let json = {}; // crio o variavel json como um objeto

            this.getForm().forEach((value, key) => {  // faço um getForm para executar meu prototype, e faço um forEach em todos os campos, com a chave e o valor dela
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

        // Evento de clique no botão "Novo contato"
        this.el.btnNewContact.on('click', e => {
            this.closeAllLeftPanel() // Fecha todos os painéis da parte esquerda da tela
            this.el.panelAddContact.show() // Mostra o painel de adicionar contato 
            setTimeout(() => {
                this.el.panelAddContact.addClass('open'); // Adiciona a classe 'open'
            }, 300)

        });

        // Evento para fechar o painel de edição de perfil
        this.el.btnClosePanelEditProfile.on('click', e => {
            this.el.panelEditProfile.removeClass('open');
        });

        // Evento para fechar o painel de adicionar contato
        this.el.btnClosePanelAddContact.on('click', e => {
            this.el.panelAddContact.removeClass('open');
        })

        // Evento para clicar na foto do perfil e abrir o seletor de arquivos
        this.el.photoContainerEditProfile.on('click', e => { // campo da foto 
            this.el.inputProfilePhoto.click() // incluindo o clique para abrir a seleção de arquivos
        })

        // Evento para salvar a edição do perfil
        this.el.btnSavePanelEditProfile.on('click', e => {

            this.el.btnSavePanelEditProfile.disabled = true;

            this._user.name = this.el.inputNamePanelEditProfile.innerHTML;
            this._user.save().then(() => {
                this.el.btnSavePanelEditProfile.disabled = false;
            })
        })

        // Evento para capturar a tecla "Enter" ao editar o nome no perfil
        this.el.inputNamePanelEditProfile.on('keypress', e => { // keypress é usada quando o usuário clicar em algo no teclado
            if (e.key === 'Enter') {  // dentro do e tem o key que se for Enter executa a linha abaixo
                e.preventDefault(); // tira o comportação padrão de carregar a página
                this.el.btnSavePanelEditProfile.click()
            }
        });

        this.el.formPanelAddContact.on('submit', e => { // quando o formulário for enviado submit
            e.preventDefault(); // tira o comportação padrão de carregar a página
            let formData = new FormData(this.el.formPanelAddContact); // o form data busca todos os dados do formulário para eu não precisar buscar cada campo do forms
            let contact = new User(formData.get('email'))

            contact.on('datachange', data => {
                if (data.name) {
                    this._user.addContact(contact).then(() => {
                        this.el.btnClosePanelAddContact.click()
                        console.info('Contato adicionado')

                    })
                } else {
                    console.error('Usuário não encontrado')
                }
            })


        })

        // Evento para exibir a tela de conversa ao clicar em um contato
        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item => {
            item.on('click', e => {
                this.el.main.css({
                    display: 'flex'
                })
                this.el.home.css({
                    display: 'none'
                })
            })
        })

        // Evento para exibir o menu de anexos ao clicar no botão de anexar
        this.el.btnAttach.on('click', e => {
            e.stopPropagation(); // Impede que o evento se propague para outros elementos
            this.el.menuAttach.addClass('open');
            document.addEventListener('click', this.closeMenuAttach.bind(this)) // Adiciona evento para fechar o menu ao clicar fora
        })

        // Eventos para os botões de anexos (apenas exibem mensagens no console por enquanto)
        this.el.btnAttachPhoto.on('click', e => {
            this.el.inputPhoto.click(); // simula o click no botão
        });

        // aqui ele percorre toda a coleção com o spread, buscando cada file
        this.el.inputPhoto.on('change', e => {
            console.log(this.el.inputPhoto.files);

            [...this.el.inputPhoto.files].forEach(file => {
                console.log(file)
            })
        })

        // abre o botão da camera e remove outros elementos que estao no closeAllMainPanel
        this.el.btnAttachCamera.on('click', e => {
            this.closeAllMainPanel();
            this.el.panelCamera.addClass('open');
            this.el.panelCamera.css({
                height: 'calc(130% - 120px )'
            })

            // instanciando minha camera e passando o elemento onde o video vai ser executado
            this._camera = new CameraController(this.el.videoCamera);
        });

        // fecha a camera e da um show nas mensagens
        this.el.btnClosePanelCamera.on('click', e => {
            this.el.panelCamera.removeClass('open');
            this.el.panelMessagesContainer.show();
            this._camera.stop();
        })

        // tira a foto
        this.el.btnTakePicture.on('click', e => {
            // chamando o metodo quando eu clicar no botão de tirar a foto
            // com isso ele me retorna a imagem
            let dataUrl = this._camera.takePicture();

            // passando a imagem que veio do takePicture para dentro do meu elemento
            this.el.pictureCamera.src = dataUrl;
            // agora eu mostro o meu elemento com a minha imagem
            this.el.pictureCamera.show();
            // ocultando o video
            this.el.videoCamera.hide();
            // aparecendo o botão para tirar a foto novamente 
            this.el.btnReshootPanelCamera.show();
            // ocultar o botão de tirar a foto
            this.el.containerTakePicture.hide();
            // mostrar o botão de enviar a foto
            this.el.containerSendPicture.show();

        })

        this.el.btnReshootPanelCamera.on('click', e => {
            // tira o elemento que mostra a imagem
            this.el.pictureCamera.hide();
            // mostra o video para tirar a foto
            this.el.videoCamera.show();
            // tira o botão de tentar outra foto
            this.el.btnReshootPanelCamera.hide();
            // mostra o botão de tirar foto
            this.el.containerTakePicture.show();
            // oculta o botão de enviar a foto
            this.el.containerSendPicture.hide();

        })

        // evento para enviar a imagem
        this.el.btnSendPicture.on('click', e => {
            console.log(this.el.pictureCamera.src)
        })


        // abre o elemento de escolher os documentos
        this.el.btnAttachDocument.on('click', e => {
            this.closeAllMainPanel()
            this.el.panelDocumentPreview.addClass('open')
            this.el.panelDocumentPreview.css({
                height: 'calc(130% - 120px )'
            })
            this.el.inputDocument.click();
        });


        // O evento change é acionado quando o valor de um elemento de entrada (<input>) muda.
        this.el.inputDocument.on('change', e => {

            // se o input for true ele executa o codigo abaixo
            if (this.el.inputDocument.files.length) {

                this.el.panelDocumentPreview.addClass('open')
                this.el.panelDocumentPreview.css({
                    height: '1%'
                })

                // file recebe os files que vem no pc do user
                let file = this.el.inputDocument.files[0];

                // crio um atributo que vai receber a minha classe para mostrar o documentos na tela
                // a classe recebe como paramentro o meu file para tratar o arquivo
                this._documentPreviewController = new DocumentPreviewController(file);

                // aqui é o retorno da minha promessa
                this._documentPreviewController.getPriviewData().then(result => {
                    // console.log(data)
                    // dentro do elemento que aparece o preview passo com o atributo src para aparecer a imagem
                    this.el.imgPanelDocumentPreview.src = result.src;
                    // incluo o nome do arquivo 
                    this.el.infoPanelDocumentPreview.innerHTML = result.info;
                    this.el.imagePanelDocumentPreview.show();
                    this.el.filePanelDocumentPreview.hide();

                    this.el.panelDocumentPreview.addClass('open')
                    this.el.panelDocumentPreview.css({
                        height: 'calc(130% - 120px )'
                    })


                }).catch(err => {
                    console.log(file.type);

                    this.el.panelDocumentPreview.addClass('open')
                    this.el.panelDocumentPreview.css({
                        height: 'calc(130% - 120px )'
                    })
                    // caso não nenhum dos arquivos cai neste outro switch que ve o tipo do arquivo
                    // aqui utilizei apenas um caso
                    // se for video/mp4 aparece a imagem de um documento, apenas para test
                    switch (file.type) {

                        case 'video/mp4':
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-doc';
                            break;

                        // caso não tenha nenhum dos arquivos acima aparece uma imagem generica
                        default:
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-generic';
                            break
                    }
                    this.el.filenamePanelDocumentPreview.innerHTML = file.name
                    this.el.imagePanelDocumentPreview.hide();
                    this.el.filePanelDocumentPreview.show();

                })
            }
        })

        // fecha o elemento de escolher os documentos
        this.el.btnClosePanelDocumentPreview.on('click', e => {
            this.el.panelDocumentPreview.removeClass('open');
            this.el.panelMessagesContainer.show();

        })

        // envia o documento
        this.el.btnSendDocument.on('click', e => {
            console.log(`Evento`)
        })

        // mostra os contatos
        this.el.btnAttachContact.on('click', e => {
            this.el.modalContacts.show()
        });

        // retira o modal dos contatos
        this.el.btnCloseModalContacts.on('click', e => {
            this.el.modalContacts.hide()
        })

        // inicia a gravação do audio
        this.el.btnSendMicrophone.on('click', e => {
            this.el.recordMicrophone.show();
            this.el.btnSendMicrophone.hide();
            this._microphoneController = new MicrophoneController();



            this._microphoneController.on('ready', musica => {
                console.log(musica)
                this._microphoneController.startRecorder();
            })

            this._microphoneController.on('timer', timer => {
                this.el.recordMicrophoneTimer.innerHTML = Format.toTime(timer);
            })
        })

        // envia o audio
        this.el.btnFinishMicrophone.on('click', e => {
            this._microphoneController.stopRecorder();
            this.closeRecordMicrophone();
        })

        // cancela o audio
        this.el.btnCancelMicrophone.on('click', e => {

            this._microphoneController.stopRecorder();
            this.closeRecordMicrophone();

        })


        // quando qualquer tecla for solta ele faz a validação se o inputText está true ou false
        // se for true executa o primeiro if 
        this.el.inputText.on('keyup', e => {
            if (this.el.inputText.innerHTML.length) {
                this.el.inputPlaceholder.hide();
                this.el.btnSendMicrophone.hide();
                this.el.btnSend.show()
            } else {
                this.el.inputPlaceholder.show();
                this.el.btnSendMicrophone.show();
                this.el.btnSend.hide();
            }
        })

        // ao clicar no btnSend ele faz um console.log do valor digitado e zera o valor
        this.el.btnSend.on('click', e => {
            console.log(this.el.inputText.innerHTML);
            this.el.inputText.innerHTML = '';

        })

        // ao precionar enter executa o if e da um console do valor digitado e limpa o campo de texto
        this.el.inputText.on('keypress', e => {
            if (e.key === 'Enter') {
                console.log(this.el.inputText.innerHTML);
                e.preventDefault()
                this.el.inputPlaceholder.click();
                this.el.inputText.innerHTML = '';
            }
        })

        // configurando o botão para abrir e fechear os emojis
        this.el.btnEmojis.on('click', e => {
            this.el.panelEmojis.toggleClass('open')
        })

        // ao clicar no emoji ele aparece no console
        // faz um forEach de cada emoji e configurando o evento para que ele busque o emoji clicado e
        // exiba no console
        this.el.panelEmojis.querySelectorAll('.emojik').forEach(emoji => {
            emoji.on('click', e => {
                console.log(emoji.dataset.unicode)
                // img recebe o clone do emoji para adicionar ao texto
                let img = this.el.imgEmojiDefault.cloneNode();

                // neste trecho copio o estilo css, o dataset unicode que seria o emoji
                img.style.cssText = emoji.style.cssText;
                img.dataset.unicode = emoji.dataset.unicode;
                img.alt = emoji.dataset.unicode;

                // busca o nome da classe do emoji e adicionar na img o nome da classe do emoji
                emoji.classList.forEach(name => {
                    img.classList.add(name);
                })

                // adiciona o emoji no textp
                // this.el.inputText.appendChild(img);

                // serve para pegar a posição do cursos atual
                let cursor = window.getSelection();

                // se o campo que o user estiver digitando não for o inputText ele foca no inputText
                if (!cursor.focusNode.id || !cursor.focusNode.id == 'inputText') {
                    this.el.inputText.focus();
                    cursor;
                }

                // cria um intervalo para manipular o texto
                let range = document.createRange();

                // busca a posição atual do cursor
                range = cursor.getRangeAt(0);
                // limpa o texto selecionado pelo user
                range.deleteContents();
                // cria um documento vazio para incluir depois no campo texto
                let frag = document.createDocumentFragment();
                frag.appendChild(img);
                // coloca a imagem do fragmento na posição exata
                range.insertNode(frag);
                // ajusta o cursor para depois da imagem incluida
                range.setStartAfter(img)



                // força com que o javascript execute o evento ao clicar ou soltar o botão
                this.el.inputText.dispatchEvent(new Event('keyup'));


            })
        })






    };


    closeRecordMicrophone() {
        this.el.recordMicrophone.hide();
        this.el.btnSendMicrophone.show();

    }

    // fecha alguns elementos para não fica repetitivo 
    closeAllMainPanel() {
        this.el.panelMessagesContainer.hide();
        this.el.panelDocumentPreview.removeClass('open');
        this.el.panelCamera.removeClass('open');
    }

    // Método para fechar o menu de anexos
    closeMenuAttach(event) {
        document.removeEventListener('click', this.closeMenuAttach)
        this.el.menuAttach.removeClass('open');
    }

    closeAllLeftPanel() { // metodo para fechar os paineis do lado esquerdo da tela
        this.el.panelAddContact.hide();
        this.el.panelEditProfile.hide();
    };


};

