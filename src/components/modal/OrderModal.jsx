import moment from "moment";
import React from "react";
import { Button, Menu, Modal } from "react-daisyui";

const OrderModal = ({ order, visible, setVisible }) => {
  return (
    <Modal open={visible} onClickBackdrop={() => setVisible(!visible)}>
      <Modal.Header className="font-bold">Order {order._id}</Modal.Header>

      <Modal.Body className="overflow-y-scroll hide-scrollbar max-h-[300px]">
        <Menu>
          <ul className="menu p-2 px-5">
            <li className="menu-title">
              <span className="p-0 mt-2">Details</span>
            </li>
            <li>
              <p className="p-0">{order?.details?.name}</p>
              <p className="p-0">{order?.details?.email}</p>
              <p className="p-0">{order?.details?.address}</p>
              <p className="p-0">{order?.details?.phone}</p>
            </li>
            <li className="menu-title">
              <span className="p-0 mt-2">Items</span>
            </li>
            {order?.items?.map((item) => (
              <div key={item._id} className="p-0 mt-1">
                <p className="p-0">{item?.product?.name}</p>
                <div className="flex justify-between">
                  <p className="p-0 text-sm">RM {item?.product?.price}</p>
                  <p className="p-0 text-sm"> x {item?.cartqty}</p>
                </div>
              </div>
            ))}
            <li className="menu-title">
              <span className="p-0 mt-2">total</span>
            </li>
            <li>
              <span className="font-medium">RM{order?.total}</span>
            </li>
            <li className="menu-title">
              <span className="p-0 mt-2">status</span>
            </li>
            <li>
              <span>{order?.status}</span>
            </li>
            <li>
              <span className="text-xs">
                {moment(order?.createdAt).fromNow()}
              </span>
            </li>
          </ul>
        </Menu>
      </Modal.Body>

      <Modal.Actions>
        <Button
          type="button"
          className="bg-slate-400 border-none"
          onClick={() => setVisible(!visible)}
        >
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default OrderModal;
