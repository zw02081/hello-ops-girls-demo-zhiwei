import request from 'supertest';
import {app} from "../src";

describe('Express App', () => {
    it('It should response the GET method', async () => {
        const res = await request(app).get('/');
        expect(res.status).toEqual(200);
    });
});
