const getApiHost = (): string => {
  const { NODE_ENV, REACT_APP_API_HOST } = process.env;

  if (NODE_ENV === 'development') {
    return `http://${REACT_APP_API_HOST}`
  }

  return `https://${REACT_APP_API_HOST}`;
}

export default getApiHost;