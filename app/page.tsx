import LoginForm from "./_components/LoginForm";
import Logo from "./_components/Logo";
import Heading from "./_components/Heading";

function Page() {
  return (
    <main className="flex h-screen w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-100 px-[1rem] pt-20 text-gray-700 backdrop-blur-lg dark:bg-gray-900 dark:text-gray-200 xs:px-[2rem] sm:px-[4rem]">
      <div className="flex h-[60rem] w-full flex-col sm:w-[50rem]">
        <Logo />
        <Heading as="h4" className="mb-14">
          Log in to your account
        </Heading>
        <LoginForm />
      </div>
    </main>
  );
}

export default Page;
