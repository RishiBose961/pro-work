import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";

export function EditPages() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Badge
          variant="secondary"
          className="bg-blue-100 cursor-pointer text-blue-800 dark:bg-blue-900 dark:text-blue-300"
        >
          Edit
        </Badge>
      </DrawerTrigger>
      <DrawerContent>
        <div>
          <DrawerHeader>
            <DrawerTitle>Edit Your Project</DrawerTitle>
            <DrawerDescription>Make your Best.</DrawerDescription>
          </DrawerHeader>
          <div className="p-5">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
              <div>
                <label className=" text-sm font-bold">Title</label>
                <Input placeholder="Enter Title" className="mt-2" />
              </div>
              <div>
                <label className=" text-sm font-bold">Types</label>
                <Input placeholder="Enter Types" className="mt-2" />
              </div>
              <div>
                <label className=" text-sm font-bold">About</label>
                <Input placeholder="Enter About" className="mt-2" />
              </div>
              <div>
                <label className=" text-sm font-bold">Image Url</label>
                <Input placeholder="Enter Image Url" className="mt-2" />
              </div>
            </div>
            <div className=" flex  justify-start space-x-3 mt-5">
            <Button variant="ghost">Generate</Button>
            <Button variant="ghost">Update</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
            </div>
           
          </div>
          <DrawerFooter></DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
