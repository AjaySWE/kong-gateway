const kong = require('./kongConfig');

async function setupKong() {
  // Define services
  const services = [
    { name: 'user-management-service', url: 'http://localhost:3001' },
    { name: 'project-management-service', url: 'http://localhost:3002' },
    { name: 'timesheet-management-service', url: 'http://localhost:3003' },
    { name: 'notification-service', url: 'http://localhost:3004' },
    { name: 'reporting-service', url: 'http://localhost:3005' },
  ];

  // Define routes for each service
  const routes = [
    { service: 'user-management-service', paths: ['/user-management'] },
    { service: 'project-management-service', paths: ['/project-management'] },
    { service: 'timesheet-management-service', paths: ['/timesheet-management'] },
    { service: 'notification-service', paths: ['/notification'] },
    { service: 'reporting-service', paths: ['/reporting'] },
  ];

  // Define plugins for rate limiting, authentication, etc.
  const plugins = [
    { service: 'user-management-service', name: 'key-auth' },
    { service: 'project-management-service', name: 'key-auth' },
    { service: 'timesheet-management-service', name: 'rate-limiting', config: { second: 5, minute: 100 } },
    { service: 'notification-service', name: 'rate-limiting', config: { second: 10, minute: 200 } },
    { service: 'reporting-service', name: 'rate-limiting', config: { second: 5, minute: 50 } },
  ];

  // Loop through and create each service
  for (const { name, url } of services) {
    await kong.createService(name, url);
  }

  // Loop through and create each route
  for (const { service, paths } of routes) {
    await kong.createRoute(service, paths);
  }

  // Loop through and enable each plugin
  for (const { service, name, config } of plugins) {
    await kong.enablePlugin(service, name, config);
  }

  console.log('Kong setup complete.');
}

setupKong().catch((error) => {
  console.error('Error setting up Kong:', error);
});
