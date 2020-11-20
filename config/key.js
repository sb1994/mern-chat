module.exports = {
  mongoURI: process.env.DB_CONNECT,
  secretOrKey: process.env.SECRET || 'secret',
}
