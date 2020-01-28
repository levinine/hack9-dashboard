const getEmail = (event) => {
  if (process.env.IS_OFFLINE || process.env.STAGE === 'local') {
    return 'j.pantic@levi9.com';
  } else {
    return event.requestContext.authorizer.claims.email;
  }
}

export { getEmail };