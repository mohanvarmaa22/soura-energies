import { ArrowRight, Bank, ClipboardText, HouseLine, SolarPanel, Wrench, PhoneCall, WhatsappLogo, EnvelopeSimple, MapPin } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/config/site";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { ImageSlot } from "@/components/ImageSlot";

const process = [
  { icon: ClipboardText, title: "Site survey", body: "We visit, measure your roof and review your electricity bill." },
  { icon: SolarPanel, title: "Custom design", body: "A system sized to your usage, with a clear quote and payback estimate." },
  { icon: Bank, title: "Subsidy and loan", body: "We prepare the subsidy application and help you arrange financing." },
  { icon: Wrench, title: "Installation", body: "Certified installers fit the system and coordinate net metering." },
];

const faqs = [
  { q: "How much subsidy can I get?", a: `Central subsidy of up to ${site.subsidyMax} is available for eligible residential rooftop systems. The exact amount depends on system size. Our team confirms it during your quote.` },
  { q: "Do you help with the bank loan?", a: "Yes. We guide you through the loan process from documents to approval." },
  { q: "How long does installation take?", a: "Most home systems are installed in a few days once approvals are in place. Net metering approval from the DISCOM runs separately." },
  { q: "Do panels need maintenance?", a: "Very little. Periodic cleaning and an annual check keep output steady." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-12 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:pt-16 lg:gap-16">
        <Reveal>
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tighter md:text-5xl lg:text-6xl">
            Cut your power bill with rooftop solar.
          </h1>
          <p className="mt-5 max-w-[52ch] text-lg text-muted">
            We install the system and handle the subsidy and loan paperwork for homes across Telangana.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/quote">{site.cta}</Button>
            <Button href="/estimator" variant="secondary">Estimate savings</Button>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ImageSlot label="Residential rooftop installation" className="aspect-[4/5] rounded-3xl md:aspect-[4/5]" />
        </Reveal>
      </section>

      {/* Subsidy + estimator teaser */}
      <section id="estimator" className="bg-deep text-deep-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-[1fr_1fr] md:items-end md:py-24">
          <Reveal>
            <p className="text-7xl font-bold tracking-tighter text-accent md:text-8xl">{site.subsidyMax}</p>
            <p className="mt-2 text-lg text-deep-foreground/80">maximum government subsidy on residential rooftop solar.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">See what solar would save you.</h2>
            <p className="mt-4 max-w-[55ch] text-deep-foreground/75">
              Enter your monthly bill and get system size, cost after subsidy, yearly savings and payback time.
            </p>
            <div className="mt-6">
              <Button href="/estimator" variant="onDark">Start estimate <ArrowRight size={16} weight="bold" /></Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <h2 className="max-w-[20ch] text-3xl font-bold tracking-tight md:text-4xl">One team from survey to switch-on.</h2>
        </Reveal>
        <ol className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06} className="border-t border-line pt-5">
              <li>
                <p.icon size={28} weight="duotone" className="text-accent" />
                <h3 className="mt-4 font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">{p.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:pb-24">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Installed across Telangana.</h2>
          <p className="mt-3 max-w-[60ch] text-muted">Real homes and businesses, with capacity and location for each.</p>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3 md:grid-rows-2">
          <ImageSlot label="Featured project: home, Hyderabad" className="min-h-72 rounded-3xl md:col-span-2 md:row-span-2" />
          <ImageSlot label="Residential project" className="min-h-48 rounded-3xl" />
          <ImageSlot label="Commercial project" className="min-h-48 rounded-3xl" />
        </div>
        <div className="mt-6">
          <Button href="/projects" variant="secondary">See all projects</Button>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr] md:py-20">
          <Reveal>
            <HouseLine size={32} weight="duotone" className="text-accent" />
            <h2 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">Homes first.</h2>
            <p className="mt-3 max-w-[55ch] text-muted">
              Our residential packages are built around subsidy eligibility, net metering and a payback you can plan around.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-xl font-bold tracking-tight">Running a business?</h2>
            <p className="mt-3 text-muted">We also design commercial systems. Request a site survey and we will size one for your load.</p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Common questions</h2>
        </Reveal>
        <div className="mt-8 divide-y divide-line">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {f.q}
                <span className="text-accent transition-transform group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <p className="mt-3 max-w-[60ch] text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section id="quote" className="bg-deep text-deep-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <Reveal>
            <h2 className="max-w-[18ch] text-3xl font-bold tracking-tight md:text-5xl">Ready to see your numbers?</h2>
            <p className="mt-4 max-w-[50ch] text-deep-foreground/75">Request a callback or reach us directly.</p>
            <div className="mt-6"><Button href="/quote">{site.cta}</Button></div>
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <a href={site.phoneHref} className="flex items-center gap-3 rounded-2xl border border-white/15 p-4 hover:bg-white/5"><PhoneCall size={22} className="text-accent" /> {site.phone}</a>
            <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl border border-white/15 p-4 hover:bg-white/5"><WhatsappLogo size={22} className="text-accent" /> WhatsApp us</a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-3 rounded-2xl border border-white/15 p-4 hover:bg-white/5"><EnvelopeSimple size={22} className="text-accent" /> {site.email}</a>
            <p className="flex items-center gap-3 rounded-2xl border border-white/15 p-4"><MapPin size={22} className="text-accent" /> {site.address}</p>
          </div>
        </div>
      </section>
    </>
  );
}
