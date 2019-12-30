const getEmail = (event) => {
  if (process.env.IS_OFFLINE) {
    return 'example@email.com'
  } else {
    return event.requestContext.authorizer.claims.email;
  }
}

export { getEmail };