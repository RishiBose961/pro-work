import CheckEnvironment from "@/CheckEnvironment/CheckEnvironment";
import { useQuery } from "@tanstack/react-query";

const useProjectHook = () => {
  const { base_url } = CheckEnvironment();
  const {
    isPending,
    error,
    isError,
    data: fetchProject,
  } = useQuery({
    queryKey: ["fetchProjects"],
    queryFn: async () => {
      return await fetch(`${base_url}/api/getallproject`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    },
    staleTime:7000
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return { isPending, fetchProject };
};

export default useProjectHook;
