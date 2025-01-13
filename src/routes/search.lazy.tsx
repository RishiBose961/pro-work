import SearchPage from "@/pages/search/SearchPage";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/search")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="max-w-4xl mx-auto">
      <SearchPage />
    </div>
  );
}
