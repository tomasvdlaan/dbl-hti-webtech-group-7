if ("serial" in navigator) {
  console.log("jupppp");
} else {
  alert(
    "This browser does not support USB communication, we recommend the latest version of Google Chrome."
  );
}

/**********************
 *
 *  Serial connection
 *
 **********************/
onConnect = (event) => {
  console.log("Arduino connected");
};

onDisconnect = (event) => {
  alert("Arduino is disconnected");
};

async function connect() {
  port = await navigator.serial.requestPort({
    filters: [{ usbVendorId: 4292 }, { usbVendorId: 6790 }],
  });
  await port.open({ baudRate: 9600 });

  console.log(port.getInfo());

  const textDecoder = new TextDecoderStream();
  const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
  const reader = textDecoder.readable.getReader();

  document.addEventListener("keydown", (event) => {
    if (event.isComposing || event.keyCode === 229) return;
    console.log("Keydown: (" + event.key + ", " + event.code + ")");
  });

  document.addEventListener("keyup", (event) => {
    if (event.isComposing || event.keyCode === 229) return;
    console.log("Keyup: (" + event.key + ", " + event.code + ")");
  });

  navigator.serial.addEventListener("connect", onConnect);
  navigator.serial.addEventListener("disconnect", onDisconnect);

  let commandArray = [];
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      reader.releaseLock();
      break;
    }
    if (value) {
      code = value.charCodeAt(0);
      if (code === 10) {
        handleLine(commandArray.join(""));
        commandArray = [];
      } else {
        commandArray.push(value);
      }
    }
  }
}

/*********************
 *
 *  Command Handling
 
 *********************/
function handleLine(command) {
  // Key presses
  if (command.startsWith("/k")) {
    c = command[2];
    if (KeysPressed[c]) {
      clearTimeout(KeysPressed[c]);
      delete KeysPressed[c];
    } else simulateKeyDown(c);
    KeysPressed[c] = setTimeout(() => {
      simulateKeyUp(c);
      delete KeysPressed[c];
    }, 500);
  }

  // Messages
  else if (command.startsWith("/m")) {
    console.log(command.slice(2));
  }
}

/*************************
 *
 *  Key press simulation
 *
 *************************/
let KeysPressed = {};
var keyboardEvent = document.createEvent("KeyboardEvent");
var initMethod =
  typeof keyboardEvent.initKeyboardEvent !== "undefined"
    ? "initKeyboardEvent"
    : "initKeyEvent";

function simulateKeyDown(c) {
  const event = new KeyboardEvent("keydown", {
    key: c.toLowerCase(),
    code: "Key" + c.toUpperCase(),
  });
  document.dispatchEvent(event);
}

function simulateKeyUp(c) {
  const event = new KeyboardEvent("keyup", {
    key: c.toLowerCase(),
    code: "Key" + c.toUpperCase(),
  });
  document.dispatchEvent(event);
}
