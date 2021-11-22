class Message{
    #timestamp;
    #text;

    // marks the message with the current timestamp upon creation
    constructor(text){
        this.#timestamp = new Date();
        this.#text = text;
    }

    getTime(){
        return this.#timestamp.toString();
    }

    getText(){
        return this.#text;
    }
}

export default Message;