int joystick_y_offset, joystick_y;
void setup()
{
  pinMode(2, OUTPUT);
  pinMode(A1, INPUT);
  joystick_y_offset = analogRead(A1);
}


void loop()
{
  joystick_y = analogRead(A1) - joystick_y_offset;
  if(joystick_y > 100)
  {
    digitalWrite(2, HIGH);
  }

  joystick_y = analogRead(A1) - joystick_y_offset;
  if(joystick_y < (-100))
  {
    digitalWrite(2, LOW);
  }
}