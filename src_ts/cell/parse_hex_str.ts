import { Cell } from "@ton/core";

let str = "b5ee9c7201010701009300010300c00102012002030143bff872ebdb514d9c97c283b7f0ae5179029e2b6119c39462719e4f46ed8f7413e640040143bff7407e978f01a40711411b1acb773a96bdd93fa83bb5ca8435013c8c4b3ac91f400601020005006a68747470733a2f2f7374617469632e686f6c64636f696e2e78797a2f746f6b656e2f6d6574612d3230303037393238352e6a736f6e00040039";
let cell_list = Cell.fromBoc(Buffer.from(str,"hex"));


const cell1 = cell_list[0];
console.info(cell1);
let refs = cell1.refs;
let cell1_ref1 = refs[0];

let cell1_ref1_ref1 = cell1_ref1.refs[0];
let cell1_ref1_ref1_ref1 = cell1_ref1_ref1.refs[0];
let cell1_ref1_ref1_ref1_ref1 = cell1_ref1_ref1_ref1.refs[0];
const slice1 = cell1_ref1_ref1_ref1_ref1.beginParse();

try {
    const url = slice1.loadStringTail();
    console.log(`Load String Url :${url}`);
} catch (error) {
    console.error("error:", error);
}


// 将 Cell 转换为 BOC（以 Hex 编码表示）
const boc = cell1.toBoc({ idx: false }).toString('hex');
console.log("BOC (Hex):", boc);
console.log(boc==str);
