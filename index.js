const { ethers } = require("ethers")
const fs = require("fs")
const abi = JSON.parse(fs.readFileSync("abi.json", "utf8"))
require('dotenv').config()

const network = "homestead";
const provider = ethers.getDefaultProvider(network, {
  infura: process.env.INFURA_API_KEY,
});


async function run() {
    wallet = new ethers.Wallet.fromMnemonic(process.env.MAINNET_MNEMONIC)
    wallet = wallet.connect(provider)
    const address = "0xb82FdA3F5752FC3b7243259e893B99DDB13D4546"; // contract address
    contract = new ethers.Contract(address, abi, wallet)

    overrides = {
        gasLimit: 500000,
        gasPrice: ethers.utils.parseUnits('150', 'gwei').toString(),
        type: 1,
        accessList: [
            {
                address: "0xDbaD7CbcA084DFf4E93B0f365978362aD8cc0A35", // admin gnosis safe proxy address
                storageKeys: [
                    "0x0000000000000000000000000000000000000000000000000000000000000000"
                ]
            },
            {
                address: '0xd9Db270c1B5E3Bd161E8c8503c55cEABeE709552',  // gnosis safe master address
                storageKeys: []
            }
        ]
    }

    withdrawTxn = await contract.withdrawETH(overrides)
    console.log({ withdrawTxn })
    resolved = await withdrawTxn.wait()
    console.log({resolved})
}

run()
