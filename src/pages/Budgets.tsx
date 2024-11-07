import { useState } from 'react';
import { Transaction, Budget } from '../types';
import { Plus, Wallet } from 'lucide-react';

interface BudgetsProps {
  budgets: Budget[];
  transactions: Transaction[];
  onAddBudget: (budget: Omit<Budget, 'id' | 'depense'>) => void;
}

export default function Budgets({ budgets, transactions, onAddBudget }: BudgetsProps) {
  const [nouveauBudget, setNouveauBudget] = useState({
    categorie: '',
    montant: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nouveauBudget.categorie || !nouveauBudget.montant) return;

    onAddBudget({
      categorie: nouveauBudget.categorie,
      montant: parseFloat(nouveauBudget.montant),
    });

    setNouveauBudget({ categorie: '', montant: '' });
  };

  const calculerDepenses = (categorie: string) => {
    return transactions
      .filter((t) => t.type === 'depense' && t.categorie === categorie)
      .reduce((acc, curr) => acc + curr.montant, 0);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Suivi des budgets</h2>
          <div className="space-y-6">
            {budgets.map((budget) => {
              const depenses = calculerDepenses(budget.categorie);
              const pourcentage = (depenses / budget.montant) * 100;
              
              return (
                <div key={budget.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Wallet className="text-indigo-600" size={20} />
                      <h3 className="font-semibold">{budget.categorie}</h3>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">
                        {depenses.toLocaleString('fr-FR')} €
                      </span>
                      {' / '}
                      <span className="text-gray-500">
                        {budget.montant.toLocaleString('fr-FR')} €
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        pourcentage > 100
                          ? 'bg-red-600'
                          : pourcentage > 80
                          ? 'bg-yellow-500'
                          : 'bg-green-600'
                      }`}
                      style={{ width: `${Math.min(pourcentage, 100)}%` }}
                    />
                  </div>

                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-gray-500">
                      {pourcentage.toFixed(1)}% utilisé
                    </span>
                    <span className={pourcentage > 100 ? 'text-red-600' : 'text-gray-600'}>
                      Reste: {Math.max(budget.montant - depenses, 0).toLocaleString('fr-FR')} €
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Plus className="text-indigo-600" />
            Nouveau budget
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Catégorie
              </label>
              <select
                value={nouveauBudget.categorie}
                onChange={(e) =>
                  setNouveauBudget({ ...nouveauBudget, categorie: e.target.value })
                }
                className="w-full rounded-lg"
                required
              >
                <option value="">Sélectionner une catégorie</option>
                <option value="Alimentation">Alimentation</option>
                <option value="Transport">Transport</option>
                <option value="Loisirs">Loisirs</option>
                <option value="Factures">Factures</option>
                <option value="Shopping">Shopping</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Montant mensuel
              </label>
              <input
                type="number"
                value={nouveauBudget.montant}
                onChange={(e) =>
                  setNouveauBudget({ ...nouveauBudget, montant: e.target.value })
                }
                className="w-full rounded-lg"
                placeholder="0.00"
                step="0.01"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Créer le budget
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}