const got = require('got');

describe('Health end point functionality', () => {
    it('should return success response', async() => {
            const response = await got('https://api.aspirex.in/health');
            console.log(response.body);
            expect(response.body).toBeTruthy();
    });
});

