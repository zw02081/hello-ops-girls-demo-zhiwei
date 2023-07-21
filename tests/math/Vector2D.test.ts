import {Vector2D} from "../../src/math/Vector2D";

describe('Test Vector2D', () => {
    it('should scale up when call toScaled', async () => {
        let vector = new Vector2D(10,10);
        let scaleVector = vector.toScaled(20);
        expect(scaleVector).toEqual(new Vector2D(200,200));
    });
});
