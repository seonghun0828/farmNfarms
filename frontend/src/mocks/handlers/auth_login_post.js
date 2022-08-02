import { rest } from 'msw'

export default rest.post('/api/v1/auth/login', (req, res, ctx) => {
    const { phone, password } = req.body;
    if (phone === '01012345678' && password === '1234') {
        return res(
            ctx.status(200),
            ctx.delay(300),
            ctx.json({
                message: '정상',
                statusCode: 200,
                accessToken: "ekdif123SDKVIdf1231..."
            })
        )
    }
    if (phone === '01012345679' && password === '1234') {
        return res(
            ctx.status(200),
            ctx.delay(300),
            ctx.json({
                message: '정상',
                statusCode: 200,
                accessToken: "ekdif123SDKVIdf1231..."
            })
        )
    }
    return res(
        ctx.status(200),
        ctx.delay(300),
        ctx.json({
            message: 'Not Exist',
            statusCode: 404,
            accessToken: null
        })
    )
});

