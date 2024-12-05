import LoginForm from "./_authentication/LoginForm";
import Logo from "./_components/Logo";
import Heading from "./_components/Heading";

function Page() {
  return (
    <main className="h-screen w-full overflow-auto bg-gray-50 pt-20 text-gray-700 dark:bg-gray-900 dark:text-gray-200">
      <div className="mx-auto my-0 flex w-[50rem] flex-col gap-[3.2rem]">
        <Logo />
        <Heading as="h4">Log in to your account</Heading>
        <LoginForm />
      </div>
    </main>
  );
}

export default Page;
