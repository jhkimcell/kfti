// 사업분야/조직구성/후원 카드·FAQ 섹션 정의 + 기본 항목(처음 1회 불러오기용).
export type SectionSlug = "research" | "org_division" | "org_support" | "support_faq";

export type SectionConfig = {
  label: string; // 사이드바/제목
  layout: "row" | "card" | "faq"; // 공개 페이지 표시 형태
  hasImage: boolean; // 이미지 필드 사용 여부
  hasTag: boolean; // 작은 라벨 사용 여부
  titleLabel?: string; // 제목/본문 입력 라벨 커스텀 (FAQ=질문/답변)
  bodyLabel?: string;
};

export const SECTIONS: Record<SectionSlug, SectionConfig> = {
  research: { label: "사업분야 — 사업", layout: "row", hasImage: true, hasTag: false },
  org_division: { label: "조직구성 — 핵심 본부", layout: "card", hasImage: false, hasTag: true },
  org_support: { label: "조직구성 — 지원조직·위원회", layout: "card", hasImage: false, hasTag: true },
  support_faq: { label: "후원 — 자주묻는 질문", layout: "faq", hasImage: false, hasTag: false, titleLabel: "질문", bodyLabel: "답변" },
};

export function isSection(v: string): v is SectionSlug {
  return v === "research" || v === "org_division" || v === "org_support" || v === "support_faq";
}

type DefaultItem = {
  icon: string;
  tag: string;
  title: string;
  body: string;
  bullets: string;
  image_url: string;
  sort_order: number;
};

