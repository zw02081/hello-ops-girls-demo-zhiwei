import { GameLoop } from "./engine/GameLoop.js";
import { KeyCode, Keys } from "./engine/Keys.js";
import { GameScreen } from "./environment/GameScreen.js";
import { World } from "./environment/World.js";
import { Graphics } from "./graphics/Graphics.js";
import { SpriteManager } from "./graphics/SpriteManager.js";

/**
 * Setup the graphics class, the keyboard listener,
 * the sprites manager for the game and the game loop.
 */
const gfx = new Graphics(GameScreen.CANVAS_ID);
const keyboard = Keys.instance;
const sprites = SpriteManager.instance;

sprites.addClass("clouds");
sprites.addId("playerStanding");
sprites.addClass("playerRunning");
sprites.addId("tallEnemy");
sprites.addId("shortEnemy");
sprites.addId("flyingEnemy");
sprites.addId("gameOver");

const world = new World();

const looper = GameLoop.instance;

looper.updateFunction = () => {
	if (keyboard.isClicked(KeyCode.Enter))
		world.reset();

	world.update();
	keyboard.update();
};

looper.renderFunction = () => {
	world.render(gfx);
};

looper.start();
