export default class MicrophoneController{
    constructor(){
       // api navigator para media, acessar a media do user com o getUserMedia
        //  passo o objeto video dizendo qual o tipo de midia
        // ele me retorna uma promessa
        // agora no then recebo o stream
        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(stream => {
            this._stream = stream;
            let audio = new Audio();
            audio.srcObject = stream;
            // como stream é um objeto e o videoEl não consegue let um objeto e sim o link 
            // transformo o objeto numa URL
            audio.play()

        }).catch(err => {
            console.error(err)
        })
    }

    stop() {
        this._stream.getTracks().forEach(track => {
            track.stop()
        })
    }
}