const cosmwasm = require('cosmwasm');
const config = require('./config');


// create sign for operations on the collection

async function getClient(mnemonicPhrase, rpcEndpoint){
    const gasPrice = cosmwasm.GasPrice.fromString('0ustars');
    const wallet = await cosmwasm.DirectSecp256k1HdWallet.fromMnemonic(mnemonicPhrase, {
      prefix: 'stars',
    });
  
   const sign = await cosmwasm.SigningCosmWasmClient.connectWithSigner(rpcEndpoint, wallet, { gasPrice });
   
   return sign;

}

// mint token with certain ID for user's address (recipient)

async function mintFor(tokenId, recipientAddr, mnemonicPhrase, rpcEndpoint, minterContract, accountAddr) {
  
  const client = await getClient(mnemonicPhrase, rpcEndpoint);
  
  const msg = {
    mint_for: { token_id: Number(tokenId), recipient: recipientAddr },
  };
  
  console.log(JSON.stringify(msg, null, 2));
  
  client.execute(accountAddr, minterContract, msg, 'auto', 'mint to');

  
       
}

// query sg721 contract and sort the array of tokens by ascending order

async function query(rpcEndpoint, sg721Contract, message) {
    const client = await cosmwasm.CosmWasmClient.connect(rpcEndpoint)
    
    const nfts = await client.queryContractSmart(sg721Contract, message);

      let token_arr = nfts.tokens;
      token_arr = token_arr.sort( (a,b) => a - b )
      console.log(token_arr);

      return token_arr;

}

// calculate the next unminted token ID of given token type

async function GetID (tokenType, typeSupply, rpcEndpoint, sg721Contract){
  
  const tokenList = await query(rpcEndpoint, sg721Contract, config.msgAllMinted);
  
  let count = 0;

  for (let i = 0; i < tokenList.length; i++) {
    if ((Number(tokenList[i]) > (tokenType - 1)*typeSupply) && (Number(tokenList[i]) <= tokenType*typeSupply)){
      count = count+1;
    }
  }

  let tokenID = 0;

  if (count >= typeSupply) {
    console.log(`All tokens of type ${tokenType} are minted`)
  }
  else {
    tokenID = (tokenType - 1)*typeSupply + count + 1;
  }
  
  console.log(tokenID);
  return tokenID;
}

// check number of tokens of given type owned by user

async function checkTokenType (tokenType, typeSupply, rpcEndpoint, sg721Contract) {

  const tokenList = await query(rpcEndpoint, sg721Contract, config.msgTokensOfAddr);

  let count = 0;

  for (let i = 0; i < tokenList.length; i++) {
    if ((Number(tokenList[i]) > (tokenType - 1)*typeSupply) && (Number(tokenList[i]) <= tokenType*typeSupply)){
      count = count+1;
    }
  }
  
  console.log(count);
  return count;

}

module.exports = {
    getClient,
    mintFor,
    query,
    GetID,
    checkTokenType,
}