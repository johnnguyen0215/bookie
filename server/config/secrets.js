module.exports = {
  // Find the appropriate database to connect to, default to localhost if not found.
  db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/Bookie',
  sessionSecret: process.env.SESSION_SECRET || 'Bookie Secret',
  google: {
  	clientID: process.env.GOOGLE_CLIENTID || '253124595413-nekikm7t03at5e522n59rlbcgat6ll17.apps.googleusercontent.com',
  	clientSecret: process.env.GOOGLE_SECRET ||'eRja5CjupMxzoX4O-AvElkKz',
  	callbackURL: process.env.GOOGLE_CALLBACK || "/auth/google/callback"
  }
};
