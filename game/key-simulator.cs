private boolean isWPressed = false;
private boolean isAPressed = false;
private boolean isDPressed = false;

public void key_a_down() => isAPressed = true;
public void key_a_up() => isAPressed = false;

public void key_w_down() => isWPressed = true;
public void key_w_up() => isWPressed = false;

public void key_d_down() => isDPressed = true;
public void key_d_up() => isDPressed = false;
