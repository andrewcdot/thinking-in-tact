import { ContractSystem, Treasure } from "@tact-lang/emulator";
import { BinMsg, SendMsgContract } from "../src_tact/tact_guides/artifact/TypeSystem_SendMsgContract";
import { Address, Contract } from "@ton/core";
import { toNano } from "@ton/ton";

(BigInt.prototype as any).toJSON = function () {
    return this.toString();
};

async function main() {
    let owner = Address.parse("UQBOop4AF9RNh2DG1N1yZfzFM28vZNUlRjAtjphOEVMd0j-8");
    let system = await ContractSystem.create();

    // Treasure 是一个拥有 1M TON 的合约，是智能合约的便捷切入点
    // Treasure is a contract that has 1m of TONs and is a handy entry point for your smart contracts
    let treasure: Treasure = system.treasure("Sender Treasure Contract");

    let openedSendMsgContract = system.open(await SendMsgContract.fromInit(owner));

    // This object would track all transactions in this contract
    let tracker = system.track(openedSendMsgContract.address);
    let tracker2 = system.track(Address.parse("UQBv5hkZ6Ty5ipbydwY5gUw-Yq1eb_Cg89l6xIXsRFrNIAwR"));

    // This object would track all logs
    let logger = system.log(openedSendMsgContract.address);

    // 模拟一个 “Treasure合约” 往 “目标测试合约SendMsgContract” 发送 Internal 消息
    // “Treasure合约”看成是 Sender
    openedSendMsgContract.send(treasure, { value: toNano(1) }, "reply_text");
    openedSendMsgContract.send(treasure, { value: toNano(1) }, "send_SendParameters_text");
    openedSendMsgContract.send(treasure, { value: toNano(1) }, "send_SendParameters_binary");
    openedSendMsgContract.send(treasure, { value: toNano(1) }, "send_SendParameters_to_deploy_other_contract");
    openedSendMsgContract.send(treasure, { value: toNano(1) }, { $$type: "BinMsg", x: 121n, y: "from send msg" });

    // Run the system until there are no more messages
    await system.run();

    //
    // Collecting results
    //

    let trackedTransactions = tracker2.collect();
    for (const trackedTransaction of trackedTransactions) {
        console.info("1111111111111");
        console.info(JSON.stringify(trackedTransaction));
        console.info("1111111111111");
    }

    console.info("=========================================");
    // Prints out all transactions in contract
    let message = tracker.collect();
    let index = 1;
    for (const trackedTransaction of message) {
        console.info(`------------- TX : ${index} Start----------------`);
        console.info(JSON.stringify(trackedTransaction));
        console.info(`-------------- TX : ${index} END---------------`);
        index++;
    }
    console.info("=========================================");
    console.info("=========================================");
    console.info("=========================================");
    console.info("=========================================");
    console.info("=========================================");

    console.info("##########################################");
    // Prints out all logs for each transaction
    let log = logger.collect();
    console.info(log);
    console.info("##########################################");
    console.info("##########################################");
    console.info("##########################################");

    //
    // Invoking get methods
    //

    let counter = await openedSendMsgContract.getCounter();
    console.log(counter); // Prints out counter value
}

main();
