import React from 'react'

const ShopStats = ({ stats }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center p-5">
      <div className="flex flex-col justify-center items-center h-20 border border-gray-200 shadow-md w-full">
        <span className="text-lg font-bold text-black leading-5">
          {stats.products}
        </span>
        <span>Products</span>
      </div>
      <div className="flex flex-col justify-center items-center h-20 border border-gray-200 shadow-md w-full">
        <span className="text-lg font-bold text-black leading-5">
          {stats.sellers}
        </span>
        <span>Sellers</span>
      </div>
      <div className="flex flex-col justify-center items-center h-20 border border-gray-200 shadow-md w-full">
        <span className="text-lg font-bold text-black leading-5">
          {stats.sales}
        </span>
        <span>Sales</span>
      </div>
    </div>
  )
}

export default ShopStats
