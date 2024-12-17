import { Cell } from "@ton/core";

let str = "b5ee9c7201010701009300010300c00102012002030143bff872ebdb514d9c97c283b7f0ae5179029e2b6119c39462719e4f46ed8f7413e640040143bff7407e978f01a40711411b1acb773a96bdd93fa83bb5ca8435013c8c4b3ac91f400601020005006a68747470733a2f2f7374617469632e686f6c64636f696e2e78797a2f746f6b656e2f6d6574612d3230303037393238352e6a736f6e00040039";
let mainCell = Cell.fromBoc(Buffer.from(str,"hex"));
console.info(mainCell.length);
console.info(mainCell);

// 解析引用1（包含标志位和 URL）
const ref1 = mainCell[0];
const slice1 = ref1.beginParse();
// 解析引用1（包含标志位和 URL）

try {
    // 读取标志位（假设是 8 位）
    const flag = slice1.loadUint(8);
    console.log(`引用1 - Flag: ${flag}`);

    // 读取 URL 字符串
    // 读取哈希值（256 位）
    const hash1 = slice1.loadBits(256).toString().toUpperCase();
    console.log(`引用1 - Hash: ${hash1}`);
} catch (error) {
    console.error("解析引用1时出错:", error);
}
