import { useState } from "react";
import heroProduct from "@/assets/brand-product.jpg";
import lipTint from "@/assets/lip-tint.jpg";
import { Button } from "@/components/ui/button";
import { Leaf, ShoppingBag, Trash2, Banknote, CreditCard, CheckCircle2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

type PaymentMethod = "cash" | "visa";
type CheckoutStep = "select" | "visa" | "confirmed";

const visaSchema = z.object({
  number: z
    .string()
    .trim()
    .regex(/^\d{13,19}$/, { message: "Card number must be 13–19 digits" }),
  name: z
    .string()
    .trim()
    .nonempty({ message: "Name on card is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  expiry: z
    .string()
    .trim()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Expiry must be MM/YY" }),
  cvv: z.string().trim().regex(/^\d{3,4}$/, { message: "CVV must be 3–4 digits" }),
});

type Product = {
  id: "ointment" | "tint";
  name: string;
  price: number;
  image: string;
  alt: string;
  description: string;
  flavors: string[];
};

const products: Product[] = [
  {
    id: "ointment",
    name: "Lip Ointment",
    price: 60,
    image: heroProduct,
    alt: "On the Lip — botanical lip ointment",
    description: "A five-ingredient botanical balm for deep hydration and a lasting barrier.",
    flavors: ["Rose", "Strawberry", "Vanilla"],
  },
  {
    id: "tint",
    name: "Lip Tint",
    price: 50,
    image: lipTint,
    alt: "On the Lip — water-based hydrating lip tint",
    description: "A featherlight water-based tint that hydrates while it colors.",
    flavors: ["Rose", "Strawberry", "Vanilla"],
  },
];

type CartItem = {
  key: string;
  productId: Product["id"];
  name: string;
  flavor: string;
  price: number;
  qty: number;
};

const Shop = () => {
  const [selected, setSelected] = useState<Record<string, string>>({
    ointment: "Rose",
    tint: "Rose",
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [step, setStep] = useState<CheckoutStep>("select");
  const [method, setMethod] = useState<PaymentMethod | null>(null);
  const [visa, setVisa] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [visaErrors, setVisaErrors] = useState<Record<string, string>>({});
  const [confirmedMethod, setConfirmedMethod] = useState<PaymentMethod | null>(null);
  const [confirmedLast4, setConfirmedLast4] = useState<string>("");

  const openCheckout = () => {
    setStep("select");
    setMethod(null);
    setVisa({ number: "", name: "", expiry: "", cvv: "" });
    setVisaErrors({});
    setCheckoutOpen(true);
    setBagOpen(false);
  };

  const confirmCash = () => {
    setConfirmedMethod("cash");
    setStep("confirmed");
  };

  const confirmVisa = () => {
    const result = visaSchema.safeParse(visa);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        const k = i.path[0] as string;
        if (!errs[k]) errs[k] = i.message;
      });
      setVisaErrors(errs);
      return;
    }
    setVisaErrors({});
    setConfirmedMethod("visa");
    setConfirmedLast4(result.data.number.slice(-4));
    setStep("confirmed");
  };

  const finishOrder = () => {
    setCheckoutOpen(false);
    setCart([]);
    toast({ title: "Order placed", description: "Thanks for shopping with On the Lip." });
  };

  const addToBag = (p: Product) => {
    const flavor = selected[p.id];
    const key = `${p.id}-${flavor}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { key, productId: p.id, name: p.name, flavor, price: p.price, qty: 1 }];
    });
    toast({
      title: "Added to bag",
      description: `${p.name} — ${flavor}`,
    });
  };

  const removeItem = (key: string) =>
    setCart((prev) => prev.filter((i) => i.key !== key));

  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <nav className="container mx-auto flex items-center justify-between px-6 py-4">
          <a href="/" className="font-serif text-2xl font-semibold tracking-tight">
            On the Lip
          </a>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-foreground/70">
              <Leaf className="h-3.5 w-3.5 text-primary" /> Shop
            </span>
            <Sheet open={bagOpen} onOpenChange={setBagOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="relative rounded-full border-border"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span className="ml-1">Bag</span>
                  {totalQty > 0 && (
                    <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-semibold text-primary-foreground">
                      {totalQty}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="flex flex-col">
                <SheetHeader>
                  <SheetTitle className="font-serif text-2xl">Your bag</SheetTitle>
                  <SheetDescription>
                    {totalQty === 0
                      ? "Your bag is empty."
                      : `${totalQty} item${totalQty > 1 ? "s" : ""} ready to go.`}
                  </SheetDescription>
                </SheetHeader>

                <div className="mt-6 flex-1 space-y-3 overflow-y-auto">
                  {cart.map((item) => (
                    <div
                      key={item.key}
                      className="flex items-start justify-between gap-3 rounded-2xl border border-border bg-card p-4"
                    >
                      <div>
                        <p className="font-serif text-lg leading-tight">{item.name}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-foreground/60">
                          {item.flavor} · Qty {item.qty}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="font-serif text-base text-primary">
                          {item.qty * item.price} EGP
                        </span>
                        <button
                          onClick={() => removeItem(item.key)}
                          className="inline-flex items-center gap-1 text-xs text-foreground/60 hover:text-foreground"
                          aria-label={`Remove ${item.name} ${item.flavor}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {totalQty > 0 && (
                  <SheetFooter className="mt-4 border-t border-border pt-4 sm:flex-col sm:space-x-0">
                    <div className="flex w-full items-center justify-between">
                      <span className="text-sm uppercase tracking-[0.2em] text-foreground/60">
                        Total
                      </span>
                      <span className="font-serif text-2xl text-primary">{totalPrice} EGP</span>
                    </div>
                    <Button
                      onClick={openCheckout}
                      className="mt-4 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Checkout
                    </Button>
                  </SheetFooter>
                )}
              </SheetContent>
            </Sheet>
          </div>
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
          {products.map((p) => (
            <article
              key={p.id}
              className="rounded-3xl border border-border bg-card p-6"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="overflow-hidden rounded-2xl">
                <img src={p.image} alt={p.alt} className="aspect-[4/3] w-full object-cover" />
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-baseline justify-between">
                  <h2 className="font-serif text-3xl">{p.name}</h2>
                  <span className="font-serif text-2xl text-primary">{p.price} EGP</span>
                </div>
                <p className="text-foreground/70">{p.description}</p>
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.2em] text-foreground/60">
                    Flavor
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {p.flavors.map((f) => {
                      const active = selected[p.id] === f;
                      return (
                        <button
                          key={f}
                          onClick={() => setSelected((s) => ({ ...s, [p.id]: f }))}
                          className={
                            "rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.2em] transition-colors " +
                            (active
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-background text-foreground/70 hover:text-foreground")
                          }
                          aria-pressed={active}
                        >
                          {f}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <Button
                  onClick={() => addToBag(p)}
                  className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Add to bag — {p.price} EGP
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="/" className="text-sm text-foreground/60 underline-offset-4 hover:text-foreground hover:underline">
            ← Back to On the Lip
          </a>
        </div>
      </main>

      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="sm:max-w-md">
          {step === "select" && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl">Choose payment method</DialogTitle>
                <DialogDescription>
                  Total due: <span className="text-primary">{totalPrice} EGP</span>
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-3 py-2">
                <button
                  onClick={() => setMethod("cash")}
                  className={
                    "flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors " +
                    (method === "cash"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-foreground/30")
                  }
                  aria-pressed={method === "cash"}
                >
                  <Banknote className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Cash on delivery</p>
                    <p className="text-xs text-foreground/60">Pay when your order arrives.</p>
                  </div>
                </button>
                <button
                  onClick={() => setMethod("visa")}
                  className={
                    "flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors " +
                    (method === "visa"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-foreground/30")
                  }
                  aria-pressed={method === "visa"}
                >
                  <CreditCard className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Visa</p>
                    <p className="text-xs text-foreground/60">Pay securely with your card.</p>
                  </div>
                </button>
              </div>
              <DialogFooter>
                <Button
                  disabled={!method}
                  onClick={() => {
                    if (method === "cash") confirmCash();
                    else if (method === "visa") setStep("visa");
                  }}
                  className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Continue
                </Button>
              </DialogFooter>
            </>
          )}

          {step === "visa" && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl">Visa details</DialogTitle>
                <DialogDescription>
                  Enter your card information. We don't store your card.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-3 py-2">
                <div>
                  <Label htmlFor="card-number">Card number</Label>
                  <Input
                    id="card-number"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    maxLength={19}
                    placeholder="4242 4242 4242 4242"
                    value={visa.number}
                    onChange={(e) =>
                      setVisa((v) => ({ ...v, number: e.target.value.replace(/\s/g, "") }))
                    }
                  />
                  {visaErrors.number && (
                    <p className="mt-1 text-xs text-destructive">{visaErrors.number}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="card-name">Name on card</Label>
                  <Input
                    id="card-name"
                    autoComplete="cc-name"
                    maxLength={100}
                    placeholder="Full name"
                    value={visa.name}
                    onChange={(e) => setVisa((v) => ({ ...v, name: e.target.value }))}
                  />
                  {visaErrors.name && (
                    <p className="mt-1 text-xs text-destructive">{visaErrors.name}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="card-expiry">Expiry (MM/YY)</Label>
                    <Input
                      id="card-expiry"
                      autoComplete="cc-exp"
                      maxLength={5}
                      placeholder="08/28"
                      value={visa.expiry}
                      onChange={(e) => setVisa((v) => ({ ...v, expiry: e.target.value }))}
                    />
                    {visaErrors.expiry && (
                      <p className="mt-1 text-xs text-destructive">{visaErrors.expiry}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="card-cvv">CVV</Label>
                    <Input
                      id="card-cvv"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      maxLength={4}
                      placeholder="123"
                      value={visa.cvv}
                      onChange={(e) =>
                        setVisa((v) => ({ ...v, cvv: e.target.value.replace(/\D/g, "") }))
                      }
                    />
                    {visaErrors.cvv && (
                      <p className="mt-1 text-xs text-destructive">{visaErrors.cvv}</p>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter className="gap-2 sm:gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep("select")}
                  className="rounded-full"
                >
                  Back
                </Button>
                <Button
                  onClick={confirmVisa}
                  className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Confirm payment
                </Button>
              </DialogFooter>
            </>
          )}

          {step === "confirmed" && (
            <>
              <DialogHeader>
                <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <DialogTitle className="text-center font-serif text-2xl">
                  Payment confirmed
                </DialogTitle>
                <DialogDescription className="text-center">
                  {confirmedMethod === "cash"
                    ? "Your order is confirmed — you'll pay with cash on delivery."
                    : `Your Visa payment ending in •••• ${confirmedLast4} is confirmed.`}
                </DialogDescription>
              </DialogHeader>
              <div className="rounded-2xl border border-border bg-card p-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="uppercase tracking-[0.2em] text-foreground/60 text-xs">
                    Total paid
                  </span>
                  <span className="font-serif text-lg text-primary">{totalPrice} EGP</span>
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={finishOrder}
                  className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Done
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Shop;
