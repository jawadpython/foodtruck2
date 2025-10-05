module.exports = {
  apps: [
    {
      name: 'food-truck-marketplace',
      script: 'npm',
      args: 'start',
      cwd: './',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: './err.log',
      out_file: './out.log',
      log_file: './combined.log',
      time: true,
      max_memory_restart: '1G',
      node_args: '--max-old-space-size=1024',
      restart_delay: 5000,
      max_restarts: 5
    }
  ]
}
