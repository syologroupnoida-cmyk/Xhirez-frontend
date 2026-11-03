import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

// Set NEXT_PUBLIC_WHATSAPP_NUMBER in .env.local (country code + number, no "+")
const NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917488323874";

export default function WhatsAppButton() {
  return (
    <a
      className="xh-wa-fab"
      href={`https://wa.me/${NUMBER}?text=${encodeURIComponent("Hi Xhirez, I need help.")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <FontAwesomeIcon icon={faWhatsapp} />
    </a>
  );
}