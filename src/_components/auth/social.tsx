"use client";

import { GithubIcon } from "lucide-react";
import { Button } from "~/_components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "~/routes";

export const Social = () => {
  const handleClick = async () => {
    await signIn("github", {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="item-center gap-x-2s flex w-full">
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={handleClick}
      >
        <GithubIcon />
      </Button>
    </div>
  );
};
