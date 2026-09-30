const base = import.meta.env.BASE_URL;
const cards = (year) => ['01', '02'].map((number, index) => ({
  src: `${base}images/history/history-flat-${year}-${number}.png`,
  slotOffset: index + 1, width: 735, height: 480,
}));
export const historyOverviewYears = [
  {
    year: '1889', yearVisual: { src: `${base}images/history/history-year-1889.png`, width: 824, height: 315 }, model: `${base}models/1889.glb`,
    description: '야마우치 후사지로는 일본 교토시 시모교구에서 일본 전통 화투인 하나후다를 제작해 판매하기 시작했습니다.',
    calibration: { size: 690, rotation: [0, -0.12, -0.08], offset: [-13, 0, 0] },
    cards: cards('1889'),
  },
  {
    year: '1983', yearVisual: { src: `${base}images/history/history-year-1983.png`, width: 824, height: 315 }, model: `${base}models/famicom.glb`,
    description: '1983년, Family Computer(Famicom)가 일본에서 출시되었습니다. 닌텐도의 대표적인 게임 경험이 가정으로 확장되는 중요한 출발점이 되었습니다.',
    calibration: { size: 800, rotation: [-0.12, 0, -0.08], offset: [-13, 0, 0],
      basis: [0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], turnY: Math.PI },
    cards: cards('1983'),
  },
  {
    year: '1989', yearVisual: { src: `${base}images/history/history-year-1989.png`, width: 824, height: 315 }, model: `${base}models/gameboy.glb`,
    description: '1989년, 닌텐도는 휴대형 게임기 Game Boy를 출시했습니다. 게임을 집 밖에서도 즐길 수 있게 하며 놀이의 공간을 손안으로 확장했습니다.',
    calibration: { size: 760, rotation: [-0.06, -0.2, -0.08], offset: [-13, 0, 0] },
    cards: cards('1989'),
  },
  {
    year: '2004', yearVisual: { src: `${base}images/history/history-year-2004.png`, width: 850, height: 255 }, model: `${base}models/nintendo-ds.glb`,
    description: '2004년, 닌텐도는 두 개의 화면과 터치스크린을 갖춘 Nintendo DS를 출시했습니다. 화면을 직접 터치하는 직관적인 조작을 통해 휴대형 게임의 새로운 가능성을 제시했습니다.',
    calibration: { size: 800, rotation: [0.25, -0.2, -0.08], offset: [-13, 0, 0] },
    cards: cards('2004'),
  },
  {
    year: '2006', yearVisual: { src: `${base}images/history/history-year-2006.png`, width: 844, height: 255 }, model: `${base}models/wii.glb`,
    description: '2006년, 닌텐도는 몸의 움직임을 활용해 게임을 즐길 수 있는 Wii를 출시했습니다. 직관적인 조작을 통해 가족과 친구가 함께 참여하는 새로운 놀이 경험을 넓혀갔습니다.',
    calibration: { size: 760, rotation: [0.06, -0.2, -0.06], offset: [-13, 0, 0] },
    cards: cards('2006'),
  },
  {
    year: '2025', yearVisual: { src: `${base}images/history/history-year-2025.png`, width: 825, height: 255 }, model: `${base}models/switch-2.glb`,
    description: '2025년, 닌텐도는 Nintendo Switch 2를 출시했습니다. 더 커진 화면과 향상된 성능, 새롭게 설계된 Joy-Con 2를 통해 Nintendo Switch의 놀이 경험을 한 단계 확장했습니다.',
    calibration: { size: 900, rotation: [-0.06, -0.15, -0.06], offset: [-13, 0, 0],
      basis: [0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1] },
    cards: cards('2025'),
  },
];
