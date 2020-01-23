import { InternalServerError } from "./errors";

const errorHandler = (error: any) => {
  if (!error.statusCode && !error.message) {
    error = new InternalServerError();
  }
  return {
    body: JSON.stringify({name: error.name, message: error.message}),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: error.statusCode || 500   
  };
};

export { errorHandler };
