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
        }).then(stream => {

            this._stream = stream;
            console.log(stream)
            console.log(videoEl)
            videoEl.srcObject = stream;
            console.log(videoEl)
            // como stream é um objeto e o videoEl não consegue let um objeto e sim o link 
            // transformo o objeto numa URL

        }).catch(err => {
            console.error(err)
        })
    }

    stop() {
        this._stream.getTracks().forEach(track => {
            track.stop()
        })
    }

    // tirar a foto com o canvas
    // este metodo retorna o tipo de imagem image/png
    takePicture(mimeType = 'image/png') {

        // criando o canvas como se fosse uma folha em branco para desenharmos a imagem tirada
        let canvas = document.createElement('canvas');

        // difinindo a altura e largura com o setAttribute
        canvas.setAttribute('height', this._videoEl.videoHeight);
        canvas.setAttribute('width', this._videoEl.videoWidth);

        // falando o contexto para o canvas que no caso é em 2d
        let context = canvas.getContext('2d'); // passando o contexto dentro da variavel context
        // primeiro parametro eu digo o que eu quero desenhar, neste caso é o momento que eu clicar no botão que o video
        // esta aparecendo, segundo e terceiro parametro eu digo a partir de onde eu quero desenhar
        // 0 no x e 0 no y.
        context.drawImage(this._videoEl, 0, 0, canvas.width, canvas.height); // a partir do meu contexto vou desenhar a imagem;
    console.log(context);
    console.log(canvas);

        // agora eu retorno o canvas em base 64
        // com isso eu uso o toDataURL e passo o tipo de imagem que no caso é o mimeType
        return canvas.toDataURL(mimeType);
    }
}