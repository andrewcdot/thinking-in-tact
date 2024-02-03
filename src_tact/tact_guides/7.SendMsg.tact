import "./HelloContract";


struct MyMsgBody{
   x:Int;
   y:String;
}

contract SendMsgContract{
    init(){}

    receive("reply_text"){
        let replyMsg:Cell = "got it.".asComment();
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
    }


     receive("send_SendParameters_with_Deploy"){
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
        }
}
