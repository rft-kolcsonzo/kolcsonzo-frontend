export class ValidationError extends Error {
  constructor(field, message) {
    super(message)

    this.field = field
  }
}
export class NotFoundError extends Error {}
export class AuthenticationError extends Error {}
export class UnauthorizedError extends Error {}
