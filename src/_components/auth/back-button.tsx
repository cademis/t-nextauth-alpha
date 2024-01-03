"use client";

import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "~/_components/ui/button";

type BackButtonProps = {
  label: string;
  href: string;
};

export const BackButton = ({ label, href }: BackButtonProps) => {
  return (
    <Button variant={"link"} className="w-full" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
