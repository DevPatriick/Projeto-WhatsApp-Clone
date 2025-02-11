const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');
const path = require('path');
pdfjsLib.GlobalWorkerOptions.workerSrc = path.resolve(__dirname, '../../dist/pdf.worker.bundle.js');




export class DocumentPreviewController {
    // recebe o file como paramentro e coloco dentro de um atributo privado
    constructor(file) {
        this._file = file;
    }

    // metodo para dar um preview na tela
    // retorno uma promessa que tem um switch se ve qual o tipo do arquivo que veio como parametro 
    getPreviewData() {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            switch (this._file.type) {
                case 'image/png':
                case 'image/jpeg':
                case 'image/jpg':
                case 'image/gif':
                    // caso eles sejam algum dos listados acima, uso o FileReader para ler estes arquivos
                    // instancio o File Reader

                    // se ele conseguir le carregar executa o resolve passando o src do arquivo e o nome dele
                    reader.onload = e => {
                        resolve({
                            src: reader.result,
                            info: this._file.name
                        })

                    }

                    // se der erro ele passa o reject com o erro que deu
                    reader.onerror = err => {
                        reject(err)
                    };

                    // agora eu leio o arquivo e transformo ele em um base 64
                    reader.readAsDataURL(this._file);
                    break;

                // caso ele seja um pdf 
                case 'application/pdf':


                    reader.onload = e => {

                        pdfjslib.getDocument(new Uint8Array(reader.result)).then(pdf => {
                            pdf.getPage(1).then(page => {
                                let viewport = page.getViewport(1);
                                let canvas = document.createElement('canvas');
                                let canvasContext = canvas.getContext('2d');
                                canvas.width = viewport.width;
                                canvas.height = viewport.height;

                                page.render({
                                    canvasContext,
                                    viewport
                                }).then(() => {

                                    let _s = (pdf.numPages >1) ? 's' : '';
                                   resolve({
                                    src: canvas.toDataURL('image/png'),
                                    info: `${pdf.numPages} página${_s}`
                                   })
                                }).catch(err=>{
                                    reject(err)
                                })
                            }).catch(err => {
                                reject(err)
                            })
                        }).catch(err => {
                            reject(err)
                        })
                    }

                    reader.readAsArrayBuffer(this._file)
                    break;

                // se não cair em nenhum caso da um reject
                default:
                    reject()
            }
        })
    }
}