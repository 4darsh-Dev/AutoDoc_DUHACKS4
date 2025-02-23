import Table from './Table'

const AdminDashboard = () => {
  const data = [
    {
      orgName: 'Tech Innovators',
      parentOrg: 'Global Tech',
      walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
      currentRole: 'User',
      appliedFor: 'Issuing Authority',
      email: 'dev@techinnovators.com',
      appliedAt: '2024-01-01 10:00'
    },
    {
      orgName: 'Health Solutions',
      parentOrg: 'Global Health',
      walletAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
      currentRole: 'User',
      appliedFor: 'Issuing Authority',
      email: 'analyst@healthsolutions.com',
      appliedAt: '2024-01-02 11:30'
    },
    {
      orgName: 'EduTech',
      parentOrg: 'Global Education',
      walletAddress: '0x7890abcdef1234567890abcdef1234567890abcd',
      currentRole: 'User',
      appliedFor: 'Verifying Authority',
      email: 'teacher@edutech.com',
      appliedAt: '2024-01-03 09:45'
    },
    {
      orgName: 'Finance Corp',
      parentOrg: 'Global Finance',
      walletAddress: '0x4567890abcdef1234567890abcdef1234567890a',
      currentRole: 'User',
      appliedFor: 'Issuing Authority',
      email: 'accountant@financecorp.com',
      appliedAt: '2024-01-04 14:20'
    },
    {
      orgName: 'Retail Giants',
      walletAddress: '0xabcdef7890abcdef1234567890abcdef12345678',
      currentRole: 'User',
      appliedFor: 'Verifying Authority',
      email: 'manager@retailgiants.com',
      appliedAt: '2024-01-05 16:10'
    }
  ]
  const columnNames = [
    { name: 'S.No', width: 1 },
    { name: 'Org. Name', width: 2 },
    { name: 'Parent Org.', width: 2 },
    // { name: 'Wallet Address', width: 5 },
    { name: 'Current Role', width: 2 },
    { name: 'Applied at', width: 2.5 },
    { name: 'Applied for', width: 2 },
    { name: 'Action', width: 2 }
  ]
  return (
    <div className='flex flex-col items-center justify-center m-5'>
      <h1 className='text-4xl self-start font-bold pl-[15vw] p-4'>Hi Admin</h1>
      <Table data={data} columnNames={columnNames} />
    </div>
  )
}

export default AdminDashboard
