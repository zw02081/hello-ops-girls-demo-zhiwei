import { Graphics } from "../graphics/Graphics";
import { Loopable } from "./GameLoop";

/**
 * Handles instances of the class to manage drawing
 * and updating them. Can store a collection of it's
 * own type as well to have a more neatly sorted collection.
 */
export class Handler<T extends Loopable> implements Loopable {
	
	private items: T[];
	
	constructor() {
		this.items = new Array<T>();
	}
	
	public update(): void {
		const tmp = this.items;
		for (let i = 0; i < tmp.length; i++)
			tmp[i].update();
	}
	
	public render(gfx: Graphics): void {
		const tmp = this.items;
		for (let i = 0; i < tmp.length; i++)
			tmp[i].render(gfx);
	}
	
	/**
	 * @param t the item to add.
	 */
	public add(t: T): void {
		this.items.push(t);
	}
	
	/**
	 * @param t the item to remove.
	 */
	public remove(t: T): void {
		const index = this.items.indexOf(t);
		if (index > -1)
			this.items.splice(index, 1);
	}
	
	public get length(): number {
		return this.items.length;
	}
	
	/**
	 * @param i the index to get the object in that place.
	 * @returns the object, of one exists.
	 */
	public get(i: number): T {
		return this.items[i];
	}
	
	/**
	 * Clears the handler of all elements.
	 */
	public clear(): void {
		this.items = new Array<T>();
	}
	
}
