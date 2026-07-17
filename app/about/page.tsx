import type { Metadata } from "next"
import Link from "next/link"
import { Award, ShieldCheck, Cpu, Truck, Headset, MapPin } from "lucide-react"
import { STORE_INFO } from "@/lib/catalog-data"
import { SiteNav, SiteFooter } from "@/components/site-nav"

export const metadata: Metadata = {
  title: `About Us — ${STORE_INFO.name}`,
  description: `Learn about ${STORE_INFO.name}, ${STORE_INFO.tagline}. Genuine hardware, authentic domestic warranties and expert custom workstation assembly.`,
}

const PILLARS = [
  {
    icon: Award,
    title: "Tech Retail Excellence",
    body: "For over a decade we have supplied gamers, studios and enterprises across Sri Lanka with the latest computing hardware. Our team lives and breathes technology, curating only components that meet our performance and reliability standards before they ever reach our shelves.",
  },
  {
    icon: ShieldCheck,
    title: "Authentic Domestic Warranties",
    body: "Every product we sell is sourced through official local agents and carries a genuine Sri Lankan warranty — never grey-market imports. That means real, honoured cover and local service centres, so your investment is protected long after the sale.",
  },
  {
    icon: Cpu,
    title: "Custom Workstation Assembly",
    body: "Our in-house engineers hand-build and stress-test every custom rig, from silent productivity machines to flagship gaming and creator workstations. Precise cable management, validated thermals and burn-in testing come standard on each build.",
  },
]

const STATS = [
  { value: "10+", label: "Years in business" },
  { value: "50k+", label: "Components delivered" },
  { value: "100%", label: "Genuine agent stock" },
  { value: "4", label: "Branches island-wide" },
]

const COMMITMENTS = [
  { icon: Truck, title: "Island-wide Delivery", body: "Fast, insured dispatch to every district in Sri Lanka." },
  { icon: Headset, title: "Expert Build Advice", body: "Talk to real system builders before you buy." },
  { icon: MapPin, title: "Local Service Centres", body: "Warranty and support handled right here at home." },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <main className="mx-auto max-w-5xl px-4 py-10 lg:px-6">
        {/* Intro */}
        <section className="flex flex-col gap-4">
          <span className="w-fit rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-primary">
            About {STORE_INFO.name}
          </span>
          <h1 className="max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight text-foreground text-balance sm:text-5xl">
            The people behind Sri Lanka&apos;s No.1 IT partner.
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {STORE_INFO.name} is more than a hardware store. We are builders, gamers and engineers
            obsessed with putting genuine, reliable technology into the hands of every Sri Lankan
            customer — backed by warranties you can actually count on.
          </p>
        </section>

        {/* Stats */}
        <section className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-5 text-center"
            >
              <p className="font-display text-3xl font-extrabold tabular-nums text-primary">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </section>

        {/* Pillars as typographical rows */}
        <section className="mt-10 flex flex-col gap-4">
          <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
            What sets us apart
          </h2>
          {PILLARS.map((pillar) => (
            <article
              key={pillar.title}
              className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-start sm:gap-6"
            >
              <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                <pillar.icon className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-lg font-bold tracking-tight text-foreground">
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
              </div>
            </article>
          ))}
        </section>

        {/* Commitments */}
        <section className="mt-10 flex flex-col gap-4">
          <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
            Our commitment to you
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {COMMITMENTS.map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card p-5">
                <item.icon className="h-5 w-5 text-accent" />
                <h3 className="mt-3 font-display text-base font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-10 flex flex-col items-start gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="font-display text-xl font-bold tracking-tight text-foreground text-balance">
              Ready to build something powerful?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Browse genuine components or talk to our build experts today.
            </p>
          </div>
          <Link
            href="/#catalog"
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-lg bg-primary px-6 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.02]"
          >
            Shop the Catalog
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
