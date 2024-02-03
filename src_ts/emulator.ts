import {Blockchain} from "@ton-community/sandbox";

async function main() {
    let blockchain = await Blockchain.create();
    console.info(blockchain)

    let treasuryOpened = await blockchain.treasury("seed");
    // treasuryOpened.send()
}

main().catch((reason) => {console.error(reason)})
