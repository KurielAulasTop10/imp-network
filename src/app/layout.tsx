import 'katex/dist/katex.min.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'react-notion-x/src/styles.css';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

import Header from '@/components/header/header';
import Provider from '@/components/provider';
import ScrollUpButton from '@/components/scroll-up-button';
import '@/styles/globals.css';
import '@/styles/paginate.css';
import Footer from '@/components/footer';
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata = {
  title: {
    default: 'Império Network',
    template: '%s | Império Network',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
        <body className="bg-primary text-primary relative mx-auto flex w-full flex-col">
          <Provider>
            <Header />
            <main>{children}</main>
            <div className="fixed bottom-12 right-10">
              <ScrollUpButton />
            </div>
            <div className='mt-[4rem] md:mt[6rem]'>
              <Footer />
            </div>
          </Provider>
          <GoogleAnalytics gaId="G-J6SG0SJLHG" />
        </body>
      </html>
  );
}
