import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import passport from "passport";
import "./config/passport.config.js";
import authRouter from "./routes/auth.routes.js";
import facilityRouter from "./routes/facility.routes.js";
import presignedUrlRouter from "./routes/presigned-url.routes.js";
import clubRouter from "./routes/club.routes.js";
import userRouter from "./routes/user.routes.js";

dotenv.config();

// BigInt serialization support
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const app = express();
const port = process.env.PORT || 3000; // 포트 미지정 시 3000 사용
const prisma = new PrismaClient();

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.static("uploads")); // 업로드된 파일 접근
app.use(express.json()); // JSON 형태의 요청 body를 파싱
app.use(passport.initialize());
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.use((req, res, next) => {
  res.success = (message: string, success: any) => {
    return res.json({ resultType: "SUCCESS", message, error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      message: null,
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

app.use((req: any, res: any, next: any) => {
  req.user = { id: 1 }; // 1번 유저로 테스트
  next();
});

app.use("/auth", authRouter);
app.use(facilityRouter);
app.use(presignedUrlRouter);
app.use(clubRouter);

// 유저 라우터 추가 (기존 라우터들과 규칙을 맞춤)
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((err: any, req: any, res: any, next: any) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    message: null,
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

export { prisma };
