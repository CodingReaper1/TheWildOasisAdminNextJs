import Button from "./Button";
import Heading from "./Heading";

type ConfirmDelteProps = {
  resourceName: string;
  onConfirm: () => void;
  disabled?: boolean;
  onCloseModal?: () => void;
};

function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
}: ConfirmDelteProps) {
  return (
    <div className="flex w-[40rem] flex-col gap-[1.2rem]">
      <Heading as="h3">Delete {resourceName}</Heading>
      <p className="mb-[1.2rem] text-gray-500 dark:text-gray-400">
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div className="flex justify-end gap-[1.2rem]">
        <Button
          ariaLabel="Cancel"
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button
          ariaLabel="Delete"
          variation="danger"
          disabled={disabled}
          onClick={() => {
            onConfirm();
            onCloseModal?.();
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
