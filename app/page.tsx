export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-10 pt-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-gris-chaud">
        Bilan
      </p>

      <h1 className="mt-6 font-titre text-4xl font-bold leading-tight">
        Le bilan mensuel de tes clients, envoyé sans y penser.
      </h1>

      <p className="mt-4 text-lg leading-snug text-gris-chaud">
        Ton client veut savoir ce qu&apos;il a eu pour son argent. Sans bilan, le
        contrat s&apos;arrête. Bilan le fait en une minute par mois.
      </p>

      <div className="mt-8 border-y border-filet py-4">
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b border-filet">
              <td className="py-2 text-gris-chaud">Publications</td>
              <td className="py-2 text-right font-semibold">24</td>
            </tr>
            <tr className="border-b border-filet">
              <td className="py-2 text-gris-chaud">Vues</td>
              <td className="py-2 text-right font-semibold">48 300</td>
            </tr>
            <tr>
              <td className="py-2 text-gris-chaud">Nouveaux abonnés</td>
              <td className="py-2 text-right font-semibold">+312</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-2 text-xs text-gris-chaud">
          Exemple de bilan envoyé à un client.
        </p>
      </div>

      <ul className="mt-8 space-y-3 text-base">
        <li>
          <strong>Une minute</strong> pour saisir les chiffres du mois.
        </li>
        <li>
          <strong>À tes couleurs</strong> : le rapport est mis en page seul.
        </li>
        <li>
          <strong>Le 1er du mois</strong> : envoi automatique, avec accusé de
          lecture.
        </li>
      </ul>

      <a
        href="#"
        className="mt-10 block bg-action px-6 py-4 text-center text-lg font-semibold text-white"
      >
        Commencer, c&apos;est gratuit
      </a>
    </main>
  );
}
