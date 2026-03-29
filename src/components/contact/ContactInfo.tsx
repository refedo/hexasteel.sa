import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';

const contactInfo = {
  address: 'Istanbul St, As Sulay, Riyadh 14322',
  poBox: 'P.O. Box 12345, Riyadh 11564',
  email: 'info@hexasteel.sa',
  phone: '+966 59 171 6020',
  workingHours: 'Saturday - Thursday: 8:00 AM - 5:00 PM',
  whatsapp: '+966 59 171 6020',
};

const contactCards = [
  {
    icon: MapPinIcon,
    title: 'Our Location',
    content: (
      <>
        {contactInfo.address}
        <br />
        {contactInfo.poBox}
      </>
    ),
    action: {
      text: 'Get Directions',
      href: 'https://www.google.com/maps/place/Hexa+Steel%C2%AE+%D9%87%D9%8A%D9%83%D8%B3%D8%A7+%D8%B3%D8%AA%D9%8A%D9%84%E2%80%AD/@24.6386259,46.840442,17z/data=!4m15!1m8!3m7!1s0x3e2f09febb5e6879:0xf40d2dd14748393e!2zSGV4YSBTdGVlbMKuINmH2YrZg9iz2Kcg2LPYqtmK2YQ!8m2!3d24.638621!4d46.8430169!10e1!16s%2Fg%2F11fpgfk0f_!3m5!1s0x3e2f09febb5e6879:0xf40d2dd14748393e!8m2!3d24.638621!4d46.8430169!16s%2Fg%2F11fpgfk0f_?entry=ttu&g_ep=EgoyMDI1MDIwNS4xIKXMDSoASAFQAw%3D%3D',
    },
  },
  {
    icon: PhoneIcon,
    title: 'Contact Numbers',
    content: (
      <>
        Phone: {contactInfo.phone}
        <br />
        WhatsApp: {contactInfo.whatsapp}
      </>
    ),
    action: {
      text: 'Call Now',
      href: `tel:${contactInfo.phone.replace(/\s/g, '')}`,
    },
  },
  {
    icon: EnvelopeIcon,
    title: 'Email Us',
    content: contactInfo.email,
    action: {
      text: 'Send Email',
      href: `mailto:${contactInfo.email}`,
    },
  },
  {
    icon: ClockIcon,
    title: 'Working Hours',
    content: contactInfo.workingHours,
    action: {
      text: 'WhatsApp Us',
      href: `https://wa.me/${contactInfo.whatsapp.replace(/\+|\s/g, '')}`,
    },
  },
];

export default function ContactInfo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {contactCards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow"
        >
          <div className="bg-primary-50 p-3 rounded-full mb-4">
            <card.icon className="w-6 h-6 text-primary-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
          <div className="text-gray-600 mb-4">{card.content}</div>
          {card.action && (
            <a
              href={card.action.href}
              target={card.action.href.startsWith('http') ? '_blank' : undefined}
              rel={card.action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              {card.action.text}
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
