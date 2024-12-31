import { ScanFace } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function AuthPage() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <ScanFace className="size-6" />
      </DrawerTrigger>
      <DrawerContent className=" mx-auto w-fit">
        <div className="mx-auto">
          <DrawerHeader>
            <DrawerTitle className=" flex items-center"><ScanFace/><p  className="mx-2">Sign In</p></DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0 items-center space-y-4">
            <div>
              <label>Email</label>
            <Input type="email" placeholder="Email" className=" mt-2"/>
            </div>
            <div >  
            <label>Pin</label>
              <InputOTP  maxLength={6}>
              <InputOTPGroup className="mt-2">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            </div>
            
          
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
