export const site = {
  name: "Soura Energies",
  tagline: "Rooftop solar for homes and businesses in Telangana and Andhra Pradesh",
  serviceArea: "Telangana and Andhra Pradesh",
  phone: "+91 88864 01818",
  phoneHref: "tel:+918886401818",
  whatsappHref: "https://wa.me/918886401818?text=Hi%20Soura%20Energies%2C%20I%20want%20a%20solar%20quote",
  email: "souraenergies01@gmail.com",
  address: "Plot No. 487/B, Phase II, Vanasthalipuram Residential Complex, Vanasthalipuram, Hyderabad, Telangana 500070",
  addressShort: "Vanasthalipuram, Hyderabad",
  postal: {
    street: "Plot No. 487/B, Phase II, Vanasthalipuram Residential Complex, Vanasthalipuram",
    locality: "Hyderabad",
    district: "Rangareddy",
    region: "Telangana",
    postalCode: "500070",
  },
  mapsUrl: "https://share.google/rE6iLkr99RzUHsIJQ",
  hours: "Open every day, 10 am to 6:30 pm",
  social: {
    instagram: "https://www.instagram.com/soura_energies/",
    facebook: "https://www.facebook.com/share/1DDhdcV8so/",
  },
  subsidyMax: "₹78,000",
  cta: "Get a Free Quote",
} as const;

/** Track record shown under the hero. Real figures supplied by the business; update as they grow. */
export const stats = [
  { value: "250+", label: "homes running on solar" },
  { value: "50+", label: "commercial installations" },
] as const;

/** Registrations and certifications held by the business. */
export const credentials = [
  "MNRE and PM Surya Ghar empanelled vendor",
  "TGREDCO registered",
  "DISCOM registered",
  "ISO certified",
] as const;

export const nav = [
  { label: "Process", href: "/#process" },
  { label: "Projects", href: "/projects" },
  { label: "Estimator", href: "/estimator" },
  { label: "FAQ", href: "/faq" },
] as const;
