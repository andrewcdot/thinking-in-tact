import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Point = {
    $$type: 'Point';
    x: bigint;
    y: string;
}

export function storePoint(src: Point) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.x, 257);
        b_0.storeStringRefTail(src.y);
    };
}

export function loadPoint(slice: Slice) {
    let sc_0 = slice;
    let _x = sc_0.loadIntBig(257);
    let _y = sc_0.loadStringRefTail();
    return { $$type: 'Point' as const, x: _x, y: _y };
}

function loadTuplePoint(source: TupleReader) {
    let _x = source.readBigNumber();
    let _y = source.readString();
    return { $$type: 'Point' as const, x: _x, y: _y };
}

function storeTuplePoint(source: Point) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.x);
    builder.writeString(source.y);
    return builder.build();
}

function dictValueParserPoint(): DictionaryValue<Point> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePoint(src)).endCell());
        },
        parse: (src) => {
            return loadPoint(src.loadRef().beginParse());
        }
    }
}

export type PointMsg = {
    $$type: 'PointMsg';
    x: bigint;
    y: string;
}

export function storePointMsg(src: PointMsg) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(121325890, 32);
        b_0.storeInt(src.x, 257);
        b_0.storeStringRefTail(src.y);
    };
}

export function loadPointMsg(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 121325890) { throw Error('Invalid prefix'); }
    let _x = sc_0.loadIntBig(257);
    let _y = sc_0.loadStringRefTail();
    return { $$type: 'PointMsg' as const, x: _x, y: _y };
}

function loadTuplePointMsg(source: TupleReader) {
    let _x = source.readBigNumber();
    let _y = source.readString();
    return { $$type: 'PointMsg' as const, x: _x, y: _y };
}

function storeTuplePointMsg(source: PointMsg) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.x);
    builder.writeString(source.y);
    return builder.build();
}

function dictValueParserPointMsg(): DictionaryValue<PointMsg> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePointMsg(src)).endCell());
        },
        parse: (src) => {
            return loadPointMsg(src.loadRef().beginParse());
        }
    }
}

 type DataTypes_init_args = {
    $$type: 'DataTypes_init_args';
    initBool: boolean;
    initStr: string;
    intMap: Dictionary<bigint, Address>;
}

function initDataTypes_init_args(src: DataTypes_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.initBool);
        b_0.storeStringRefTail(src.initStr);
        b_0.storeDict(src.intMap, Dictionary.Keys.BigInt(257), Dictionary.Values.Address());
    };
}

