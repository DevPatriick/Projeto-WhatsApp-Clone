class Format { // Arquivo util de formatação
    static getCamelCase(text){ // criando um metodo estatico para ser chamado de fora da classe

        let div = document.createElement('div'); // Criando um HTML para servir como container 

        div.innerHTML = `<div data-${text}='id'></div>` // inserindo outra div com a propriedade data- e o text que vem como parametro

        return Object.keys(div.firstChild.dataset)[0]; // retorna a lista de chaves do primeiro filho da div na posição 0

        // Para testar se deu certo, no console eu acesso o app que esta na window e depois acesso o el que declaro no WhatsAppController
        // app.el retorna todos os id em CamelCase
    }

    // duration são os milisegundos que ele recebe
    // dividindo por 1000 tenho os segundos
    // % 60 tem 60 segundo dentro de 1 min
    // e assim segue a logica
    static toTime(duration){
        let seconds = parseInt((duration / 1000) % 60);
        let minutes = parseInt((duration / (1000 * 60)) % 60);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        // se a hora for maior que 0 retorna o tempo com as horas
        // os minutos caso seja apenas um numero, transformo em string e passo 
        // o padStart com dois digitos sendo que se não tiver o primeiro passo como '0'
        if(hours > 0){
            return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        } else {
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        }
    }
}