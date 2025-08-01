import { LoadingImage } from "@/components/Loading/LoadingImage";
import LoadingShow from "@/components/Loading/LoadingShow";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useProjectHook from "@/hooks/useProject/useProjectHook";
import { Link } from "@tanstack/react-router";
import { CalendarRange, Eye, Monitor, Search, Smartphone, Tv } from "lucide-react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { EditPages } from "../Edit/EditPages";
import { CreateProject } from "./CreateProject";

interface CreateProject {
  [x: string]: string;
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
      <Helmet>
        <title>Rishi Bose (Project)</title>
        <meta name="description" content=" Project" />
        <meta
          name="keywords"
          content="react, component, dynamic data, javascript, potfolio"
        />
      </Helmet>
      <div className="max-w-4xl mx-auto">
        <div className=" space-x-4 flex items-center">
          {isAuthenticated && <CreateProject />}

          <Link to="/search">
            <Button className="mt-4 mb-4" variant="secondary">
              <Search className=" text-black dark:text-white" />
            </Button>
          </Link>
        </div>

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
                          <div>
                            <p className="text-sm sm:text-base text-zinc-400 line-clamp-3">
                              Description ➡️ {item?.about}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2 sm:gap-3">
                            <Badge
                              className="bg-blue-100 text-blue-800 border-blue-200 
             dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/30"
                            >
                              {
                              item?.type === "Website/PWA" ? <Monitor className="w-3 h-3 mr-1" /> :  item?.type === "Expo/Native" ? <Smartphone className="w-3 h-3 mr-1" /> : <Tv className="w-3 h-3 mr-1" />
                              }
                              
                              {item.type}
                            </Badge>

                            <a href={item.websiteurl}>
                              <Badge
                                variant="secondary"
                                className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300"
                              >
                                Visit
                              </Badge>
                            </a>

                            <a href={item.githuburl}>
                              <Badge
                                variant="secondary"
                                className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                              >
                                Repository
                              </Badge>
                            </a>

                            {isAuthenticated && <EditPages />}

                            <Link
                              to="/projectShow/$id"
                              params={{ id: item?._id }}
                            >
                              {" "}
                              <Eye className=" size-5" />
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="relative rounded-lg overflow-hidden h-48 w-fit  ring-1 ring-zinc-800">
                        <LoadingImage
                          src={item?.imageurl}
                          alt={item?.title}
                          className="w-48 h-48 lg:object-cover"
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
