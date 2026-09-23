import Navigation from '../common/navigation/Navigation';
import './NintendoHeader.css';

// Preserve the existing Home/Hero integration point.
export default function NintendoHeader(props) {
  return <Navigation {...props} />;
}
