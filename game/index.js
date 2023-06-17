if (!"serial" in navigator) {
  alert(
    "This browser does not support USB communication, we recommend the latest version of Google Chrome."
  );
}

const serialHandler = new SerialHandler();

navigator.serial.addEventListener("disconnect", (event) => {
  button = document.getElementById("portButton");
  button.classList = ["btn btn-danger"];
  button.textContent = "Connect device";
  serialHandler.connected = false;
  console.log(event);
});

async function connectDevice() {
  await serialHandler.init();
  button = document.getElementById("portButton");
  button.classList = ["btn btn-outline-success"];
  button.textContent = "Arduino connected";
  serialLoop();
}

async function serialLoop() {
  while (serialHandler.connected) {
    cmd = await serialHandler.read();
    console.log(cmd);
    if (cmd[0] == "/") {
      switch (cmd[1]) {
        case "k":
          emulateKeyPress(cmd[2]);
          break;
        case "m":
          cl(cmd.slice(2));
          break;
      }
    }
  }
}
