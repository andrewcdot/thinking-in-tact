//1. Simple constant 简单常量
const MY_CONSTANT: Int = 42;


//2. Virtual and abstract constants
//虚拟常量是可以在 特征(trait) 中定义但在合约中更改的常量。
// 当您需要在编译时配置某些特征时，它非常有用。让我们定义一个虚拟常量和一个抽象常量：

// 虚拟有默认值， 抽象没

trait MyTrait {
    virtual const MY_FEE: Int = ton("1.0");
}

trait MyAbstractTrait {
    abstract const MY_DEVFEE: Int;
}


contract MyContract with MyTrait, MyAbstractTrait {
    override const MY_FEE: Int = ton("0.5");
    override const MY_DEVFEE: Int = ton("1000");

    init(){}

    receiver(s:String){
      let fee:Int = MY_FEE + MY_DEVFEE;
    }
}
