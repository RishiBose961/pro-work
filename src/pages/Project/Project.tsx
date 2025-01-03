import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import useProjectHook from "@/hooks/useProject/useProjectHook";
import { CalendarRange } from "lucide-react";
import { CreateProject } from "./CreateProject";
import { useSelector } from "react-redux";
import LoadingShow from "@/components/Loading/LoadingShow";
import { LoadingImage } from "@/components/Loading/LoadingImage";

interface CreateProject {
  id: string;
  title: string;
  startdate: string;
  enddate: string;
  about: string;
  imageurl: string;
  type: string;
  websiteurl: string;
  githuburl: string;
}

const Project = () => {
  const { isAuthenticated } = useSelector(
    (state: { auth: { isAuthenticated: boolean } }) => state.auth
  );

  const projectHook = useProjectHook();
  if (!("isPending" in projectHook && "fetchProject" in projectHook)) {
    return <div>Error: Invalid hook response</div>;
  }
  const { isPending, fetchProject } = projectHook;
  if (isPending) {
    return (
      <div>
        <LoadingShow />
      </div>
    );
  }

  return (
    <div className="min-h-screen  text-white p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {isAuthenticated && <CreateProject />}

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-zinc-800" />

          <div className="space-y-8 sm:space-y-12">
            {fetchProject?.map((item: CreateProject) => (
              <div key={item.id} className="relative">
                {/* Timeline dot */}
                <div
                  className="absolute left-4 sm:left-8 -translate-x-1/2 size-3  rounded-full
                   bg-zinc-800"
                />

                <Card className="ml-8 sm:ml-16  border-zinc-800">
                  <CardContent className="p-4 sm:p-6">
                    <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_200px]">
                      <div className="space-y-3 sm:space-y-4">
                        <h3 className="text-lg sm:text-xl font-bold line-clamp-2">
                          {item?.title}
                        </h3>

                        <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-zinc-400">
                          <div className="flex items-center gap-1">
                            <CalendarRange className="w-3 h-3 sm:w-4 sm:h-4" />
                            {new Date(item?.startdate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <CalendarRange className="w-3 h-3 sm:w-4 sm:h-4" />
                            {new Date(item?.enddate).toLocaleDateString()}
                          </div>
                        </div>

                        <p className="text-sm sm:text-base text-zinc-400 line-clamp-3">
                          {item?.about}
                        </p>
                        <div className=" space-x-3">
                          <Badge className=" rounded-full uppercase">
                            {item?.type}
                          </Badge>
                          <a href={item?.websiteurl}>
                            <Badge className=" rounded-full uppercase">
                              Visit
                            </Badge>
                          </a>
                          <a href={item?.githuburl}>
                            <Badge className=" rounded-full uppercase">
                              repository
                            </Badge>
                          </a>

                          {isAuthenticated && (
                            <Badge className=" rounded-full cursor-pointer uppercase">
                              Edit
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="relative rounded-lg overflow-hidden h-48  ring-1 ring-zinc-800">
                        <LoadingImage
                          src={item?.imageurl}
                          alt={item?.title}
                          className="w-full h-48 lg:object-cover"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
