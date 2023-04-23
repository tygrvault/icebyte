import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useAuth } from "./context";

export default function AuthDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logIn, register, authStore } = useAuth();

  const [mode, setMode] = React.useState<"login" | "register" | "reset">("login");

  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  return (
    <>
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px] p-0">
          <DialogHeader className="p-4">
            <DialogTitle className="text-4xl font-extrabold text-center">
              {mode === "login" && "Login"}
              {mode === "register" && "Register"}
              {mode === "reset" && "Reset password"}
            </DialogTitle>
            <DialogDescription className="m-0 text-center text">
              {mode === "login" && "Please log in to your Pixel account."}
              {mode === "register" && "Register a Pixel account and join the club!"}
              {mode === "reset" && "Please enter your email address to reset your password."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 px-4">
            {mode === "login" && (
              <>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  className="w-full text-md"
                  onClick={() => logIn(email, password)}
                >
                  Submit
                </Button>
                <small className="px-2 pt-2 text-center text-primary-500 dark:text-primary-400">
                  By continuing, you agree to our{" "}
                  <a className="text-blue-500" href="/tos">
                    Terms of Service
                  </a>
                  {" "} and {" "}
                  <a className="text-blue-500" href="/privacy">
                    Privacy Policy
                  </a>
                  .
                </small>
              </>
            )}
            {mode === "register" && (
              <>
                <Input
                  id="name"
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  id="passwordConfirm"
                  type="password"
                  placeholder="Password Confirmation"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  className="w-full text-md"
                  onClick={() =>
                    register(name, username, email, password, confirmPassword)
                  }
                >
                  Create Account
                </Button>
                <small className="px-2 pt-2 text-center text-primary-500 dark:text-primary-400">
                  By continuing, you agree to our{" "}
                  <a className="text-blue-500" href="/tos">
                    Terms of Service
                  </a>
                  {" "}
                  and
                  {" "}
                  <a className="text-blue-500" href="/privacy">
                    Privacy Policy
                  </a>
                  .
                </small>
              </>
            )}
            {mode === "reset" && (
              <>
                <Input id="email" type="email" placeholder="Email" />
                <Button className="w-full text-md">Send</Button>
              </>
            )}
          </div>
          <DialogFooter className="flex p-4 text-center border-t sm:flex-col sm:justify-center border-black/20 dark:border-white/20">
            {mode === "login" && (
              <>
                <span>
                  Forgot password?{" "}
                  <Button
                    variant={"link"}
                    className="p-0 text-blue-500 dark:text-blue-500"
                    onClick={() => setMode("reset")}
                  >
                    Reset
                  </Button>
                </span>
                <span>
                  Don&apos;t have an account?{" "}
                  <Button
                    variant={"link"}
                    className="p-0 text-blue-500 dark:text-blue-500"
                    onClick={() => setMode("register")}
                  >
                    Sign up
                  </Button>
                </span>
              </>
            )}
            {mode === "reset" && (
              <>
                <span>
                  Remember your password?{" "}
                  <Button
                    variant={"link"}
                    className="p-0 text-blue-500 dark:text-blue-500"
                    onClick={() => setMode("login")}
                  >
                    Login
                  </Button>
                </span>
              </>
            )}
            {mode === "register" && (
              <>
                <span>
                  Already have an account?{" "}
                  <Button
                    variant={"link"}
                    className="p-0 text-blue-500 dark:text-blue-500"
                    onClick={() => setMode("login")}
                  >
                    Login
                  </Button>
                </span>
              </>
            )}
          </DialogFooter>
          <DialogClose
            className="absolute top-4 right-4 focus:outline-none disabled:pointer-events-none"
            onClick={() => setMode("login")}
          >
            <X className="w-4 h-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}
