import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";



const GenerateZkProofComponent = ({ goToPreviousStep, goToNextStep }) => {
    const [loading, setLoading] = useState<boolean>(false);
    
  return (
    <div>
      <h2>Verify ZK Proof OnChain</h2>
      {loading && <Loader2 className="animate-spin" size={20} />}
      <div className="grid grid-cols-2 gap-5 mt-5">
      <Button className="rounded-r-full rounded-bl-full text-white bg-blue-400" onClick={goToPreviousStep}>Back</Button>
      <Button className="rounded-r-full rounded-bl-full text-white bg-blue-400" onClick={goToNextStep}>Next</Button>

      </div>
    </div>
  );
}

export default GenerateZkProofComponent;