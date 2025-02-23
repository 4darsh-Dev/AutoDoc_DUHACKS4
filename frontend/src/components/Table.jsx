import Row from './Row'

const Table = ({ data, columnNames }) => {
  return (
    <div className='bg-[#e9e9e9] rounded-xl shadow-sm cursor-pointer'>
      <div className='flex px-2 py-3 border-b text-sm text-gray-500 font-medium pt-4 pl-4'>
        {columnNames.map((columnName, index) => (
          <div
            key={index}
            style={{
              width: `${columnName.width * 60}px`
            }}
            className='flex items-center justify-center'
          >
            {columnName.name}
          </div>
        ))}
      </div>

      {/* Table Body */}
      {data.map((dataObj, index) => (
        <Row key={index} data={dataObj} i={index} columnNames={columnNames} />
      ))}
    </div>
  )
}

export default Table
