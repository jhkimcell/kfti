// 관리자에서 편집하는 "단일 문구"(재단소개) 정의. 블록(그룹) 단위로 저장합니다.
// 사업분야/조직구성의 카드는 '사업·조직 항목'(page_items)에서 항목 단위로 관리합니다.
// default 값은 공개 페이지(HTML)의 현재 문구와 동일해야 합니다.
export type ContentField = {
  key: string;
  label: string;
  group: string;
  rows: number;
  default: string;
};

export const CONTENT_GROUPS = ["재단소개", "후원"] as const;

export const CONTENT_FIELDS: ContentField[] = [
  {
    key: "about_heading",
    label: "설립취지 — 큰 문구 (줄바꿈 가능)",
    group: "재단소개",
    rows: 2,
    default: "문화가 곧 국가 경쟁력입니다.\n세계를 주도하는 'K-선도국가'로.",
  },
  {
    key: "about_purpose",
    label: "설립취지 — 본문 (빈 줄로 문단 구분)",
    group: "재단소개",
    rows: 9,
    default:
      "대한민국은 비약적인 경제 성장과 민주주의 성취를 바탕으로 세계가 주목하는 국가로 도약했습니다. 특히 국민의 창의성과 역동성이 집약된 'K-컬처'는 명실상부한 문화강국으로서의 위상을 증명하고 있으며, 이제 우리나라는 세계를 주도하는 'K-선도국가'로서의 역할을 요구받고 있습니다.\n\n그러나 진정한 문화강국으로 거듭나기 위한 장기적 전략과 이를 확산할 공공적 기반은 아직 미비한 실정입니다. 정치·경제·사회 발전의 원동력과 융합하여 세계를 주도하는 문화국가를 실현할 공공 플랫폼 구축이 절실합니다.\n\n이에 재단법인 K-선도국가 미래포럼은 우리나라의 발전 경험과 문화적 역량을 체계적으로 정리·확산하여, 선도국가로 나아가는 문화 창달의 공공 플랫폼 역할을 수행하고자 합니다. 문화가 국가 발전의 핵심 경쟁력이 되고, 대한민국이 문화강국이자 K-선도국가로 비상하는 데 기여하겠습니다.",
  },
  { key: "about_mission_title", label: "미션 — 제목", group: "재단소개", rows: 1, default: "미션" },
  {
    key: "about_mission",
    label: "미션 — 내용",
    group: "재단소개",
    rows: 2,
    default:
      "대한민국의 문화적 역량을 결집·확산하여 세계를 주도하는 'K-선도국가' 실현에 기여한다.",
  },
  { key: "about_vision_title", label: "비전 — 제목", group: "재단소개", rows: 1, default: "비전" },
  {
    key: "about_vision",
    label: "비전 — 내용",
    group: "재단소개",
    rows: 2,
    default: "문화가 곧 국가 경쟁력이 되는 문화 창달의 공공 플랫폼.",
  },
  { key: "about_values_title", label: "핵심가치 — 제목", group: "재단소개", rows: 1, default: "핵심가치" },
  {
    key: "about_values",
    label: "핵심가치 — 내용",
    group: "재단소개",
    rows: 2,
    default: "공공성 · 개방 · 협력 · 미래세대를 지향한다.",
  },
  // ===== 후원 =====
  {
    key: "support_donate_url",
    label: "후원하기 버튼 링크 (아웃링크 URL · 새 창으로 열림)",
    group: "후원",
    rows: 1,
    default: "",
  },
  {
    key: "support_intro",
    label: "사업소개",
    group: "후원",
    rows: 5,
    default:
      "재단법인 K-선도국가 미래포럼은 대한민국을 세계를 주도하는 'K-선도국가'로 이끄는 문화 창달의 공공 플랫폼입니다. 여러분의 정기후원은 문화 연구·교육, 대국민 문화 캠페인, 지식 자산 플랫폼 운영, 국내외 문화 협력 네트워크 등 재단의 공익사업을 이어가는 든든한 토대가 됩니다.",
  },
  {
    key: "support_benefits",
    label: "정기후원 예우",
    group: "후원",
    rows: 5,
    default:
      "정기후원 회원께는 재단이 주최하는 다양한 행사에 우선 초대해 드립니다. 또한 후원 기간에 따른 감사 선물과 기부금 영수증 발급, 주요 사업·연구 성과 안내 등 회원만을 위한 예우를 제공합니다.",
  },
];
