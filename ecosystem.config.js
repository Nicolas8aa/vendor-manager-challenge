module.exports = {
  apps: [{
    name: "backend",
    cwd: "back",
    script: "./bin/www",
    max_memory_restart: "150M",
    max_restarts: 10,
  },
  {
    name: "frontend",
    script: "npm",
    args: "start",
    cwd: "front",
    max_memory_restart: "100M",
    max_restarts: 10,
  }
  ]
}
