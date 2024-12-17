import { Address, TonClient4, WalletContractV3R2 } from "@ton/ton";
import { mnemonicToPrivateKey } from "@ton/crypto";
import { Asset, Factory, MAINNET_FACTORY_ADDR } from "@dedust/sdk";

async function main() {
    if (!process.env.MNEMONIC) {
        throw new Error("Environment variable MNEMONIC is required.");
    }

    const mnemonic = 'photo vast input truly census together sugar drink donkey collect churn shadow grace subway apart never milk mass settle level want marriage original struggle'.split(" ");

    if (!process.env.JETTON_ADDRESS) {
        throw new Error("Environment variable JETTON_ADDRESS is required.");
    }

    const jettonAddress = Address.parse(process.env.JETTON_ADDRESS);

    const tonClient = new TonClient4({
        endpoint: "https://mainnet-v4.tonhubapi.com",
    });

    const factory = tonClient.open(
        Factory.createFromAddress(MAINNET_FACTORY_ADDR),
    );

    const keys = await mnemonicToPrivateKey(mnemonic);
    const wallet = tonClient.open(
        WalletContractV3R2.create({
            workchain: 0,
            publicKey: keys.publicKey,
        }),
    );

    const sender = wallet.sender(keys.secretKey);

    await factory.sendCreateVault(sender, {
        asset: Asset.jetton(jettonAddress),
    });
}

main();