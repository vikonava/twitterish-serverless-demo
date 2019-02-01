const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
  "Content-Type": "application/json",
};

const build = (responseObject, statusCode) => ({
  statusCode,
  headers,
  body: JSON.stringify(responseObject),
});

const success = (responseObject, statusCode = 200) => (
  build(responseObject, statusCode)
);

const failure = (responseObject = { status: false }, statusCode = 500) => (
  build(responseObject, statusCode)
);

export default {
  success,
  failure,
};

