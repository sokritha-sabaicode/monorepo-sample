module.exports = {
  apps: [{
    name: "product-service",
    script: "server.js",
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
  }]
};
