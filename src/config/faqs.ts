import { site } from "./site";

export type Faq = { q: string; a: string };

export const faqGroups: { title: string; items: Faq[] }[] = [
  {
    title: "Subsidy and loans",
    items: [
      {
        q: "How much subsidy can I get?",
        a: `Central subsidy of up to ${site.subsidyMax} is available for eligible residential rooftop systems under PM Surya Ghar. The exact amount depends on system size. Our team confirms it during your quote.`,
      },
      { q: "Do you help with the bank loan?", a: "Yes. We guide you through the loan process from documents to approval." },
      { q: "Who applies for the subsidy?", a: "We prepare and track the application with you. The subsidy is paid by the government after your system is installed and inspected, so plan your cash flow accordingly." },
      { q: "Can businesses get the subsidy?", a: "The central rooftop subsidy is for residential systems. Commercial systems are sized and priced separately. Request a site survey and we will explain the options." },
    ],
  },
  {
    title: "Installation and net metering",
    items: [
      { q: "How long does installation take?", a: "Most home systems are installed in a few days once approvals are in place. Net metering approval from the DISCOM runs separately." },
      { q: "How much roof space do I need?", a: "Plan on roughly 100 sq ft of shadow-free roof per kW. Our survey measures your roof and confirms what fits." },
      { q: "What is net metering?", a: "Extra power your system produces goes to the grid and is credited against what you draw later, which lowers your bill. We coordinate the application with your DISCOM." },
      { q: "Will it work on a cloudy day or at night?", a: "Output drops under clouds and stops at night. With net metering, daytime surplus offsets what you use after dark. A battery is not required for a grid-connected home system." },
    ],
  },
  {
    title: "Cost and upkeep",
    items: [
      { q: "How much does a system cost?", a: "It depends on system size, panel brand and your roof type. Use the savings estimator for a first figure, then we confirm after a site survey. Estimates are not a final quote." },
      { q: "Do panels need maintenance?", a: "Very little. Periodic cleaning and an annual check keep output steady." },
    ],
  },
];

/** Shorter list for the home page. */
export const homeFaqs: Faq[] = [
  faqGroups[0].items[0],
  faqGroups[0].items[1],
  faqGroups[1].items[0],
  faqGroups[2].items[1],
];
