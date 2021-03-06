export class InternalServerError extends Error {
  message: string;
  statusCode: number;

  constructor(){
    super('Internal server error!');
    this.statusCode = 500;
  }
} 

export class ForbiddenError extends Error {
  message: string;
  statusCode: number;

  constructor(){
    super('Forbidden!');
    this.statusCode = 403;
  }
}