"use client";

import GetStartedWrapper from "@/app/app/_components/GetStartedWrapper";
import Stepper, { StepItem } from "@/components/stepper";
import useSteps from "@/hooks/useSteps";
import { Button } from "@/components/ui/button";
import { useState, useCallback, useEffect } from "react";
import { ethers } from 'ethers';
import { useRouter } from "next/navigation"
import { useAccount } from '@/context/AccountContext';
import useWalletConnection from "@/hooks/useWalletConnection";
import FlightDetailsVerification from "./app/_components/FlightDetailsVerification";
import GenerateZkProofComponent from "./app/_components/GenerateZkProof";
import VerifyProof from "./app/_components/VerifyProof";
import PurchaseInsurance from "./app/_components/PurchaseInsurance"


export interface AccountType {
  address?: string;
  balance?: string;
  chainId?: string;
  network?: string;
}


const steps: StepItem[] = [
  {
    title: "Connect Wallet",
  },
  {
    title: "Enter Flight Information",
  },
  {
    title: "Generate zk Proof",
  },
  {
    title: "Submit Proof for Verification",
  },
  {
    title: "Purchase Insurance",
  }
  
];

const GetStarted = () => {

  const { activeStep, goToNextStep, goToPreviousStep } = useSteps({
    initialStep: 0,
    count: steps.length,
  });
  const router = useRouter();
  const { result, connectToMetaMask } = useWalletConnection();
  const { setAccountPData } = useAccount();
  const [accountData, setAccountData] = useState<AccountType>({});


  useEffect(() => {
    console.log("Dependencies changed:", result.isConnected, activeStep);
    console.log('Current connection status:', result.isConnected);
    if (result.isConnected) {
      console.log('Current connection status:', result.isConnected);
      goToNextStep();
    }
  }, [result.isConnected]);

  return (
    <GetStartedWrapper>
      <Stepper steps={steps} index={activeStep} />
      <div className="px-1 pt-8">
        {activeStep === 0 && (
          <div className="flex flex-col space-y-10">
            <h3 className="text-3xl font-medium">Connect Wallet to Get Started</h3>
            <div className="flex items-center justify-between ml-20">
              <Button
                className={`rounded-r-full rounded-bl-full text-white ${result.isConnected ? "bg-green-500" : "bg-blue-400"}`}
                onClick={() => { connectToMetaMask() }}
              >
                {result.isConnected ? "Connected" : "Connect Wallet"}
              </Button>
            </div>
          </div>
        )}
        {activeStep === 1 && result.isConnected && (
          <FlightDetailsVerification goToPreviousStep={goToPreviousStep} goToNextStep={goToNextStep}  />
        )}
         {activeStep === 2 && (
          <GenerateZkProofComponent goToPreviousStep={goToPreviousStep} goToNextStep={goToNextStep} />
        )}
         {activeStep === 3 && (
          <VerifyProof goToPreviousStep={goToPreviousStep} goToNextStep={goToNextStep} />
        )}
         {activeStep === 4 && (
          <PurchaseInsurance goToPreviousStep={goToPreviousStep} goToNextStep={goToNextStep} />
        )}

      </div>
    </GetStartedWrapper>
  )
};

export default GetStarted;