import UserNavbar from "@/Components/Navigation/Guest/Header";
import UserFooter from "@/Components/Navigation/Guest/Footer";

export default function UserLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <UserNavbar />
            <main className="flex-1 bg-white">{children}</main>
            <UserFooter />
        </div>
    );
}
