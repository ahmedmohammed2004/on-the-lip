import heroProduct from "@/assets/brand-product.jpg";
import lipTint from "@/assets/lip-tint.jpg";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

const ointmentScents = ["Rose", "Strawberry", "Vanilla"];
const tintFlavors = ["Rose", "Strawberry", "Vanilla"];

const Shop = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <nav className="container mx-auto flex items-center justify-between px-6 py-4">
          <a href="/" className="font-serif text-2xl font-semibold tracking-tight">
            On the Lip
          </a>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-foreground/70">
            <Leaf className="h-3.5 w-3.5 text-primary" /> Shop
          </span>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">The Collection</p>
          <h1 className="font-serif text-4xl md:text-5xl">Shop On the Lip</h1>
          <p className="mt-5 text-foreground/70">
            Hand-poured in Cairo. Pick your product, pick your flavor.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {/* Lip Ointment */}
          <article
            className="rounded-3xl border border-border bg-card p-6"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <div className="overflow-hidden rounded-2xl">
              <img
                src={heroProduct}
                alt="On the Lip — botanical lip ointment"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-baseline justify-between">
                <h2 className="font-serif text-3xl">Lip Ointment</h2>
                <span className="font-serif text-2xl text-primary">60 EGP</span>
              </div>
              <p className="text-foreground/70">
                A five-ingredient botanical balm for deep hydration and a lasting barrier.
              </p>
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-foreground/60">Flavors</p>
                <div className="flex flex-wrap gap-2">
                  {ointmentScents.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border bg-background px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-foreground/70"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <Button className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                Add to bag — 60 EGP
              </Button>
            </div>
          </article>

          {/* Lip Tint */}
          <article
            className="rounded-3xl border border-border bg-card p-6"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <div className="overflow-hidden rounded-2xl">
              <img
                src={lipTint}
                alt="On the Lip — water-based hydrating lip tint"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-baseline justify-between">
                <h2 className="font-serif text-3xl">Lip Tint</h2>
                <span className="font-serif text-2xl text-primary">50 EGP</span>
              </div>
              <p className="text-foreground/70">
                A featherlight water-based tint that hydrates while it colors.
              </p>
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-foreground/60">Flavors</p>
                <div className="flex flex-wrap gap-2">
                  {tintFlavors.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border bg-background px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-foreground/70"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <Button className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                Add to bag — 50 EGP
              </Button>
            </div>
          </article>
        </div>

        <div className="mt-16 text-center">
          <a href="/" className="text-sm text-foreground/60 underline-offset-4 hover:text-foreground hover:underline">
            ← Back to On the Lip
          </a>
        </div>
      </main>
    </div>
  );
};

export default Shop;
