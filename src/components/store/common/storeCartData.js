export const storeCartStorageKey = 'nintendo-store-cart-v1';

// Initial sample items follow the cart shown in Figma. Cart totals always use live quantities.
export const initialStoreCartItems = [
    {
        id: 'human-fall-flat',
        name: '휴먼 폴 플랫',
        price: 4800,
        image: '9ea06.png',
        quantity: 1,
        crop: 'human',
    },
    { id: 'splatoon-2', name: '스플래툰 2', price: 64000, image: 'a231e.png', quantity: 1 },
    {
        id: 'sports-resort',
        name: '스포츠 리조트',
        price: 64000,
        image: 'b4f0a.png',
        quantity: 1,
        crop: 'contain',
    },
];

export const formatStorePrice = (price) => `₩ ${price.toLocaleString('ko-KR')}`;
