# Fix eip 2929 with eip 2930

After the berlin hardfork [eip 2929](https://eips.ethereum.org/EIPS/eip-2929) was added which increased the cost for state access opcodes. This broke any contract which used `address.transfer(eth)` to gnosis safes because the hard-coded `2300 gas` was no longer enough to execute the transaction. In order to help contracts that were affected they made [eip 2930](https://eips.ethereum.org/EIPS/eip-2930) which adds an access list to the transaction. Any address added to this access list has gas prepaid on their behalf as part of the total gas calculation. This reduces the gas required when interacting with them which allows the original `2300 gas` to succeed.

For our situation we needed to run `withdrawETH` on our ERC-1155 contract that would allow the transfer to the gnosis safe to occur. 
Quoting reply from @rmeissner on [stack exchange](https://ethereum.stackexchange.com/questions/122347/transferring-eth-from-contract-to-safe):

"The mastercopy address of the Safe can be obtained using their [services](https://safe-transaction.mainnet.gnosis.io/api/v1/safes/0xDbaD7CbcA084DFf4E93B0f365978362aD8cc0A35/), checked via [Etherscan](https://ethereum.stackexchange.com/questions/82919/verifying-proxy-contracts-on-etherscan) or looked up on-chain by using the `masterCopy()` function.
A general list of addresses for the Safe contracts can be found in the [safe-deployments](https://github.com/gnosis/safe-deployments/tree/main/src/assets) repository."

Look at [./index.js](./index.js) for a complete example.

(shout out [@rmeissner](https://github.com/rmeissner) for the help here)
