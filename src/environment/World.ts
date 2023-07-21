import { Loopable } from "../engine/GameLoop.js";
import { Handler } from "../engine/Handler.js";
import { EnemyFactory } from "../entities/Enemy.js";
import { Entity, EntityID } from "../entities/Entity.js";
import { Ground } from "../entities/Ground.js";
import { Player } from "../entities/Player.js";
import { Color } from "../graphics/Color.js";
import { Graphics } from "../graphics/Graphics";
import { Counter } from "../math/Counter.js";
import { Dimension } from "../math/Dimension.js";
import { Vector2D } from "../math/Vector2D.js";
import { GameOver } from "../screens/GameOver.js";
import { Clouds } from "./Clouds.js";
import { GameScreen } from "./GameScreen.js";
import { HUD } from "./HUD.js";

/**
 * Simple class to hold constants about our world like the ground
 * height and the gravity. Those can actually be changing variables,
 * but in this game they should stay constant.
 */
export class WorldInfo {
	
	public readonly groundHeight: number;
	public readonly gravity: Vector2D;
	public readonly spawnPoint: Vector2D;
	
}

/**
 * Class to handle our world, the movement and
 * the entities in our world.
 */
export class World implements Loopable {
	
	private info: WorldInfo;
	private screenSize: Dimension;
	
	private ground: Ground;
	private player: Player;
	private clouds: Clouds;
	
	private enemyFactory: EnemyFactory;
	
	private handler: Handler<Entity>;
	
	private score: Counter;
	private difficulty: Counter;
	private hud: HUD;
	
	private timer: Counter;
	
	private gameOver: GameOver;
	
	constructor() {
		this.screenSize = GameScreen.size();
		
		this.info = {
			groundHeight: 100,
			gravity: new Vector2D(0, 0.68),
			spawnPoint: new Vector2D(25, this.screenSize.height - 64 * 3)
		};
		
		/* Initialize the main entities for the game. */
		this.ground = new Ground(this.info.groundHeight, this.screenSize);
		this.player = new Player(this.info);
		this.clouds = new Clouds(0.1);
		
		/* Create an enemy factory to generate random enemies. */
		this.enemyFactory = new EnemyFactory(this.info);
		
		/* Initialize the entity handler for the entire game. */
		this.handler = new Handler<Entity>();
		
		/* Initialize the counters for the game. */
		this.score = new Counter(0);
		this.difficulty = new Counter(1);
		/* Initialize the heads up display. */
		this.hud = new HUD(this.score, this.difficulty);
		
		/* Timer to count how long we have been playing. */
		this.timer = new Counter(0);
		
		/* Initialize the game over screen. */
		this.gameOver = new GameOver();
		
		/* Reset the world so that we can start playing. */
		this.reset();
	}
	
	public update(): void {
		/* The update method of the world is seperated into the following stages:
		 * 1. Check if the player collided with anything.
		 * 1.1. IF the player collided with something we will notify the player
		 *     using the hit() method in each entity. The player will know what
		 *     to do according to what it hit.
		 * 2. If the player is moving:
		 * 2.1. Increment the score.
		 * 2.1.1 If the score reached a multiple of 500 advance to the next level.
		 * 2.2 Update the hud to display the new score and the new level (if we advanced).
		 * 2.3 Increment the timer of the game.
		 * 2.3.1 If the timer reached a multiple of 100 we can spawn an enemy.
		 * 2.4 Update the clouds to make it look like the player is really moving.
		 * 3. If the player is alive, we can update everything in our game.
		 */
		this.checkPlayerCollision();
		
		if (this.player.isMoving()) {
			this.score.inc();
			if (this.score.value % 500 == 0)
				this.nextLevel();
			
			this.hud.update();
			
			this.timer.inc();
			if (this.timer.value % 100 == 0)
				this.generateRandEnemy();
			
			this.clouds.update();
		}
		
		if (this.player.isAlive())
			this.handler.update();
	}
	
	public render(gfx: Graphics): void {
		gfx.fillBackground(Color.LightBlue);
		this.handler.render(gfx);
		
		this.clouds.render(gfx);
		
		if (!this.player.isAlive())
			this.gameOver.render(gfx);
	}
	
	/**
	 * Iterates over all intances in this.handler and checks if the player
	 * hit any one of them (except for the player itself).
	 * If there was a collision the player us notified using the hit() function
	 */
	private checkPlayerCollision(): void {
		for (let i = 0; i < this.handler.length; i++) {
			const e = this.handler.get(i);
			if (!e.is(EntityID.Player))
				if (this.player.getBounds().intersects(e.getBounds()))
					this.player.hit(e);
		}
	}
	
	/**
	 * Comlex calculation to get the current speed the world is moving.
	 * Here the speed is a scalar and not a vector is the world's
	 * movement is only in one direction. Technically it is a 1
	 * dimensional vector, but we can just treat it as a scalar for our
	 * purposes.
	 * 
	 * @returns the speed the world is currently moving at.
	 */
	private generateSpeed(): number {
		return this.difficulty.value * 5;
	}
	
	/**
	 * Handles going to the next level in the world.
	 */
	private nextLevel(): void {
		this.difficulty.inc();
		this.clouds.setRelativeSpeedX(this.generateSpeed());
	}
	
	/**
	 * Generates a random enemy and adds it to the game.
	 */
	private generateRandEnemy(): void {
		const speed = this.generateSpeed();
		this.handler.add(this.enemyFactory.generateRandom(speed));
	}
	
	/**
	 * Resets the world. Resets all parameters that are needed to
	 * start a fresh new game.
	 */
	public reset(): void {
		this.difficulty.value = 1;
		this.score.value = 0;
		this.timer.value = 0;
		this.player.reset();
		
		this.handler.clear();
		this.handler.add(this.ground);
		this.handler.add(this.player);
		
		this.clouds.setRelativeSpeedX(this.generateSpeed());
	}
	
}
