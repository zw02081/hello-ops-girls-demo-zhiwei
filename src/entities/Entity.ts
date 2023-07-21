import { Loopable } from "../engine/GameLoop.js";
import { Graphics } from "../graphics/Graphics.js";
import { Rectangle } from "../math/Rectangle.js";
import { Vector2D } from "../math/Vector2D.js";

/**
 * Enum for each type of entity we have. Since this
 * is a small (and simple) game we have only 3 enemies.
 */
export enum EntityID {
	Player, Ground, Enemy, Clouds
}

/**
 * The base class for each entity in the game.
 * Each entity (even if it does nothing) can be updated
 * and rendered.
 */
export abstract class Entity implements Loopable {
	
	protected id: EntityID;
	
	// The bounds of the entity.
	protected bounds: Rectangle;
	// The movement direction of the entity.
	protected direction: Vector2D;
	
	/**
	 * @param x starting x coordinate of the entity.
	 * @param y starting y coordinate of the entity.
	 * @param width width of the entity.
	 * @param height height of the entity.
	 * @param id the id of the entity.
	 */
	constructor(x: number, y: number, width: number, height: number, id: EntityID) {
		this.bounds = new Rectangle(x, y, width, height);
		this.direction = new Vector2D;
		this.id = id;
	}
	
	public abstract update(): void;
	public abstract render(gfx: Graphics): void;
	
	/**
	 * Method to notify if this entity has been hit and
	 * which entity hit it using an Observer Design Pattern.
	 * 
	 * @param e the entity that hit this entity.
	 */
	public abstract hit(e: Entity): void;
	
	/**
	 * Getter for the bounds of the entity.
	 * 
	 * @returns the bounds of the entity.
	 */
	public getBounds(): Rectangle {
		return this.bounds;
	}
	
	/**
	 * Setter for the movement direction of the entity.
	 * 
	 * @param dir the direction as a vector for the entity.
	 */
	public setDirection(dir: Vector2D): void {
		this.direction.set(dir);
	}
	
	/**
	 * Getter for the direction of the entity.
	 * 
	 * @returns the current direction of the entity.
	 */
	public getDirection(): Vector2D {
		return this.direction;
	}
	
	/**
	 * Determine whether this entity is of a certain type of entity.
	 * 
	 * @param id the id to check with the entity.
	 * @returns true if the entity has the same id, false otherwise.
	 */
	public is(id: EntityID): boolean {
		return this.id == id;
	}
	
}
