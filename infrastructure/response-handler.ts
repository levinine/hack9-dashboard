const responseHandler = (body: any, statusCode: number = 200, headers: any = {}) => {
  return {
    body: JSON.stringify(body),
    headers: {
      'Access-Control-Allow-Origin': '*',
      ...headers,
    },
    statusCode,
  };
};

export { responseHandler };
