import { Updatable } from "../engine/GameLoop.js";
import { Sprite, SpriteManager } from "./SpriteManager.js";

/**
 * An instance of this class handles a specific animation.
 * An animation is just a series of sprites that each is
 * being displayed a fixed number of time.
 */
export class Animation implements Updatable {
	
	// The array of images for the animation.
	private imgs: Sprite[];
	// The time it takes for each image to be displayed.
	private ticks: number;
	private currentTicks: number;
	// The current image selected.
	private index: number;
	
	/**
	 * @param ticksPerImg The time, in ticks, that each animation should take.
	 * @param imgsKey The images keys the take the images from the srpite manager.
	 */
	constructor(ticksPerImg: number, ...imgsKey: string[]) {
		this.imgs = new Array<Sprite>(imgsKey.length);
		this.ticks = ticksPerImg;
		this.currentTicks = 0;
		this.index = 0;
		
		const sm = SpriteManager.instance;
		for (let i = 0; i < imgsKey.length; i++)
			this.imgs[i] = sm.get(imgsKey[i]);
	}
	
	public update(): void {
		this.currentTicks++;
		if (this.currentTicks == this.ticks) {
			this.currentTicks = 0;
			this.next();
		}
	}
	
	/**
	 * Cycles to the next image in the animation.
	 * 
	 * @param amount the amount of images to skip forwards.
	 */
	public next(amount = 1): void {
		this.index = (this.index + amount) % this.imgs.length;
	}
	
	/**
	 * Cycles to the previous image in the animation.
	 * 
	 * @param amount the amount of images to skip backwards.
	 */
	public prev(amount = 1): void {
		this.index = (this.imgs.length + this.index - amount) % this.imgs.length;
	}
	
	/**
	 * Returns the current image that should be rendered in the game.
	 */
	public get current() {
		return this.imgs[this.index];
	}
	
}
