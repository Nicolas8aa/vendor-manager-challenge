module.exports = {
  apps : [{
    name   : "backend",
    script : "./back/bin/www"
  },
  {
   name: "frontend",
   script: "npm",
   args: "start",
   cwd: "front"
  }
]
}
