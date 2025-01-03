import CheckEnvironment from "@/CheckEnvironment/CheckEnvironment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

export function CreateProject() {
  const [title, settitle] = useState("");
  const [type, settype] = useState("");
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [websiteurl, setwebsiteurl] = useState("");
  const [imageurl, setimageurl] = useState("");
  const [about, setabout] = useState("");
  const [githuburl, setgithuburl] = useState("");
  const { toast } = useToast();
  const [error, setError] = useState("");

  const { base_url } = CheckEnvironment();

  const queryClient = useQueryClient();

  const { user } = useSelector(
    (state: { auth: { user: { token: string } } }) => state.auth
  );

  const createPostMutation = useMutation({
    mutationFn: async (project: {
      type: string;
      title: string;
      startdate: string;
      enddate: string;
      websiteurl: string;
      imageurl: string;
      about: string;
      githuburl: string;
    }) => {
      const {
        type,
        title,
        startdate,
        enddate,
        websiteurl,
        imageurl,
        about,
        githuburl,
      } = project;
      const response = await axios.post(
        `${base_url}/api/createproject`,
        {
          type,
          title,
          startdate,
          enddate,
          websiteurl,
          imageurl,
          about,
          githuburl,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
          // onUploadProgress: (progressEvent) => {
          //   const percentCompleted = Math.round(
          //     (progressEvent.loaded * 100) / progressEvent.total
          //   );
          //   setUploadProgress(percentCompleted);
          // },
        }
      );

      return response.data; // Return response data
    },
    onSuccess: (data) => {
      toast({
        title: `${data?.title}`,
        description: `Project created successfully`,
        duration: 5000,
      });
      queryClient.invalidateQueries({ queryKey: ["fetchProjects"] });
      settitle("");
      settype("");
      setstartdate("");
      setenddate("");
      setwebsiteurl("");
      setimageurl("");
      setabout("");
      setgithuburl("");
      // setUploadProgress(0);
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
    if (!title || !startdate || !enddate || !websiteurl || !about) {
      setError("All fields are required.");
      return;
    }

    // Trigger the mutation
    createPostMutation.mutate({
      title,
      startdate,
      enddate,
      websiteurl,
      imageurl,
      about,
      githuburl,
      type,
    });
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Button className="mt-4 mb-4" variant="secondary">
          Create
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Project</SheetTitle>
          <SheetDescription>Please enter the Project Details.</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit}>
          <div className=" mt-4 mb-4 ">
            <div>
              <label className=" text-sm font-bold">Title</label>
              <Input
                placeholder="Enter Title"
                className="mt-2"
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
            </div>
            <div className="pt-3">
              <label className=" text-sm font-bold">Types</label>
              <Select value={type} onValueChange={(e) => settype(e)}>
                <SelectTrigger className="mt-3">
                  <SelectValue placeholder="Select Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Website/PWA">Website / PWA</SelectItem>
                  <SelectItem value="Expo/Native">Expo / Native</SelectItem>
                  <SelectItem value="Pc Application">Pc Application</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="pt-3">
              <label className=" text-sm font-bold">About</label>
              <Input
                placeholder="Enter About"
                className="mt-2"
                value={about}
                onChange={(e) => setabout(e.target.value)}
              />
            </div>
            <div className="pt-3 grid grid-cols-2 gap-3">
              <div>
                <label className=" text-sm font-bold">Start Date</label>
                <Input
                  type="date"
                  placeholder="Enter Start Date"
                  className="mt-2"
                  value={startdate}
                  onChange={(e) => setstartdate(e.target.value)}
                />
              </div>
              <div>
                <label className=" text-sm font-bold">End Date</label>
                <Input
                  type="date"
                  placeholder="Enter End Date"
                  className="mt-2"
                  value={enddate}
                  onChange={(e) => setenddate(e.target.value)}
                />
              </div>
            </div>
            <div className="pt-3">
              <label className=" text-sm font-bold">Image Url</label>
              <Input
                placeholder="Enter Image Url"
                className="mt-2"
                value={imageurl}
                onChange={(e) => setimageurl(e.target.value)}
              />
            </div>
            <div className="pt-3">
              <label className=" text-sm font-bold">Project Url</label>
              <Input
                placeholder="Enter Project Url"
                className="mt-2"
                value={websiteurl}
                onChange={(e) => setwebsiteurl(e.target.value)}
              />
            </div>

            <div className="pt-3">
              <label className=" text-sm font-bold">Github Url</label>
              <Input
                placeholder="Enter Github Url"
                className="mt-2"
                value={githuburl}
                onChange={(e) => setgithuburl(e.target.value)}
              />
            </div>
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
