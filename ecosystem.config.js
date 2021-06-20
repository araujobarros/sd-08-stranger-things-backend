// rodar o '$ pm2 ecosystem' e criar o ambiente; em formato yml parece ficar mais 'limpo' e legível que em config.js, mas deixei em JS mesmo;
// não é que tava no README? 
module.exports = {
  apps: [{
    script: './index.js',
    watch: false,
  }],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
