import {getPublicContact} from "@/lib/publicContact";
export async function ContactShortcuts(){
 const contact=await getPublicContact();
 return <aside className="contact-shortcuts" aria-label="Quick contact with Hexa Steel">
  {contact.whatsappEnabled&&<a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={"Chat with Hexa Steel on WhatsApp at "+contact.formatted} className="contact-shortcut chat">
    <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.2 11.5a8.3 8.3 0 0 1-8.3 8.3 9 9 0 0 1-4.1-1l-4.4 1.3 1.4-4.2a8.4 8.4 0 1 1 15.4-4.4Z"/><path d="m9 9 1 1.9c.2.3.2.6-.1.8l-.5.5a6 6 0 0 0 2.5 2.3l.5-.5c.2-.2.5-.3.8-.1l1.8.9c.3.1.3.5.2.8-.4.7-1 1-1.9.9-2.5-.5-5-3-5.5-5.5-.1-.9.3-1.5 1.2-2Z"/></svg>
    <span>Chat with us</span>
  </a>}
  <a className="contact-shortcut phone" href={contact.tel} aria-label={"Call Hexa Steel at "+contact.formatted}>
   <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3H4c-.7 0-1.2.5-1.2 1.2 0 9.4 7.6 17 17 17 .7 0 1.2-.5 1.2-1.2v-3c0-.5-.3-.9-.8-1.1l-3.4-1.1a1.2 1.2 0 0 0-1.2.3l-1.5 1.5a15 15 0 0 1-6.7-6.7l1.5-1.5a1.2 1.2 0 0 0 .3-1.2L8.1 3.8A1.2 1.2 0 0 0 7 3Z"/></svg>
   <span>Call</span>
  </a>
 </aside>;
}
