class Format { // Arquivo util de formatação
    static getCamelCase(text){ // criando um metodo estatico para ser chamado de fora da classe

        let div = document.createElement('div'); // Criando um HTML para servir como container 

        div.innerHTML = `<div data-${text}='id'></div>` // inserindo outra div com a propriedade data- e o text que vem como parametro

        return Object.keys(div.firstChild.dataset)[0]; // retorna a lista de chaves do primeiro filho da div na posição 0

        // Para testar se deu certo, no console eu acesso o app que esta na window e depois acesso o el que declaro no WhatsAppController
        // app.el retorna todos os id em CamelCase
    }
}