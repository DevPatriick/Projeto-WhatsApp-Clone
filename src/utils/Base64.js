export class FormatBase64 {

    static getMimeType(base64URL){

        let regex = /^data:(.+);base64,(.*)$/;
        let result = base64URL.match(regex);
        return result[1];

    }

    static async toFile(base64URL){

        let mimeType = FormatBase64.getMimeType(base64URL);
        let ext = mimeType.split('/')[1];
        let filename = `file${Date.now()}.${ext}`;

        const res = await fetch(base64URL);
        const buf = await res.arrayBuffer();
        return new File([buf], filename, { type: mimeType });

    }

}