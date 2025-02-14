import { Firebase } from "./Firebase";

export class Upload {
    static send(file, from) {
        return new Promise((resolve, reject) => {
            if (!file || !(file instanceof File)) {
                reject("File is missing or invalid");
                return;
            }

            let fileName = Date.now() + '_' + file.name;

            let uploadTask = Firebase.hd().ref(from).child(fileName).put(file);

            uploadTask.on('state_changed', e => {
                console.info(e);
            }, err => {
                reject(err); // Passando o erro para o reject
            }, () => {
                resolve(uploadTask.snapshot);
            });
        });
    }
}
