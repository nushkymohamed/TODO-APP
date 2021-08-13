const app = require('../server');
const request = require('supertest');


describe('Todo Endpoints', () => {
    it('should create a new Todo', async () => {
        const res = await request(app)
            .post('/')
            .send({
                text: ' MERN STACK',
                complete: true,
                timestamp:'2021-07-10 10:00 PM'
            });
        expect(res.statusCode).toEqual(200);
    });

    it('should fetch all Todos ', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
    });

});