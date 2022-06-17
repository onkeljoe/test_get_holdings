# Test get token holdings

This script is a short test to retrieve token holdings from snapshot

# start

first add an enviornment variable with the address:

```sh
export MYADDRESS=###
```

replace ### with your wallet address, starting with 0x.

Then start the script via node.js

```sh
node test.js
```

# dependencies

This script runs on node.js, so you need to have node.js installed on your computer.
https://nodejs.org/en/

Script is dependend on external module "snapshot.js" by snapshotlab. On first use add by:

```sh
npm i @snapshot-labs/snapshot.js
```
