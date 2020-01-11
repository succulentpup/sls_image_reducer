const got = require('got');

describe('Health end point functionality', () => {
    it('should return success response', async() => {
            // todo: how to extractout the DNS so that no need to change it whenever there is a change in domain name
            const response = await got('https://sampleapp.aspirex.in/health');
            console.log(response.body);
            expect(response.body).toBeTruthy();
    });
});

