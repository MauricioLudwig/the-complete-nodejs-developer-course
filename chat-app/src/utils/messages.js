const generateMessage = (username, text) => ({
    username,
    text,
    createdAt: new Date().getTime()
});

const generateLocationMessage = (username, lat, lon) => ({
    username,
    url: `https://google.com/maps?q=${lat},${lon}`,
    createdAt: new Date().getTime()
});

module.exports = {
    generateMessage,
    generateLocationMessage
};