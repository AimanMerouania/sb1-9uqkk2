import { Target, Sparkles, TrendingUp } from 'lucide-react';
import { Objectif } from '../types';

interface ObjectifsEpargneProps {
  objectifs: Objectif[];
  onAjoutObjectif: (objectif: Omit<Objectif, 'id'>) => void;
}

export default function ObjectifsEpargne({ objectifs, onAjoutObjectif }: ObjectifsEpargneProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Target className="text-indigo-600" />
        Objectifs d'épargne
      </h2>

      <div className="space-y-6">
        {objectifs.map((objectif) => (
          <div key={objectif.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="text-yellow-500" size={20} />
                <h3 className="font-semibold">{objectif.titre}</h3>
              </div>
              <span className="text-sm text-gray-500">
                Date limite: {new Date(objectif.dateLimite).toLocaleDateString('fr-FR')}
              </span>
            </div>

            <div className="mb-2">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{objectif.montantActuel.toLocaleString('fr-FR')} €</span>
                <span>{objectif.montantCible.toLocaleString('fr-FR')} €</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all"
                  style={{
                    width: `${Math.min(
                      (objectif.montantActuel / objectif.montantCible) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">
                {((objectif.montantActuel / objectif.montantCible) * 100).toFixed(1)}% atteint
              </span>
              <span className="text-indigo-600 font-medium">
                Reste {(objectif.montantCible - objectif.montantActuel).toLocaleString('fr-FR')} €
              </span>
            </div>
          </div>
        ))}

        <button
          onClick={() => {
            onAjoutObjectif({
              titre: 'Nouvel objectif',
              montantCible: 1000,
              montantActuel: 0,
              dateLimite: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
              categorie: 'Épargne',
              couleur: '#4F46E5',
            });
          }}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <TrendingUp size={20} />
          <span>Ajouter un objectif</span>
        </button>
      </div>
    </div>
  );
}