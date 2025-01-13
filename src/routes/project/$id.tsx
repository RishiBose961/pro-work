import IndividualProject from '@/pages/search/IndividualProject';
import { createFileRoute, useMatch } from '@tanstack/react-router';

export const Route = createFileRoute('/project/$id')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const id = params.id;
    return { id }; // Pass the id to the route's match data
  },
});

function RouteComponent() {
  const { loaderData } = useMatch({ from: '/project/$id' }); // Access the loader data
  const { id } = loaderData ?? { id: '' }; // Extract the id with a default value

  return <IndividualProject id={id} />;
}
