// this trait has to be imported
import "@stdlib/deploy";


// Deployable 的原理是：
// 1、新增两个消息类型 Deploy 和 DeployOK
// 2. 新增一个 receive 方法，接受 Deploy 消息 receive(msg:Deploy)
// 3. 如果部署消息执行成功，则返回 DeployOK 消息（queryId=0）

// the Deployable trait adds a default receiver for the "Deploy" message
contract DeployableTraitContract with Deployable {

    val: Int as uint32;

    init() {
        self.val = 0;
    }

    receive("increment") {
        self.val = self.val + 1;
    }

    get fun value(): Int {
        return self.val;
    }
}
