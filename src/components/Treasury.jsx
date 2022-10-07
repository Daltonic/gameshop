const Treasury = ({ stats }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center p-5">
      <div className="flex flex-col justify-center items-center h-20 border border-gray-200 shadow-md w-full">
        <span className="text-lg font-bold text-black leading-5">{0} ETH</span>
        <span>Paid</span>
      </div>
      <div className="flex flex-col justify-center items-center h-20 border border-gray-200 shadow-md w-full">
        <span className="text-lg font-bold text-black leading-5">{stats.balance} ETH</span>
        <span>Balance</span>
      </div>
      <div className="flex justify-center items-center h-20 space-x-2 border border-gray-200 shadow-md w-full">
        <button
          type="button"
          className="inline-block px-6 py-2.5 bg-blue-600
            text-white font-medium text-xs leading-tight
            uppercase rounded-full shadow-md hover:bg-blue-700
            hover:shadow-lg focus:bg-blue-700 focus:shadow-lg
            focus:outline-none focus:ring-0 active:bg-blue-800
            active:shadow-lg transition duration-150 ease-in-out"
        >
          Withdraw Fund
        </button>
        <button
          type="button"
          className="inline-block px-6 py-2.5 bg-blue-600
            text-white font-medium text-xs leading-tight
            uppercase rounded-full shadow-md hover:bg-blue-700
            hover:shadow-lg focus:bg-blue-700 focus:shadow-lg
            focus:outline-none focus:ring-0 active:bg-blue-800
            active:shadow-lg transition duration-150 ease-in-out"
        >
          Fund Account
        </button>
      </div>
    </div>
  )
}

export default Treasury
