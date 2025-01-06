import Spinner from "./_components/Spinner";

function loading() {
  return (
    <div className="h-[100vh] overflow-hidden bg-white dark:bg-gray-0">
      <Spinner />;
    </div>
  );
}

export default loading;
