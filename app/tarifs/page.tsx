"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const FORMULES = [
  { id: "solo", nom: "Solo", prix: 19, clients: 3 },
  { id: "pro", nom: "Pro", prix: 39, clients: 10 },
  { id: "agence", nom: "Agence", prix: 79, clients: 25 },
];

const EMAIL_REMBOURSEMENT = "[À COMPLÉTER : ton e-mail]";

const FAQ = [
  {
    q: "Est-ce que ça marche pour mon cas ?",
    r: "Si tu factures des clients au mois et que tu dois leur montrer des chiffres (publications, vues, abonnés), oui. Tu saisis trois chiffres par client, le rapport se met en page seul.",
  },
  {
    q: "Combien de temps ça me prend ?",
    r: "Environ une minute par client et par mois. Le rapport part ensuite tout seul le 1er du mois.",
  },
  {
    q: "Et si je veux arrêter ?",
    r: "Tu résilies quand tu veux, sans préavis ni frais. Et pendant 14 jours, tu peux te faire rembourser en écrivant à " + EMAIL_REMBOURSEMENT + ".",
  },
  {
    q: "À quoi sert exactement ce que je paie ?",
    r: "Tu paies l’accès à Bilan : la saisie des chiffres, le rapport à tes couleurs, l’envoi automatique le 1er du mois et l’accusé de lecture. Bilan est en accès anticipé : la saisie et le rapport sont ouverts d’abord, l’envoi automatique et l’accusé de lecture arrivent dans les semaines qui suivent, au même prix.",
  },
];

const fr = (n: number) =>
  n.toLocaleString("fr-FR", { maximumFractionDigits: 2 });

export default function Tarifs() {
  const [choix, setChoix] = useState("pro");
  const [gain, setGain] = useState<number | null>(null);

  useEffect(() => {
    try {
      const brut = sessionStorage.getItem("bilan");
      if (!brut) return;
      const { clients, minutes } = JSON.parse(brut);
      if (clients > 0 && minutes > 0) {
        setGain(Math.round(((clients * minutes - clients) / 60) * 10) / 10);
      }
    } catch {}
  }, []);

  const formule = FORMULES.find((f) => f.id === choix) ?? FORMULES[1];

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-12 pt-6">
      <div className="flex items-center justify-between text-sm text-gris-chaud">
        <Link href="/apercu" className="py-2">
          ← Retour
        </Link>
        <span>Ton bilan est prêt</span>
      </div>

      <h1 className="mt-6 font-titre text-3xl font-bold leading-tight">
        Voilà ton bilan, prêt. Garde-le.
      </h1>

      <p className="mt-4 border-y border-filet py-3 text-sm font-medium">
        Satisfait ou remboursé pendant 14 jours. Sans engagement.
      </p>

      {gain !== null && (
        <div className="mt-6">
          <p className="text-gris-chaud">Avec Bilan, tu récupères</p>
          <p className="mt-1 text-3xl font-semibold">{fr(gain)} h par mois</p>
          <p className="mt-1 text-gris-chaud">
            Pour {fr(formule.prix)} € par mois, soit{" "}
            {fr(Math.round((formule.prix / gain) * 100) / 100)} € par heure
            récupérée.
          </p>
        </div>
      )}

      <h2 className="mt-10 font-titre text-2xl font-bold">Choisis ta formule</h2>
      <div className="mt-4 space-y-3">
        {FORMULES.map((f) => {
          const actif = f.id === choix;
          return (
            <button
              key={f.id}
              onClick={() => setChoix(f.id)}
              aria-pressed={actif}
              className={`block w-full border-2 px-5 py-4 text-left ${
                actif ? "border-action bg-white" : "border-filet"
              }`}
            >
              <span className="flex items-baseline justify-between">
                <span className="text-lg font-semibold">
                  {f.nom}
                  {f.id === "pro" && (
                    <span className="ml-2 text-xs font-semibold uppercase tracking-wide text-action">
                      Le plus choisi
                    </span>
                  )}
                </span>
                <span className="text-lg font-semibold">{fr(f.prix)} €/mois</span>
              </span>
              <span className="mt-1 block text-sm text-gris-chaud">
                Jusqu’à {f.clients} clients · soit {fr(Math.round((f.prix / 30) * 100) / 100)} € par jour
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 border border-encre px-5 py-4">
        <p className="font-titre text-xl font-bold">
          Garantie satisfait ou remboursé : 14 jours
        </p>
        <p className="mt-2 text-gris-chaud">
          Si Bilan ne te convient pas, écris à {EMAIL_REMBOURSEMENT} dans les
          14 jours qui suivent ton paiement. Tu es remboursé intégralement sous
          5 jours ouvrés, sans justification.
        </p>
      </div>

      <div className="mt-8">
        <span
          aria-disabled="true"
          className="block bg-action/50 px-6 py-4 text-center text-lg font-semibold text-white"
        >
          Payer {fr(formule.prix)} € par mois
        </span>
        <p className="mt-2 text-center text-sm text-gris-chaud">
          Sans engagement, résiliable à tout moment.
        </p>
        <p className="mt-1 text-center text-xs text-gris-chaud">
          Paiement sécurisé : branché à l’étape suivante.
        </p>
      </div>

      <h2 className="mt-12 font-titre text-2xl font-bold">Questions fréquentes</h2>
      <div className="mt-4 border-t border-filet">
        {FAQ.map((item) => (
          <details key={item.q} className="border-b border-filet py-4">
            <summary className="cursor-pointer text-lg font-medium">
              {item.q}
            </summary>
            <p className="mt-3 text-gris-chaud">{item.r}</p>
          </details>
        ))}
      </div>
    </main>
  );
}
