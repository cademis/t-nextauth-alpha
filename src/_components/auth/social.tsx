"use client";

import { GithubIcon } from "lucide-react";
import { Button } from "~/_components/ui/button";

export const Social = () => {
  return (
    <div className="item-center gap-x-2s flex w-full">
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={() => console.log("TODO: Implement Social Login with Github")}
      >
        <GithubIcon />
      </Button>
    </div>
  );
};
