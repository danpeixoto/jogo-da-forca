export const enviroment = {
    server:{port: process.env.SERVER_PORT || 3001},
    db:{url: process.env.DB_URL || 'mongodb+srv://forca:forca@jogodaforca-yq3ed.mongodb.net/test?retryWrites=true&w=majority'}
}