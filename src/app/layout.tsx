import 'katex/dist/katex.min.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'react-notion-x/src/styles.css';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

import Header from '@/components/Header';
import Provider from '../components/Provider';
import ScrollUpButton from '@/components/ScrollUpButton';
import '@/styles/globals.css';
import '@/styles/paginate.css';
import Footer from '@/components/Footer';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Rubik } from 'next/font/google';

export const metadata = {
	title: {
		default: 'Império Network',
		template: '%s | Império Network',
	},
};

const rubik = Rubik({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-BR" suppressHydrationWarning>
			<body className="bg-primary text-primary relative mx-auto flex w-full flex-col">
				<Provider>
					<main className={rubik.className}>
						<Header />
						{children}
						<div className="fixed bottom-12 right-10">
							<ScrollUpButton />
						</div>
						<div className="mt-[4rem] md:mt[6rem]">
							<Footer />
						</div>
					</main>
				</Provider>
				<GoogleAnalytics gaId="G-FWY182VERW" />
			</body>
		</html>
	);
}
