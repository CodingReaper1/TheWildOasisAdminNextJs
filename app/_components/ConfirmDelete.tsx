import Button from "./Button";
import Heading from "./Heading";

type ConfirmDelteProps = {
  resourceName: string;
  onConfirm: () => void;
  disabled: boolean;
  onCloseModal?: () => void;
};

function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
}: ConfirmDelteProps) {
  return (
    <div className="w-[40rem] flex flex-col gap-[1.2rem]">
      <Heading as="h3">Delete {resourceName}</Heading>
      <p className="text-gray-500 mb-[1.2rem] dark:text-gray-400">
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div className="flex justify-end gap-[1.2rem]">
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
