import { Firebase } from "../utils/Firebase";
import { Model } from "./Model";

export class Chat extends Model {
    constructor() {
        super();
    }

    get users() { return this._data.users; }
    set users(value) { this._data.users = value; }

    get timeStamp() { return this._data.timeStamp; }
    set timeStamp(value) { this._data.timeStamp = value; }


    static getRef() {
        return Firebase.db().collection('/chats');
    }

    static create(meEmail, contatcEmail) {
        return new Promise((resolve, reject) => {

            let users = {}

            users[btoa(meEmail)] = true;
            users[btoa(contatcEmail)] = true;

            Chat.getRef().add({
                users,
                timeStamp: new Date()
            }).then(doc => {
                Chat.getRef().doc(doc.id).get().then(chat => {
                    resolve(chat)
                })
            }).catch(err => {
                reject(err)
            });
        })
    }

    static find(meEmail, contatcEmail) {
        return Chat.getRef().where(btoa(meEmail), '==', true).where(btoa(contatcEmail), '==', true).get();

    }

    static createIfNotExists(meEmail, contatcEmail) {
        return new Promise((resolve, reject) => {
            Chat.find(meEmail, contatcEmail).then(chats => {
                if (chats.empty) {
                    Chat.create(meEmail, contatcEmail).then(chat => {  
                        resolve(chat);
                    }).catch(err => reject(err));
                } else {
                    chats.forEach(chat => {
                        resolve(chat);
                    });
                }
            }).catch(err => reject(err));
        });
    }
    
}