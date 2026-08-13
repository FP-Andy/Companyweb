# 레포 이관 절차 — Companyweb

이 폴더(`handoff/`)의 내용이 **새 사이트 전체**입니다. 기존 `FP-Andy/Companyweb` 레포를 이 내용으로 교체합니다.

빌드 없음. 복사 → 커밋 → 푸시하면 GitHub Pages가 그대로 서빙합니다.

---

## 1. 기존 레포에서 삭제할 것

개편으로 대체되었거나 더 이상 참조되지 않는 파일입니다.

```
index.html            → 루트 meta refresh 리다이렉트. 진짜 홈으로 교체됨
company.html          → /company/index.html 로 대체
contact.html          → /contact/index.html 로 대체
values.html           → 콘텐츠는 /company/ 핵심가치 섹션에 흡수 (D-04 결정)
DESIGN.md             → DESIGN-NOTES.md 로 대체
airtable/             → 이번 개편에서 쓰지 않음. 별도 용도면 그대로 두십시오
assets/App/
assets/images/
assets/scripts/
assets/styles/        → 새 assets/ 구조로 전면 교체
```

**남겨둘 것**: `.git/`, `references/`, `발표자료.pdf`, `사회적기업 사업계획서.pdf`, `PRODUCT.md`, `.design/`
(뒤 둘은 `.gitignore` 대상이라 커밋되지 않습니다. 로컬 참고용으로 유지하십시오.)

`assets/` 원본(`.ai`, `파인 루덴스 로고 ci.pdf`, 대회 원본 사진)은 **아카이브 폴더로 옮기십시오**. 웹에서 로드하지는 않지만 원본 소실은 피해야 합니다:

```bash
mkdir -p _archive
git mv assets/*.ai assets/*.pdf _archive/ 2>/dev/null || mv assets/*.ai assets/*.pdf _archive/
echo "_archive/" >> .gitignore
```

## 2. 새 내용 복사

```bash
# handoff/ 안의 모든 것을 레포 루트로 (점 파일 포함)
cp -R handoff/. /path/to/Companyweb/
```

포함되는 것:

```
index.html  product/  company/  profile/  contact/
assets/css/site.css        연속 스크롤 4면 공통 스타일
assets/css/profile.css     기업소개서 전용
assets/js/count.js         지표 카운트업 (유일한 JS)
assets/img/  assets/logo/  assets/brand/
CNAME  robots.txt  sitemap.xml  .nojekyll  .gitignore
CLAUDE.md  DESIGN-NOTES.md  AUDIT-2026-08-12.md  README.md
```

`.nojekyll`은 새로 추가한 파일입니다 — GitHub Pages의 Jekyll 처리를 꺼서 `assets/` 경로가 예외 없이 그대로 서빙되게 합니다.

## 3. 확인

```bash
cd /path/to/Companyweb
python3 -m http.server 8000
```

`http://localhost:8000` 에서 5면 전부 열고 확인할 것:

- 헤더 내비 5개 링크가 모두 이동하는가 (경로는 `product/index.html` 형태)
- 홈·제품·회사·문의: 일반 스크롤, 섹션 경계선·색면 없이 종이 한 장으로 이어지는가
- 기업소개서: 스크롤 한 번에 한 장씩 넘어가고 좌측 인덱스가 따라오는가
- 브라우저 폭을 390px로 줄여 가로 스크롤이 생기지 않는가
- 지표 숫자(88.5 / 93.5 / 83.6)가 세어 올라가는가

## 4. 커밋

```bash
git add -A
git commit -m "홈페이지 전면 개편: 5면 신규 제작, 기업소개서 카탈로그화"
git push
```

배포 후 `https://fineludens.kr` 에서 캐시를 비우고(하드 리로드) 재확인하십시오.

---

## 이관 후 Claude Code에서 시작하기

레포 루트에서 Claude Code를 열면 `CLAUDE.md`가 자동으로 읽힙니다. 거기에 절대 규칙·두 페이지 모델·모션 시스템·접근성 기준이 있습니다.

작업 순서 권장:

1. `CLAUDE.md` 통독 — 특히 "두 가지 페이지 모델"과 "모션 시스템"의 타임라인 구분
2. `DESIGN-NOTES.md`의 "남은 작업" 우선순위 A — 배포 전 반드시 닫아야 하는 항목
3. `AUDIT-2026-08-12.md`의 "남은 권고" — 판단이 필요한 5건

## 판단이 필요한 열린 결정

| 항목 | 상황 |
|---|---|
| 지표 3종 측정 조건 | mAP@50 88.5 / Precision 93.5 / Recall 83.6 의 데이터셋·클래스·프레임 조건 미확보. 조건 없이 수치만 두면 신뢰도가 없습니다. 확보하거나 빼야 합니다. |
| 파트너 로고 관계 표기 | 10개 로고의 관계 성격(주최/후원/데이터 파트너/실증 참여) 미확인. 잘못 표기하면 법적 문제입니다. |
| 문의 폼 전송 | 백엔드가 없어 현재 메일 링크입니다. Formspree·Google Form 중 선택 필요. |
| 모바일 내비 | 5개 링크 + Contact 버튼이 두 줄로 감깁니다. 항목이 늘면 햄버거 메뉴 필요. |
| 기업소개서 모바일 | 챕터 인덱스가 숨겨져 위치 감각이 없습니다. 상단 진행 표시(0N/08) 추가 권장. |
