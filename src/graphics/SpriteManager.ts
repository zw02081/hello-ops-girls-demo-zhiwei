
export type Sprite = HTMLImageElement;

/**
 * A singleton class to handle the loading of the sprites
 * from the html document into the game.
 * This will store them all in one place, which is on the
 * webpage, and will be used across all of the application.
 */
export class SpriteManager {
	
	/* Singleton design patter right here with the _instnace
	 * and with the get instance() function.
	 */
	
	private static _instance: SpriteManager;
	
	public static get instance(): SpriteManager {
		if (SpriteManager._instance === undefined)
			SpriteManager._instance = new SpriteManager();
		return SpriteManager._instance;
	}
	
	private sprites: Map<string, Sprite>;
	
	private constructor() {
		this.sprites = new Map<string, Sprite>();
	}
	
	/**
	 * Add an image into the instance.
	 * 
	 * @param imgId the id to load the image from (will be used as key).
	 */
	public addId(imgId: string): void {
		this.sprites.set(imgId, document.getElementById(imgId) as Sprite);
	}
	
	/**
	 * Add a class of images into the instance.
	 * Will load the images with the key_i where i is the index of each image
	 * when reading them from the document.
	 * 
	 * @param imgClass the images class (will be used as key).
	 */
	public addClass(imgClass: string): void {
		const imgs = Array.from(document.getElementsByClassName(imgClass)) as Sprite[];
		
		for (let i = 0; i < imgs.length; i++)
			this.sprites.set(`${imgClass}${i}`, imgs[i]);
	}
	
	/**
	 * @param key the key to get the image.
	 * @returns the image element under the same tag.
	 */
	public get(key: string): Sprite {
		return this.sprites.get(key);
	}
	
}
