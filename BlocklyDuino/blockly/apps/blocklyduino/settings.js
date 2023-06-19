let defaultInputs = [
  { title: "Joystick X", pin: "A1", id: "joystick_x" },
  { title: "Joystick Y", pin: "A0", id: "joystick_y" },
];

let defaultOutputs = [
  { title: "Green LED 1", pin: "2", id: "green_led_1" },
  { title: "Green LED 2", pin: "3", id: "green_led_2" },
  { title: "Orange LED 1", pin: "4", id: "orange_led_1" },
  { title: "Orange LED 2", pin: "5", id: "orange_led_2" },
  { title: "Red LED 1", pin: "6", id: "red_led_1" },
  { title: "Red LED 2", pin: "7", id: "red_led_2" },
];

const analogPins = [
  { title: "Analog pin A0", pin: "A0" },
  { title: "Analog pin A1", pin: "A1" },
  { title: "Analog pin A2", pin: "A2" },
  { title: "Analog pin A3", pin: "A3" },
  { title: "Analog pin A4", pin: "A4" },
  { title: "Analog pin A5", pin: "A5" },
];

const digitalPins = [
  { title: "Digital pin 2", pin: "2" },
  { title: "Digital pin 3", pin: "3" },
  { title: "Digital pin 4", pin: "4" },
  { title: "Digital pin 5", pin: "5" },
  { title: "Digital pin 6", pin: "6" },
  { title: "Digital pin 7", pin: "7" },
  { title: "Digital pin 8", pin: "8" },
  { title: "Digital pin 9", pin: "9" },
  { title: "Digital pin 10", pin: "10" },
  { title: "Digital pin 11", pin: "11" },
  { title: "Digital pin 12", pin: "12" },
  { title: "Digital pin 13", pin: "13" },
];

function generateSettings() {
  formInputs = document.getElementById("formInputs");
  defaultInputs.forEach((e) => {
    var div = document.createElement("div");
    div.classList = ["form-group row"];
    var label = document.createElement("label");
    label.classList = ["col-sm-3 col-form-label"];
    label.for = e.id;
    label.textContent = e.title;
    var innerDiv = document.createElement("div");
    innerDiv.classList = ["col-sm-9"];
    innerDiv.appendChild(
      generatePinDropdown(e.id, analogPins, e.pin, function () {
        let index = defaultInputs.findIndex((o) => o.id == e.id);
        defaultInputs[index].pin = e.pin;
      })
    );
    div.appendChild(label);
    div.appendChild(innerDiv);
    formInputs.appendChild(div);
  });

  formOutputs = document.getElementById("formOutputs");
  defaultOutputs.forEach((e) => {
    var div = document.createElement("div");
    div.classList = ["form-group row"];
    var label = document.createElement("label");
    label.classList = ["col-sm-3 col-form-label"];
    label.for = e.id;
    label.textContent = e.title;
    var innerDiv = document.createElement("div");
    innerDiv.classList = ["col-sm-9"];
    innerDiv.appendChild(
      generatePinDropdown(e.id, digitalPins, e.pin, function () {
        let index = defaultOutputs.findIndex((o) => o.id == e.id);
        defaultOutputs[index].pin = e.pin;
      })
    );
    div.appendChild(label);
    div.appendChild(innerDiv);
    formOutputs.appendChild(div);
  });
}

function generatePinDropdown(id, options, selected, onchange) {
  var selectList = document.createElement("select");
  selectList.id = id;
  selectList.classList = ["form-control"];
  options.forEach((e) => {
    var option = document.createElement("option");
    option.value = e.pin;
    option.text = e.title;
    option.selected = e.pin == selected;
    selectList.appendChild(option);
  });
  selectList.addEventListener("change", onchange());
  return selectList;
}
