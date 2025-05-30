window.electronAPI.onQRCode((dataUrl) => {
  console.log("QR received in renderer:", dataUrl);
  const qrImg = document.getElementById('qr_code');
  if (qrImg) {
    qrImg.src = dataUrl;
  }
});
