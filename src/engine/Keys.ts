
/**
 * Enum for each of the available keys in our game.
 * The enum also stores the max amount of keys, therefore
 * adding a new key to the game is just a case of adding it to
 * the enum, updating the count and adding a case in the switch.
 * This makes adding a key a case of two changes rather than 3.
 */
export enum KeyCode {
	W = 0,
	A = 1,
	S = 2,
	D = 3,
	Space = 4,
	Enter = 5,
	Ctrl = 6,
	Shift = 7,
	Esc = 8,
	G = 9,
	Count = 16
}

/**
 * They key class is a singleton that can be accessed from
 * everywhere in the game as all places can ask to check if
 * a certain key is pressed or not.
 * This is done by making a function of the Keys class a listener
 * and then having the keys update to our own update loop.
 * Kinda making the keys run on a seperate thread. This also allows
 * us to more accurately detect a click.
 */
export class Keys {
	
	// Singleton instance.
	private static _instance: Keys;
	
	public static get instance(): Keys {
		if (Keys._instance === undefined)
			Keys._instance = new Keys();
		return Keys._instance;
	}
	
	/* Information about the keys in our game. */
	private keyState: Array<boolean>;
	private prevKeyState: Array<boolean>;
	
	constructor() {
		// Have the arrays be set to all false.
		this.keyState = new Array(KeyCode.Count).fill(false);
		this.prevKeyState = new Array(KeyCode.Count).fill(false);
		
		// Add the listeners to the game.
		document.addEventListener("keyup", this.listener);
		document.addEventListener("keydown", this.listener);
	}
	
	/**
	 * Handles updating the states of the keys accordinly.
	 */
	public update(): void {
		for (let i = 0; i < KeyCode.Count; i++)
			this.prevKeyState[i] = this.keyState[i];
	}
	
	/**
	 * @param key the key to check.
	 * @returns whether or not the key is pressed.
	 */
	public isPressed(key: KeyCode): boolean {
		return this.keyState[key];
	}
	
	/**
	 * A key being clicked is defined as a key that is pressed
	 * during the current frame and wasn't pressed the frame
	 * before. For a holding check see "isPressed".
	 * 
	 * @param key the key to check.
	 * @returns whether or not the key is clicked.
	 */
	public isClicked(key: KeyCode): boolean {
		return this.keyState[key] && !this.prevKeyState[key];
	}
	
	/**
	 * The listener function that should be added to the document
	 * using the documet.addEventListener().
	 * This function should be added as a keydown and as a keyup
	 * event listener.
	 * 
	 * @param event the keyboard event as given from the document.
	 */
	private listener(event: KeyboardEvent): void {
		if (event.type === "keypressed")
			return;
		const pressed = (event.type === "keydown");
		const keys = Keys.instance;
		switch(event.key) {
			case "w":
				keys.keyState[KeyCode.W] = pressed;
				break;
			case "a":
				keys.keyState[KeyCode.A] = pressed;
				break;
			case "s":
				keys.keyState[KeyCode.S] = pressed;
				break;
			case "d":
				keys.keyState[KeyCode.D] = pressed;
				break;
			case " ":
				keys.keyState[KeyCode.Space] = pressed;
				break;
			case "Enter":
				keys.keyState[KeyCode.Enter] = pressed;
				break;
			case "Control":
				keys.keyState[KeyCode.Ctrl] = pressed;
				break;
			case "Shift":
				keys.keyState[KeyCode.Shift] = pressed;
				break;
			case "Escape":
				keys.keyState[KeyCode.Esc] = pressed;
				break;
			case "g":
				keys.keyState[KeyCode.G] = pressed;
				break;
			default: break;
		}
	}
	
}
