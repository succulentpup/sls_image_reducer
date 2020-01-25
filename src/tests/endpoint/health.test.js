const got = require('got');

describe('Health end point functionality', () => {
    it('should return success response', async() => {
        try {
            // todo: how to extractout the DNS so that no need to change it whenever there is a change in domain name
            const response = await got('https://sampleapp.aspirex.in/health');
            console.log(JSON.stringify(response));
        } catch (e) {
            // thrown 401 UnAuthorized error, caller should be authorized to access health end point
            console.log(`error: ${JSON.stringify(e, null, 4)}`);
        }
    });
});

