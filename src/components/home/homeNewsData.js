import { routePaths } from '../../routes/routePaths.js';

export const homeNewsAsset = filename => `${import.meta.env.BASE_URL}images/home/news/${filename}`;

export const homeNewsData = {
  splatoon: {
    id: 'splatoon',
    image: homeNewsAsset('splatoon.png'),
    title: ['잉크로 물드는 컬러풀한 배틀', '스플래툰3'],
    description: ['4대4 팀으로 나뉘어 영역을 칠하는 「영역 배틀」과', '「새먼 런 NEXT WAVE」를 즐길 수 있습니다.', '다양한 무기와 기어로 나만의 스타일을 완성해 보세요.'],
    buttonText: '스플래툰3 상세페이지 바로가기',
    link: '/ip/splatoon',
  },
  marioKart: {
    id: 'marioKart',
    image: homeNewsAsset('mario-kart.png'),
    title: ['마리오 카트 8 디럭스', '무료 업데이트 배포'],
    // Figma 2458:18544 원문. 다른 게임의 설명이 포함되어 있어 콘텐츠 확정 시 교체합니다.
    description: ['Nintendo Switch 2에서 플레이 시', '「새먼 런 NEXT WAVE」를 즐길 수 있습니다.', '다양한 무기와 기어로 나만의 스타일을 완성해 보세요.'],
    buttonText: 'E-shop 페이지 바로가기',
    link: routePaths.store,
  },
  pikmin: {
    id: 'pikmin',
    image: homeNewsAsset('pikmin.png'),
    title: ['부산 프리미엄 아울렛', '피크민 콜라보 등장'],
    description: ['피크민4 게임 체험부터 다양한 이벤트들과', 'Nintendo Switch 2 제품과 피크민 굿즈 등', '공식 라이선싱 상품까지 만나보세요'],
    buttonText: 'E-shop 페이지 바로가기',
    link: routePaths.store,
  },
  zelda: {
    id: 'zelda',
    image: homeNewsAsset('zelda.png'),
    title: ['광대한 하이랄에서 펼쳐지는 이야기', '젤다의 전설'],
    description: ['넓은 대지에서 일어나는 미스테리한 이야기들', '링크가 되어 다양한 장소를 탐험하고,', '숨겨진 수수께끼를 풀며 새로운 이야기를 만나보세요.'],
    buttonText: '젤다의 전설 상세페이지 바로가기',
    link: '/ip/zelda',
  },
};
