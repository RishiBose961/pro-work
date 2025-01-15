import { Link, useLocation } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

const BreadCrumb = () => {
  const { pathname } = useLocation();

  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <div className="mx-auto max-w-7xl mt-3 p-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>

          {pathnames.map((path, index) => {
            const isLast = index === pathnames.length - 1;
            const fullPath = `/${pathnames.slice(0, index + 1).join("/")}`;

            return (
              <BreadcrumbItem key={index}>
                <BreadcrumbSeparator />
                {isLast ? (
                  <span className="capitalize">{path}</span>
                ) : (
                  <Link to={fullPath} className="capitalize">
                    {path}
                  </Link>
                )}
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumb;
