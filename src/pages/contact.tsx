import Head from 'next/head';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';
import Map from '../components/contact/Map';
import Hero from '../components/common/Hero';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Us - Hexasteel</title>
        <meta
          name="description"
          content="Get in touch with Hexasteel for all your steel construction needs. We're here to help bring your project to life."
        />
      </Head>

      <div>
        <Hero 
          title="Contact Us"
          subtitle="Get in touch with our team for inquiries, quotes, or support"
        />

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <ContactForm />
            <ContactInfo />
          </div>
          
          {/* Map Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Location</h2>
            <Map />
          </div>
        </div>
      </div>
    </>
  );
}
