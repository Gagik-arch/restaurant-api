export class ApiError extends Error {
    code;
    data;
    status = false
    constructor(message, errorCode) {
        super(message)
        this.name = this.constructor.name;
        this.code = errorCode
    }
    setData(data) {
        this.data = data
        return this
      }
}

export class UserNotFoundError extends ApiError {
    constructor() {
        super("User not found", "USER_NOT_FOUND")
    }
}
export class ActionNotAllowedError extends ApiError {
  constructor() {
    super("Action not allowed", "ACTION_NOT_ALLOWED")
  }
}

export class InvalidCredentialsError extends ApiError {
    constructor() {
        super("Invalid creadentials", "INVALID_CREDENTIALS")
    }
}
export class InvalidFileTypeError extends ApiError {
    constructor() {
      super("Invalid file type", "INVALID_FILE_TYPE")
    }
  }
export class TokenExpired extends ApiError {
    constructor() {
      super("Token expired", "TOKEN_EXPIRED")
    }
  }

export class UserExistsError extends ApiError {
    constructor(message) {
        super(message ?? "User already exists", "DUPLICATE_FOUND")
    }
}

export class FollowExistsError extends ApiError {
  constructor() {
      super("Follow already exists", "DUPLICATE_FOUND")
  }
}

export class TagExistsError extends ApiError {
  constructor() {
      super("Tag already exists", "DUPLICATE_FOUND")
  }
}

export class NotFoundError extends ApiError {
    constructor(message) {
        super(message ?? "Not found", "NOT_FOUND")
    }
}

export class RequiredFieldError extends ApiError {
    constructor(message) {
        super(message ?? "Field required", "REQUIRED_FIELD")
    }
}

export class InvalidFieldValueError extends ApiError {
    constructor(message) {
        super(message || "Invalid field value", "INVALID_FIELD_VALUE")
    }
}

export class AccoutNotActivatedError extends ApiError {
    constructor() {
      super("Accout not activated", "ACCOUNT_NOT_ACTIVATED");
    }
  }

  export class UserUnauthorizedError extends ApiError {
    constructor() {
      super("Not authorized to access this resource", "USER_UNAUTHORIZED");
    }
  }

  export class PageNotFound extends ApiError {
    constructor() {
      super("Page does not exit", "PAGE_NOT_FOUND");
    }
  }

  export class FileTooBig extends ApiError {
    constructor() {
      super("File too big", "FILE_TOO_BIG");
    }
  }
