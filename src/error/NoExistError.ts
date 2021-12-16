class NoExistError extends Error {
    constructor(message: string){
        super(message);
        this.name = 'NoExistError'
    }
}

export default NoExistError