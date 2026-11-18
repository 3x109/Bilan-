"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const COULEURS = [
  { nom: "Bleu nuit", hex: "#14213d" },
  { nom: "Orange", hex: "#e8590c" },
  { nom: "Vert", hex: "#2b6e4f" },
];

const nombre = (v: string) => {
  const n = parseInt(v.replace(/\D/g, ""), 10);
  return isNaN(n) ? 0 : n;
};
const fr = (n: number) => n.toLocaleString("fr-FR");

export default function Apercu() {
  const [client, setClient] = useState("");
  const [pub, setPub] = useState("24");
  const [vues, setVues] = useState("48300");
  const [abo, setAbo] = useState("312");
  const [couleur, setCouleur] = useState(COULEURS[0].hex);
  const [mois, setMois] = useState("le mois dernier");

  useEffect(() => {
    const d = new Date();
    const m = new Date(d.getFullYear(), d.getMonth() - 1, 1);
    setMois(m.toLocaleDateString("fr-FR", { month: "long", year: "numeric" }));
  }, []);

  const champ =
    "mt-1 w-full border border-encre bg-white px-4 py-3 text-base";

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-10 pt-6">
      <div className="flex items-center justify-between text-sm text-gris-chaud">
        <Link href="/commencer" className="py-2">
          ← Retour
        </Link>
        <span>Ton avant-goût</span>
      </div>

      <h1 className="mt-6 font-titre text-3xl font-bold leading-tight">
        Fais ton premier bilan. Ça prend une minute.
      </h1>
      <p className="mt-3 text-gris-chaud">
        Saisis les chiffres d&apos;un client. Le rapport se met en page tout
        seul.
      </p>

      <div className="mt-6 space-y-4">
        <label className="block text-sm font-medium">
          Nom du client
          <input
            className={champ}
            value={client}
            onChange={(e) => setClient(e.target.value)}
            placeholder="Ex. Atelier Moreau"
          />
        </label>
        <div className="grid grid-cols-3 gap-3">
          <label className="block text-sm font-medium">
            Publications
            <input
              className={champ}
              inputMode="numeric"
              value={pub}
              onChange={(e) => setPub(e.target.value)}
            />
          </label>
          <label className="block text-sm font-medium">
            Vues
            <input
              className={champ}
              inputMode="numeric"
              value={vues}
              onChange={(e) => setVues(e.target.value)}
            />
          </label>
          <label className="block text-sm font-medium">
            Abonnés
            <input
              className={champ}
              inputMode="numeric"
              value={abo}
              onChange={(e) => setAbo(e.target.value)}
            />
          </label>
        </div>

        <fieldset>
          <legend className="text-sm font-medium">Ta couleur</legend>
          <div className="mt-2 flex gap-3">
            {COULEURS.map((c) => (
              <button
                key={c.hex}
                type="button"
                onClick={() => setCouleur(c.hex)}
                aria-label={c.nom}
                aria-pressed={couleur === c.hex}
                className="h-11 w-11 border-2"
                style={{
                  backgroundColor: c.hex,
                  borderColor: couleur === c.hex ? "#14213d" : "transparent",
                  outline: couleur === c.hex ? "2px solid #faf7f2" : "none",
                  outlineOffset: "-4px",
                }}
              />
            ))}
          </div>
        </fieldset>
      </div>

      <div className="mt-8 border border-filet bg-white">
        <div className="px-5 py-4 text-white" style={{ backgroundColor: couleur }}>
          <p className="text-xs uppercase tracking-widest opacity-80">
            Bilan de {mois}
          </p>
          <p className="mt-1 font-titre text-2xl font-bold">
            {client.trim() || "Ton client"}
          </p>
        </div>
        <table className="w-full text-base">
          <tbody>
            <tr className="border-b border-filet">
              <td className="px-5 py-3 text-gris-chaud">Publications</td>
              <td className="px-5 py-3 text-right font-semibold">
                {fr(nombre(pub))}
              </td>
            </tr>
            <tr className="border-b border-filet">
              <td className="px-5 py-3 text-gris-chaud">Vues</td>
              <td className="px-5 py-3 text-right font-semibold">
                {fr(nombre(vues))}
              </td>
            </tr>
            <tr>
              <td className="px-5 py-3 text-gris-chaud">Nouveaux abonnés</td>
              <td
                className="px-5 py-3 text-right font-semibold"
                style={{ color: couleur }}
              >
                +{fr(nombre(abo))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 font-titre text-xl font-bold">
        La suite, avec Bilan
      </h2>
      <ul className="mt-3 border-y border-filet">
        {[
          "Envoi automatique le 1er du mois",
          "Accusé de lecture par ton client",
          "Jusqu'à 10 clients suivis",
        ].map((t) => (
          <li
            key={t}
            className="flex items-center justify-between border-b border-filet py-3 last:border-b-0"
          >
            <span className="text-gris-chaud">{t}</span>
            <span className="text-xs font-semibold uppercase tracking-wide text-gris-chaud">
              Verrouillé
            </span>
          </li>
        ))}
      </ul>

      <Link
        href="/tarifs"
        className="mt-8 block bg-action px-6 py-4 text-center text-lg font-semibold text-white"
      >
        Garder mon bilan et le débloquer
      </Link>
    </main>
  );
}
