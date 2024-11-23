import { TonClient, WalletContractV4, internal } from "ton";
import { mnemonicNew, mnemonicToPrivateKey } from "ton-crypto";
import { Address } from "@ton/core";

async function main() {

// Create Client
    const client = new TonClient({
        endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
        // endpoint: 'https://toncenter.com/api/v2/jsonRPC',
        apiKey:"aa74010f1ee273a1dcdfa6827f5b8265f9ea816876e52f90b4eec31ef40020af"
    });

    // 🔴 Change to your own, by creating .env file!
    let ownerMnemonics = (process.env.MNEMONICS_OWNER || "").toString();
    let keyPair = await mnemonicToPrivateKey(ownerMnemonics.split(" "));

// Create wallet contract
    let workchain = 0; // Usually you need a workchain 0
    let wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    let contract = client.open(wallet);
    console.info("wallet=",wallet.address.toString({ testOnly: true }));

    // Get balance
    let balance: bigint = await contract.getBalance();
    console.info("balance=",balance.toString());

    // Create a transfer
    let seqno: number = await contract.getSeqno();
    console.info("seqno=", seqno.toString());

  let newVar = await  contract.sendTransfer({
        seqno,
        secretKey: keyPair.secretKey,
        messages: [internal({
            value: '0.11',
            to: 'UQBOop4AF9RNh2DG1N1yZfzFM28vZNUlRjAtjphOEVMd0j-8',
            body: 'Hello world',
        })]
    });

    console.info(newVar);

}

main();