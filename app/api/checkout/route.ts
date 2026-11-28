import { NextResponse } from "next/server";
import Stripe from "stripe";

// Les prix restent ici, côté serveur : le navigateur n’envoie qu’un nom de formule.
const PRIX: Record<string, string> = {
  solo: "price_1UfJ08D8airtToyGdFqF0u9G",
  pro: "price_1UfJ5GD8airtToyGqnvTY9lF",
  agence: "price_1UfJ73D8airtToyGkdlYhWeJ",
};

export async function POST(req: Request) {
  try {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) {
      return NextResponse.json({ error: "Paiement indisponible." }, { status: 500 });
    }

    const corps = await req.json().catch(() => ({}));
    const formule = typeof corps?.formule === "string" ? corps.formule : "";
    const prix = PRIX[formule];
    if (!prix) {
      return NextResponse.json({ error: "Formule inconnue." }, { status: 400 });
    }

    const stripe = new Stripe(secret);
    const origine = new URL(req.url).origin;

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded_page",
      mode: "subscription",
      line_items: [{ price: prix, quantity: 1 }],
      return_url: `${origine}/merci?session_id={CHECKOUT_SESSION_ID}`,
      locale: "fr",
      metadata: { formule },
      subscription_data: { metadata: { formule } },
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch {
    return NextResponse.json(
      { error: "Impossible de lancer le paiement." },
      { status: 500 }
    );
  }
}
