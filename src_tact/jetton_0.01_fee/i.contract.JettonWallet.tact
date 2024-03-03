import "@stdlib/ownable";
import "./i.common.messages";

// ============================================================ //
@interface("org.ton.jetton.wallet")
contract JettonWallet
{
    const minTonsForStorage: Int = ton("0.03");
    const gasConsumption: Int = ton("0.03");
    balance: Int as coins = 0;
    owner: Address;
    master: Address;
    init(owner: Address, master: Address){
        self.balance = 0;
        self.owner = owner;
        self.master = master;
    }

    // 修改Jetton合约，每次转账时，都收取1%的手续费，将手续费打到固定地址。如 转账 100，则实际到账99，手续费收1。
    receive(msg: TokenTransfer){
        // 0xf8a7ea5
        let ctx: Context = context(); // Check sender
        require(ctx.sender == self.owner, "Invalid sender");
        // Gas checks
        let fwd_fee: Int = (ctx.readForwardFee() + ctx.readForwardFee());
        let finalFee: Int = 2 * ((fwd_fee + 2 * self.gasConsumption) + self.minTonsForStorage);

        let v1_half : Int = finalFee/2;
        let v2:Int = ctx.value - v1_half;
        require(ctx.value > finalFee, "Invalid value!!");
        // Update balance
        self.balance = (self.balance - msg.amount);
        require(self.balance >= 0, "Invalid balance");

        let vampireAmt:Int = msg.amount/100;
        let receiveAmt:Int = msg.amount- vampireAmt;

       let vampireInit: StateInit = initOf JettonWallet(address("UQBOop4AF9RNh2DG1N1yZfzFM28vZNUlRjAtjphOEVMd0j-8") ,self.master);
       let vampire_wallet_address: Address = contractAddress(vampireInit);

       send(SendParameters{
                       to: vampire_wallet_address,
                       value: v1_half,
                       bounce: false,
                       body: TokenTransferInternal{
                           query_id: msg.query_id,
                           amount: vampireAmt,
                           from: self.owner,
                           response_destination: msg.response_destination,
                           forward_ton_amount: msg.forward_ton_amount,
                           forward_payload: msg.forward_payload
                       }.toCell(),
                       code: vampireInit.code,
                       data: vampireInit.data
                   }
               );

        let receiverInit: StateInit = initOf JettonWallet(msg.destination, self.master);
        let jetton_receiver_wallet_address: Address = contractAddress(receiverInit);
        send(SendParameters{
                to: jetton_receiver_wallet_address,
                value: v2,
                bounce: false,
                body: TokenTransferInternal{
                    query_id: msg.query_id,
                    amount: receiveAmt,
                    from: self.owner,
                    response_destination: msg.response_destination,
                    forward_ton_amount: msg.forward_ton_amount,
                    forward_payload: msg.forward_payload
                }.toCell(),
                code: receiverInit.code,
                data: receiverInit.data
            }
        );
    }

    receive(msg: TokenTransferInternal){
        // 0x178d4519
        let ctx: Context = context();
        if (ctx.sender != self.master) {
            let jettonSenderInit: StateInit = initOf JettonWallet(msg.from, self.master);
            require(contractAddress(jettonSenderInit) == ctx.sender, "Invalid sender!");
        }
        // Update balance
        self.balance = (self.balance + msg.amount);
        require(self.balance >= 0, "Invalid balance");
        // Get value for gas
        let msg_value: Int = self.msg_value(ctx.value);
        let fwd_fee: Int = ctx.readForwardFee();
        // 0x7362d09c - notify the new owner of JettonToken that the transfer is complete
        if (msg.forward_ton_amount > 0) {
            msg_value = ((msg_value - msg.forward_ton_amount) - fwd_fee);
            send(SendParameters{
                    to: self.owner,
                    value: msg.forward_ton_amount,
                    mode: SendPayGasSeparately,
                    bounce: false,
                    body: TokenNotification{
                        query_id: msg.query_id,
                        amount: msg.amount,
                        from: msg.from,
                        forward_payload: msg.forward_payload
                    }.toCell()
                }
            );
        }
        // 0xd53276db -- Cashback to the original Sender
        if (msg.response_destination != null && msg_value > 0) {
            send(SendParameters{
                    to: msg.response_destination,
                    value: msg_value,
                    bounce: false,
                    body: TokenExcesses{query_id: msg.query_id}.toCell()
                }
            );
        }
    }

    receive(msg: TokenBurn){
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Invalid sender"); // Check sender

        self.balance = (self.balance - msg.amount); // Update balance
        require(self.balance >= 0, "Invalid balance");
        let fwd_fee: Int = ctx.readForwardFee(); // Gas checks
        require(ctx.value > ((fwd_fee + 2 * self.gasConsumption) + self.minTonsForStorage), "Invalid value - Burn");
        // Burn tokens
        send(SendParameters{
                to: self.master,
                value: 0,
                mode: SendRemainingValue,
                bounce: true,
                body: TokenBurnNotification{
                    query_id: msg.query_id,
                    amount: msg.amount,
                    sender: self.owner,
                    response_destination: msg.response_destination
                }.toCell()
            }
        );
    }

     fun msg_value(value: Int): Int {
        let msg_value: Int = value;
        let ton_balance_before_msg: Int = (myBalance() - msg_value);
        let storage_fee: Int = (self.minTonsForStorage - min(ton_balance_before_msg, self.minTonsForStorage));
        msg_value = (msg_value - (storage_fee + self.gasConsumption));
        return msg_value;
    }

    bounced(msg: bounced<TokenTransferInternal>){
        self.balance = (self.balance + msg.amount);
    }

    bounced(msg: bounced<TokenBurnNotification>){
        self.balance = (self.balance + msg.amount);
    }

    get fun get_wallet_data(): JettonWalletData {
        return
            JettonWalletData{
                balance: self.balance,
                owner: self.owner,
                master: self.master,
                code: initOf JettonWallet(self.owner, self.master).code
            };
    }
}
