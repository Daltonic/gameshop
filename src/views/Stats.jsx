import { useEffect, useState } from 'react'
import { loadStats } from '../Blockchain.Service'
import ShopStats from '../components/ShopStats'
import Treasury from '../components/Treasury'
import { useGlobalState } from '../store'

const Stats = () => {
  const [stats] = useGlobalState('myStats')
  const [loaded, setLoaded] = useState(false)
  useEffect(async () => {
    await loadStats().then(() => setLoaded(true))
  }, [])

  return loaded ? (
    <>
      <div className="h-20"></div>
      <h4 className="text-center uppercase mb-8">Your Stats</h4>
      <ShopStats stats={stats} />
      <Treasury stats={stats} />
      <div className="flex justify-center items-center my-4">
        <button
          className="px-6 py-2.5 bg-transparent border-blue-800 text-blue-800 font-medium text-xs 
            leading-tight uppercase rounded shadow-md hover:bg-blue-900 hover:shadow-lg border
            focus:border-blue-900 focus:shadow-lg focus:outline-none focus:ring-0 active:border-blue-900 
            active:shadow-lg transition duration-150 ease-in-out hover:text-white"
        >
          Back to Home
        </button>
      </div>
    </>
  ) : null
}

export default Stats
