import './globals.css';

export const metadata = {
    title: 'Rohit Patil',
    description: 'Full Stack Developer Portfolio - Rohit Patil',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
