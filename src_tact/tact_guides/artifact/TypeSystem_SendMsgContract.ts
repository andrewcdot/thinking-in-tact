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

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
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

export type BinMsg = {
    $$type: 'BinMsg';
    x: bigint;
    y: string;
}

export function storeBinMsg(src: BinMsg) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(766381494, 32);
        b_0.storeInt(src.x, 257);
        b_0.storeStringRefTail(src.y);
    };
}

export function loadBinMsg(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 766381494) { throw Error('Invalid prefix'); }
    let _x = sc_0.loadIntBig(257);
    let _y = sc_0.loadStringRefTail();
    return { $$type: 'BinMsg' as const, x: _x, y: _y };
}

function loadTupleBinMsg(source: TupleReader) {
    let _x = source.readBigNumber();
    let _y = source.readString();
    return { $$type: 'BinMsg' as const, x: _x, y: _y };
}

function storeTupleBinMsg(source: BinMsg) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.x);
    builder.writeString(source.y);
    return builder.build();
}

function dictValueParserBinMsg(): DictionaryValue<BinMsg> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeBinMsg(src)).endCell());
        },
        parse: (src) => {
            return loadBinMsg(src.loadRef().beginParse());
        }
    }
}

 type SendMsgContract_init_args = {
    $$type: 'SendMsgContract_init_args';
    owner: Address;
}

function initSendMsgContract_init_args(src: SendMsgContract_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
    };
}

async function SendMsgContract_init(owner: Address) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initSendMsgContract_init_args({ $$type: 'SendMsgContract_init_args', owner })(builder);
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
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"MyMsgBody","header":null,"fields":[{"name":"x","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"y","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"BinMsg","header":766381494,"fields":[{"name":"x","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"y","type":{"kind":"simple","type":"string","optional":false}}]},
]

const SendMsgContract_getters: ABIGetter[] = [
    {"name":"counter","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const SendMsgContract_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"text","text":"reply_text"}},
    {"receiver":"internal","message":{"kind":"text","text":"send_SendParameters_text"}},
    {"receiver":"internal","message":{"kind":"text","text":"send_SendParameters_binary"}},
    {"receiver":"internal","message":{"kind":"text","text":"send_SendParameters_to_deploy_other_contract"}},
    {"receiver":"internal","message":{"kind":"typed","type":"BinMsg"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class SendMsgContract implements Contract {
    
    static async init(owner: Address) {
        return await SendMsgContract_init(owner);
    }
    
    static async fromInit(owner: Address) {
        const init = await SendMsgContract_init(owner);
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: 'reply_text' | 'send_SendParameters_text' | 'send_SendParameters_binary' | 'send_SendParameters_to_deploy_other_contract' | BinMsg | Deploy) {
        
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
        if (message === 'send_SendParameters_to_deploy_other_contract') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'BinMsg') {
            body = beginCell().store(storeBinMsg(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getCounter(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('counter', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}