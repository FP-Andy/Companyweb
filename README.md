# fineludens.kr

(주)파인루덴스 공식 사이트. 빌드 없는 정적 HTML/CSS — GitHub Pages 배포용.

## 구조

```
index.html            홈 (5섹션)
product/index.html    Fine Play 제품 (6섹션)
company/index.html    회사 소개 (10섹션)
profile/index.html    기업소개서 (8장 PPT형 카탈로그)
contact/index.html    문의 (3섹션)
assets/
  css/site.css        연속 스크롤 페이지 공통 스타일 (홈·제품·회사·문의)
  css/profile.css     기업소개서(PPT형 카탈로그) 전용 스타일
  brand/              로고 (심볼 mark-*, 락업 lockup-*, 3색)
  img/                사진
  logo/               파트너 로고 10종
CNAME  robots.txt  sitemap.xml  .nojekyll
CLAUDE.md             Claude Code 작업 지침 — 먼저 읽으십시오
DESIGN-NOTES.md       디자인 결정·콘텐츠 진실·남은 작업
AUDIT-2026-08-12.md   접근성·레이아웃 점검 결과
MIGRATION.md          기존 레포 교체 절차
```

## 로컬 확인

파일을 브라우저로 직접 열면 됩니다. 경로 문제 없이 보려면:

```
python3 -m http.server 8000
# http://localhost:8000
```

## 배포

이 폴더의 내용을 레포 루트에 두고 GitHub Pages를 활성화합니다. 빌드 단계 없음.

기존 레포 교체 절차는 `MIGRATION.md`를 따르십시오 — 삭제할 파일 목록과 확인 항목이 있습니다.

## 브라우저

Chrome·Edge·Safari 최신에서 스크롤 연출과 기업소개서의 화면 단위 전환이 동작합니다. Firefox에서는 연출 없이 정적으로 보이며, 콘텐츠는 전부 정상 노출됩니다.
