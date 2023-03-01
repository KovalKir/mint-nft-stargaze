const cosmwasm = require('cosmwasm');

const config = require('./config');

const tools = require('./tools');

// time delay in ms

function delay (ms) {
    return new Promise ( resolve => {
        setTimeout(() => {
            console.log(`delayed ${ms} ms`);
            resolve();
        }, ms)
    })

}


async function mint ( tokenType, tokenSupply ) {
    
    let tokenAmount = await tools.checkTokenType(tokenType, tokenSupply, config.rpc, config.sg721);

    if (tokenAmount === 0) {
        
        let ID = await tools.GetID(tokenType, tokenSupply, config.rpc, config.sg721);
        console.log(`minting token ${tokenType}, ID = ${ID}...`);
        tools.mintFor(ID, config.recipient, config.mnemonic, config.rpc, config.minter, config.account);

        await delay(10000);

        let newTokenAmount = await tools.checkTokenType(tokenType, tokenSupply, config.rpc, config.sg721);
        
        if (newTokenAmount === 1) {
            console.log(`token ${tokenType} was successfully minted for ${config.recipient}, token ID = ${ID}`);
        }
        

    } else {

        console.log(`The recipient ${config.recipient} already has token ${tokenType}`);

    }

    
}


mint(config.tokenType, config.typeSupply)



