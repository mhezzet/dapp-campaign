const { readFileSync } = require('fs')
const fs = require('fs-extra')
const path = require('path')
const solc = require('solc')

console.info('🔃 compiling the contract...')

const contractPath = path.resolve(__dirname, 'campaign.sol')
const contractSource = readFileSync(contractPath, 'utf-8')

const input = {
  language: 'Solidity',
  sources: {
    'campaign.sol': { content: contractSource }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
}

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['campaign.sol']

const buildPath = path.resolve(__dirname, '../build')
fs.removeSync(buildPath)
fs.ensureDirSync(buildPath)

Object.entries(output).forEach(([contractName, compiledContract]) => {
  fs.outputJSONSync(
    path.resolve(buildPath, contractName + '.json'),
    {
      abi: compiledContract.abi,
      bytecode: compiledContract.evm.bytecode.object
    },
    {
      spaces: 2
    }
  )
}, {})

console.info('✅ successfully compiled the contract')
