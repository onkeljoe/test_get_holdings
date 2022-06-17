const snapshot = require('@snapshot-labs/snapshot.js');

// strategies reduced to the first and only relevant: staked LP on Beethoven-X
// replaced weight and weightDecimals by the default values
const CRE8Rstrategies = [
    {
      "name": "masterchef-pool-balance",
      "params": {
        "pid": "39",
        "symbol": "BEETSLP -> SLP",
        "weight": 1, //172,
        "tokenIndex": 0,
        "chefAddress": "0x8166994d9ebBe5829EC86Bd81258149B87faCfd3",
        "uniPairAddress": null,
        "weightDecimals": 0 //3
      }
    },
/*    { // tried out balancer method - does not work
      "name": "balancer-erc20-internal-balance_of",
      "params": {
        "vault": "0x20dd72Ed959b6147912C2e529F0a0C651c33c9ce",
        "token": "0x2ad402655243203fcfa7dcb62f8a08cc2ba88ae0",
        "symbol": "CRE8R",
        "decimals": 18
      }
    } */
];
const CRE8R = 'cre8r'
const addresses = [process.env.MYADDRESS,] // just my address for testing

//const block = 40013791 // snapshot vote round 12
const block = 39001234 // snapshot vote round 11


//##################################################

const bribeSettings = {
    [CRE8R]: {
      strategies: [...CRE8Rstrategies], // cre8r strategy 2 is the erc20 balance of address
      network: 250                      // fantom
    }
}
  
/**
 * 
 * @param {*} addresses 
 * @param {*} blockNumber 
 * @returns promise
 */
function getHoldings(addresses, blockNumber) {
    return snapshot.utils.getScores(
      CRE8R,
      [...bribeSettings[CRE8R].strategies],
      bribeSettings[CRE8R].network,
      [...addresses],
      blockNumber
    ).then(scores => {
      if (!scores) return;
    const holdings = {}
    for (let i = 0; i < scores.length; i++) {
      for (let j = 0; j < Object.keys(scores[i]).length; j++) {
        let key = Object.keys(scores[i])[j]
        if (holdings[key] === undefined) {
          holdings[key] = scores[i][key]
        } else {
          holdings[key] += scores[i][key]
        }                             
      }
    }
    for (let i = 0; i < Object.keys(holdings).length; i++) {
      holdings[Object.keys(holdings)[i]] *= 1 //8.2 //converting vp to cre8r
    } 
      return holdings
    })
}

(async () => {
    result = await getHoldings(addresses, block)
    console.log(result)
})()
  