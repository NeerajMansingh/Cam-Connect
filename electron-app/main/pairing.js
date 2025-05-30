const os = require('os');

async function start_tunnel(port_number) {
  const interfaces = os.networkInterfaces();
  const wifiInterface = interfaces['Wi-Fi'];  // Explicitly target "Wi-Fi"

  if (!wifiInterface) {
    throw new Error('Wi-Fi interface not found.');
  }

  let localIp = null;
  for (const iface of wifiInterface) {
    if (iface.family === 'IPv4' && !iface.internal) {
      localIp = iface.address;
      break;
    }
  }

  if (!localIp) {
    throw new Error('Unable to determine local IPv4 address on Wi-Fi interface.');
  }

  return `http://${localIp}:${port_number}`;
}

module.exports = {
  start_tunnel,
};
