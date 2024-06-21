'use client';

import VerifyProof from "../_components/VerifyProof";

export default function page() {
    const goToPreviousStep = () => {};
    const goToNextStep = () => {};
  
	return <VerifyProof goToPreviousStep={goToPreviousStep} goToNextStep={goToNextStep}  />;
}