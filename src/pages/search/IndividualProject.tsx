import CheckEnvironment from "@/CheckEnvironment/CheckEnvironment";
import { LoadingImage } from "@/components/Loading/LoadingImage";
import LoadingShow from "@/components/Loading/LoadingShow";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { CalendarRange } from "lucide-react";

const IndividualProject = ({ id }: { id: string }) => {
  const { base_url } = CheckEnvironment();
  const {
    isPending,
    error,
    isError,
    data: singlepostData,
  } = useQuery({
    queryKey: ["singlepostDatas", id],
    queryFn: async () => {
      return await fetch(`${base_url}/api/${id}`).then((res) => res.json());
    },
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (isPending) {
    return <span>
      <LoadingShow/>
    </span>;
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-8">
        <div className="relative aspect-square flex justify-center">
          <LoadingImage
            src={singlepostData?.imageurl}
            alt={singlepostData?.title}
            className=" h-64 rounded-xl lg:object-cover"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <Badge className="mb-4">{singlepostData?.type}</Badge>
            <h1 className="text-3xl font-bold mb-2">{singlepostData?.title}</h1>
            <p className="text-md lg:text-lg mb-4">{singlepostData?.about}</p>

            <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
              <CalendarRange className=" size-5"/>
              <Badge
                variant="secondary"
         
              >
                {new Date(singlepostData?.startdate).toLocaleDateString()}
              </Badge>
              <CalendarRange className=" size-5"/>
              <Badge
                variant="secondary"
             
              >
                {new Date(singlepostData?.enddate).toLocaleDateString()}
              </Badge>
            

              <a href={singlepostData?.websiteurl}>
                <Badge
                  variant="secondary"
                  className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300"
                >
                  Visit
                </Badge>
              </a>

              <a href={singlepostData?.githuburl}>
                <Badge
                  variant="secondary"
                  className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                >
                  Repository
                </Badge>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualProject;
