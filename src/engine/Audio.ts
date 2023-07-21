
/**
 * Enum to get the current state of the audio element that is
 * being currently played.
 */
export enum PlayingState {
	Stopped, Pending, Playing
}

/**
 * Given an audio file this class can play that given audio
 * file at a chosen audio level.
 * The audio file is being played using an HTMLAudioElement
 * and the volume is set as a percetage from 0 to 1.
 */
export class AudioPlayer {
	
	// Playing the audio comes from an HTMLAudioElement.
	private audio: HTMLAudioElement;
	private volume: number;
	private playing: number;
	
	/**
	 * @param audioFile path to the audio file to play.
	 * @param volume the volume to play the audio file (in percentages).
	 */
	constructor(audioFile: string, volume: number) {
		this.audio = new Audio(audioFile);
		this.setVolume(volume);
		this.playing = PlayingState.Stopped;
		
		this.audio.addEventListener("ended", () => this.playing = PlayingState.Pending);
	}
	
	/**
	 * Play the audio that was loaded into the instance.
	 * 
	 * Due to an update, the audio cannot be played at the loading of the
	 * window, therefore there was added a pending option to the playing state.
	 * The an audio can be pending to be played and then play.
	 * This also doesn't allow for multiple sounds to overlap. This is so the
	 * audio engine won't bug out and stop playing other sounds that we
	 * want to play.
	 */
	public play() {
		this.playing = (this.playing == PlayingState.Stopped) ? PlayingState.Pending : PlayingState.Playing;
		
		if (this.playing == PlayingState.Playing)
			this.audio.play();
	}
	
	/**
	 * Stops playing the current audio. It will be resumed from where it
	 * stopped. If the audio file stopped at the end of the file then
	 * playing the audio will resume from the start.
	 */
	public stop() {
		this.playing = PlayingState.Stopped;
		this.audio.pause();
	}
	
	/**
	 * Sets the volume in percentages from 0 to 1 where 0 is silent
	 * and 1 is full audio.
	 * 
	 * @param vol the new volume percentage.
	 */
	public setVolume(vol: number) {
		this.audio.volume = vol;
		this.volume = vol;
	}
	
	/**
	 * @returns the audio volume in percetages.
	 */
	public getVolume(): number {
		return this.volume;
	}
	
	/**
	 * @returns whether or not the audio has stopped.
	 */
	public isStopped(): boolean {
		return this.playing == PlayingState.Stopped;
	}
	
	/**
	 * @returns whether or not the audio is pending to be played.
	 */
	public isPending(): boolean {
		return this.playing == PlayingState.Pending;
	}
	
	/**
	 * @returns whether or not the audio is currently playing.
	 */
	public isPlaying(): boolean {
		return this.playing == PlayingState.Playing;
	}
	
}
