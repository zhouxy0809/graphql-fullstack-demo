const TARGET = "http://127.0.0.1:8080";
const PROXY_CONFIG = [
  {
    context: [
      "/graphql"
    ],
    target: TARGET,
    secure: false,
    proxyTimeout: 30000
  }
];

module.exports = PROXY_CONFIG;
