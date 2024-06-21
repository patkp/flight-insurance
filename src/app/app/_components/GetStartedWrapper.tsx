import { FC, ReactNode } from "react";

interface IProps {
	children: ReactNode;
}

const GetStartedWrapper: FC<IProps> = ({ children }) => {
	return (
		<div className="w-full flex">
			<Illustration />
			<div className="flex-1  h-screen  overflow-y-auto">
				<div className="h-[80% w-full flex items-center justify-center overflow-y-auto">
					<div className="w-full max-w-lg bg-white text-gray-600 rounded-lg px-6 py-6 mt-16">
						<div className="">
							{/* <img src="https://floatui.com/logo.svg" width={150} className="lg:hidden" /> */}
							<div className="mt-5 space-y-2">
								<h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Setup Account</h3>
								{/* <ConnectBtn /> */}
								<p className="">
									<a href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
										Back to HomePage
									</a>
								</p>
							</div>
						</div>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};

export default GetStartedWrapper;

const Illustration = () => {
    return (
        <div className="relative flex-1 hidden items-center justify-center h-screen bg-gray-900 lg:flex">
            <div className="relative z-10 w-full max-w-md">
                <div className="mt-6 space-y-3">
                    <h3 className="text-white text-3xl font-bold">SkySecure Insurance</h3>
                    <p className="text-white text-xl font-bold">Get insured for your flight in a few easy steps.</p>
                    <p className="text-gray-300">Set up your account to start exploring Decentralized Flight Delay Insurance.</p>
                </div>
            </div>
            <footer className="absolute bottom-0 left-0 right-0 p-4 text-center text-white">
                <p>© 2023 SkySecure Insurance. Powered by <span className="font-semibold">zkpass</span>.</p>
            </footer>

            <div
                className="absolute inset-0 my-auto h-[500px]"
                style={{
                    background: "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
                    filter: "blur(118px)",
                }}
            ></div>
        </div>
    );
};