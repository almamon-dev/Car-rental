import Header from "../Components/Navigation/Guest/Header"; // Adjust paths as necessary
import Footer from "../Components/Navigation/Guest/Footer";

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pt-[52px] sm:pt-[62px]">{children}</main>
            <Footer />
        </div>
    );
}
