import CheckEnvironment from "@/CheckEnvironment/CheckEnvironment";
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
import { loadUser, loginUserAction } from "@/slice/authSlice";
import { AppDispatch } from "@/store";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { Navigate } from "@tanstack/react-router";
import axios from "axios";
import { ScanFace } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function AuthPage() {
  const [otpValue, setOtpValue] = useState<string>("");

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const { base_url } = CheckEnvironment();

  const { isAuthenticated, isLoading } = useSelector(
    (state: { auth: { isAuthenticated: boolean; isLoading: boolean } }) =>
      state.auth
  );

  const loginMutation = useMutation({
    mutationFn: async ({ email, pin }: { email: string; pin: string }) => {
      const response = await axios.post(`${base_url}/api/login`, {
        email,
        pin,
      });
      dispatch(loginUserAction(response.data));
      return response.data; // Return response data
    },
    onSuccess: () => {
      alert("Login successful!");
    },
    onError: (error: { response: { data: string } }) => {
      console.error(error?.response.data);
      setError(error?.response.data);
    
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    // Basic validation
    if (!email || !otpValue) {
      setError("Please fill in all fields");
      return;
    }

    loginMutation.mutate({ email, pin: otpValue });
  };

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return isAuthenticated ? (
      <Navigate to={`/`} replace />
    ) : (
      <Navigate to="/" replace />
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <ScanFace className="size-6" />
      </DrawerTrigger>
      <DrawerContent className="mx-auto w-fit">
        <div className="mx-auto">
          <DrawerHeader>
            <DrawerTitle className=" flex items-center">
              <ScanFace />
              <p className="mx-2">Sign In</p>
            </DrawerTitle>
            <DialogDescription>Please enter the Credentials.</DialogDescription>
          </DrawerHeader>
          <form onSubmit={handleSubmit}>
            <div className="p-4 pb-0 items-center space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  className=" mt-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label>Pin</label>
                <InputOTP
                  value={otpValue}
                  onChange={(newValue: string) => setOtpValue(newValue)}
                  maxLength={6}
                >
                  <InputOTPGroup className="mt-2" >
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
            {error && <p className="text-red-500 text-center p-2">{error}</p>}
            <Button className=" w-64 m-4" type="submit">
              {loginMutation.isPending ? "Login..." : "Submit"}
            </Button>
          </form>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
