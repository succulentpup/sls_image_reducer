export const buildRespectObject = (statusCode: number, body: object) => ({
        statusCode,
        body: JSON.stringify(body),
    });
