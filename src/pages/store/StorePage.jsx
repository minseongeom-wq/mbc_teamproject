import StoreHeroSection from '../../components/store/StoreHeroSection.jsx';
import StoreCategoryGrid from '../../components/store/StoreCategoryGrid.jsx';
import StoreProductRail from '../../components/store/StoreProductRail.jsx';
import StoreProductGrid from '../../components/store/StoreProductGrid.jsx';
import StoreFeatureGrid from '../../components/store/StoreFeatureGrid.jsx';
import { switch2Products, switchProducts, updateProducts, upgradeProducts, saleProducts } from '../../components/store/storeData.js';
import './StorePage.css';

export default function StorePage() {
  return (
    <div className="store-page">
      <StoreHeroSection />
      <div className="store-page__content">
        <StoreCategoryGrid />
        <StoreProductRail className="store-rail--switch2" title="Nintendo Switch2 Pick up" products={switch2Products} badge />
        <StoreProductRail className="store-rail--switch" title="Nintendo Switch Pick up" products={switchProducts} />
        <StoreProductRail className="store-rail--update" title="무료 업데이트로 Nintendo Switch 2만의 체험이 가능!" products={updateProducts} />
        <StoreProductRail className="store-rail--upgrade" title="업그레이드 패스 소개" products={upgradeProducts} badge />
        <StoreProductGrid />
        <StoreProductRail className="store-rail--sale" title="SALE" products={saleProducts} sale />
        <StoreFeatureGrid />
      </div>
    </div>
  );
}
