import "@stdlib/ownable";
import "./i.common.messages";
import "./i.contract.JettonWallet";
@interface("org.ton.jetton.master")
trait JettonMaster with Ownable {
    total_supply: Int;
    mintable: Bool;
    owner: Address;
    content: Cell;

    receive(msg: TokenUpdateContent){
        self.requireOwner();
        self.content = msg.content;
    }

    receive(msg: TokenBurnNotification){
        self.requireSenderAsWalletOwner(msg.response_destination);
        self.total_supply = (self.total_supply - msg.amount);
        if (msg.response_destination != null) {
            send(SendParameters{
                    to: msg.response_destination,
                    value: 0,
                    bounce: false,
                    mode: SendRemainingValue,
                    body: TokenExcesses{query_id: msg.query_id}.toCell()
                }
            );
        }
    }

    // https://github.com/ton-blockchain/TEPs/blob/master/text/0089-jetton-wallet-discovery.md
    receive(msg: ProvideWalletAddress){
        // 0x2c76b973
        require(context().value >= ton("0.0061"), "Insufficient gas");
        let masterAdd: Address = myAddress();
        let init: StateInit = initOf JettonWallet(msg.owner_address, masterAdd);
        if (msg.include_address) {
            send(SendParameters{
                    to: sender(),
                    value: 0,
                    mode: SendRemainingValue,
                    body: TakeWalletAddress{
                        query_id: msg.query_id,
                        wallet_address: contractAddress(init),
                        owner_address: beginCell().storeBool(true).storeAddress(msg.owner_address).endCell().asSlice()
                    }.toCell()
                }
            );
        } else {
            send(SendParameters{
                    to: sender(),
                    value: 0,
                    mode: SendRemainingValue,
                    body: TakeWalletAddress{ // 0xd1735400
                        query_id: msg.query_id,
                        wallet_address: contractAddress(init),
                        owner_address: beginCell().storeBool(false).endCell().asSlice()
                    }.toCell()
                }
            );
        }
    }

    // Private Methods
    // @to The Address receive the Jetton token after minting
    // @amount The amount of Jetton token being minted
    // @response_destination The previous owner address

     fun mint(to: Address, amount: Int, response_destination: Address) {
        require(self.mintable, "Can't Mint Anymore");
        self.total_supply = (self.total_supply + amount); // Update total supply

        let winit: StateInit = self.getJettonWalletInit(to);
        send(SendParameters{
                to: contractAddress(winit),
                value: 0, // 本消息携带的 TON 金额
                bounce: true,
                mode: SendRemainingValue, // 携带入站消息的余额
                body: TokenTransferInternal{
                    query_id: 0,
                    amount: amount,
                    from: myAddress(),
                    response_destination: response_destination,
                    forward_ton_amount: 0,
                    forward_payload: emptySlice()
                }.toCell(),
                code: winit.code,
                data: winit.data
            }
        );
    }

     fun requireSenderAsWalletOwner(owner: Address) {
        let ctx: Context = context();
        let winit: StateInit = self.getJettonWalletInit(owner);
        require(contractAddress(winit) == ctx.sender, "Invalid sender");
    }

    virtual fun getJettonWalletInit(address: Address): StateInit {
        return initOf JettonWallet(address, myAddress());
    }

    // ====== Get Methods ====== //

    get fun get_jetton_data(): JettonData {
        return
            JettonData{
                total_supply: self.total_supply,
                mintable: self.mintable,
                owner: self.owner,
                content: self.content,
                wallet_code: initOf JettonWallet(self.owner, myAddress()).code
            };
    }

    get fun get_wallet_address(owner: Address): Address {
        return contractAddress(initOf JettonWallet(owner, myAddress()));
    }
}