export const DEFAULT_ITEMS: Record<SectionSlug, DefaultItem[]> = {
  research: [
    {
      icon: "🎓", tag: "", title: "문화 연구 및 교육 사업",
      body: "K-콘텐츠·푸드·뷰티·바이오 등 대한민국을 문화 주도 성장 국가로 이끄는 핵심 분야의 문화적 역량과 가치를 체계화합니다. 전문가 포럼과 공공 담론을 통해 'K-컬처'의 글로벌 위상을 강화하고, 미래 세대와 시민을 위한 맞춤형 교육으로 창의적인 문화 생태계를 조성합니다.",
      bullets: "K-콘텐츠·푸드·뷰티·바이오 문화 역량 체계화\n전문가 포럼 및 공공 담론 운영\n미래 세대·시민 맞춤형 문화 교육",
      image_url: "https://placehold.co/640x420/1a2db4/c8a45c?text=Research+%26+Education", sort_order: 1,
    },
    {
      icon: "📣", tag: "", title: "대국민 문화 캠페인 및 공익 콘텐츠 확산 사업",
      body: "주요 연구 성과와 핵심 담론을 다각도의 공익적 콘텐츠로 기획·보급하여 문화적 공감대를 형성합니다. 시민이 주체적으로 참여하는 문화 가치 공유 프로그램과 국내외 전략적 홍보를 통해 일상 속 문화 실천과 국가 브랜드의 글로벌 경쟁력을 높입니다.",
      bullets: "공익 콘텐츠 기획·보급\n시민 참여형 문화 가치 공유 프로그램\n국가 브랜드 글로벌 홍보",
      image_url: "https://placehold.co/640x420/111b6e/3a4fd6?text=Campaign", sort_order: 2,
    },
    {
      icon: "🗂️", tag: "", title: "지식 자산 기록·보존 및 플랫폼 운영 사업",
      body: "문화 가치를 공유·확산하는 온·오프라인 플랫폼을 구축·운영하여 개방형 담론의 기반을 만듭니다. 학술 연구 성과와 사업 결과물을 도서·기록물로 발간해 지식 자산을 체계화하고, 공공·교육 기관에 널리 공유하여 미래 세대를 위한 문화적 가치를 전승합니다.",
      bullets: "개방형 온·오프라인 플랫폼 운영\n도서·기록물 발간 및 지식 자산 체계화\n공공·교육 기관 공유·확산",
      image_url: "https://placehold.co/640x420/1a2db4/c8a45c?text=Platform", sort_order: 3,
    },
    {
      icon: "🤝", tag: "", title: "국내외 문화 협력 네트워크 구축 사업",
      body: "'민·관·학'을 아우르는 유기적 협력 네트워크를 구축·활용하여 사업의 사회적 파급력과 실행 동력을 극대화합니다. 국내외 유관 기관 및 단체와 다각적 문화 협력 관계를 맺어 '우리나라의 문화적 가치'를 전 세계에 전파하고, 문화 선도 국가로서의 위상을 확고히 합니다.",
      bullets: "민·관·학 협력 네트워크 구축\n국내외 유관 기관·단체 협력\n글로벌 문화 가치 전파",
      image_url: "https://placehold.co/640x420/111b6e/3a4fd6?text=Network", sort_order: 4,
    },
  ],
  org_division: [
    { icon: "🧠", tag: "Think-Tank", title: "K-ThinkTank", body: "국가 성장 모델 설계",
      bullets: "K-콘텐츠·푸드·뷰티·바이오 등 핵심 분야 역량 체계화\nK-선도국가 비전·로드맵 및 융합 성장 전략 연구\n전문가 포럼·공공 담론으로 위상 강화", image_url: "", sort_order: 1 },
    { icon: "🎬", tag: "Creative", title: "K-컬처콘텐츠본부", body: "전략 시각화 및 대중 전달",
      bullets: "연구 성과·담론을 영상·다큐·웹툰 등 공익 콘텐츠로 제작\n국가 브랜드 글로벌 경쟁력 제고 전략 홍보\n대국민 문화 캠페인 및 미디어 채널 운영", image_url: "", sort_order: 2 },
    { icon: "🤝", tag: "Platform", title: "K-컬처시민본부", body: "가치 공유 및 정착",
      bullets: "시민 참여형 문화 가치 공유 프로그램 운영\n온·오프라인 플랫폼(Open-K 아카이브) 구축·운영\n지식 자산 기록·보존 및 출판", image_url: "", sort_order: 3 },
  ],
  org_support: [
    { icon: "🌐", tag: "Networking", title: "대외협력팀", body: "",
      bullets: "민·관·학 협력 네트워크 구축\n국내외 유관기관·싱크탱크 전략적 제휴\n지역위원회 운영 지원", image_url: "", sort_order: 1 },
    { icon: "📋", tag: "Management", title: "경영지원팀", body: "",
      bullets: "재무·회계 관리\n인사 및 총무 행정\n법인 이사회 지원", image_url: "", sort_order: 2 },
    { icon: "🧭", tag: "Strategic Compass", title: "자문위원회", body: "",
      bullets: "재단 비전 및 정책 방향성 검증\nK-선도국가 전략의 학술적·정책적 자문\n글로벌 위상 강화 담론 지원", image_url: "", sort_order: 3 },
    { icon: "📍", tag: "Regional Committee", title: "지역위원회", body: "",
      bullets: "지역 중심 문화 가치 공유·캠페인 전개\n지역 문화 리더 발굴 및 네트워크 운영\n지역 특화 K-컬처 사례 발굴·자산화", image_url: "", sort_order: 4 },
  ],
  support_faq: [
    { icon: "", tag: "", title: "정기후원 결제 방법과 결제일이 궁금해요.",
      body: "정기후원은 두 가지 방법으로 참여하실 수 있습니다. CMS 자동이체는 매월 5일 또는 25일 중 선택하여 등록 계좌에서 자동이체되며, 신용·체크카드는 매월 20일 등록 카드에서 자동결제됩니다. 결제가 실패하면 다음 달에 미납액이 함께 청구되며, 재단에서 전화·문자·이메일로 안내드립니다.",
      bullets: "", image_url: "", sort_order: 1 },
    { icon: "", tag: "", title: "자녀 이름으로 후원하고 부모 명의로 결제할 수 있나요?",
      body: "가능합니다. 자녀 이름으로 후원하면서 결제정보는 부모님 명의로 등록하실 수 있습니다. 부모님의 성함과 결제정보를 입력하고 본인 확인 절차를 거치면 됩니다.",
      bullets: "", image_url: "", sort_order: 2 },
    { icon: "", tag: "", title: "정기후원 시 세액공제 혜택을 받을 수 있나요?",
      body: "네, 재단 기부금은 지정기부금으로 인정되어 연말정산 시 세액공제 혜택을 받으실 수 있습니다. 기부금 영수증은 재단에서 발급해 드립니다.",
      bullets: "", image_url: "", sort_order: 3 },
    { icon: "", tag: "", title: "후원금은 어디에 사용되나요?",
      body: "후원금은 'K-선도국가' 실현을 위한 문화 연구·교육, 대국민 문화 캠페인, 지식 자산 플랫폼 운영, 국내외 문화 협력 네트워크 등 재단의 공익사업에 소중하게 사용됩니다.",
      bullets: "", image_url: "", sort_order: 4 },
    { icon: "", tag: "", title: "공무원, 교사도 후원회원이 될 수 있나요?",
      body: "네, 본 재단은 일반 비영리 재단으로 공무원·교사를 포함한 누구나 제약 없이 후원회원으로 참여하실 수 있습니다.",
      bullets: "", image_url: "", sort_order: 5 },
  ],
};
