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

 type RefContract_init_args = {
    $$type: 'RefContract_init_args';
}

function initRefContract_init_args(src: RefContract_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function RefContract_init() {
    const __code = Cell.fromBase64('te6ccgECEQEAAqAAART/APSkE/S88sgLAQIBYgIDApLQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxZ2zzy4IIwyPhDAcx/AcoAye1UCwQCASAJCgE67aLt+wGSMH/gcCHXScIflTAg1wsf3sAAkTDjDXAFAvb5ASCC6bHPL1wFad9Fw+u6iKXU91kjXT5ldeMP8TQXNgQCCJu64wIggvBD22YJadULUrj4Fcs8ZSKtono95H1WTWvEfjh7voOrWrqUMH/bMeAggvAd5LET0LQIdH6LxfBtTBiTmEz9X4p4vJT6qvMOusJBwbqUMH/bMeAGBwH0MPhC+EPbPFxwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiF8DgW+qjQhgAnUU8AC+omw7Bjam65Mv5imbeXsmqSoxgWx0wnCKmO6UWMcF8vR/2zEIAFCC8GAgc8HgvACdz2e8WBbi3odY56/sgZarG+16ep1iN933upN/2zHgAFjQ9AQwbQGBewoBgBD0D2+h8uCHAYF7CiICgBD0F8gByPQAyQHMcAHKAG0wyQELvcM22eGECwIBIA0OATTtRNDUAfhj0gAwkW3g+CjXCwqDCbry4InbPAwAAm0Albu9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmCcCBVwBuAZ2OUzlg6rkclssOCcJ2XTlqzTstzOg6WbZRm6KSAIBSA8QABGwr7tRNDSAAGAAdbJu40NWlwZnM6Ly9RbWNiUWd4V3dYbTNzODhCa3B2b0I4VEtHUmlQYkFqenlDTkhiWVlLOUU3ZHN6gg');
    const __system = Cell.fromBase64('te6cckECHwEAA4oAAQHAAQIBIBACAQW9roQDART/APSkE/S88sgLBAIBYgoFAgEgCQYCASAYBwIBSBcIAHWybuNDVpcGZzOi8vUW1jYlFneFd3WG0zczg4Qmtwdm9COFRLR1JpUGJBanp5Q05IYllZSzlFN2RzeoIAELvcM22eGEHQKS0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8Wds88uCCMMj4QwHMfwHKAMntVB0LATrtou37AZIwf+BwIddJwh+VMCDXCx/ewACRMOMNcAwC9vkBIILpsc8vXAVp30XD67qIpdT3WSNdPmV14w/xNBc2BAIIm7rjAiCC8EPbZglp1QtSuPgVyzxlIq2iej3kfVZNa8R+OHu+g6taupQwf9sx4CCC8B3ksRPQtAh0fovF8G1MGJOYTP1fini8lPqq8w66wkHBupQwf9sx4A4NAFCC8GAgc8HgvACdz2e8WBbi3odY56/sgZarG+16ep1iN933upN/2zHgAfQw+EL4Q9s8XHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIXwOBb6qNCGACdRTwAL6ibDsGNqbrky/mKZt5eyapKjGBbHTCcIqY7pRYxwXy9H/bMQ8AWND0BDBtAYF7CgGAEPQPb6Hy4IcBgXsKIgKAEPQXyAHI9ADJAcxwAcoAbTDJAQW/2FQRART/APSkE/S88sgLEgIBYhsTAgEgGRQCASAYFQIBSBcWAHWybuNDVpcGZzOi8vUW1SRWlHd0hkaXY2Z0tjTkUzOUF5N3JZODZVN2FzTUcyVUVKWHZaTEZpNmNIdYIAARsK+7UTQ0gABgAJW7vRgnBc7D1dLK57HoTsOdZKhRtmgnCd1jUtK2R8syLTry398WI5gnAgVcAbgGdjlM5YOq5HJbLDgnCdl05as07LczoOlm2UZuikgCD72NVtnm2eGMHRoAGou2hlbGxvIHdvcmxkgCktAB0NMDAXGwowH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVFBTA28E+GEC+GLbPFnbPPLggjDI+EMBzH8BygDJ7VQdHAAaAZIwf+Ag10kxwh8wcAE07UTQ1AH4Y9IAMJFt4Pgo1wsKgwm68uCJ2zweAAJtgtwFsg==');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initRefContract_init_args({ $$type: 'RefContract_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const RefContract_errors: { [key: number]: { message: string } } = {
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
    28586: { message: `Sender is not tonkeeper owner.` },
}

const RefContract_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
]

const RefContract_getters: ABIGetter[] = [
    {"name":"echo","arguments":[],"returnType":null},
]

const RefContract_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"text","text":"RefContract"}},
    {"receiver":"internal","message":{"kind":"text","text":"string"}},
    {"receiver":"internal","message":{"kind":"text","text":"SAVE：cell build with builder"}},
    {"receiver":"internal","message":{"kind":"text","text":"LOAD：slice parsed from cell"}},
]

export class RefContract implements Contract {
    
    static async init() {
        return await RefContract_init();
    }
    
    static async fromInit() {
        const init = await RefContract_init();
        const address = contractAddress(0, init);
        return new RefContract(address, init);
    }
    
    static fromAddress(address: Address) {
        return new RefContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  RefContract_types,
        getters: RefContract_getters,
        receivers: RefContract_receivers,
        errors: RefContract_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: 'RefContract' | 'string' | 'SAVE：cell build with builder' | 'LOAD：slice parsed from cell') {
        
        let body: Cell | null = null;
        if (message === 'RefContract') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'string') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'SAVE：cell build with builder') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'LOAD：slice parsed from cell') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getEcho(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('echo', builder.build())).stack;
    }
    
}