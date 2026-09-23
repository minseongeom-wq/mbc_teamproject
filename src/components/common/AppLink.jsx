import { Link, useInRouterContext } from 'react-router-dom';
import { navigationHref } from './navigation/navigationLinks';

// Navigation remains usable independently in component previews.
export default function AppLink({ to, children, ...props }) {
  const hasRouter = useInRouterContext();
  return hasRouter
    ? <Link to={to} {...props}>{children}</Link>
    : <a href={navigationHref(to)} {...props}>{children}</a>;
}
