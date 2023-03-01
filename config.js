const account =  'stars1...'; // collection creator address
    
const mnemonic = 'mnemonic'; // mnemonic of collection creator 

const sg721 =  'stars1...'; // sg721 contract address

const minter = 'stars1...'; // minter contract address

const recipient = 'stars1...'; // recipient address

const rpc = 'https://rpc.elgafar-1.stargaze-apis.com/'; // testnet rpc

const tokenType = 10; // type of token

const typeSupply = 900; // number of tokens in type

// message to query all tokens owned by recipient for this collection
const msgTokensOfAddr = {
    tokens: {
        owner: recipient,
        limit: 9000,
    },
};

// message to query all minted tokens for this collection
const msgAllMinted = {
    all_tokens: { limit: 9000, },
};

// messaage to get info about contract
const msgContractInfo = {
    contract_info: { },
};

module.exports = {
    account,
    mnemonic,
    sg721,
    minter,
    recipient,
    rpc,
    tokenType,
    typeSupply,
    msgAllMinted,
    msgTokensOfAddr,
    msgContractInfo,

}

