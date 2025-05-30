const QRCode = require('qrcode');

async function generate_QR_code(text) {
  try {
    const dataUrl = await QRCode.toDataURL(text);
    console.log(dataUrl);
    return dataUrl;
  } catch (err) {
    console.log("QR code module");
  }
}

module.exports = {
  generate_QR_code,
};
