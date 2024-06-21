import type { Metadata } from 'next';
import './globals.css';
import AppProviders from '@/providers/AppProviders';
import { FC, ReactNode } from 'react';


interface AppLayoutProps {
	children: ReactNode | ReactNode[];
}

export const metadata: Metadata = {
  title: {
    default: 'Flight Delay Insurance',
    template: '%s -  Flight Delay Insurance',
  },
  description: 'Flight Delay Insurance',
  keywords: [],
  authors: [
    {
      name: 'Kotani Labs',
    },
  ],
  creator: 'Kotani Labs',
  icons: {
    icon: './favicon.ico',
  },
};

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body>
				<AppProviders>{children}</AppProviders>
			</body>
		</html>
	);
};

export default AppLayout;