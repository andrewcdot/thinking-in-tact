contract SendMsgContract{


    init(){}

    receive("reply_text"){
        let replyMsg:Cell = "got it.".asComment();
        self.reply(replyMsg);
    }





}
