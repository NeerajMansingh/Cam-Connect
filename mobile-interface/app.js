const camera_input=document.getElementById("cameraInput");
const preview=document.getElementById("preview");
const send_btn=document.getElementById("sendBtn");
const status1=document.getElementById("status");

let file_sel=NULL;
let ws=NULL;

const WS_URL = 'ws://192.168.1.10:3000';

camera_input.addEventListener('change',()=>{
    const file_obtained=camera_input.files[0];
    console.log(files);
    if(file_obtained === NULL) return;

    file_sel=file_obtained;

    const img_url=URL.createObjectURL(file_sel);
    preview.src=img_url;
    send_btn.disabled=true;
    status1.textContent="";
});

function connectWebSocket() {
  ws = new WebSocket(WS_URL);  

  ws.addEventListener('open', () => {
    status1.textContent = 'Connected to laptop';         
    send_btn.disabled = !file_sel;                  
  });

  ws.addEventListener('error', (err) => {
    status1.textContent = 'WebSocket error';             
    console.error('WebSocket error:', err);
  });

  ws.addEventListener('close', () => {
    status1.textContent = 'Disconnected from laptop';    
    send_btn.disabled = true;
  });

  ws.addEventListener('message', (event) => {
    console.log('Message from server:', event.data);    
  });
}




send_btn.addEventListener('click', () => {
  if (!selectedFile || !ws || ws.readyState !== WebSocket.OPEN) {
    status1.textContent = 'Not connected or no file selected';
    return;
  }

  send_btn.disabled = true;
  status1.textContent = 'Sending image...';

  const reader = new FileReader();
  reader.onload = () => {
    // reader.result is a base64 data URL string like "data:image/jpeg;base64,...."
    const base64Data = reader.result;

    // Send as JSON string with type and data
    const message = JSON.stringify({
      type: 'image',
      filename: file_sel.name,
      data: base64Data,
    });

    ws.send(message);

    status1.textContent = 'Image sent! You can paste it on your laptop now.';
    send_btn.disabled = false;
  };

  reader.onerror = () => {
    status1.textContent = 'Failed to read file';
    send_btn.disabled = false;
  };

  reader.readAsDataURL(file_sel);
});

// Connect on load
connectWebSocket();




