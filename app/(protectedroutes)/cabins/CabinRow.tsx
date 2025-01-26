"use client";

import { formatCurrency } from "../../_utils/helpers";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Modal from "../../_components/Modal";
import ConfirmDelete from "../../_components/ConfirmDelete";
import Table from "../../_components/Table";
import Menus from "../../_components/Menus";
import Image from "next/image";
import { Prisma } from "@prisma/client";
import SpinnerMini from "@/app/_components/SpinnerMini";
import EditCabinForm from "./EditCabinForm";

type CabinRowProps = {
  cabin: Prisma.CabinsGetPayload<object>;
  handleDelete: (cabin: Prisma.CabinsGetPayload<object>) => void;
  handleDuplicate: (cabin: Prisma.CabinsGetPayload<object>) => void;
  handleEdit: (cabin: Prisma.CabinsGetPayload<object>) => void;
};

function CabinRow({
  cabin,
  handleDelete,
  handleDuplicate,
  handleEdit,
}: CabinRowProps) {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;
  const isCreating = cabinId < 1;

  return (
    <Table.Row>
      <div className="relative aspect-[3/2] h-auto w-[6.4rem]">
        {image === "" ? (
          <SpinnerMini />
        ) : (
          <Image
            fill
            src={image}
            sizes="20vw"
            quality={80}
            priority
            className="aspect-[3/2] -translate-x-[7px] scale-150 transform object-cover object-center text-sm"
            alt="Image of cabin/house in woods"
          />
        )}
      </div>
      <div className="font-sono text-[1.6rem] font-semibold">{name}</div>
      <div>Fits up to {maxCapacity} guests</div>

      <div className="font-sono font-semibold">
        {formatCurrency(regularPrice)}
      </div>
      {discount ? (
        <div className="font-sono font-medium text-green-700 dark:text-green-100">
          {formatCurrency(discount)}
        </div>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} disabled={isCreating} />

            <Menus.List id={cabinId}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={() => handleDuplicate(cabin)}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <EditCabinForm handleEdit={handleEdit} cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabin"
                onConfirm={() => handleDelete(cabin)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
