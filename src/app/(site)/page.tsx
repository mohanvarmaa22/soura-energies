import { ArrowUpRight, Bank, ClipboardText, HouseLine, SolarPanel, Wrench, PhoneCall, WhatsappLogo, EnvelopeSimple, MapPin, Lightning, Buildings } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/config/site";
import { homeFaqs } from "@/config/faqs";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { ImageSlot } from "@/components/ImageSlot";
import { ProcessLine } from "@/components/ProcessLine";
import { FaqList } from "@/components/FaqList";
import { getTestimonials } from "@/sanity/client";

const process = [
  { icon: ClipboardText, title: "Site survey", body: "We visit, measure your roof and review your electricity bill." },
  { icon: SolarPanel, title: "Custom design", body: "A system sized to your usage, with a clear quote and payback estimate." },
  { icon: Bank, title: "Subsidy and loan", body: "We prepare the subsidy application and help you arrange financing." },
  { icon: Wrench, title: "Installation", body: "Certified installers fit the system and coordinate net metering." },
];

const contactTile =
  "group flex items-center justify-between gap-3 rounded-2xl border border-white/15 p-4 transition-[background-color,border-color,transform] duration-200 ease-out-strong hover:border-white/30 hover:bg-white/5 active:scale-[0.99]";

const rise = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default async function Home() {
  const testimonials = await getTestimonials();
  const [lead, ...rest] = testimonials;
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(ellipse_60%_70%_at_85%_0%,rgb(248_126_19/0.12),transparent_70%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:pt-14 lg:gap-16">
          <div>
            <h1 className="rise text-4xl font-bold leading-[1.05] tracking-tighter md:text-5xl lg:text-6xl">
              Cut your power bill with <span className="text-brand">rooftop solar.</span>
            </h1>
            <p style={rise(1)} className="rise mt-5 max-w-[48ch] text-lg text-muted">
              We install the system and handle the subsidy and loan paperwork for homes across Telangana.
            </p>
            <div style={rise(2)} className="rise mt-8 flex flex-wrap gap-3">
              <Button href="/quote" arrow>{site.cta}</Button>
              <Button href="/estimator" variant="secondary">Estimate savings</Button>
            </div>
          </div>
          <div style={rise(3)} className="rise">
            <ImageSlot label="Residential rooftop installation" className="h-[min(32rem,70dvh)] rounded-3xl shadow-lift" />
          </div>
        </div>
      </section>

      {/* Subsidy, loan and net metering */}
      <section id="estimator" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:pb-24">
        <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
          <Reveal className="relative isolate overflow-hidden rounded-3xl bg-deep p-8 text-deep-foreground md:col-span-2 md:row-span-2 md:p-12">
            <div aria-hidden className="solar-cells absolute inset-0 -z-10 opacity-60" />
            <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_90%_0%,rgb(248_173_38/0.25),transparent_50%)]" />
            <p className="text-6xl font-bold tracking-tighter text-sun md:text-8xl">{site.subsidyMax}</p>
            <p className="mt-2 text-lg text-deep-foreground/80">maximum government subsidy on residential rooftop solar.</p>
            <h2 className="mt-12 max-w-[18ch] text-3xl font-bold tracking-tight md:text-4xl">See what solar would save you.</h2>
            <p className="mt-4 max-w-[48ch] text-deep-foreground/75">
              Enter your monthly bill and get system size, cost after subsidy, yearly savings and payback time.
            </p>
            <div className="mt-6">
              <Button href="/estimator" variant="onDark" arrow>Estimate savings</Button>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="rounded-3xl bg-brand p-8 text-white">
            <Bank size={32} weight="duotone" aria-hidden />
            <h3 className="mt-6 text-xl font-bold tracking-tight">Loan paperwork handled</h3>
            <p className="mt-2 text-white/90">We guide you from documents to approval, so financing does not slow your install.</p>
          </Reveal>
          <Reveal delay={0.16} className="rounded-3xl border border-line bg-surface p-8 shadow-card">
            <Lightning size={32} weight="duotone" aria-hidden className="text-brand" />
            <h3 className="mt-6 text-xl font-bold tracking-tight">Net metering coordinated</h3>
            <p className="mt-2 text-muted">We file with your DISCOM so the power you export is credited against your bill.</p>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:pb-24">
        <Reveal>
          <h2 className="max-w-[20ch] text-3xl font-bold tracking-tight md:text-4xl">One team from survey to switch-on.</h2>
        </Reveal>
        <div className="relative mt-12">
          <ProcessLine />
          <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.08} className="relative">
                <span className="grid size-14 place-items-center rounded-2xl border border-line bg-surface shadow-card">
                  <p.icon size={26} weight="duotone" className="text-brand" aria-hidden />
                </span>
                <h3 className="mt-5 font-semibold">{p.title}</h3>
                <p className="mt-2 max-w-[32ch] text-sm text-muted">{p.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:pb-24">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Installed across Telangana.</h2>
          <p className="mt-3 max-w-[60ch] text-muted">Real homes and businesses, with capacity and location for each.</p>
        </Reveal>
        {/* Offset strip: a different shape from the subsidy grid above. Stacks to one column on mobile. */}
        <div className="mt-8 grid gap-4 md:grid-cols-[1.5fr_1fr_1fr] md:items-start">
          {[
            { label: "Featured project: home, Hyderabad", cls: "h-72 md:h-[26rem]" },
            { label: "Residential project", cls: "h-56 md:mt-16 md:h-80" },
            { label: "Commercial project", cls: "h-56 md:h-72" },
          ].map((p, i) => (
            <Reveal key={p.label} delay={i * 0.08} className={`group overflow-hidden rounded-3xl ${p.cls}`}>
              <ImageSlot
                label={p.label}
                className="h-full transition-transform duration-700 ease-out-strong group-hover:scale-[1.04]"
              />
            </Reveal>
          ))}
        </div>
        <div className="mt-6">
          <Button href="/projects" variant="secondary" arrow>See all projects</Button>
        </div>
      </section>

      {/* Testimonials: shown only when the CMS has some */}
      {lead && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:pb-24">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">What customers say.</h2>
          </Reveal>
          <div className={`mt-8 grid gap-4 ${rest.length > 0 ? "lg:grid-cols-[1.3fr_1fr]" : ""}`}>
            <Reveal>
              <figure className="flex h-full flex-col justify-between rounded-3xl border border-line bg-surface p-8 shadow-card md:p-10">
                <blockquote className="text-xl font-medium leading-snug tracking-tight text-pretty md:text-2xl">&ldquo;{lead.quote}&rdquo;</blockquote>
                <figcaption className="mt-8 text-sm">
                  <span className="font-semibold">{lead.name}</span>
                  <span className="text-muted">
                    {lead.city ? `, ${lead.city}` : ""}
                    {lead.systemKw ? `, ${lead.systemKw} kW system` : ""}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
            {rest.length > 0 && (
              <div className="grid gap-4">
                {rest.map((t, i) => (
                  <Reveal key={t._id} delay={(i + 1) * 0.08}>
                    <figure className="flex h-full flex-col justify-between rounded-3xl border border-line bg-surface p-6 shadow-card">
                      <blockquote className="text-pretty">&ldquo;{t.quote}&rdquo;</blockquote>
                      <figcaption className="mt-5 text-sm">
                        <span className="font-semibold">{t.name}</span>
                        <span className="text-muted">
                          {t.city ? `, ${t.city}` : ""}
                          {t.systemKw ? `, ${t.systemKw} kW system` : ""}
                        </span>
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Who it's for */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:pb-24">
        <div className="grid gap-4 md:grid-cols-2">
          <Reveal className="rounded-3xl border border-line bg-surface p-8 shadow-card md:p-10">
            <HouseLine size={32} weight="duotone" aria-hidden className="text-brand" />
            <h2 className="mt-5 text-2xl font-bold tracking-tight md:text-3xl">Homes first.</h2>
            <p className="mt-3 max-w-[48ch] text-muted">
              Our residential packages are built around subsidy eligibility, net metering and a payback you can plan around.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="rounded-3xl border border-line bg-surface p-8 shadow-card md:p-10">
            <Buildings size={32} weight="duotone" aria-hidden className="text-brand" />
            <h2 className="mt-5 text-2xl font-bold tracking-tight md:text-3xl">Running a business?</h2>
            <p className="mt-3 max-w-[48ch] text-muted">
              We also design commercial systems. Request a site survey and we will size one for your load.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:pb-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Common questions</h2>
            <div className="mt-6">
              <Button href="/faq" variant="secondary" arrow>All questions</Button>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <FaqList items={homeFaqs} />
          </Reveal>
        </div>
      </section>

      {/* Quote */}
      <section id="quote" className="bg-deep text-deep-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <Reveal>
            <h2 className="max-w-[18ch] text-3xl font-bold tracking-tight md:text-5xl">Ready to see your numbers?</h2>
            <p className="mt-4 max-w-[50ch] text-deep-foreground/75">Request a callback or reach us directly.</p>
            <div className="mt-6"><Button href="/quote" arrow>{site.cta}</Button></div>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <a href={site.phoneHref} className={contactTile}>
              <span className="flex items-center gap-3"><PhoneCall size={22} className="text-accent" /> {site.phone}</span>
              <ArrowUpRight size={16} aria-hidden className="text-deep-foreground/50 transition-transform duration-200 ease-out-strong group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className={contactTile}>
              <span className="flex items-center gap-3"><WhatsappLogo size={22} className="text-accent" /> WhatsApp us</span>
              <ArrowUpRight size={16} aria-hidden className="text-deep-foreground/50 transition-transform duration-200 ease-out-strong group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a href={`mailto:${site.email}`} className={contactTile}>
              <span className="flex items-center gap-3"><EnvelopeSimple size={22} className="text-accent" /> {site.email}</span>
              <ArrowUpRight size={16} aria-hidden className="text-deep-foreground/50 transition-transform duration-200 ease-out-strong group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <p className="flex items-center gap-3 rounded-2xl border border-white/15 p-4"><MapPin size={22} className="text-accent" /> {site.address}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
