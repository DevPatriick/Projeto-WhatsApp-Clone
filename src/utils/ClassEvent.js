export class ClassEvent {  // Define uma classe chamada ClassEvent e a exporta (para ser usada em outros arquivos)
    constructor() { 
        this._event = {};  // Cria um objeto vazio que armazenará os eventos e suas funções associadas
    }

    on(eventName, fn) {  // Método para registrar uma função que será executada quando um evento ocorrer
        if (!this._event[eventName]) this._event[eventName] = new Array(); // Se o evento ainda não existir, cria um array para armazenar funções

        this._event[eventName].push(fn);  // Adiciona a função ao array do evento correspondente
    }

    trigger() {  
        let args = [...arguments];  // Converte os argumentos passados em um array
        let eventName = args.shift();  // Remove e guarda o primeiro item do array, que é o nome do evento

        args.push(new Event(eventName));  // Adiciona um objeto `Event` no final do array para representar o evento

        if (this._event[eventName] instanceof Array) {  // Verifica se há funções registradas para esse evento
            this._event[eventName].forEach(fn => {  // Percorre todas as funções associadas ao evento
               fn.apply(null, args);  // Executa cada função passando os argumentos recebidos
            });
        }
    }
}
