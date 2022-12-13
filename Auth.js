const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const passport = require( 'passport' );


passport.use(new GoogleStrategy({
    clientID: '164406611316-kmumfl2q8ie12bas9jcv7pfloe143k7p.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:3001/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});