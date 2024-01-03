import { Poppins } from "next/font/google";
import { LoginButton } from "~/_components/auth/login-button";
import { Button } from "~/_components/ui/button";
import { cn } from "~/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default async function Home() {
  return (
    <main
      className={cn(
        "flex h-full flex-col items-center justify-center bg-gray-600",
        font.className,
      )}
    >
      <div className="space-y-6 text-center ">
        <h1 className="text-6xl font-semibold text-white drop-shadow-md">
          Auth
        </h1>
        <p className="text-white">
          This is an auth implementation for create T3 app
        </p>
        <LoginButton>
          <Button size="lg">Sign in</Button>
        </LoginButton>
      </div>
    </main>
  );
}
