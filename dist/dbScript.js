/**
 * 공공시설 엑셀 데이터 임포트 스크립트
 *
 * 사용법:
 * npm run build
 * node dist/scripts/importPublicFacilities.js /path/to/excel.xls <operator_id>
 */
import "dotenv/config.js";
import XLSX from "xlsx";
import { prisma } from "./db.config.js";
// 시설유형 매핑 (엑셀 시설유형 → sport_type 이름)
const FACILITY_TYPE_MAPPING = {
    // 농구 (sport_type: "농구")
    농구장: "농구",
    체육관: "농구", // 복합시설은 농구로 매핑
    // 야구 (sport_type: "야구")
    야구장: "야구",
    야구시설: "야구",
    // 축구 (sport_type: "축구")
    축구장: "축구",
    축구시설: "축구",
    풋살장: "축구",
    풋살경기장: "축구",
    // 테니스 (sport_type: "테니스")
    테니스장: "테니스",
    테니스시설: "테니스",
    // 탁구 (sport_type: "탁구")
    탁구장: "탁구",
    탁구시설: "탁구",
    // 배드민턴 (sport_type: "배드민턴")
    배드민턴장: "배드민턴",
    배드민턴시설: "배드민턴",
    배드맨턴장: "배드민턴", // 오타 처리
};
// 제외할 시설유형
const EXCLUDED_TYPES = [
    "수영장",
    "골프장",
    "도서관",
    "공원",
    "기타",
    "복지관",
    "공공",
];
/**
 * 시설유형 문자열에서 sport_type 이름 추출
 * 복합시설의 경우 첫 번째 매칭 종목 사용
 */
function getFacilityTypeName(facilityType) {
    if (!facilityType)
        return null;
    // 제외 목록 확인
    for (const excluded of EXCLUDED_TYPES) {
        if (facilityType.includes(excluded))
            return null;
    }
    // 매핑 테이블에서 찾기
    for (const [key, typeName] of Object.entries(FACILITY_TYPE_MAPPING)) {
        if (facilityType.includes(key)) {
            return typeName;
        }
    }
    return null;
}
/**
 * 도로명주소에서 시도(city)와 시군구(district) 추출
 * 예: "경상남도 창원시 마산회원구 팔용로 128"
 *     → { city: "경상남도", district: "창원시 마산구" }
 */
function parseAddress(address) {
    if (!address)
        return null;
    const parts = address.trim().split(/\s+/);
    if (parts.length < 2)
        return null;
    let city = parts[0] || "";
    let district = parts[1] || "";
    // 시군구 합치기 로직 (예: 경기도 성남시 분당구 -> city: 경기도, district: 성남시 분당구)
    if (parts.length >= 3 && parts[1] && parts[2]) {
        // 두 번째 단어가 '시'로 끝나고 세 번째 단어가 '구'나 '군'으로 끝나는 경우
        if (parts[1].endsWith("시") &&
            (parts[2].endsWith("구") || parts[2].endsWith("군"))) {
            district = `${parts[1]} ${parts[2]}`;
        }
    }
    // 예외 케이스 처리: 세종특별자치시
    if (city && city.includes("세종")) {
        city = "세종특별자치시";
        district = "세종특별자치시";
    }
    if (!city || !district)
        return null;
    return { city, district };
}
/**
 * Region 조회 (API와 동일하게 조회만, 생성하지 않음)
 */
async function findRegion(city, district) {
    const region = await prisma.region.findFirst({
        where: { city, district },
    });
    return region;
}
/**
 * 엑셀 파일 읽기
 */
function readExcelFile(filePath) {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    if (!sheetName) {
        throw new Error("엑셀 파일에 시트가 없습니다");
    }
    const worksheet = workbook.Sheets[sheetName];
    if (!worksheet) {
        throw new Error("엑셀 워크시트를 읽을 수 없습니다");
    }
    // 첫 번째 줄을 헤더로 사용
    const data = XLSX.utils.sheet_to_json(worksheet, {
        defval: "",
        header: 1, // 첫 번째 줄을 헤더로 사용
    });
    // 첫 번째 줄이 비어있을 경우 제거
    if (data.length > 0 && data[0].every((cell) => !cell)) {
        data.shift();
    }
    // 헤더와 데이터 분리
    const headers = data[0];
    const rows = data.slice(1);
    // 데이터 매핑
    const result = rows.map((row) => {
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = row[index];
        });
        return obj;
    });
    return result;
}
/**
 * 메인 임포트 함수
 */
