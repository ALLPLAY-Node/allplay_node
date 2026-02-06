export {};
/*
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { AuthRepository } from "../repositories/auth.repository.js";

const userRepository = new AuthRepository();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/auth/google/callback", // 구글 로그인 후 돌아올 주소
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback", // 구글 로그인 후 돌아올 주소
    proxy: true,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const { id, emails, displayName, photos } = profile;
        const email = emails?.[0]?.value || "";

        // 통합 인증 로직: 유저 찾기 없으면 생성
        const user = await userRepository.findByGoogleId(id);
        if (user) return done(null, user);

        const newUser = await userRepository.createUser({
          googleId: id,
          email: email,
          name: displayName,
          profilePhotoUrl: photos?.[0]?.value,
        });

        return done(null, newUser);
      } catch (error) {
        return done(error as Error);
      }
    },
  ),
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || "your_secret",
};
passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      // 토큰 페이로드에 담긴 id를 반환
      return done(null, { id: jwtPayload.id });
    } catch (error) {
      return done(error, false);
    }
  }),
);


*/
//# sourceMappingURL=passport.config.js.map