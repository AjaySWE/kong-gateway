const axios = require('axios');

// Base URL for Kong Admin API
const KONG_ADMIN_URL = process.env.KONG_ADMIN_URL || 'http://localhost:8001';

/**
 * Create a service in Kong.
 * @param {string} name - The name of the service.
 * @param {string} url - The URL of the backend service.
 */
async function createService(name, url) {
  try {
    const response = await axios.post(`${KONG_ADMIN_URL}/services`, { name, url });
    console.log(`Service created: ${name}`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Failed to create service: ${name}`, error.response?.data || error.message);
  }
}

/**
 * Create a route for a service in Kong.
 * @param {string} serviceName - The name of the service.
 * @param {string[]} paths - The paths to associate with the route.
 */
async function createRoute(serviceName, paths) {
  try {
    const response = await axios.post(`${KONG_ADMIN_URL}/services/${serviceName}/routes`, { paths });
    console.log(`Route created for service: ${serviceName}`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Failed to create route for service: ${serviceName}`, error.response?.data || error.message);
  }
}

/**
 * Enable a plugin for a service in Kong.
 * @param {string} serviceName - The name of the service.
 * @param {string} pluginName - The plugin name (e.g., 'key-auth', 'rate-limiting').
 * @param {object} config - Configuration options for the plugin.
 */
async function enablePlugin(serviceName, pluginName, config = {}) {
  try {
    const response = await axios.post(`${KONG_ADMIN_URL}/services/${serviceName}/plugins`, { name: pluginName, config });
    console.log(`Plugin enabled: ${pluginName} for service: ${serviceName}`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Failed to enable plugin: ${pluginName} for service: ${serviceName}`, error.response?.data || error.message);
  }
}

/**
 * Create a consumer in Kong for authentication.
 * @param {string} username - Consumer username.
 * @param {string} key - API key for the consumer.
 */
async function createConsumer(username, key) {
  try {
    const consumerResponse = await axios.post(`${KONG_ADMIN_URL}/consumers`, { username });
    console.log(`Consumer created: ${username}`, consumerResponse.data);

    await axios.post(`${KONG_ADMIN_URL}/consumers/${username}/key-auth`, { key });
    console.log(`API Key added for consumer: ${username}`);
  } catch (error) {
    console.error(`Failed to create consumer: ${username}`, error.response?.data || error.message);
  }
}

/**
 * Create an upstream in Kong for load balancing.
 * @param {string} upstreamName - Name of the upstream.
 * @param {string[]} targets - List of targets (e.g., ['127.0.0.1:3001', '127.0.0.1:3002']).
 */
async function createUpstream(upstreamName, targets) {
  try {
    const upstreamResponse = await axios.post(`${KONG_ADMIN_URL}/upstreams`, { name: upstreamName });
    console.log(`Upstream created: ${upstreamName}`, upstreamResponse.data);

    for (const target of targets) {
      const targetResponse = await axios.post(`${KONG_ADMIN_URL}/upstreams/${upstreamName}/targets`, { target });
      console.log(`Target added to upstream: ${upstreamName}`, targetResponse.data);
    }
  } catch (error) {
    console.error(`Failed to create upstream: ${upstreamName}`, error.response?.data || error.message);
  }
}

module.exports = {
  createService,
  createRoute,
  enablePlugin,
  createConsumer,
  createUpstream,
};
