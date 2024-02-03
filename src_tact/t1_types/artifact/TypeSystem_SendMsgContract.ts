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

export type MyMsgBody = {
    $$type: 'MyMsgBody';
    x: bigint;
    y: string;
}

export function storeMyMsgBody(src: MyMsgBody) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.x, 257);
        b_0.storeStringRefTail(src.y);
    };
}

export function loadMyMsgBody(slice: Slice) {
    let sc_0 = slice;
    let _x = sc_0.loadIntBig(257);
    let _y = sc_0.loadStringRefTail();
    return { $$type: 'MyMsgBody' as const, x: _x, y: _y };
}

function loadTupleMyMsgBody(source: TupleReader) {
    let _x = source.readBigNumber();
    let _y = source.readString();
    return { $$type: 'MyMsgBody' as const, x: _x, y: _y };
}

function storeTupleMyMsgBody(source: MyMsgBody) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.x);
    builder.writeString(source.y);
    return builder.build();
}

function dictValueParserMyMsgBody(): DictionaryValue<MyMsgBody> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMyMsgBody(src)).endCell());
        },
        parse: (src) => {
            return loadMyMsgBody(src.loadRef().beginParse());
        }
    }
}

 type SendMsgContract_init_args = {
    $$type: 'SendMsgContract_init_args';
}

