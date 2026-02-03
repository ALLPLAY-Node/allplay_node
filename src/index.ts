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

dotenv.config();

const app = express();
app.set("trust proxy", 1);
const port = process.env.PORT;
const prisma = new PrismaClient();

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.static("uploads")); // 업로드된 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(passport.initialize());
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

/**
 * 공통 응답을 사용할 수 있는 헬퍼 함수 등록
 */
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

app.use("/auth", authRouter);
app.use(facilityRouter);
app.use(presignedUrlRouter);
app.use(clubRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

/**
 * 전역 오류를 처리하기 위한 미들웨어
 */
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

// Graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

export { prisma };
