import { auth } from "~/auth";

const SettingsPage = async () => {
  const session = await auth();

  return (
    <>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
  );
};

export default SettingsPage;
