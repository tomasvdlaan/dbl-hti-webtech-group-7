/*************************
 *
 *  Key press simulation
 *
 *************************/
const delay = 100;
let KeysPressed = {};
var keyboardEvent = document.createEvent("KeyboardEvent");
var initMethod =
  typeof keyboardEvent.initKeyboardEvent !== "undefined"
    ? "initKeyboardEvent"
    : "initKeyEvent";

function emulateKeyPress(key) {
  if (KeysPressed[key]) {
    clearTimeout(KeysPressed[key]);
    delete KeysPressed[key];
  } else simulateKeyDown(key);

  KeysPressed[key] = setTimeout(() => {
    simulateKeyUp(key);
    delete KeysPressed[key];
  }, delay);
}

function simulateKeyDown(c) {
  const event = new KeyboardEvent("keydown", {
    key: c.toLowerCase(),
    code: "Key" + c.toUpperCase(),
  });
  document.dispatchEvent(event);
  // console.log("Pressing " + c)
}

function simulateKeyUp(c) {
  const event = new KeyboardEvent("keyup", {
    key: c.toLowerCase(),
    code: "Key" + c.toUpperCase(),
  });
  document.dispatchEvent(event);
  // console.log("Releasing " + c)
}

// Key listeners
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "a":
      document.getElementById("keyLeft").classList.add("active");
      break;
    case "w":
      document.getElementById("keyUp").classList.add("active");
      break;
    case "d":
      document.getElementById("keyRight").classList.add("active");
      break;
    default:
      break;
  }
});
document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "a":
      document.getElementById("keyLeft").classList.remove("active");
      break;
    case "w":
      document.getElementById("keyUp").classList.remove("active");
      break;
    case "d":
      document.getElementById("keyRight").classList.remove("active");
      break;
    default:
      break;
  }
});
