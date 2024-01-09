import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import Modal from "react-modal";
import secureAxios from "../API/secureAxios";
import Button from "../components/Button/Button";
import Loader from "../components/Shared/Loader";
//Todo:   Sorting

const AllPayments = () => {
  const [payment, setPayment] = useState(null);
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  //! Get All Payments
  const { data: payments } = useQuery({
    queryKey: ["all-payments", "admin"],
    queryFn: async () => {
      const res = await secureAxios.get(`/all-payments-admin`);
      return res.data;
    },
  });
  //! Get One payment details
  const paymentDetails = async (tranId) => {
    const data = await secureAxios.get(`/payment-details/${tranId}`);
    setPayment(data.data.element[0]);
  };
  //! Get One Booking details
  const bookingDetails = async (bookingId) => {
    const data = await secureAxios.get(`/booking-details/${bookingId}`);
    setBooking(data.data[0]);
  };

  //! Modal
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const openModal2 = () => {
    setModalIsOpen2(true);
  };
  const closeModal2 = () => {
    setModalIsOpen2(false);
  };

  const download = () => {
    console.log("Ok");
  };
  if (!payments) return <Loader />;

  return (
    <div className="mt-8 w-[95%] relative">
      <Modal
        isOpen={modalIsOpen2}
        onRequestClose={closeModal2}
        style={customStyles}
      >
        <div className="p-10 space-y-3 border border-primary rounded-md">
          <div className="flex items-center gap-2">
            <p className="font-semibold">Name:</p> <p>{booking?.user.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold">E-mail:</p>{" "}
            <p>{booking?.user.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold">Room Name:</p>{" "}
            <p>{booking?.room.title}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold">Check In:</p>{" "}
            <p>{new Date(booking?.startDate).toDateString()}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold">Check Out:</p>{" "}
            <p>{new Date(booking?.endDate).toDateString()}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold">Nights Count:</p>{" "}
            <p>
              {moment(booking?.endDate).diff(
                moment(booking?.startDate),
                "days"
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold">Total Price:</p>{" "}
            <p>{booking?.price}/- BDT</p>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="p-8 border border-primary rounded-lg">
          <div className="main-invoice">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-semibold">Invoice</h1>
            </div>

            <div className="flex items-center gap-10 mb-6">
              <div className="text-center">
                <p className="font-semibold">From:</p>
                <p>Hotelo</p>
                <p>123 Main Street</p>
                <p>Uttara, Dhaka, 1230</p>
                <p>Email: hotelo@email.com</p>
              </div>

              <div className="text-center">
                <p className="font-semibold">To:</p>
                <p>{booking?.user.name}</p>
                <p>456 Client Street</p>
                <p>Uttara, Dhaka, 1230</p>
                <p>Email: {booking?.user.email}</p>
              </div>
            </div>

            <div className="flex justify-end mb-4">
              <p className="font-semibold">Total:</p>
              {/* <p className="ml-2">${amount}</p> */}
              <p className="ml-2">{payment?.amount} BDT</p>
            </div>

            <div>
              <p className="font-black text-center mb-3 text-lg underline">
                Payment Details
              </p>
              <p>
                <strong>Transaction ID:</strong> {payment?.tran_id}
              </p>
              <p>
                <strong>Transaction Date:</strong> {payment?.tran_date}
              </p>
              <p>
                <strong>Card Type:</strong> {payment?.card_type}
              </p>
              <p>
                <strong>Bank Gateway:</strong> {payment?.bank_gw}
              </p>
              <p>
                <strong>Validation ID:</strong> {payment?.val_id}
              </p>
              <p>
                <strong>Status:</strong> {payment?.status}
              </p>
              <p>
                <strong>Currency Type:</strong> {payment?.currency_type}
              </p>
            </div>

            <div className="flex gap-2">
              <p className="font-semibold">Notes:</p>
              <span>Thank you for choosing us!</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-4">
            <Button onClick={download} label={"Download"} small={true} />
          </div>
        </div>
      </Modal>
      <h2 className="text-2xl font-bold mb-10">
        All Payments - {payments?.length}
      </h2>
      {loading && <FaSpinner className="absolute left-2 top-2 animate-spin" />}
      <div className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {payments.map((payment) => (
          <div
            key={payment._id}
            className="bg-white relative rounded-md p-4 shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
          >
            {payment.status == "refunded" && (
              <img
                src="/refunded.png"
                className="w-16 h-1w-16 absolute right-2 top-1/2 -translate-y-1/2"
                alt=""
              />
            )}
            <p className="font-bold mb-2">
              Transaction ID: {payment.transactionId}
            </p>
            <p className="text-gray-600">
              {new Date(payment.paymentDate).toDateString()}
            </p>
            <p className="text-green-600 font-semibold mt-2">
              BDT: {payment.amount}/-
            </p>
            <div className="flex gap-3 mt-3">
              <Button
                onClick={async () => {
                  setLoading(true);
                  await bookingDetails(payment.bookingId);
                  openModal2();
                  setLoading(false);
                }}
                bg="bg-green-400"
                label="Booking Details"
                small={true}
              />
              <Button
                onClick={async () => {
                  setLoading(true);
                  await bookingDetails(payment.bookingId);
                  await paymentDetails(payment.transactionId);
                  openModal();
                  setLoading(false);
                }}
                bg="bg-blue-400"
                label="Payment Details"
                small={true}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPayments;
