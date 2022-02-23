# Fix eip 2929 with eip 2930

After the berlin hardfork [eip 2929](https://eips.ethereum.org/EIPS/eip-2929) was added which increased the cost for state access opcodes. This broke any contract which used `address.transfer(eth)` to gnosis safes because the hard-coded `2300 gas` was no longer enough to execute the transaction. In order to help contracts that were affected they made [eip 2930](https://eips.ethereum.org/EIPS/eip-2930) which adds an access list to the transaction. Any address added to this access list has gas prepaid on their behalf as part of the total gas calculation. This reduces the gas required when interacting with them which allows the original `2300 gas` to succeed.

For our situation we needed to run `withdrawETH` on our ERC-1155 contract that would allow the transfer to the gnosis safe to occur.

Look at [./index.js](./index.js) for a complete example.

(shout out [@rmeissner](https://github.com/rmeissner) for the help here)
