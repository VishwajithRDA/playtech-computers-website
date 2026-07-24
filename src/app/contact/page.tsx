import type { Metadata } from "next"
import { MapPin, Clock, Phone, Mail, MessageCircle } from "lucide-react"
import { STORE_INFO } from "../../lib/catalog-data"
import { SiteNav, SiteFooter } from "../../components/site-nav"
import { ContactForm } from "../../components/contact-form"

export const metadata: Metadata = {
  title: `Contact Us — ${STORE_INFO.name}`,
  description: `Get in touch with ${STORE_INFO.name}. Visit our Kuliyapitiya store, call our hotline or send us a message.`,
}

const DETAILS = [
  { icon: MapPin, label: "Store Address", value: STORE_INFO.address },
  { icon: Clock, label: "Opening Hours", value: STORE_INFO.hours },
  { icon: Phone, label: "Sales Hotline", value: STORE_INFO.phone, href: `tel:${STORE_INFO.phone.replace(/\s/g, "")}` },
  { icon: Mail, label: "Email", value: STORE_INFO.email, href: `mailto:${STORE_INFO.email}` },
]

export default function ContactPage() {
  const whatsappHref = `https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(
    `Hi ${STORE_INFO.name}, I'd like to make an inquiry.`,
  )}`

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <main className="mx-auto max-w-5xl px-4 py-10 lg:px-6">
        <section className="flex flex-col gap-4">
          <span className="w-fit rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-primary">
            Contact {STORE_INFO.name}
          </span>
          <h1 className="max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight text-foreground text-balance sm:text-5xl">
            Let&apos;s talk hardware.
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Visit us in Kuliyapitiya, call our hotline, or drop a message below. Our build experts
            are ready to help you find genuine components at the best prices in LKR.
          </p>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Left: store details */}
          <section className="flex flex-col gap-4">
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
              <h2 className="font-display text-lg font-bold tracking-tight text-foreground">
                Store &amp; Support
              </h2>
              <ul className="mt-5 flex flex-col gap-5">
                {DETAILS.map((detail) => (
                  <li key={detail.label} className="flex items-start gap-4">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                      <detail.icon className="h-5 w-5" />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {detail.label}
                      </span>
                      {detail.href ? (
                        <a
                          href={detail.href}
                          className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <span className="text-sm font-medium text-foreground">{detail.value}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </div>

            {/* Location reference */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <MapPin className="h-4 w-4 text-accent" />
                Colombo &amp; Regional Coverage
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Our main branch is in Kuliyapitiya, with island-wide delivery reaching Colombo,
                Kandy, Galle and beyond. Coordinates: 7.4682&deg; N, 80.0410&deg; E.
              </p>
            </div>
          </section>

          {/* Right: contact form */}
          <section>
            <ContactForm />
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
