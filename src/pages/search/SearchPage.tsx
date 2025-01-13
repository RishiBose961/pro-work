import CheckEnvironment from "@/CheckEnvironment/CheckEnvironment";
import { LoadingImage } from "@/components/Loading/LoadingImage";
import LoadingShow from "@/components/Loading/LoadingShow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import axios from "axios";
import { useState } from "react";

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const { base_url } = CheckEnvironment();
  const [result, setResult] = useState<
    { id: string; title: string; image: string }[]
  >([]);

  const searchPostMutation = useMutation({
    mutationFn: async (project: { search: string }) => {
      const { search } = project;
      const response = await axios.post(`${base_url}/api/project`, {
        query: search,
      });

      return response.data; // Return response data
    },
    onSuccess: (data) => {
      setResult(data);
    },
    onError: (error) => {
      setError(error.message || "An error occurred");
      // setUploadProgress(0);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!search) {
      setError("Please field are required.");
      return;
    }

    // Trigger the mutation
    searchPostMutation.mutate({
      search,
    });
  };
  return (
    <div className="mt-6 mx-2">
      <form onSubmit={handleSubmit}>
        <div className=" flex items-center space-x-3">
          <Input
            type="search"
            placeholder="Enter To Start Searching"
            className="rounded-full ps-5 border-blue-400 focus:border-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {searchPostMutation.isPending ? (
            <span className="text-gray-500">Loading...</span>
          ) : (
            <Button type="submit">Search</Button>
          )}
        </div>
      </form>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      <div>
        {searchPostMutation.isPending ? (
          <span className="text-gray-500">
            <LoadingShow />
          </span>
        ) : (
          result?.map((item) => (
            <Link to="/project/$id" params={{ id: item.id }}>
              <div className="flex items-center m-3 ring-1 dark:ring-white ring-black rounded-2xl">
                <LoadingImage
                  src={item?.image}
                  alt={item?.title}
                  className="w-20 h-20 rounded-s-2xl lg:object-cover"
                />
                <p key={item.id} className="mx-2">
                  {item.title}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchPage;
