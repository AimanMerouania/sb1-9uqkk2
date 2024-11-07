import { PieChart, BarChart, TrendingUp, AlertTriangle } from 'lucide-react';
import { Transaction } from '../types';

interface AnalyseDepensesProps {
  transactions: Transaction[];
}

export default function AnalyseDepenses({ transactions }: AnalyseDepensesProps) {
  const categoriesDepenses = transactions
    .filter((t) => t.type === 'depense')
    .reduce<{ [key: string]: number }>((acc, curr) => {
      acc[curr.categorie] = (acc[curr.categorie] || 0) + curr.montant;
      return acc;
    }, {});

  const totalDepenses = Object.values(categoriesDepenses).reduce((a, b) => a + b, 0);

  const moyenneMensuelle = totalDepenses / (transactions.length ? 1 : 1);
  const dernierMois = transactions
    .filter((t) => t.type === 'depense')
    .filter((t) => {
      const date = new Date(t.date);
      const maintenant = new Date();
      return (
        date.getMonth() === maintenant.getMonth() &&
        date.getFullYear() === maintenant.getFullYear()
      );
    })
    .reduce((acc, curr) => acc + curr.montant, 0);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <BarChart className="text-indigo-600" />
        Analyse des dépenses
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Répartition par catégorie</h3>
          <div className="space-y-3">
            {Object.entries(categoriesDepenses).map(([categorie, montant]) => (
              <div key={categorie}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{categorie}</span>
                  <span className="font-medium">
                    {((montant / totalDepenses) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${(montant / totalDepenses) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Insights</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="text-blue-600" size={20} />
                <h4 className="font-medium text-blue-900">Tendance mensuelle</h4>
              </div>
              <p className="text-sm text-blue-800">
                Dépenses ce mois-ci : {dernierMois.toLocaleString('fr-FR')} €
                <br />
                Moyenne mensuelle : {moyenneMensuelle.toLocaleString('fr-FR')} €
              </p>
            </div>

            {dernierMois > moyenneMensuelle && (
              <div className="p-4 bg-amber-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="text-amber-600" size={20} />
                  <h4 className="font-medium text-amber-900">Attention</h4>
                </div>
                <p className="text-sm text-amber-800">
                  Vos dépenses ce mois-ci sont supérieures à votre moyenne mensuelle de{' '}
                  {(((dernierMois - moyenneMensuelle) / moyenneMensuelle) * 100).toFixed(1)}%
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}