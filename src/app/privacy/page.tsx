import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects your personal information.`,
};

const updated = "2 October 2026";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
      <h1 className="text-4xl font-bold tracking-tighter md:text-5xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted">Last updated {updated}</p>

      <div className="mt-10 space-y-8 leading-relaxed text-muted [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
        <section>
          <h2>Who we are</h2>
          <p>
            {site.name} is a solar installation company based in Telangana, India. This policy explains what we
            collect through this website and why. Contact us at {site.email} for anything below.
          </p>
        </section>

        <section>
          <h2>What we collect</h2>
          <ul>
            <li>
              <strong className="text-foreground">Quote requests.</strong> Your name, phone number, city, customer
              type, approximate monthly bill, and optionally your email and a message.
            </li>
            <li>
              <strong className="text-foreground">Estimator inputs.</strong> The savings estimator runs in your
              browser. Nothing you enter there is sent to us unless you submit a quote request.
            </li>
            <li>
              <strong className="text-foreground">Analytics.</strong> Only if you accept: pages visited, device and
              approximate location, and interactions such as form submissions, collected through Google Analytics.
            </li>
          </ul>
        </section>

        <section>
          <h2>How we use it</h2>
          <p>
            We use quote details only to contact you about your solar enquiry, prepare a quote, and help with subsidy
            and loan applications if you ask. We do not sell your data or use it for unrelated marketing.
          </p>
        </section>

        <section>
          <h2>Who handles it</h2>
          <p>
            Quote requests are delivered to our team by email (Resend) and recorded in a Google Sheet used by our
            staff. If you accept analytics, Google Analytics processes usage data. These providers process data on
            our behalf and may store it outside India.
          </p>
        </section>

        <section>
          <h2>Cookies</h2>
          <p>
            Analytics cookies are set only after you click Accept. You can change your choice at any time with
            &ldquo;Cookie settings&rdquo; in the footer. Declining does not affect how the site works.
          </p>
        </section>

        <section>
          <h2>How long we keep it</h2>
          <p>
            We keep enquiry details while we are working with you and for up to 24 months afterwards, then delete
            them. Ask us earlier if you want them removed.
          </p>
        </section>

        <section>
          <h2>Your rights</h2>
          <p>
            You can ask to see, correct or delete the personal data we hold about you, or withdraw consent, under the
            Digital Personal Data Protection Act, 2023. Email {site.email} and we will respond within a reasonable
            time.
          </p>
        </section>
      </div>
    </div>
  );
}
