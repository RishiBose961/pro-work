import { useQuery } from "@tanstack/react-query";

const useProjectHook = () => {
  const {
    isPending,
    error,
    isError,
    data: fetchProject,
  } = useQuery({
    queryKey: ["fetchProjects"],
    queryFn: async () => {
      return await fetch(`http://localhost:5000/api/getallproject`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    },
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return { isPending, fetchProject };
};

export default useProjectHook;