function initSendMsgContract_init_args(src: SendMsgContract_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function SendMsgContract_init() {
    const __code = Cell.fromBase64('te6ccgECFgEABCgAART/APSkE/S88sgLAQIBYgIDApLQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxZ2zzy4IIwyPhDAcx/AcoAye1UBAUCAVgSEwE07UTQ1AH4Y9IAMJFt4Pgo1wsKgwm68uCJ2zwGATrtou37AZIwf+BwIddJwh+VMCDXCx/ewACRMOMNcAcAAm0E/vkBIILw30oWFLUiOBZw5LQTU1nw6NdF/dsVrqqkRDkh8QNB8my6jwwwiPhCAX9t2zx/2zHgIILwMEoBB3HWOpxIc3aHqZGbcB4mx1618wQmqlM4OzXYXEC64wIggvBSoAZ9YW2xncC5CLWDyxW15/b5X0xu58PftRHt6TEsvroICQoLABYAAAAAZ290IGl0LgE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwQAnIwjQhgA38wyM9J5cxUt5O4McwKYfMVavN/hQeey9YkL2Ii1mkEghA7msoAf3KIECQQI21t2zx/2zEMEALojswwjQhgA38wyM9J5cxUt5O4McwKYfMVavN/hQeey9YkL2Ii1mkEghA7msoAf3JxixeYyFkCgQEBzwDIWM8WyQHMyRAkECNtbds8f9sx4ILw9PnoWzQDn3mwy/SvyVv2n+xKMHlx0GsICaVVQuHYQnO64wIQDQBiAAAAAGJ1aWxkIHdpdGggU2VuZFBhcmFtZXRlcnMuIENvZGUmZGF0ZSBpcyBudWxsLgO2+EPbPFxwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiIIQO5rKAH9yiBAmEEUTFFnbPH/bMQ4PEABY0PQEMG0BgXsKAYAQ9A9vofLghwGBewoiAoAQ9BfIAcj0AMkBzHABygBtMMkAFAAAAABEZXBsb3kByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAEQCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzACVu70YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwnZdOWrNOy3M6DpZtlGbopIAgFIFBUAEbCvu1E0NIAAYAB1sm7jQ1aXBmczovL1FtVHAyWGo5cjF1b0dURmQ1YkphUGNwMkpSSEZIWTdaZlVZZEFMZ1RvenR3WGOCA=');
    const __system = Cell.fromBase64('te6cckECJAEABRIAAQHAAQIBIBUCAQW869wDART/APSkE/S88sgLBAIBYggFAgFYHQYCAUgcBwB1sm7jQ1aXBmczovL1FtVHAyWGo5cjF1b0dURmQ1YkphUGNwMkpSSEZIWTdaZlVZZEFMZ1RvenR3WGOCACktAB0NMDAXGwowH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVFBTA28E+GEC+GLbPFnbPPLggjDI+EMBzH8BygDJ7VQiCQE67aLt+wGSMH/gcCHXScIflTAg1wsf3sAAkTDjDXAKBP75ASCC8N9KFhS1IjgWcOS0E1NZ8OjXRf3bFa6qpEQ5IfEDQfJsuo8MMIj4QgF/bds8f9sx4CCC8DBKAQdx1jqcSHN2h6mRm3AeJsdetfMEJqpTODs12FxAuuMCIILwUqAGfWFtsZ3AuQi1g8sVtef2+V9MbufD37UR7ekxLL66FBEPCwLojswwjQhgA38wyM9J5cxUt5O4McwKYfMVavN/hQeey9YkL2Ii1mkEghA7msoAf3JxixeYyFkCgQEBzwDIWM8WyQHMyRAkECNtbds8f9sx4ILw9PnoWzQDn3mwy/SvyVv2n+xKMHlx0GsICaVVQuHYQnO64wISDAO2+EPbPFxwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiIIQO5rKAH9yiBAmEEUTFFnbPH/bMQ4NEgAUAAAAAERlcGxveQBY0PQEMG0BgXsKAYAQ9A9vofLghwGBewoiAoAQ9BfIAcj0AMkBzHABygBtMMkCcjCNCGADfzDIz0nlzFS3k7gxzAph8xVq83+FB57L1iQvYiLWaQSCEDuaygB/cogQJBAjbW3bPH/bMRASAGIAAAAAYnVpbGQgd2l0aCBTZW5kUGFyYW1ldGVycy4gQ29kZSZkYXRlIGlzIG51bGwuATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPBIByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAEwCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAAWAAAAAGdvdCBpdC4BBb/YVBYBFP8A9KQT9LzyyAsXAgFiIBgCASAeGQIBIB0aAgFIHBsAdbJu40NWlwZnM6Ly9RbWRGcUtUMWkzTnNydDE1b21EeDNYbkFzc3hpWndkZ2I3YUVmVlhNcDZUS0ZqggABGwr7tRNDSAAGAAlbu9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmCcCBVwBuAZ2OUzlg6rkclssOCcJ2XTlqzTstzOg6WbZRm6KSAIPvY1W2ebZ4YwiHwAai7aGVsbG8gd29ybGSAKS0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8Wds88uCCMMj4QwHMfwHKAMntVCIhABoBkjB/4CDXSTHCHzBwATTtRNDUAfhj0gAwkW3g+CjXCwqDCbry4InbPCMAAm27Ihy6');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initSendMsgContract_init_args({ $$type: 'SendMsgContract_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const SendMsgContract_errors: { [key: number]: { message: string } } = {
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

const SendMsgContract_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"MyMsgBody","header":null,"fields":[{"name":"x","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"y","type":{"kind":"simple","type":"string","optional":false}}]},
]

const SendMsgContract_getters: ABIGetter[] = [
]

const SendMsgContract_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"text","text":"reply_text"}},
    {"receiver":"internal","message":{"kind":"text","text":"send_SendParameters_text"}},
    {"receiver":"internal","message":{"kind":"text","text":"send_SendParameters_binary"}},
    {"receiver":"internal","message":{"kind":"text","text":"send_SendParameters_with_Deploy"}},
]

export class SendMsgContract implements Contract {
    
    static async init() {
        return await SendMsgContract_init();
    }
    
    static async fromInit() {
        const init = await SendMsgContract_init();
        const address = contractAddress(0, init);
        return new SendMsgContract(address, init);
    }
    
    static fromAddress(address: Address) {
        return new SendMsgContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  SendMsgContract_types,
        getters: SendMsgContract_getters,
        receivers: SendMsgContract_receivers,
        errors: SendMsgContract_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: 'reply_text' | 'send_SendParameters_text' | 'send_SendParameters_binary' | 'send_SendParameters_with_Deploy') {
        
        let body: Cell | null = null;
        if (message === 'reply_text') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'send_SendParameters_text') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'send_SendParameters_binary') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'send_SendParameters_with_Deploy') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
}