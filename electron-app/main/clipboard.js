const sharp = require('sharp');
const {clipboard, nativeImage} = require('electron');
//Photos from phone have EXIF extension that is not respected by createFromDataURL

async function convert_and_paste_clipboard(img_data_url) {
  // Extract base64 part from data URL
  const base64Data = img_data_url.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, 'base64');

  // Use sharp to auto-rotate based on EXIF and get output buffer
  const rotatedBuffer = await sharp(buffer).rotate().toBuffer();

  // Create nativeImage from rotated buffer
  const img = nativeImage.createFromBuffer(rotatedBuffer);

  clipboard.writeImage(img);
  console.log("Image pasted with correct orientation");
}

module.exports = {
  convert_and_paste_clipboard,
};
