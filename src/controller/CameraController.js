export default class CameraController {
    // criando o construtor da classe que recebe o elemento do videoEl
    constructor(videoEl) {
        // crio um atributo privato 
        this._videoEl = videoEl;

        // api navigator para media, acessar a media do user com o getUserMedia
       //  passo o objeto video dizendo qual o tipo de midia
       // ele me retorna uma promessa
       // agora no then recebo o stream
        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(stream=>{
            console.log(stream)
            console.log(videoEl)
            videoEl.srcObject = stream;
            // como stream é um objeto e o videoEl não consegue let um objeto e sim o link 
            // transformo o objeto numa URL
           
        }).catch(err=>{
            console.error(err)
        })
    }
}