import Spinner from "./_components/Spinner";

function loading() {
  return (
    <div className="h-[100vh] overflow-hidden">
      <Spinner />;
    </div>
  );
}

export default loading;
