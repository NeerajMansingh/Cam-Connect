# Cam Connect

Cam Connect lets you **instantly send photos from your phone to your laptop clipboard** over Wi-Fi or the same hotspot — no cables, email, or login needed.

##  Features

- One-time QR code pairing
- Instant photo transfer to clipboard
- Works directly from your phone browser (camera or gallery)
- No internet needed — works over local Wi-Fi or hotspot
- Electron-powered desktop app

---

## Getting Started

### Download & Install

1. Go to the [Releases](https://github.com/NeerajMansingh/Cam-Connect/releases) page.
2. Download the latest `.exe` file (e.g. `Cam.Connect.Setup.1.0.0.exe`).
3. Run the installer and launch **Cam Connect**.

### Pair Your Phone

1. Open **Cam Connect** on your laptop — a QR code will appear.
2. Scan the QR code with your phone (no app required).
3. Capture or select a photo and tap **Send to Laptop**.
4. The image is instantly copied to your laptop’s clipboard!

---

## Tech Stack

- Electron
- Node.js
- WebSocket
- HTML/CSS/JS (for mobile interface)
- QR code generation with [`qrcode`](https://www.npmjs.com/package/qrcode)

---

## Project Structure
```
clipboard-sync/
│
├── electron-app/                   # Main Electron app
│   ├── main/                       # Main process
│   │   ├── index.js                # Electron main process entry point
│   │   ├── server.js               # Local HTTP/WebSocket server
│   │   ├── clipboard.js            # Clipboard handling (set image to clipboard)
│   │   ├── pairing.js              # QR code generation & pairing logic
│   │   ├── port_finder.js          # Port finder utility
│   │   └── qr_code_generator.js   # QR code generation helper
│   │    
│   ├── renderer/                   # Renderer process
│   │   ├── index.html              # Electron window UI 
│   │   └── index.js                # Renderer script 
│   │
│   ├── assets/                     # Static assets like icons, QR logos, etc. (currently empty)
│   ├── preload.js                  # Electron preload script
│
├── mobile-interface/              # Mobile web interface served by Electron server
│   ├── index.html                 # Camera/gallery UI for phone
│   ├── style.css                  # Styles for mobile UI (currently empty)
│   ├── app.js                     # Logic for camera/gallery, upload, reconnect
│   └── assets/                    # Icons, logos, etc. (currently empty)
│
├── shared/                        # Code shared between Electron & mobile
│   └── utils.js                   # Common utilities (currently empty)
│
├── README.md
├── LICENSE
├── .gitignore
└── package.json

```

---

## License

MIT License  
©️ 2025 [Neeraj Mansingh](https://github.com/NeerajMansingh)

---

## Contributions

Feel free to fork, open issues, or suggest features!

