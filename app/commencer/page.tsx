"use client";

import { useState } from "react";
import Link from "next/link";

type Question = {
  titre: string;
  aide: string;
  options: { label: string; valeur: number }[];
};

const QUESTIONS: Question[] = [
  {
    titre: "Combien de clients suis-tu chaque mois ?",
    aide: "Compte seulement ceux que tu factures au mois.",
    options: [
      { label: "1 à 3 clients", valeur: 2 },
      { label: "4 à 7 clients", valeur: 5 },
      { label: "8 à 12 clients", valeur: 10 },
      { label: "Plus de 12 clients", valeur: 15 },
    ],
  },
  {
    titre: "Combien de temps te prend un bilan fait à la main ?",
    aide: "Si tu ne le fais pas toujours, choisis le temps que ça te prendrait.",
    options: [
      { label: "Moins de 20 minutes", valeur: 15 },
      { label: "20 à 45 minutes", valeur: 35 },
      { label: "Plus de 45 minutes", valeur: 60 },
    ],
  },
  {
    titre: "Combien te paie un client, par mois ?",
    aide: "Un ordre de grandeur suffit.",
    options: [
      { label: "Moins de 400 €", valeur: 300 },
      { label: "400 à 800 €", valeur: 600 },
      { label: "800 à 1 500 €", valeur: 1100 },
      { label: "Plus de 1 500 €", valeur: 1800 },
    ],
  },
];

const fr = (n: number) => n.toLocaleString("fr-FR");
const arrondi = (n: number) => Math.round(n * 10) / 10;

export default function Commencer() {
  const [etape, setEtape] = useState(0);
  const [reponses, setReponses] = useState<number[]>([]);

  const fini = etape >= QUESTIONS.length;
  const progression = Math.round((etape / QUESTIONS.length) * 100);

  function choisir(valeur: number) {
    setReponses([...reponses.slice(0, etape), valeur]);
    setEtape(etape + 1);
  }

  function recommencer() {
    setReponses([]);
    setEtape(0);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-10 pt-6">
      <div className="flex items-center justify-between text-sm text-gris-chaud">
        {etape === 0 ? (
          <Link href="/" className="py-2">
            ← Accueil
          </Link>
        ) : (
          <button onClick={() => setEtape(etape - 1)} className="py-2">
            ← Retour
          </button>
        )}
        <span>{fini ? "Ton résultat" : `Question ${etape + 1} sur 3`}</span>
      </div>

      <div
        className="mt-2 h-1.5 w-full bg-filet"
        role="progressbar"
        aria-valuenow={fini ? 100 : progression}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full bg-encre transition-all"
          style={{ width: `${fini ? 100 : progression}%` }}
        />
      </div>

      {!fini && (
        <section className="mt-10">
          <h1 className="font-titre text-3xl font-bold leading-tight">
            {QUESTIONS[etape].titre}
          </h1>
          <p className="mt-3 text-gris-chaud">{QUESTIONS[etape].aide}</p>
          <div className="mt-8 space-y-3">
            {QUESTIONS[etape].options.map((o) => (
              <button
                key={o.label}
                onClick={() => choisir(o.valeur)}
                className="block w-full border border-encre px-5 py-4 text-left text-lg font-medium active:bg-encre active:text-papier"
              >
                {o.label}
              </button>
            ))}
          </div>
        </section>
      )}

      {fini && <Resultat reponses={reponses} onRecommencer={recommencer} />}
    </main>
  );
}

function Resultat({
  reponses,
  onRecommencer,
}: {
  reponses: number[];
  onRecommencer: () => void;
}) {
  const [clients, minutes, tarif] = reponses;
  const heuresMois = arrondi((clients * minutes) / 60);
  const heuresAn = Math.round(heuresMois * 12);
  const caAn = clients * tarif * 12;
  const gain = arrondi((clients * minutes - clients) / 60);

  return (
    <section className="mt-10">
      <h1 className="font-titre text-3xl font-bold leading-tight">
        Voilà ce que ça te coûte aujourd&apos;hui.
      </h1>

      <div className="mt-6 border-y border-filet">
        <div className="border-b border-filet py-4">
          <p className="text-sm text-gris-chaud">Temps passé sur les bilans</p>
          <p className="mt-1 text-3xl font-semibold">{fr(heuresMois)} h par mois</p>
          <p className="text-gris-chaud">
            soit {fr(heuresAn)} h par an, pour {fr(clients)} clients.
          </p>
        </div>
        <div className="py-4">
          <p className="text-sm text-gris-chaud">
            Chiffre d&apos;affaires qui repose sur ce que tes clients voient
          </p>
          <p className="mt-1 text-3xl font-semibold">{fr(caAn)} € par an</p>
          <p className="text-gris-chaud">
            Un client qui ne voit pas ce qu&apos;il a eu pour son argent est un
            client qui peut arrêter.
          </p>
        </div>
      </div>

      <h2 className="mt-10 font-titre text-2xl font-bold leading-tight">
        Avec Bilan : une minute par client.
      </h2>
      <p className="mt-3 text-lg">
        Tu passes <strong>{fr(clients)} min par mois</strong> au lieu de{" "}
        <strong>{fr(heuresMois)} h</strong>. Tu récupères{" "}
        <strong>{fr(gain)} h chaque mois</strong>, et chaque client reçoit son
        bilan le 1er, sans que tu y penses.
      </p>
      <p className="mt-3 text-xs text-gris-chaud">
        Estimation calculée à partir de tes réponses.
      </p>
              <Link
        href="/apercu"
        onClick={() => {
          try {
            sessionStorage.setItem(
              "bilan",
              JSON.stringify({ clients, minutes, tarif })
            );
          } catch {}
        }}
        className="mt-8 block bg-action px-6 py-4 text-center text-lg font-semibold text-white"
      >
        Voir mon premier bilan
      </Link>
      <button
        onClick={onRecommencer}
        className="mt-4 w-full py-3 text-center text-gris-chaud underline"
      >
        Refaire le calcul
      </button>
    </section>
  );
}
