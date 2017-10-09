Package.describe({
  name: 'pfe-log320',
  summary: 'PFE for LOG320',
  version: '0.0.1',
  git: 'https://github.com/QcSiM008/PFE-LOG320.git',
});

Package.onUse(function(api) {
  api.use(['vulcan:core', 'vulcan:forms', 'vulcan:accounts', 'vulcan:admin']);

  api.addFiles('lib/stylesheets/bootstrap.min.css', 'client');

  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');
});
