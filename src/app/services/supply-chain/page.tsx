import {permanentRedirect} from "next/navigation";

// Preserve external links; procurement now belongs to Project Delivery.
export default function SupplyChainLegacyRoute(){
 permanentRedirect("/project-delivery#procurement");
}
