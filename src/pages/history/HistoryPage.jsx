import HistoryIntroSection from '../../components/history/HistoryIntroSection';
import HistoryHeroStorySection from '../../components/history/HistoryHeroStorySection';
import HistoryStoryTransitionSection from '../../components/history/HistoryStoryTransitionSection';
import HistoryBrandStatement01 from '../../components/history/HistoryBrandStatement01';
import HistoryBrandStatement02 from '../../components/history/HistoryBrandStatement02';
import HistoryBrandStatement03 from '../../components/history/HistoryBrandStatement03';
import HistoryVisualStoryGallery from '../../components/history/HistoryVisualStoryGallery';
import HistoryOverviewSection from '../../components/history/HistoryOverviewSection';
import HistoryAwardsRecognitionSection from '../../components/history/HistoryAwardsRecognitionSection';
import HistoryLogoGridSection from '../../components/history/HistoryLogoGridSection';
import HistoryDetailsIntroSection from '../../components/history/HistoryDetailsIntroSection';
import HistoryBrandStoryDescriptionSection from '../../components/history/HistoryBrandStoryDescriptionSection';
import "./HistoryPage.css";

function HistoryPage() {
    return (
        <main className="history-page">
            <HistoryIntroSection />
            <HistoryHeroStorySection />
            <HistoryStoryTransitionSection />
            <HistoryBrandStatement01 />
            <HistoryBrandStatement02 />
            <HistoryBrandStatement03 />
            <HistoryVisualStoryGallery />
            <HistoryOverviewSection />
            <HistoryAwardsRecognitionSection />
            <HistoryLogoGridSection />
            <HistoryDetailsIntroSection />
            <HistoryBrandStoryDescriptionSection />
        </main>
    );
}

export default HistoryPage;
