import { Check, X } from 'lucide-react'
const Row = ({ data, columnNames, i }) => {
  return (
    <div className='flex py-4 pl-4 border-b text-sm hover:bg-gray-50'>
      <div
        className={` flex items-center justify-center px-2 text-gray-600`}
        style={{
          width: `${columnNames[0].width * 60}px`,
          overflow: 'hidden'
        }}
      >
        {i}
      </div>
      <div
        className={`flex items-center justify-center px-2 text-gray-600`}
        style={{
          width: `${columnNames[1].width * 60}px`,
          overflow: 'hidden'
        }}
      >
        {data.orgName.substring(0, 15)}
      </div>
      <div
        className={`flex items-center justify-center px-2 text-gray-600`}
        style={{
          width: `${columnNames[2].width * 60}px`,
          overflow: 'hidden',
          maskImage: 'linear-gradient(to right, black 70%, transparent 100%)'
        }}
      >
        {data.parentOrg ? data.parentOrg.substring(0, 15) : 'N/A'}
      </div>
      {/* <div
        className={`flex items-center px-2 text-gray-600`}
        style={{
          width: `${columnNames[3].width * 60}px`,
          overflow: 'hidden'
        }}
      >
        {data.walletAddress}
      </div> */}
      <div
        style={{
          width: `${columnNames[3].width * 60}px`
        }}
        className='flex items-center justify-center'
      >
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            data.status === 'Completed'
              ? 'bg-green-100 text-green-600'
              : data.status === 'Ongoing'
              ? 'bg-blue-100 text-blue-600'
              : 'bg-orange-100 text-orange-600'
          }`}
        >
          {data.currentRole.substring(0, 18)}
        </span>
      </div>
      <div
        style={{
          width: `${columnNames[4].width * 60}px`
        }}
        className='flex items-center justify-center px-2 text-gray-600'
      >
        {data.appliedAt.substring(0, 15)}
      </div>
      <div
        style={{
          width: `${columnNames[3].width * 60}px`
        }}
        className='flex items-center justify-center'
      >
        <span
          className={`px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-600`}
        >
          {data.appliedFor.substring(0, 18)}
        </span>
      </div>
      {/* <div
        className={`flex items-center px-2 text-gray-600`}
        style={{
          width: `${columnNames[7].width * 60}px`,
          overflowX: 'scroll'
        }}
      >
        {data.email}
      </div> */}
      <div
        className={`flex items-center justify-center px-2 text-gray-600 gap-2`}
        style={{
          width: `${columnNames[6].width * 60}px`
        }}
      >
        <span className='p-2 rounded-full border border-green-500 hover:bg-green-500 hover:text-white text-green-500'>
          <Check size={16} />
        </span>
        <span className='p-2 rounded-full border border-red-500 hover:bg-red-500 hover:text-white text-red-500'>
          <X size={16} />
        </span>
      </div>
    </div>
  )
}

export default Row
