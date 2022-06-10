export class ApiErrorResponse {
    status = false;
    result = null;
    message;
    errorCode;
  
    constructor(message, errorCode, result = null) {
      this.message = message;
      this.errorCode = errorCode;
      this.result = result;
    }
  }