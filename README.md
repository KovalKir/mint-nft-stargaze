# Collection structure
 
This app suggests that your collection consists of several types of NFT (tokens in type have different ID, but the same content). Each type includes the certain number of tokens (type supply). The numbering of tokens should be based on the principle: "ID = 1 (first token of type 1) ... ID = typeSupply (last token of type1), ID = typeSupply + 1 (first token of type2) ... ID = 2 * typeSupply (last token of type2), ..., ID = (N-1) * typeSupply + 1 (first token of typeN) ... ID = N * typeSupply (last token of typeN)". 

## Example

Your collection has 3 types of NFTs with 1000 tokens for each type: dog (type1), cat (type2), fish (type3). 

ID = 1 ... 1000 - dog (type1);

ID = 1001 ... 2000 - cat (type2);

ID = 2001 ... 3000 - fish (type3).

# Limitations

The app suggests that user can own only one NFT of each type. If the user already has NFT of given type, the new NFT won't be minted.


# Config parameters

`account` - wallet address used to deploy the collection (creator)

`mnemonic` - mnemonic of the creator

`sg721` - sg721 contract address (contract that contains the list of all NFTs with associations to owners and metadata)

`minter` - minter contract address (contract that contains all the logic for minting, managing prices and whitelists)

`recipient` - wallet address of user for which NFT should be minted

`rpc` - rpc endpoint

`tokenType` - required type of NFT

`typeSupply` - number of NFTs in type

# Application functionality

The app queries all NFTs owned by the user (recipient) for given collection (by querying sg721 contract). If the recipient has no NFT of the required type, the app calculates the first avaliable token ID of the type and mints this NFT for user address.

## Example

There is a request to mint dog-NFT (type1) to recipient with address `stars1...`. Аfter querying sg721 contract confirmation received that the recipient has no dog-NFTs yet. At the moment 10 tokens of type1 were minted. The app calculates the next avaliable ID of given type and mints token with `ID = 11` for address `stars1...`.

# RPC for interaction with network

Mainnet: `https://rpc.stargaze-apis.com/`

Testnet: `https://rpc.elgafar-1.stargaze-apis.com/`
