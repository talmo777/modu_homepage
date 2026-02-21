// 모두의 문제 연구소 - 프로젝트 데이터
// 새로운 프로젝트를 추가하려면 객체를 배열에 추가하세요.

export const projects = [
    {
        id: 1,
        title: "지역 쓰레기 무단투기 데이터 분석",
        status: "completed", // "ongoing" | "completed" | "planned"
        category: "환경/지역",
        summary: "관내 무단투기 빈발 지역의 공간 데이터를 분석하여 솔루션 제안",
        description: "관내 수집된 쓰레기 무단투기 민원 데이터를 기반으로 머신러닝 모델을 활용해 우범 지역을 예측하고, 효율적인 순찰 경로 및 CCTV 최적 배치 구간을 도출했습니다. 이 솔루션은 지역 사회의 쾌적한 환경 조성에 기여합니다.",
        tags: ["공간데이터", "머신러닝", "솔루션"],
        date: "2023.05 - 2023.11",
        thumbnail: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 2,
        title: "대중교통 혼잡도 예측 및 개선 모델링",
        status: "ongoing",
        category: "교통",
        summary: "출퇴근 시간대 버스 노선 혼잡도를 예측하여 증차 시뮬레이션 구축",
        description: "버스 승하차 API 데이터와 기상 데이터를 융합 분석하여, 정류장별 혼잡도를 실시간 예측하는 프로젝트입니다. 승객 불편을 최소화할 수 있는 데이터 기반의 정류소 및 배차 간격 개선 방향을 지자체에 제안하고자 합니다.",
        tags: ["시계열분석", "교통데이터", "시뮬레이션"],
        date: "2024.01 - 진행중",
        thumbnail: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 3,
        title: "소외계층 복지 사각지대 머신러닝 탐지",
        status: "planned",
        category: "사회복지",
        summary: "전력 사용량, 단수 등 비정형 데이터를 활용한 위기가구 초기 탐지",
        description: "건강보험료 체납, 단수 및 단전 이력 등을 통합 모니터링하여 복지 사각지대에 놓인 소외계층을 골든타임 내 발굴하기 위한 탐지 알고리즘을 구축할 계획입니다.",
        tags: ["이상탐지", "비정형데이터", "사회문제"],
        date: "2024 하반기 예정",
        thumbnail: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=800",
    }
];
