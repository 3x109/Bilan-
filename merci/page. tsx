import Link from "next/link";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

async function lireSession(id: string | undefined) {
  const cle = process.env.STRIPE_SECRET_KEY;
  if (!id || !id.startsWith("cs_") || !cle) return null;
  try {
    const stripe = new Stripe(cle);
    return await stripe.checkout.sessions.retrieve(id);
  } catch {
    return null;
  }
}

export default async function Merci({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const session = await lireSession(session_id);
  const paye =
    session?.status === "complete" &&
    (session.payment_status === "paid" ||
      session.payment_status === "no_payment_required");
  const email = session?.customer_details?.email;

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-12 pt-10">
      {paye ? (
        <>
          <p className="text-sm font-semibold uppercase tracking-widest text-gris-chaud">
            Paiement reçu
          </p>
          <h1 className="mt-4 font-titre text-3xl font-bold leading-tight">
            C’est fait. Ton accès à Bilan est confirmé.
          </h1>
          <p className="mt-4 text-lg text-gris-chaud">
            {email
              ? `Un reçu part à ${email}. `
              : "Un reçu t’a été envoyé par e-mail. "}
            Bilan est en accès anticipé : on t’écrit à cette adresse dès que
            ton espace est ouvert.
          </p>
          <p className="mt-4 text-gris-chaud">
            Garantie satisfait ou remboursé pendant 14 jours, remboursement
            sous 5 jours ouvrés.
          </p>
          <Link
            href="/apercu"
            className="mt-8 block bg-action px-6 py-4 text-center text-lg font-semibold text-white"
          >
            Refaire un bilan
          </Link>
        </>
      ) : (
        <>
          <h1 className="font-titre text-3xl font-bold leading-tight">
            Le paiement n’a pas abouti.
          </h1>
          <p className="mt-4 text-lg text-gris-chaud">
            Rien n’a été débité. Tu peux réessayer avec la même carte ou une
            autre.
          </p>
          <Link
            href="/tarifs"
            className="mt-8 block bg-action px-6 py-4 text-center text-lg font-semibold text-white"
          >
            Réessayer
          </Link>
          <Link href="/" className="mt-4 block py-3 text-center text-gris-chaud underline">
            Retour à l’accueil
          </Link>
        </>
      )}
    </main>
  );
}
