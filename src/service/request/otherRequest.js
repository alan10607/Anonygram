import request from ".";

const ssl = () => request.getMethod(
  `/ssl`
);

export default {
  ssl
};