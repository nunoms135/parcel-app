import ContactForm from "@/components/ContactForm";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="contact">
      <h1>Contact</h1>
      <p className="lead">
        Questions about an item or an order? Send a note and we’ll get back to
        you.
      </p>
      <ContactForm />
    </section>
  );
}
