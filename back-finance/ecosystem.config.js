module.exports = {
  apps: [
    {
      name: 'my-nest-backend',
      script: 'npm',
      args: 'start',
      watch: true,
      ignore_watch: ['dist', 'node_modules']
    }
  ]
}
