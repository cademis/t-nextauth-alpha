import { BackButton } from "~/_components/auth/back-button";
import { Header } from "~/_components/auth/header";
import { Card, CardFooter, CardHeader } from "~/_components/ui/card";

export const ErrorCard = () => {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <Header label="Oops! Something went wrong." />
      </CardHeader>
      <CardFooter>
        <BackButton label="Back to login" href="/auth/login" />
      </CardFooter>
    </Card>
  );
};
