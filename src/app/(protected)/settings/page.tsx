import { Button } from "~/_components/ui/button";
import { auth, signOut } from "~/auth";

const SettingsPage = async () => {
  const session = await auth();

  return (
    <>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">Sign out</Button>
      </form>
    </>
  );
};

export default SettingsPage;
