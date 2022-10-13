import { FaEthereum } from 'react-icons/fa'
import Identicon from 'react-identicons'
import { truncate } from '../store'

const Buyers = ({ buyers }) => {
  return (
    <div className="flex justify-center flex-col items-start w-full md:w-2/3 p-5 mx-auto">
      <div className="max-h-[calc(100vh_-_20rem)] overflow-y-auto shadow-md rounded-md w-full">
        {buyers.length < 1 ? null : (
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th
                  scope="col"
                  className="text-sm font-medium px-6 py-4 text-left"
                >
                  Buyer
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium px-6 py-4 text-left"
                >
                  Cost
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium px-6 py-4 text-left"
                >
                  Qty
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium px-6 py-4 text-left"
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {buyers.map((buyer, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-200 transition duration-300 ease-in-out"
                >
                  <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-row justify-start items-center space-x-3">
                      <Identicon
                        string={buyer.buyer}
                        size={25}
                        className="h-10 w-10 object-contain rounded-full mr-3"
                      />
                      <small className="font-bold">
                        {truncate(buyer.buyer, 4, 4, 11)}
                      </small>
                    </div>
                  </td>
                  <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                    <small className="flex justify-start items-center space-x-1">
                      <FaEthereum />
                      <span className="text-gray-700 font-bold">
                        {buyer.price} EHT
                      </span>
                    </small>
                  </td>

                  <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700 font-bold">{buyer.qty}</span>
                  </td>
                  <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                    {buyer.timestamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default Buyers
