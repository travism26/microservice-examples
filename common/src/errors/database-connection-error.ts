import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
    // This class is little verbose and it mainly used as an
    // a second example to look at beond just the other error class.
    reason = 'Error connecting to database';
    statusCode = 500;
    constructor() {
        // this is just for logging purposes on our server logs
        super('Error connecting to database');

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [{ message: this.reason }];
    }
}
