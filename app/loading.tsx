import Spinner from "./_components/Spinner";

function loading() {
  return (
    <div className="absolute inset-0">
      <Spinner />;
    </div>
  );
}

export default loading;
