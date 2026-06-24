import { useEffect, useMemo } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

export function Link({ to, href, replace, children, ...props }) {
  return (
    <NextLink href={href ?? to ?? "#"} replace={replace} {...props}>
      {children}
    </NextLink>
  );
}

export function NavLink({ to, href, className, style, end, children, ...props }) {
  const router = useRouter();
  const target = href ?? to ?? "#";
  const currentPath = router.asPath.split("?")[0];
  const isActive = end ? currentPath === target : currentPath.startsWith(target);

  const resolvedClassName =
    typeof className === "function" ? className({ isActive }) : className;
  const resolvedStyle = typeof style === "function" ? style({ isActive }) : style;

  return (
    <Link to={target} className={resolvedClassName} style={resolvedStyle} {...props}>
      {children}
    </Link>
  );
}

export function useNavigate() {
  const router = useRouter();

  return (to, options = {}) => {
    if (typeof to === "number") {
      window.history.go(to);
      return;
    }

    const action = options.replace ? router.replace : router.push;
    action(to);
  };
}

export function useLocation() {
  const router = useRouter();

  return useMemo(() => {
    const [pathAndSearch, hash = ""] = router.asPath.split("#");
    const [pathname, search = ""] = pathAndSearch.split("?");

    return {
      pathname,
      search: search ? `?${search}` : "",
      hash: hash ? `#${hash}` : "",
      state: null,
    };
  }, [router.asPath]);
}

export function useParams() {
  const router = useRouter();
  return router.query;
}

export function Navigate({ to, replace }) {
  const router = useRouter();

  useEffect(() => {
    if (replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  }, [replace, router, to]);

  return null;
}

export function Outlet() {
  return null;
}

export function BrowserRouter({ children }) {
  return children;
}

export function Routes({ children }) {
  return children;
}

export function Route() {
  return null;
}
