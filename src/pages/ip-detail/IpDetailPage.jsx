import { useParams } from 'react-router-dom';
import MarioPage from './mario/MarioPage';
import ZeldaPage from './zelda/ZeldaPage';
import SplatoonPage from './splatoon/SplatoonPage';
import NotFoundPage from '../../components/common/NotFoundPage';

const characterPages = { mario: MarioPage, zelda: ZeldaPage, splatoon: SplatoonPage };
export default function IpDetailPage() {
  const { ipSlug } = useParams();
  const Page = Object.hasOwn(characterPages, ipSlug) ? characterPages[ipSlug] : NotFoundPage;
  return <Page />;
}
