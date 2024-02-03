
//Global static function

//global keywords omitted
fun pow(a: Int, c: Int): Int {
  let res: Int = 1;
  repeat(c) {
    res = res * a;
  }
  return res;
}


//Extension functions
extends fun pow(self: Int, c: Int):Int {
  let res: Int = 1;
  repeat(c) {
    res = res * self;
  }
  return res;
}


// Mutable functions | 可变函数，将会把self参数的值改变
extends mutates fun pow_again(self: Int, c: Int) {
  let res: Int = 1;
  repeat(c) {
    res = res * self;
  }
  self = res;
}


//Native functions
//原生函数是 func 函数的直接绑定：
@name(store_uint)
native storeUint_Again(s: Builder, value: Int, bits: Int): Builder;

@name(load_int)
extends mutates native loadInt_Again(self: Slice, l: Int): Int;

contract Container{
init(){}

 counter:Int=1;

// Receiver functions
  receive ("Increment") {
    self.counter = self.counter + 1;
  }


// Getter functions
  get fun counter(): Int {
    return self.counter;
  }
}
