import IntroTransition from '../../components/interaction/IntroTransition';
import HistoryHeroStorySection from '../../components/history/HistoryHeroStorySection';
import HistoryStoryTransitionSection from '../../components/history/HistoryStoryTransitionSection';
import HistoryServiceStack from '../../components/history/HistoryServiceStack';
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
            <IntroTransition
                symbolSrc={`${import.meta.env.BASE_URL}images/history/Star.png`}
                smallTitle="A NINTENDO STORY"
                mainVisualSelector=".history-hero-story__title"
            >
                <HistoryHeroStorySection />
            </IntroTransition>
            <HistoryStoryTransitionSection />
            <HistoryServiceStack />
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
