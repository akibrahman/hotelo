import { Link, useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const { tranId } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const additionalData = Object.fromEntries(queryParams.entries());
  console.log(additionalData);
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
            {/* <p className="font-semibold">Name:</p> <p>{user.name}</p> */}
            <p className="font-semibold">Name:</p> <p>Akib</p>
          </div>
          <div className="flex items-center gap-2">
            {/* <p className="font-semibold">E-mail:</p> <p>{user.email}</p> */}
            <p className="font-semibold">E-mail:</p> <p>Customer Email</p>
          </div>
          <div className="flex items-center gap-2">
            {/* <p className="font-semibold">Room Name:</p> <p>{room.title}</p> */}
            <p className="font-semibold">Room Name:</p> <p>Bolbo na go</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold">Check In:</p>{" "}
            {/* <p>
              {new Date(startDate).getDate()}-
              {new Date(startDate).getMonth() + 1}-
              {new Date(startDate).getFullYear()}
            </p> */}
            <p>12-12-22</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold">Check Out:</p>{" "}
            {/* <p>
              {new Date(endDate).getDate()}-{new Date(endDate).getMonth() + 1}-
              {new Date(endDate).getFullYear()}
            </p> */}
            <p>12-12-22</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold">Nights Count:</p>{" "}
            {/* <p>{moment(endDate).diff(moment(startDate), "days")}</p> */}
            <p>3</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold">Total Price:</p> <p>330/- BDT</p>
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
            <p>Your Company Name</p>
            <p>123 Main Street</p>
            <p>City, State, Zip Code</p>
            <p>Email: your@email.com</p>
          </div>

          <div>
            <p className="font-semibold">To:</p>
            <p>Client Name</p>
            <p>456 Client Street</p>
            <p>City, State, Zip Code</p>
            <p>Email: client@email.com</p>
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <p className="font-semibold">Total:</p>
          {/* <p className="ml-2">${amount}</p> */}
          <p className="ml-2">$33</p>
        </div>

        <div>
          <p className="font-semibold">Payment Details:</p>
          {/* <p><strong>Transaction ID:</strong> {tran_id}</p>
  <p><strong>Transaction Date:</strong> {tran_date}</p>
  <p><strong>Card Type:</strong> {card_type}</p>
  <p><strong>Bank Gateway:</strong> {bank_gw}</p>
  <p><strong>Validation ID:</strong> {val_id}</p>
  <p><strong>Status:</strong> {statuss}</p>
  <p><strong>Validated On:</strong> {validated_on}</p>
  <p><strong>Currency Type:</strong> {currency_type}</p> */}
          <p>
            <strong>Transaction ID:</strong> sssss
          </p>
          <p>
            <strong>Transaction Date:</strong> 33-33-33
          </p>
          <p>
            <strong>Card Type:</strong> sss
          </p>
          <p>
            <strong>Bank Gateway:</strong> sss
          </p>
          <p>
            <strong>Validation ID:</strong> ssss
          </p>
          <p>
            <strong>Status:</strong> sddd
          </p>
          <p>
            <strong>Currency Type:</strong> ddd
          </p>
        </div>

        <div>
          <p className="font-semibold">Notes:</p>
          <p>Thank you for your business!</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
