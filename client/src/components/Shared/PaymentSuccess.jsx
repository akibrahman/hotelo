import moment from "moment";
import { Link, useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const { tranId } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const data = Object.fromEntries(queryParams.entries());
  //   console.log(additionalData);
  return (
    <div className="flex gap-4 w-[95%] mx-auto">
      <div className="w-1/2 flex flex-col gap-4">
        <div className="text-white">
          <div className="text-center p-8 rounded-md shadow-md bg-purple-700">
            <div className="flex items-center mb-4">
              <svg
                className="h-8 w-8 mr-2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="M22 4L12 14.01l-3-3" />
              </svg>
              <p className="text-xl font-semibold">Payment Successful!</p>
            </div>
            <p className="mb-4">Transaction ID: {tranId}</p>
            <p className="mb-4">
              Thank you for your payment. Your room reservation is confirmed.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-white text-purple-700 px-4 py-2 rounded-full hover:bg-purple-200 focus:outline-none focus:ring focus:border-purple-300">
                See Bookings
              </button>
              <Link
                to={import.meta.env.VITE_client}
                className="bg-white text-purple-700 px-4 py-2 rounded-full hover:bg-purple-200 focus:outline-none focus:ring focus:border-purple-300"
              >
                See Rooms
              </Link>
            </div>
          </div>
        </div>

        <div className="p-10 space-y-3 border border-primary rounded-md">
          <div className="flex items-center gap-2">
            <p className="font-semibold">Name:</p> <p>{data.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold">E-mail:</p> <p>{data.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold">Room Name:</p> <p>{data.roomName}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold">Check In:</p>{" "}
            <p>
              {new Date(data.checkIn).getDate()}-
              {new Date(data.checkIn).getMonth() + 1}-
              {new Date(data.checkIn).getFullYear()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold">Check Out:</p>{" "}
            <p>
              {new Date(data.checkOut).getDate()}-
              {new Date(data.checkOut).getMonth() + 1}-
              {new Date(data.checkOut).getFullYear()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold">Nights Count:</p>{" "}
            <p>{moment(data.checkOut).diff(moment(data.checkIn), "days")}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold">Total Price:</p>{" "}
            <p>{data.price}/- BDT</p>
          </div>
        </div>
      </div>

      <div className="w-1/2 p-8 border border-primary rounded-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">Invoice</h1>
        </div>

        <div className="flex justify-between mb-6">
          <div>
            <p className="font-semibold">From:</p>
            <p>Hotelo</p>
            <p>123 Main Street</p>
            <p>Uttara, Dhaka, 1230</p>
            <p>Email: hotelo@email.com</p>
          </div>

          <div>
            <p className="font-semibold">To:</p>
            <p>{data.name}</p>
            <p>456 Client Street</p>
            <p>Uttara, Dhaka, 1230</p>
            <p>Email: {data.email}</p>
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <p className="font-semibold">Total:</p>
          {/* <p className="ml-2">${amount}</p> */}
          <p className="ml-2">{data.price} BDT</p>
        </div>

        <div>
          <p className="font-semibold">Payment Details:</p>
          <p>
            <strong>Transaction ID:</strong> {data.tran_id}
          </p>
          <p>
            <strong>Transaction Date:</strong> {data.tran_date}
          </p>
          <p>
            <strong>Card Type:</strong> {data.card_type}
          </p>
          <p>
            <strong>Bank Gateway:</strong> {data.bank_gw}
          </p>
          <p>
            <strong>Validation ID:</strong> {data.val_id}
          </p>
          <p>
            <strong>Status:</strong> {data.status}
          </p>
          <p>
            <strong>Currency Type:</strong> {data.currency_type}
          </p>
        </div>

        <div className="flex gap-2">
          <p className="font-semibold">Notes:</p>
          <span>Thank you for choosing us!</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
