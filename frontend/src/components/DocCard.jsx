import { FileIcon, MoreVertical, Clock, Link } from 'lucide-react'

const DocCard = ({ docName, docUrl, generateDocUrl, showAlert, dbId }) => {
  return (
    <div className='w-80 bg-white rounded-lg shadow-lg overflow-hidden p-3 flex flex-col gap-2'>
      {/* Header */}
      <div className='flex items-center justify-between border-b'>
        <div className='flex items-center gap-2'>
          <div className='bg-red-500 p-1 rounded'>
            <FileIcon className='h-4 w-4 text-white' />
          </div>
          <span className='text-sm font-medium text-gray-700 truncate max-w-[200px]'>
            {docName}
          </span>
        </div>
        <button
          onClick={() => {
            const sharableUrl = generateDocUrl(dbId)
            if (sharableUrl) {
              navigator.clipboard.writeText(sharableUrl)
              showAlert('Link copied to clipboard', 'success')
            } else {
              showAlert('Error generating sharable link', 'error')
            }
          }}
          className='text-gray-400 hover:text-gray-600'
        >
          <Link className='h-5 w-5' />
        </button>
      </div>

      {/* Document Preview */}
      <div className='h-48 bg-gray-50 border-b'>
        <iframe
          src={docUrl}
          className='w-full h-full'
          frameBorder='0'
          scrolling='no'
          title='PDF preview'
        />
      </div>

      {/* Footer */}
      <div className='flex items-center gap-2 text-gray-500'>
        <Clock className='h-4 w-4' />
        {/* <span className='text-sm'>You opened • {timestamp}</span> */}
      </div>
    </div>
  )
}

export default DocCard
