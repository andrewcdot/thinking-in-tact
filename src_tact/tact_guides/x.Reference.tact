import "./HelloContract";

contract RefContract{

    init(){}

    receive("RefContract"){
        let sender:Address = sender();
        let myAddress:Address = myAddress(); // address of current contract
        let blackAddress:Address = newAddress(0, 0);
        let oneAddress:Address = newAddress(0, 0x4ea29e0017d44d8760c6d4dd7265fcc5336f2f64d52546302d8e984e11531dd2);

        let state:StateInit = initOf HelloWorld();
        //Computes smart contract's Address in a workchain #0
        let contractAddress:Address = contractAddress(state);
        //Computes smart contract's Address in a workchain #-1
        let contractAddressAtM:Address = contractAddressExt(-1, state.code, state.data);

        //require(condition: Bool, error: String);
        require(sender == address("UQBOop4AF9RNh2DG1N1yZfzFM28vZNUlRjAtjphOEVMd0j-8"),
                "Sender is not tonkeeper owner.");

        let currentTimeInSec:Int = now();

        // balance of the smart contract as Int value in NanoToncoins
        // NOTE: send method do not update this field
        let contractNano:Int = myBalance();


        //emit();

       let context:Context = context();
       //context.bounced  - Bounced(opens in a new tab) flag of incoming message
       //context.sender
       //context.value
       //context.raw:Slice  - Slice reminder of message
       // context.readForwardFee()

    }

    receive("string"){
        let sb:StringBuilder = beginString();
        let sbc:StringBuilder = beginComment();
        let sbt:StringBuilder = beginTailString();

        sb.append("fine.");
        sbc.append("fine.");
        sbt.append("fine.");
    }


    receive("cell"){
       let b:Builder = beginCell();
       b.storeUint(100,32);//0 ≤ len ≤ 256.
       b.storeInt(200,257);//0 ≤ len ≤ 257.
       b.storeBool(true);
       b.storeSlice(beginString().append("fine.").toCell());
       let c:Cell = b.endCell();
    }




    get fun echo(){
       //WARN: cannot get sender in getter fun
       //WARN: cannot get sender in getter fun
       //WARN: cannot get sender in getter fun
       let sender:Address = sender();

    }


}
