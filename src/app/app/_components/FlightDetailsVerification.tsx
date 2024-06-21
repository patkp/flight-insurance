import { FormProvider, useForm } from "react-hook-form";
import { InferType, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppInput } from "@/components/app-forms";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import TransgateConnect from "@zkpass/transgate-js-sdk"
import { useAccount } from "@/context/AccountContext";
import { ethers } from "ethers"
import AttestationABI from "@/abi/AttestationABI.json"


interface FlightDetailsVerificationProps {
	goToPreviousStep: () => void;
	goToNextStep: () => void;
}

interface ConnectorResponse {
	taskId: string;
	uHash: string;
	publicFieldsHash: string;
	validatorAddress: string;
	allocatorSignature: string;
	allocatorAddress: string;
	recipient: string;
	publicFields: any[];
	validatorSignature: string;
  }

const formSchema = object({
	flightNumber: string().required("Flight Number is required"),
	departureAirport: string(),
	destinationAirport: string(),
	departureDate: string().required("Departure Date is required"),
	arrivalDate: string().required("Arrival Date is required")
});

const FlightDetailsVerification = ({ goToPreviousStep, goToNextStep }: FlightDetailsVerificationProps) => {
	const formMethods = useForm({ resolver: yupResolver(formSchema) });
	const [loading, setLoading] = useState<boolean>(false);
	// const router = useRouter();
	// const { result, connectToMetaMask } = useWalletConnection();
	const { accountPData } = useAccount();

	const { handleSubmit, reset, control } = formMethods;

	console.log(accountPData.address);
	const [verifyResult, setVerifyResult] = useState<any>()



	const onSubmit = async (data: InferType<typeof formSchema>) => {
		const payload = {
			flightNumber: data.flightNumber,
			departureAirport: data.departureAirport,
			destinationAirport: data.destinationAirport,
			departureDate: data.departureDate,
			arrivalDate: data.arrivalDate
		};
		const id = toast.loading("Verifying if flight is valid...");
		setLoading(true);
		goToNextStep();
		try {
            const appid = "260c0eea-56ec-4851-95eb-64f17108c8a0"
			console.log("appid", appid)
    
            const connector = new TransgateConnect(appid)
    
    
            const isAvailable = await connector.isTransgateAvailable()
    
            if (isAvailable) {
                const schemaId = "c8f7816736ac44758c652197a10f1dde"
    
                const address = accountPData?.address
    
                const res = await connector.launch(schemaId, address)

				if(res) {
					goToNextStep()
				}
    
                const typedRes: ConnectorResponse = res as ConnectorResponse;
    
                console.log(typedRes.taskId)
    
                // verifiy the res onchain/offchain based on the requirement 
                setVerifyResult(res)
                const contractAddress = "0xeC1CF1a639CA4735712509477e936Fcc15ca9a17"
    
                const taskId = ethers.hexlify(ethers.toUtf8Bytes(typedRes.taskId)) 
                const hexifiedSchemaId = ethers.hexlify(ethers.toUtf8Bytes(schemaId)) 
    
                const chainParams = {
                    taskId: taskId,
                    schemaId: hexifiedSchemaId,
                    uHash: typedRes.uHash,
                    recipient: address,
                    publicFieldsHash: typedRes.publicFieldsHash,
                    validator: typedRes.validatorAddress,
                    allocatorSignature: typedRes.allocatorSignature,
                    validatorSignature: typedRes.validatorSignature,
                  };
            
                  const provider = accountPData.provider;
                  const contract = new ethers.Contract(contractAddress, AttestationABI, provider);
                  const data = contract.interface.encodeFunctionData("attest", [chainParams]);
            
                  let transaction = {
                    to: contractAddress,
                    from: address,
                    value: 0,
                    data,
                  };
            
                  const signer = accountPData.signer;
                  let tx = await signer.sendTransaction(transaction);
                  console.log(tx)
                  alert('Transaction sent successfully!');
				  goToNextStep();
    
            } else {
                window.location.href = "https://chromewebstore.google.com/detail/zkpass-transgate/afkoofjocpbclhnldmmaphappihehpma";
                console.log('Please install TransGate')
            }
        } catch (error) {
            console.log('transgate error', error)
        } finally {
            setLoading(false)
            toast.dismiss(id)
        }
		
	};
	return (
		<FormProvider {...formMethods}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="space-y-3">
					<AppInput label="FlightNumber" name="flightNumber" placeholder="e.g. HA2307" className="focus:border-none" control={control} />
					<AppInput label="Departure Airport" name="departureAirport" placeholder="e.g. JFK" control={control} />
					<AppInput label="Destination Airport" name="destinationAirport" placeholder="e.g. NBO" control={control} />
					<AppInput label="Departure Date" name="departureDate" placeholder="e.g. 2024-06-17T13:45:00.000" control={control} />
					<AppInput label="Arrival Date" name="arrivalDate" placeholder="e.g. 2024-06-18T10:45:00.000" control={control} />
				</div>
				<div className="flex items-center justify-between">
					<Button variant="outline" className="rounded-r-full rounded-bl-full" onClick={goToPreviousStep} type="button">
						Back
					</Button>
					<Button className="rounded-r-full rounded-bl-full" type="submit" disabled={loading}>
						{loading && <Loader2 className="animate-spin" size={20} />}
						{loading ? "Creating account..." : "Submit"}
					</Button>
				</div>
			</form>
		</FormProvider>
	);
};

export default FlightDetailsVerification;