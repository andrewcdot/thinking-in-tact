import { beginCell, BitString } from "@ton/core";

let blank_cell = beginCell().endCell();
console.info(blank_cell); //x{}

let bit_cell = beginCell().storeBit(1).endCell();
console.info(bit_cell); //x{C_}

// storeUint(value: bigint | number, bits: number)
let uint_cell = beginCell().storeUint(111,100).endCell();
console.info(uint_cell); //x{C_}
let slice = uint_cell.beginParse();
let number = slice.loadUint(100);
console.info(number);


// storeUint(value: bigint | number, bits: number)
let hello = "123";
let buffer = Buffer.from(hello);
let bitString = new BitString(buffer, 0, hello.length);
let bitString_cell = beginCell().storeBits(bitString).endCell();
console.info(bitString_cell.toString("--")); //x{4C_}









