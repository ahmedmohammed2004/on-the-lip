import heroProduct from "@/assets/brand-product.jpg";
import ingredients from "@/assets/formula-ingredients.jpg";
import instagramQr from "@/assets/instagram-qr.jpg";
import { Button } from "@/components/ui/button";
import { Leaf, Droplets, Sparkles, ShieldCheck } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const Index = () => {
  useReveal();
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <nav className="container mx-auto flex items-center justify-between px-6 py-4">
          <a href="#" className="font-serif text-2xl font-semibold tracking-tight">
            On the Lip
          </a>
          <ul className="hidden items-center gap-8 text-sm md:flex">
            <li><a href="#product" className="text-foreground/70 transition-colors hover:text-foreground">Product</a></li>
            <li><a href="#ingredients" className="text-foreground/70 transition-colors hover:text-foreground">Ingredients</a></li>
            <li><a href="#story" className="text-foreground/70 transition-colors hover:text-foreground">Our Story</a></li>
            <li><a href="#contact" className="text-foreground/70 transition-colors hover:text-foreground">Contact</a></li>
          </ul>
          <Button variant="default" className="rounded-full bg-primary px-5 text-primary-foreground hover:bg-primary/90">
            Shop now
          </Button>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section
          className="relative overflow-hidden"
          style={{ background: "var(--gradient-warm)" }}
        >
          <div className="container mx-auto grid items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
            <div className="space-y-7 animate-fade-in-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-foreground/70">
                <Leaf className="h-3.5 w-3.5 text-primary" /> Botanical Lip Care
              </span>
              <h1 className="font-serif text-5xl leading-[1.05] md:text-7xl">
                On the Lip<span className="text-primary">.</span>
                <br />
                <em className="font-normal italic text-foreground/80">Your everyday balm, perfected.</em>
              </h1>
              <p className="max-w-lg text-lg text-foreground/70">
                A deeply nourishing ointment crafted with cold-pressed botanicals to soothe, protect,
                and restore — wear it bare, or under your favorite color.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="rounded-full bg-primary px-8 text-primary-foreground transition-transform hover:scale-[1.03] hover:bg-primary/90">
                  Shop the collection
                </Button>
                <Button size="lg" variant="outline" className="rounded-full border-border bg-transparent px-8 transition-colors hover:bg-foreground/5">
                  Discover the ritual
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4 text-xs uppercase tracking-widest text-foreground/60">
                <span>Cruelty Free</span>
                <span className="h-1 w-1 rounded-full bg-foreground/30" />
                <span>Plant Based</span>
                <span className="h-1 w-1 rounded-full bg-foreground/30" />
                <span>Made in Small Batches</span>
              </div>
            </div>

            <div className="relative flex justify-center md:justify-end animate-fade-in-right">
              <div className="relative w-full max-w-[560px] animate-float">
                <div className="absolute -inset-6 rounded-[2rem] bg-accent/40 blur-2xl animate-shimmer" />
                <img
                  src={heroProduct}
                  alt="On the Lip balm — round container and lipstick tube"
                  width={1280}
                  height={720}
                  className="relative z-10 w-full rounded-[2rem] object-cover"
                  style={{ boxShadow: "var(--shadow-warm)" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Marquee strip */}
        <section className="border-y border-border bg-foreground text-background">
          <div className="container mx-auto flex flex-wrap items-center justify-center gap-x-12 gap-y-3 px-6 py-5 font-serif text-sm italic">
            <span>Cocoa Butter</span>
            <span className="opacity-40">✦</span>
            <span>Lanolin</span>
            <span className="opacity-40">✦</span>
            <span>White Petrolatum</span>
            <span className="opacity-40">✦</span>
            <span>White Wax</span>
            <span className="opacity-40">✦</span>
            <span>Rose · Strawberry · Vanilla</span>
          </div>
        </section>

        {/* Features */}
        <section id="product" className="container mx-auto px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">Why On the Lip</p>
            <h2 className="font-serif text-4xl md:text-5xl">A balm that does more than balm.</h2>
            <p className="mt-5 text-foreground/70">
              Formulated by a small team of GUC students in Cairo, Egypt, every batch is hand-poured and
              tested for the way you actually live.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Droplets,
                title: "Deep Hydration",
                copy: "Locks in moisture for up to 12 hours with a humectant-rich blend of glycerin and honey.",
              },
              {
                icon: ShieldCheck,
                title: "Lasting Barrier",
                copy: "A breathable seal of beeswax and shea protects against wind, sun, and dry air.",
              },
              {
                icon: Sparkles,
                title: "Subtle Sheen",
                copy: "A naturally luminous finish — never sticky, never greasy, always wearable.",
              },
            ].map(({ icon: Icon, title, copy }) => (
              <article
                key={title}
                className="group rounded-3xl border border-border bg-card p-8 transition-all hover:-translate-y-1"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-3 font-serif text-2xl italic text-primary">{title}</h3>
                <p className="text-foreground/70">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Ingredients */}
        <section id="ingredients" className="bg-secondary/40">
          <div className="container mx-auto grid items-center gap-16 px-6 py-24 md:grid-cols-2">
            <div className="relative">
              <img
                src={ingredients}
                alt="Natural lip balm ingredients flat lay"
                width={1024}
                height={1024}
                loading="lazy"
                className="aspect-square w-full rounded-3xl object-cover"
                style={{ boxShadow: "var(--shadow-soft)" }}
              />
              <div className="absolute -bottom-6 -right-6 hidden rounded-2xl border border-border bg-background px-6 py-4 font-serif italic md:block">
                <span className="text-primary">100%</span> botanical
              </div>
            </div>
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.3em] text-primary">The Formula</p>
              <h2 className="font-serif text-4xl md:text-5xl">
                Five ingredients.<br/>
                <em>Three scents.</em>
              </h2>
              <p className="text-foreground/70">
                A radically simple base of skin-loving emollients, finished with a single
                volatile oil. Choose your favorite scent — Rose, Strawberry, or Vanilla.
              </p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3 pt-2">
                {[
                  "Cocoa Butter",
                  "Lanolin",
                  "White Petrolatum",
                  "White Wax",
                  "Volatile Oil (Rose / Strawberry / Vanilla)",
                ].map((ing) => (
                  <li key={ing} className="flex items-center gap-3 border-b border-border pb-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {ing}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Rose", "Strawberry", "Vanilla"].map((scent) => (
                  <span
                    key={scent}
                    className="rounded-full border border-border bg-background px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-foreground/70"
                  >
                    {scent}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section id="story" className="container mx-auto px-6 py-24">
          <div className="text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">Our Story</p>
            <h2 className="mx-auto max-w-3xl font-serif text-4xl md:text-5xl">
              Born from a chapped winter and a stubborn belief that
              <em className="text-primary"> simple is better.</em>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-foreground/70">
              On the Lip began in a tiny apothecary kitchen in 2025, when our founder couldn&apos;t find
              a balm that actually worked without a list of ingredients she couldn&apos;t pronounce. So
              she made one. Then made it better. Now it&apos;s yours.
            </p>
          </div>

          {/* Business Model Canvas */}
          <div className="mt-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">The Blueprint</p>
              <h3 className="font-serif text-3xl md:text-4xl">Business Model Canvas</h3>
              <p className="mt-4 text-foreground/70">
                A snapshot of how On the Lip creates, delivers, and captures value.
              </p>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-5 md:grid-rows-3">
              {[
                { title: "Key Partners", body: "Local botanical suppliers · Egyptian beekeepers · GUC labs · Small-batch packaging artisans", span: "md:col-span-1 md:row-span-2" },
                { title: "Key Activities", body: "Hand-pouring batches · Sourcing botanicals · Quality testing · Community building on Instagram", span: "md:col-span-1 md:row-span-1" },
                { title: "Value Propositions", body: "Five-ingredient lip ointment in three signature scents — Rose, Strawberry, Vanilla. Honest, gentle, locally crafted.", span: "md:col-span-1 md:row-span-2" },
                { title: "Customer Relationships", body: "Personal · DM-based support · Loyal community on @_on_the_lip · Word of mouth", span: "md:col-span-1 md:row-span-1" },
                { title: "Customer Segments", body: "GUC students · Young adults in Cairo · Clean-beauty enthusiasts · Gift buyers", span: "md:col-span-1 md:row-span-2" },
                { title: "Key Resources", body: "Founders' formulation expertise · Trusted ingredient supply · Brand identity · Instagram presence", span: "md:col-span-1 md:row-span-1" },
                { title: "Channels", body: "Instagram (@_on_the_lip) · Direct messages · Campus pop-ups · Friend referrals", span: "md:col-span-1 md:row-span-1" },
                { title: "Cost Structure", body: "Raw botanicals · Packaging · Small-batch production · Marketing on social media", span: "md:col-span-2 md:row-span-1" },
                { title: "Revenue Streams", body: "Direct product sales at 60 EGP per unit · Gift sets · Custom scent bundles", span: "md:col-span-3 md:row-span-1" },
              ].map(({ title, body, span }) => (
                <div
                  key={title}
                  className={`rounded-2xl border border-border bg-card p-5 ${span}`}
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <h4 className="mb-2 font-serif text-sm uppercase tracking-[0.15em] text-primary">{title}</h4>
                  <p className="text-sm text-foreground/75">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="bg-foreground text-background">
          <div className="container mx-auto grid items-center gap-12 px-6 py-20 md:grid-cols-2">
            <div className="flex flex-col items-start gap-6 text-left">
              <h2 className="font-serif text-4xl text-background md:text-5xl">
                Ready to feel the difference?
              </h2>
              <p className="max-w-xl text-background/70">
                Try On the Lip risk-free. If you don&apos;t love it within 30 days, we&apos;ll refund
                every cent.
              </p>
              <Button size="lg" className="mt-2 rounded-full bg-primary px-10 text-primary-foreground hover:bg-primary/90">
                Shop now — 60 EGP
              </Button>
            </div>
            <div className="flex flex-col items-center gap-4">
              <img
                src={instagramQr}
                alt="Scan to follow @_on_the_lip on Instagram"
                width={600}
                height={750}
                loading="lazy"
                className="w-full max-w-xs rounded-2xl"
                style={{ boxShadow: "var(--shadow-soft)" }}
              />
              <p className="text-sm uppercase tracking-[0.2em] text-background/70">
                Follow @_on_the_lip
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background">
        <div className="container mx-auto grid gap-8 px-6 py-12 md:grid-cols-4">
          <div>
            <div className="font-serif text-xl">On the Lip</div>
            <p className="mt-3 max-w-xs text-sm text-foreground/60">
              Botanical lip care, crafted in small batches.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">Shop</h3>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>The Original</li>
              <li>Tinted</li>
              <li>Gift Sets</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">Company</h3>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>About</li>
              <li>Journal</li>
              <li>Stockists</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">Support</h3>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>Contact</li>
              <li>Shipping</li>
              <li>Returns</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border py-6 text-center text-xs text-foreground/50">
          © 2026 On the Lip. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
