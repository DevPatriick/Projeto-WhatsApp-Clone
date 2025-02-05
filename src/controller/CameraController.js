class CameraController {
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
            // como stream é um objeto e o videoEl não consegue let um objeto e sim o link 
            // transformo o objeto numa URL
            this._videoEl.scr = URL.createObjectURL(stream);
            // força o video a tocar
            this._videoEl.play();
        }).catch(err=>{
            console.error(err)
        })
    }
}