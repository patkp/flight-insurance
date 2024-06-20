import TransgateConnect from "@zkpass/transgate-js-sdk"

const verify = async () => {
    try {
      // The appid of the project created in dev center
      const appid = "e98e4c58-e86a-47a5-b4c5-4cbb7f7f0bcd"
  
      // Create the connector instance
      const connector = new TransgateConnect(appid)
  
      // Check if the TransGate extension is installed
      // If it returns false, please prompt to install it from chrome web store
      const isAvailable = await connector.isTransgateAvailable()
  
      if (isAvailable) {
        // The schema id of the project
        const schemaId = "c20d41ec24584336a28eecd7e5458f48"
  
        // Launch the process of verification
        // This method can be invoked in a loop when dealing with multiple schemas
        const res = await connector.launch(schemaId)
  
        // verifiy the res onchain/offchain based on the requirement     
        
      } else {
        console.log('Please install TransGate')
        window.location.href = "https://chromewebstore.google.com/detail/zkpass-transgate/afkoofjocpbclhnldmmaphappihehpma";
      }
    } catch (error) {
      console.log('transgate error', error)
    }
  }

  export default verify