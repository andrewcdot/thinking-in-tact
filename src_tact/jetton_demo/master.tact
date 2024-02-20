import "./i.trait.JettonMaster";
import "./i.contract.JettonWallet";
message Mint {
    amount: Int;
    receiver: Address;
}

contract JettonMasterContract with JettonMaster {

    total_supply: Int as coins;
    owner: Address;
    content: Cell;
    mintable: Bool;
    max_supply: Int as coins;

    init(owner: Address, content: Cell, max_supply: Int){
        self.total_supply = 0;
        self.owner = owner;
        self.mintable = true;
        self.content = content;
        self.max_supply = max_supply;
    }

    receive(msg: Mint){
        // 0xfc708bd2
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Not owner");
        require(self.mintable, "Not mintable");
        require((self.total_supply + msg.amount) <= self.max_supply, "Max supply exceeded");
        // (to, amount, response_destination)
        self.mint(msg.receiver, msg.amount, self.owner);
    }

    receive("Mint: 100"){
        // Public Minting
        let ctx: Context = context();
        require(self.mintable, "Not mintable");
        require((self.total_supply + 100) <= self.max_supply, "Max supply exceeded");
        self.mint(ctx.sender, 100, self.owner); // 🔴
    }

    receive("Owner: MintClose"){
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Not owner");
        self.mintable = false;
    }
}
