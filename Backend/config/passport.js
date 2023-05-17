const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  // Handle user creation or retrieval from database
  try {
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      const email = profile.emails ? profile.emails[0].value : null;
      if (email) {
        user = await User.findOne({ email });
      }

      if (user) {
        // Merge existing account with Google account
        user.googleId = profile.id;
      } else {
        // Create a new account
        user = await User.create({
          googleId: profile.id,
          email,
          displayName: profile.displayName,
          accountVerified: true,
          emailVerified: email ? true : false,
        });
      }
    }

    await user.save();
    done(null, user);
  } catch (error) {
    done(error);
  }
}));

// Facebook Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'email']
}, async (accessToken, refreshToken, profile, done) => {
  // Handle user creation or retrieval from database
  try {
    let user = await User.findOne({ facebookId: profile.id });

    if (!user) {
      const email = profile.emails ? profile.emails[0].value : null;
      if (email) {
        user = await User.findOne({ email });
      }

      if (user) {
        // Merge existing account with Facebook account
        user.facebookId = profile.id;
      } else {
        // Create a new account
        user = await User.create({
          facebookId: profile.id,
          email,
          displayName: profile.displayName,
          accountVerified: true,
          emailVerified: email ? true : false,
        });
      }
    }

    await user.save();
    done(null, user);
  } catch (error) {
    done(error);
  }
}));
