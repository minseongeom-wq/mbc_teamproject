import { generatePath } from 'react-router-dom';
import { previewProductId, routePaths } from '../../routes/routePaths.js';

export const storeImage = (name) => `${import.meta.env.BASE_URL}images/store/${name}`;
export const productHref = generatePath(routePaths.productDetail, { id: previewProductId });

export const switch2Products = [
  { name: '젤다의 전설 시간의 오카리나', price: '₩79,800', image: '89d2b.png' },
  { name: '스플래툰 레이더스', price: '₩64,800', image: 'f031c.png' },
  { name: 'Pokémon Pokopia', price: '₩79,800', image: '419b8.png' },
  { name: 'Pokémon Pokopia 익스팬션 패스', price: '₩39,900', image: '3c754.png' },
  { name: '파이어 엠블렘 만자천홍', price: '₩89,800', image: 'b46f9.png' },
  { name: 'Meccha Chameleon', price: '₩8,300', image: '385ed.png' },
];

export const switchProducts = [
  { name: '리듬 천국 미라클 스타즈', price: '₩64,800', image: 'c894d.png' },
  { name: '친구모아 아일랜드 두근두근 라이프', price: '₩64,800', image: 'd353e.png' },
  { name: '모여봐요 동물의 숲', price: '₩64,800', image: '49873.png', crop: 'switch-forest' },
  { name: 'Nintendo Switch Sports', price: '₩44,800', image: 'ca61e.png' },
  { name: '피크민 3 디럭스', price: '₩64,800', image: '1a69d.png' },
  { name: 'Pokémon LEGENDS Z-A', price: '₩69,800', image: '27700.png', crop: 'switch-pokemon' },
];

export const updateProducts = [
  { name: '슈퍼 마리오 갤럭시 + 슈퍼마리오 갤럭시 2', price: '₩74,800', image: '097c3.png' },
  { name: '모여봐요 동물의 숲', price: '₩64,800', image: '2a7c7.png', crop: 'update-forest' },
  { name: '스플래툰 3', price: '₩64,800', image: '3b7d1.png' },
  { name: 'Pokémon Champions', price: '₩0', image: '63ae0.png' },
  { name: '젤다의 전설 꿈꾸는 섬', price: '₩64,800', image: '9f340.png' },
  { name: '말랑말랑 두뇌학원', price: '₩34,800', image: '19672.png', crop: 'update-brain' },
];

export const upgradeProducts = [
  { name: 'Woodo - Nintendo Switch 2 Edition 업그레이드 패스', price: '₩0', image: 'e2e66.png', crop: 'upgrade-woodo' },
  { name: '라면 가게 스토리(The Ramen Sensei) - Nintendo Switch 2 Edition 업그레이드 패스', price: '₩4,500', image: 'cb014.png', crop: 'upgrade-ramen' },
  { name: 'Asdivine Knot - Nintendo Switch 2 Edition 업그레이드 패스', price: '₩0', image: '98ce7.png', crop: 'upgrade-knot' },
  { name: 'Lou’s Lagoon - Nintendo Switch 2 Edition 업그레이드 패스', price: '₩0', image: '4ce48.png', crop: 'upgrade-lagoon' },
  { name: 'Pipistrello and the Cursed Yoyo - Nintendo Switch 2 Edition 업그레이드 패스', price: '₩0', image: 'ff7f7.png' },
  { name: '1000xRESIST - Nintendo Switch 2 Edition 업그레이드 패스', price: '₩0', image: '212ba.png' },
];

export const saleProducts = [
  { name: 'JUST DANCE 2026', price: '₩29,500', originalPrice: '정가 ₩59,000', image: '81069.png' },
  { name: '호그와트 레거시 Hogwarts Legacy', price: '₩7,980', originalPrice: '정가 ₩79,800', image: '24479.png' },
  { name: '페르소나4 더 골든 (Persona 4 The Golden)', price: '₩11,880', originalPrice: '정가 ₩19,800', image: '6ed78.png' },
  { name: '페르소나5 더 로열 (PERSONA5 THE ROYAL)', price: '₩20,940', originalPrice: '정가 ₩69,800', image: '1854a.png' },
  { name: 'FINAL FANTASY VII REMAKE INTERGRADE', price: '₩12,450', originalPrice: '정가 ₩49,800', image: '4f0eb.png' },
  { name: '휴먼: 폴 플랫 (Human: Fall Flat)', price: '₩4,800', originalPrice: '정가 ₩16,000', image: 'b15f4.png' },
];

export const categoryCards = [
  { label: 'Nintendo Switch 2', image: '5ceec.png', type: 'promo' },
  { label: 'Nintendo Switch 2에서 즐길 수 있는 소프트웨어 메이커!', lines: ['Nintendo Switch 2에서', '즐길 수 있는 소프트웨어 메이커!'], image: '3277d.png', type: 'editorial', crop: 'category-maker' },
  { label: '한 대의 본체로 함께 즐길 수 있는 게임을 소개합니다.', lines: ['한 대의 본체로 함께 즐길 수', '있는 게임을 소개합니다.'], image: '8469a.png', type: 'editorial', crop: 'category-together' },
  { label: 'Nintendo Switch Online', image: '5dc36.png', type: 'editorial', crop: 'category-online' },
  { label: 'MARIO', image: '435f0.png', type: 'ip', color: '#e70012', background: '#e60012', crop: 'category-mario', href: '/ip/mario' },
  { label: 'ZELDA', image: '6c684.png', type: 'ip', color: '#4cc3a8', crop: 'category-zelda', href: '/ip/zelda' },
  { label: 'SPLATOON', image: 'edb64.png', type: 'ip', color: '#24343d', crop: 'category-splatoon', href: '/ip/splatoon' },
  { label: 'KIRBY', image: 'bfe9b.png', type: 'ip', color: '#f196bf', background: '#ffb3cd', crop: 'category-kirby' },
];

export const genreCards = [
  ['ACTION', '3e146.png', 'genre-action'],
  ['SHOOTING', '69a70.png', 'genre-shooting'],
  ['RPG', '2fb63.png', 'genre-rpg'],
  ['SPORTS', 'a8d98.png', 'genre-sports'],
  ['FIGHTING', 'dd26a.png', 'genre-fighting'],
  ['PUZZLE', '8799c.png', 'genre-puzzle'],
  ['RACING', '647bd.png', 'genre-racing'],
  ['ARCADE', 'af058.png', 'genre-arcade'],
];

export const featureCards = [
  ['Nintendo Switch 2', 'aa8c4.svg'],
  ['Nintendo Switch Sports Resort 세트', 'af908.svg', ['Nintendo Switch', 'Sports Resort 세트']],
  ['파이어 엠블렘 만자천홍 Dagdan Collection', '6907c.svg', ['파이어 엠블렘 만자천홍', 'Dagdan Collection']],
  ['파이어 엠블렘 만자천홍', 'c41f6.svg'],
  ['Virtual Boy for Nintendo Switch 2', 'a645a.svg'],
  ['Nintendo 64 컨트롤러', 'e99eb.svg'],
  ['오비탈스 Orbitals', '7f4e4.svg'],
];
