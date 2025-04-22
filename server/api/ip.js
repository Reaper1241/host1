export default defineEventHandler((event) => {
    const req = event.node.req;
    const ip = req.headers['x-forwarded-for'].split(',')[0].trim() || req.socket?.remoteAddress.split(',')[0].trim();
    return { ip };
});