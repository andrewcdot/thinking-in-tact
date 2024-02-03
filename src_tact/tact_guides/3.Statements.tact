
//table functions | 可变函数，将会把self参数的值改变
extends mutates fun int_pow_again(self: Int, c: Int) {
  let res: Int = 1;
  repeat(c) {
    res = res * self;
  }
  self = res;
}


fun test(){
  let a:Int =  100;
  a.int_pow_again(2);
}


contract Statements{

init(){}

receive("func_test"){
   test();
}
}