async function DataTypes_init(initBool: boolean, initStr: string, intMap: Dictionary<bigint, Address>) {
    const __code = Cell.fromBase64('te6ccgECDwEAAyoAART/APSkE/S88sgLAQIBYgIDA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVGNs88uCCBAUGAgFYCwwB2O1E0NQB+GPSAAGORYEBAdcA0//UAdAB1AHQAdIA0gDSAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1AHQ9AQwGRgXFhUUQzBsGeD4KNcLCoMJuvLgidIA1AHQAfQEVSAD0VjbPAcBhu2i7fsBkjB/4HAh10nCH5UwINcLH94gghAHO0lCuo4bMNMfAYIQBztJQrry4IGBAQHXANQB0BJsElt/4MAAkTDjDXAIAKrI+EMBzH8BygBVgFCJgQEBzwAWy//IUAXPFslQBMzIUAPPFslYzMoAygDKAAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYByPQAyQHMye1UAH5xgCCLpoZWxsbyB0YWN0h/cI0IYAJ1FPAAvqJsOwY2puuTL+Ypm3l7JqkqMYFsdMJwipjulAizEFgQR14jVRIC+PkBIILwoE6eWqCOpoYXMbLduCCa1n3xrhSyWLr8QG5oqW5xXHa6lDB/2zHgIILwQ9tmCWnVC1K4+BXLPGUiraJ6PeR9Vk1rxH44e76Dq1q6lDB/2zHgIILosEJfgvu31S3Zz7ybXaSfDFyFbB/X+V0TBPk44WuAt7rjAiAJCgAiMCSRI5Fw4pF/kiKz4jB/2zEAqoLwfJkX3K1hscngsxVGKZU5MRJZcHk3XTejw8/32piE/x+6mDAx+EIBf9sx4ILwJEg99qExIXyEStljE49IpU9+4UKowu76kixKnGDOJSm6k3/bMeAAlbu9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmCcCBVwBuAZ2OUzlg6rkclssOCcJ2XTlqzTstzOg6WbZRm6KSAIBSA0OABGwr7tRNDSAAGAAdbJu40NWlwZnM6Ly9RbWNlZEVFNWt4OHlIejFpcGo0UndVZFo3YlZjQ3E2VldxVjMzY0NUVmVuWVV1gg');
    const __system = Cell.fromBase64('te6cckECEQEAAzQAAQHAAQEFoDKvAgEU/wD0pBP0vPLICwMCAWIJBAIBWAgFAgFIBwYAdbJu40NWlwZnM6Ly9RbWNlZEVFNWt4OHlIejFpcGo0UndVZFo3YlZjQ3E2VldxVjMzY0NUVmVuWVV1ggABGwr7tRNDSAAGAAlbu9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmCcCBVwBuAZ2OUzlg6rkclssOCcJ2XTlqzTstzOg6WbZRm6KSAN60AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRjbPPLggg8LCgCqyPhDAcx/AcoAVYBQiYEBAc8AFsv/yFAFzxbJUATMyFADzxbJWMzKAMoAygABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAcj0AMkBzMntVAGG7aLt+wGSMH/gcCHXScIflTAg1wsf3iCCEAc7SUK6jhsw0x8BghAHO0lCuvLggYEBAdcA1AHQEmwSW3/gwACRMOMNcAwC+PkBIILwoE6eWqCOpoYXMbLduCCa1n3xrhSyWLr8QG5oqW5xXHa6lDB/2zHgIILwQ9tmCWnVC1K4+BXLPGUiraJ6PeR9Vk1rxH44e76Dq1q6lDB/2zHgIILosEJfgvu31S3Zz7ybXaSfDFyFbB/X+V0TBPk44WuAt7rjAiAODQCqgvB8mRfcrWGxyeCzFUYplTkxEllweTddN6PDz/famIT/H7qYMDH4QgF/2zHggvAkSD32oTEhfIRK2WMTj0ilT37hQqjC7vqSLEqcYM4lKbqTf9sx4AAiMCSRI5Fw4pF/kiKz4jB/2zEB2O1E0NQB+GPSAAGORYEBAdcA0//UAdAB1AHQAdIA0gDSAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1AHQ9AQwGRgXFhUUQzBsGeD4KNcLCoMJuvLgidIA1AHQAfQEVSAD0VjbPBAAfnGAIIumhlbGxvIHRhY3SH9wjQhgAnUU8AC+omw7Bjam65Mv5imbeXsmqSoxgWx0wnCKmO6UCLMQWBBHXiNVEiao/I0=');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initDataTypes_init_args({ $$type: 'DataTypes_init_args', initBool, initStr, intMap })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const DataTypes_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
}

const DataTypes_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Point","header":null,"fields":[{"name":"x","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"y","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"PointMsg","header":121325890,"fields":[{"name":"x","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"y","type":{"kind":"simple","type":"string","optional":false}}]},
]

const DataTypes_getters: ABIGetter[] = [
]

const DataTypes_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"text","text":"int"}},
    {"receiver":"internal","message":{"kind":"text","text":"string"}},
    {"receiver":"internal","message":{"kind":"text","text":"bool"}},
    {"receiver":"internal","message":{"kind":"text","text":"address"}},
    {"receiver":"internal","message":{"kind":"text","text":"map"}},
    {"receiver":"internal","message":{"kind":"typed","type":"PointMsg"}},
]

export class DataTypes implements Contract {
    
    static async init(initBool: boolean, initStr: string, intMap: Dictionary<bigint, Address>) {
        return await DataTypes_init(initBool, initStr, intMap);
    }
    
    static async fromInit(initBool: boolean, initStr: string, intMap: Dictionary<bigint, Address>) {
        const init = await DataTypes_init(initBool, initStr, intMap);
        const address = contractAddress(0, init);
        return new DataTypes(address, init);
    }
    
    static fromAddress(address: Address) {
        return new DataTypes(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  DataTypes_types,
        getters: DataTypes_getters,
        receivers: DataTypes_receivers,
        errors: DataTypes_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: 'int' | 'string' | 'bool' | 'address' | 'map' | PointMsg) {
        
        let body: Cell | null = null;
        if (message === 'int') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'string') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'bool') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'address') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'map') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'PointMsg') {
            body = beginCell().store(storePointMsg(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
}