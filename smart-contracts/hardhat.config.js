require('@nomicfoundation/hardhat-toolbox')

/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config()
const { SEPOLIA_RPC_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env
module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 11155111
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  solidity: {
    compilers: [
      {
        version: '0.8.0'
      },
      {
        version: '0.8.20'
      },
      {
        version: '0.8.24'
      },
      {
        version: '0.7.6'
      },
      {
        version: '0.6.12'
      }
      // Add other versions as needed
    ]
  }
}
