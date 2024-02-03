import "./HelloContract";


struct MyMsgBody{
   x:Int;
   y:String;
}


message BinMsg {
   x:Int;
   y:String;
}


contract SendMsgContract{
    init(){}

    receive("reply_text"){
        let replyMsg:Cell = "got it. reply from [reply_text]".asComment();
        self.reply(replyMsg);
    }

    receive("send_SendParameters_text"){
       let to:Address = address("UQBv5hkZ6Ty5ipbydwY5gUw-Yq1eb_Cg89l6xIXsRFrNIAwR");
       let value:Int = ton("1");

       send(SendParameters{
          bounce:true,
          to:to,
          value:value,
          mode:SendIgnoreErrors,
          body:"build with SendParameters. Code&date is null.".asComment()
       });


       let replyMsg:Cell = "reply from [send_SendParameters_text]".asComment();
                          self.reply(replyMsg);
    }

    receive("send_SendParameters_binary"){
       let to:Address = address("UQBv5hkZ6Ty5ipbydwY5gUw-Yq1eb_Cg89l6xIXsRFrNIAwR");
       let value:Int = ton("1");

       send(SendParameters{
          bounce:true,
          to:to,
          value:value,
          mode:SendIgnoreErrors,
          body:MyMsgBody{x:1,y:"y"}.toCell()
       });

       let replyMsg:Cell = "reply from [send_SendParameters_binary]".asComment();
                          self.reply(replyMsg);
    }


     receive("send_SendParameters_to_deploy_other_contract"){
           let state:StateInit = initOf HelloWorld();
           let address:Address = contractAddress(state);
           let value:Int = ton("1");
           send(SendParameters{
              bounce:true,
              to:address,
              value:value,
              mode:SendIgnoreErrors,
              code: state.code,
              data: state.data,
              body:"Deploy".asComment()
           });

            let replyMsg:Cell = "reply from [send_SendParameters_to_deploy_other_contract]".asComment();
                   self.reply(replyMsg);
        }

          receive(msg:BinMsg){
                   let state:StateInit = initOf HelloWorld();
                   let address:Address = contractAddress(state);
                   let value:Int = ton("1");
                   send(SendParameters{
                      bounce:true,
                      to:address,
                      value:value,
                      mode:SendIgnoreErrors,
                      code: state.code,
                      data: state.data,
                      body:msg.y.asComment()
                   });

                    let replyMsg:Cell = "reply from [receive(msg:BinMsg)]".asComment();
                                      self.reply(replyMsg);
                }


        get fun counter():Int{
            dump("Hello Emulator!!!!!");
            dump(123 + 444);
            dump(123123123);
            return 1212;
        }
}
