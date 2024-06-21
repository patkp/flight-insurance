import { FormProvider, useForm } from "react-hook-form";
import { InferType, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppInput } from "@/components/app-forms";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { ethers } from "ethers";
import PurchaseInsuranceABI from "@/abi/PurchaseInsuranceABI.json";

interface FlightDetailsVerificationProps {
	goToPreviousStep: () => void;
	goToNextStep: () => void;
}

const formSchema = object({
	flightNumber: string().required("Flight Number is required"),
	departureAirport: string().required("Departure Airport is required"),
	destinationAirport: string().required("Destination Airport is required"),
	departureDate: string().required("Departure Date is required"),
	arrivalDate: string().required("Arrival Date is required")
});

const FlightDetailsVerification = ({ goToPreviousStep, goToNextStep }: FlightDetailsVerificationProps) => {
	const formMethods = useForm({ resolver: yupResolver(formSchema) });
	const [loading, setLoading] = useState<boolean>(false);
	const { accountPData } = useAccount();

	const { handleSubmit, control } = formMethods;

	const onSubmit = async (data: InferType<typeof formSchema>) => {
		const payload = {
			flightNumber: data.flightNumber,
			departureAirport: data.departureAirport,
			destinationAirport: data.destinationAirport,
			departureDate: Math.floor(new Date(data.departureDate).getTime() / 1000), 
			arrivalDate: Math.floor(new Date(data.arrivalDate).getTime() / 1000),
		};

		const id = toast.loading("Purchasing Insurance...");
		setLoading(true);

		try {
			const contractAddress = "0x481c33d172f87CBb318Ecf8eF786EA6d4F633A92";
			const provider = accountPData.provider;
			const signer = accountPData.signer;
			const contract = new ethers.Contract(contractAddress, PurchaseInsuranceABI, signer);

			// Calling purchasePolicy with the correct parameters
			const transaction = await contract.purchasePolicy(
				payload.flightNumber,
				payload.departureAirport,
				payload.destinationAirport,
				payload.departureDate,
				payload.arrivalDate,
				{ value: ethers.parseEther("0.001") }
			);

			await transaction.wait();

			toast.success("Insurance purchased successfully!", { id });
			goToNextStep();
		} catch (error) {
			console.error("Error:", error);
			toast.error("Failed to purchase insurance. Please try again.", { id });
		} finally {
			setLoading(false);
		}
	};

	return (
		<FormProvider {...formMethods}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="space-y-3">
					<AppInput label="Flight Number" name="flightNumber" placeholder="e.g. HA2307" control={control} />
					<AppInput label="Departure Airport" name="departureAirport" placeholder="e.g. JFK" control={control} />
					<AppInput label="Destination Airport" name="destinationAirport" placeholder="e.g. NBO" control={control} />
					<AppInput label="Departure Date" name="departureDate" placeholder="e.g. 2024-06-17T13:45:00.000" control={control} />
					<AppInput label="Arrival Date" name="arrivalDate" placeholder="e.g. 2024-06-18T10:45:00.000" control={control} />
				</div>
				<div className="flex items-center justify-between">
					<Button variant="outline" onClick={goToPreviousStep} type="button">
						Back
					</Button>
					<Button type="submit" disabled={loading}>
						{loading && <Loader2 className="animate-spin" size={20} />}
						{loading ? "Purchasing..." : "Submit"}
					</Button>
				</div>
			</form>
		</FormProvider>
	);
};

export default FlightDetailsVerification;
