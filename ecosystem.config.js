module.exports = {
  apps: [{
    name: 'hexasteel',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/hexasteel.sa',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 4500
    },
    error_file: '/var/log/pm2/hexasteel-error.log',
    out_file: '/var/log/pm2/hexasteel-out.log',
    log_file: '/var/log/pm2/hexasteel-combined.log',
    time: true
  }]
};
