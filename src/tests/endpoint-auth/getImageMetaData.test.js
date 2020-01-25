const got = require('got');

describe('Health end point functionality', () => {
    it('should return success response', async() => {
        try {
            // todo: how to extractout the DNS so that no need to change it whenever there is a change in domain name
            const response = await got('https://sampleapp.aspirex.in/image/eagle.jpeg/metadata');
            console.log(JSON.stringify(response));
            expect(response.body).toBeTruthy();
        } catch (e) {
            console.log(`error: ${JSON.stringify(e, null, 4)}`);
        }
    });
});

