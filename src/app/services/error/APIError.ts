class APIError extends Error {
    status: number
    constructor(message: any ,status: number){
        super(message);
        this.status = status;
    }
};

export default APIError;