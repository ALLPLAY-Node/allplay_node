import express, {} from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
dotenv.config();
// BigInt serialization support
BigInt.prototype.toJSON = function () {
    return this.toString();
};
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("trust proxy", 1);
//EC2/Docker 리버스 프록시 환경에서 HTTPS 헤더 신뢰 설정
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
    res.success = (message, success) => {
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
    res.send("ALLPLAY API Server Ready");
});
app.use("/api/v1/users", userRouter);
// 전역 에러 핸들링
app.use((err, req, res, next) => {
    console.error(err);
    res
        .status(500)
        .json({ resultType: "FAIL", error: { message: "Internal Server Error" } });
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
//# sourceMappingURL=index.js.map