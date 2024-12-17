import { Address, toNano, Sender, TonClient4, WalletContractV3R2 } from "@ton/ton";
import {
    Asset,
    Factory,
    JettonRoot,
    MAINNET_FACTORY_ADDR,
    Pool,
    PoolType,
    VaultNative,
} from "@dedust/sdk";
import { mnemonicToPrivateKey } from "@ton/crypto";

const SCALE_ADDR = Address.parse(
    "EQBlqsm144Dq6SjbPI4jjZvA1hqTIP3CvHovbIfW_t-SCALE",
);

async function main() {
    const tonClient = new TonClient4({
        // endpoint: "https://mainnet-v4.tonhubapi.com",
        endpoint: "https://mainnet-rpc.tonxapi.com/v2/json-rpc/8f6c3a31-3393-469f-93df-4d1d9c7da46b",
    });

    /**
     * STEP 1. Find all necessary contracts.
     */
    const mnemonic = 'photo vast input truly census together sugar drink donkey collect churn shadow grace subway apart never milk mass settle level want marriage original struggle'.split(" ");
    const keys = await mnemonicToPrivateKey(mnemonic);
    const wallet = tonClient.open(
        WalletContractV3R2.create({
            workchain: 0,
            publicKey: keys.publicKey,
        }),
    );
    const sender = wallet.sender(keys.secretKey);
    // const sender: Sender = null; // NOTE: It's out of context of this tutorial.

    const factory = tonClient.open(
        Factory.createFromAddress(MAINNET_FACTORY_ADDR),
    );

    const scale = tonClient.open(JettonRoot.createFromAddress(SCALE_ADDR));

    const pool = tonClient.open(
        Pool.createFromAddress(
            await factory.getPoolAddress({
                poolType: PoolType.VOLATILE,
                assets: [Asset.native(), Asset.jetton(scale.address)],
            }),
        ),
    );

    const nativeVault = tonClient.open(
        VaultNative.createFromAddress(
            await factory.getVaultAddress(Asset.native()),
        ),
    );

    const lastBlock = await tonClient.getLastBlock();
    const poolState = await tonClient.getAccountLite(
        lastBlock.last.seqno,
        pool.address,
    );

    if (poolState.account.state.type !== "active") {
        throw new Error("Pool is not exist.");
    }

    const vaultState = await tonClient.getAccountLite(
        lastBlock.last.seqno,
        nativeVault.address,
    );

    if (vaultState.account.state.type !== "active") {
        throw new Error("Native Vault is not exist.");
    }

    const amountIn = toNano("1"); // 1 TON

    const { amountOut: expectedAmountOut } = await pool.getEstimatedSwapOut({
        assetIn: Asset.native(),
        amountIn,
    });

    // Slippage handling (1%)
    const minAmountOut = (expectedAmountOut * 99n) / 100n; // expectedAmountOut - 1%

    await nativeVault.sendSwap(
        sender,
        {
            poolAddress: pool.address,
            amount: amountIn,
            limit: minAmountOut,
            gasAmount: toNano("0.25"),
        },
    );
}

main().catch(console.dir);
