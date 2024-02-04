import { BitReader, BitString, Cell, Slice } from "@ton/core";

function main() {
    let buffer = Buffer.from("A");
    let bitString = new BitString(buffer, 0, 1);

    let bitReader = new BitReader(bitString);
    let slice = new Slice(bitReader, [Cell.EMPTY]);
    let remainingBits = slice.remainingBits;
    let offsetBits = slice.offsetBits;

    console.info(remainingBits);
    console.info(offsetBits);
}

main();
