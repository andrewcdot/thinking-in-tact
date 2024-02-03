contract ExternalMsg {

   timeout: Int as uint32;

   init(){
    //10 days later
       self.timeout =now() + 10*24*60*60;
   }

    fun onTimeouted(){}

    external("Check Timeout") {
        // Check for contract timeout
        require(self.timeout  > now(), "Not time outed");
        // Accept message
        acceptMessage();

        // Timeout processing
        self.onTimeouted();
    }

}
