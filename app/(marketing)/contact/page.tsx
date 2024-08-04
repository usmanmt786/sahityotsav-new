import GuestLayout from "@/components/layout/GuestLayout";
import ContactSection from "./ContactSection";

const Contact = () => {
    return (
        <GuestLayout>
            <main className="commonwidth py-10 min-h-[80vh]">
                <ContactSection />
            </main>
        </GuestLayout>
    );
}

export default Contact;