async function importPublicFacilities(filePath, operatorId) {
    console.log(`📂 파일 읽기 중: ${filePath}`);
    console.log(`👤 Operator ID: ${operatorId}\n`);
    // Operator ID 존재 확인
    try {
        const user = await prisma.users.findUnique({
            where: { id: BigInt(operatorId) },
            select: { id: true, name: true },
        });
        if (!user) {
            console.error(`❌ Operator ID ${operatorId}가 존재하지 않습니다!`);
            process.exit(1);
        }
        console.log(`✓ Operator 확인: ${user.name} (ID: ${user.id})\n`);
    }
    catch (error) {
        console.error(`❌ Operator 확인 실패:`, error);
        process.exit(1);
    }
    const OPERATOR_ID = BigInt(operatorId);
    try {
        const data = readExcelFile(filePath);
        console.log(`✓ 총 ${data.length}개 행 읽음\n`);
        // 첫 행의 키 출력 (디버깅용)
        if (data.length > 0) {
            console.log("📋 Excel 열 이름:");
            console.log(Object.keys(data[0]).slice(0, 10));
            console.log("");
        }
        let successCount = 0;
        let skipCount = 0;
        let regionNotFoundCount = 0;
        const errors = [];
        for (let i = 0; i < data.length; i++) {
            const row = data[i];
            try {
                // 필수 필드 확인
                const facilityName = row["개방장소명"]?.trim();
                const facilityTypeColumn = row["개방시설유형구분"]?.trim(); // 세 번째 컬럼
                const facilityTypeDescription = row["개방시설명"]?.trim(); // 첫 번째 컬럼 (더 구체적)
                const address = row["소재지도로명주소"]?.trim() || row["소재지지번주소"]?.trim();
                const contact = row["사용안내전화번호"]?.trim();
                const homepageUrl = row["홈페이지주소"]?.trim();
                if (!facilityName || !address) {
                    skipCount++;
                    console.log(`[${i}] 필수필드 누락: 시설명="${facilityName || "EMPTY"}" 주소="${address || "EMPTY"}"`);
                    continue;
                }
                console.log(`[${i}] 시설명="${facilityName}" | 개방시설명="${facilityTypeDescription}" | 개방시설유형구분="${facilityTypeColumn}"`);
                // 시설유형 필터링: 두 컬럼 모두 확인 (description이 더 구체적)
                let sportTypeName = getFacilityTypeName(facilityTypeDescription);
                if (!sportTypeName) {
                    sportTypeName = getFacilityTypeName(facilityTypeColumn);
                }
                if (!sportTypeName) {
                    skipCount++;
                    console.log(`      → 제외됨 (매핑 없음)`);
                    continue;
                }
                console.log(`      → 매핑: "${sportTypeName}"`);
                // SportType 조회 (API와 동일)
                const sport = await prisma.sportType.findFirst({
                    where: { sport_type: sportTypeName },
                });
                if (!sport) {
                    errors.push({
                        row: i + 1,
                        reason: `SportType '${sportTypeName}' 미등록`,
                    });
                    console.log(`[${i}] SportType 미등록: ${sportTypeName}`);
                    continue;
                }
                // 주소 파싱
                const parsedAddress = parseAddress(address);
                if (!parsedAddress) {
                    errors.push({ row: i + 1, reason: "주소 파싱 실패" });
                    console.log(`[${i}] 주소 파싱 실패: ${address}`);
                    continue;
                }
                console.log(`[${i}] 주소 파싱: ${address} → ${parsedAddress.city} / ${parsedAddress.district}`);
                // Region 조회 (API와 동일: 없으면 스킵)
                const region = await findRegion(parsedAddress.city, parsedAddress.district);
                if (!region) {
                    regionNotFoundCount++;
                    skipCount++;
                    console.log(`[${i}] 지역 미등록: ${parsedAddress.city} / ${parsedAddress.district}`);
                    continue;
                }
                console.log(`[${i}] ✓ 임포트 가능: ${facilityName} / ${sportTypeName} / ${region.district}`);
                // 운영 시간 (평일 시간만 사용)
                const operatingHours = [
                    row["평일운영시작시각"],
                    "~",
                    row["평일운영종료시각"],
                ]
                    .filter(Boolean)
                    .join(" ");
                // 요금 정보
                const cost = row["사용료"]?.toString().trim() || "0";
                // 신청 방법 (예약 가능 여부)
                const applyMethod = row["신청방법구분"]?.trim() || null;
                // DB INSERT (기존 스키마 길이에 맞춰 데이터 절삭)
                const facility = await prisma.sportFacilities.create({
                    data: {
                        name: facilityName.substring(0, 20), // 20자 제한
                        operator_id: OPERATOR_ID,
                        sport_type: sport.id,
                        region_id: region.id,
                        address: address.substring(0, 50), // 50자 제한
                        cost: cost.substring(0, 20), // 20자 제한
                        introduction: facilityTypeDescription || null,
                        information: row["부대시설정보"]?.toString() || null,
                        usage_guide: null,
                        contact_number: contact?.substring(0, 15) || null, // 15자 제한
                        url: homepageUrl?.substring(0, 255) || null,
                        operating_hours: operatingHours.substring(0, 15), // 15자 제한
                        apply_method: applyMethod?.substring(0, 30) || null, // 30자 제한
                        is_public: true,
                        created_at: new Date(),
                    },
                });
                successCount++;
                if (successCount % 100 === 0) {
                    console.log(`  진행 중... ${successCount}/${data.length}`);
                }
            }
            catch (error) {
                errors.push({
                    row: i + 1,
                    reason: error instanceof Error ? error.message : String(error),
                });
            }
        }
        console.log(`\n✅ 임포트 완료!`);
        console.log(`   성공: ${successCount}개`);
        console.log(`   지역 없음: ${regionNotFoundCount}개`);
        console.log(`   제외: ${skipCount - regionNotFoundCount}개 (시설유형 제외)`);
        console.log(`   오류: ${errors.length}개`);
        if (errors.length > 0) {
            console.log(`\n❌ 오류 상세 (${errors.length}개):`);
            errors.forEach((err) => {
                console.log(`   행 ${err.row}: ${err.reason}`);
            });
        }
    }
    catch (error) {
        console.error("❌ 임포트 실패:", error);
        process.exit(1);
    }
    finally {
        await prisma.$disconnect();
    }
}
// 메인 실행
const filePath = process.argv[2];
const operatorId = process.argv[3];
if (!filePath || !operatorId) {
    console.error("사용법: node dist/scripts/importPublicFacilities.js <엑셀파일경로> <operator_id>");
    console.error("예시: node dist/scripts/importPublicFacilities.js ./data.xls 1");
    process.exit(1);
}
importPublicFacilities(filePath, operatorId);
//# sourceMappingURL=dbScript.js.map