import { Graphics } from "../graphics/Graphics.js";

type VoidFunc = () => void;

/**
 * The GameLoop namespace handles running the main loop of the game.
 * Creating an instance of the game loop and starting the loop
 * using the start function will allow run the update function at
 * the given updateRate (that can be changed even when the loop
 * is already runninng) which is the number of updates per second.
 * The render function will be called as fast as possible.
 *
 * We will be using the window.requestAnimationFrame so the max
 * frame rate for the application would be the refresh rate of
 * the user's screen. The updates on the other hand will be something
 * that we can control.
 *
 * This loop method isolates the rendering and the logic updates
 * thus making the physics of the game not be dependent on the frame
 * rate of the game.
 *
 * window.requestAnimationFrame() won't work well with a function of
 * the instance as once we call "this.loop" the 'this' part changes to
 * the function. Therefore we will use a singleton design pattern to
 * solve this, as there should really be only one GameLoop.
 */
export class GameLoop {

	private static _instance: GameLoop;

	public static get instance() {
		if (GameLoop._instance == undefined)
			GameLoop._instance = new GameLoop();
		return GameLoop._instance;
	}

	// The update rate (ticks/second) of the game.
	private static updateRate = 60;
	// The number of miliseconds it should take for each update.
	private static msToUpdate = 1000 / GameLoop.updateRate;

	// The update function.
	private update: VoidFunc;
	// The render function.
	private render: VoidFunc;

	// variables for keeping track of the loop.
	private deltaTime: number;
	private lastTime: number;
	private nowTime: number;
	private ups: number;
	private fps: number;
	private timer: number;

	private debug: boolean;

	/**
	 * @param update the logic update function.
	 * @param render the rendering function.
	 * @param debug whether there should be information logged to the console
	 * (default is false).
	 */
	private constructor() {
		this.update = undefined;
		this.render = undefined;

		this.deltaTime = 0;
		this.lastTime = 0;
		this.nowTime = 0;
		this.ups = 0;
		this.fps = 0;
		this.timer = 0;
		this.debug = false;
	}

	/**
	 * This function is the main loop of the game. It is a loop
	 * as the function window.requestAnimationFrame calls it, then
	 * this function calls itself using that same requestAnimationFrame
	 * function.
	 *
	 * @param timestamp the time in ms that passed since the window was created.
	 */
	private loop(timestamp: number): void {
		/* The idea of this loop is as follows.
		 * We keep track of the difference between the previous time we where
		 * in the function and the current time we are in the function.
		 * We get the difference represented as deltaTime. Using the global
		 * static variable msToUpdate to find out how many times we should
		 * call the logic update function. THIS isolates the logic from the
		 * framerate of the game.
		 */

		const looper = GameLoop.instance;

		looper.nowTime = timestamp;
		looper.deltaTime += (looper.nowTime - looper.lastTime) / GameLoop.msToUpdate;
		looper.lastTime = looper.nowTime;

		while (looper.deltaTime >= 1) {
			looper.update();
			looper.ups++;
			looper.deltaTime--;
		}

		looper.render();
		looper.fps++;

		if (timestamp - looper.timer > 1000) {
			looper.timer = timestamp;
			if (looper.debug)
				console.log(`fps: ${looper.fps} | ups: ${looper.ups}`);
			looper.fps = 0;
			looper.ups = 0;
		}

		window.requestAnimationFrame(looper.loop);
	}

	/**
	 * Starts runnning the main game loop.
	 */
	public start(): void {
		if (this.update === undefined || this.render === undefined) {
			console.log("The update or render function has yet to be set in the game loop.");
			return;
		}

		window.requestAnimationFrame(GameLoop.instance.loop);
	}

	/* Getters and setters for the update and render functions. */

	public set updateFunction(update: VoidFunc) {
		this.update = update;
	}

	public get updateFunction(): VoidFunc {
		return this.update;
	}

	public set renderFunction(render: VoidFunc) {
		this.render = render;
	}

	public get renderFunction(): VoidFunc {
		return this.render;
	}

	/* Getters and setters for the update rate. */

	public static getUpdateRate(): number {
		return GameLoop.updateRate;
	}

	public static setUpdateRate(upRate: number): void {
		GameLoop.updateRate = upRate;
		GameLoop.msToUpdate = 1000 / GameLoop.updateRate;
	}

}

/**
 * For any instance that can be updated.
 */
export interface Updatable {

	/**
	 * Updates the instance logically.
	 */
	update(): void;

}

/**
 * For any instance that can be rendered to the screen.
 */
export interface Renderable {

	/**
	 * Draws the current instance on to the screen.
	 *
	 * @param gfx The graphics instance to draw the current instance
	 * to the screen.
	 */
	render(gfx: Graphics): void;

}

/**
 * For items that should be both updated and rendered based on
 * the game loop.
 */
export interface Loopable extends Updatable, Renderable {

}
