import * as path from "path";
import { Address, contractAddress } from "@ton/core";
import { SendMsgContract } from "../src_tact/tact_guides/artifact/TypeSystem_SendMsgContract";
import * as fs from "fs";
import { prepareTactDeployment } from "@tact-lang/deployer";

async function deploy() {
    let testnet = false;
    let workchain = 0;
    let pkgName = "TypeSystem_SendMsgContract.pkg";
    let outputPath = path.resolve(__dirname, "../src_tact/tact_guides/artifact/");
    let owner = Address.parse("UQBOop4AF9RNh2DG1N1yZfzFM28vZNUlRjAtjphOEVMd0j-8");

    //没有owner, 因为没有Ownable - （ import "@stdlib/ownable";）
    let initState = await SendMsgContract.init(owner);

    let deployAddress = contractAddress(0, initState);
    let dataBuffer = initState.data.toBoc(); // data 的值，会因为 init 的初始化参数而变化
    let pkgBuffer = fs.readFileSync(path.resolve(outputPath, pkgName));

    let link = await prepareTactDeployment({ pkg: pkgBuffer, data: dataBuffer, testnet });

    console.log("address:", deployAddress);
    console.log("deploy link :", link);
}

deploy();
