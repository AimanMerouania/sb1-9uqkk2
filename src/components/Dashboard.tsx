import { PieChart, Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { Transaction } from '../types';
import { useEffect, useState } from 'react';

interface DashboardProps {
  transactions: Transaction[];
  soldeTotal: number;
}

export default function Dashboard({ transactions, soldeTotal }: DashboardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const depensesTotales = transactions
    .filter(t => t.type === 'depense')
    .reduce((acc, curr) => acc + curr.montant, 0);

  const revenusTotaux = transactions
    .filter(t => t.type === 'revenu')
    .reduce((acc, curr) => acc + curr.montant, 0);

  if (!mounted) return null;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Solde total</p>
              <p className="text-2xl font-bold text-gray-900">{soldeTotal.toLocaleString('fr-FR')} €</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Wallet className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Revenus du mois</p>
              <p className="text-2xl font-bold text-green-600">+{revenusTotaux.toLocaleString('fr-FR')} €</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Dépenses du mois</p>
              <p className="text-2xl font-bold text-red-600">-{depensesTotales.toLocaleString('fr-FR')} €</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <TrendingDown className="text-red-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <PieChart className="text-indigo-600" />
            Répartition des dépenses
          </h2>
          <div className="h-64 flex items-center justify-center">
            {/* Emplacement pour le graphique */}
            <p className="text-gray-500">Graphique de répartition des dépenses</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Dernières transactions</h2>
          <div className="space-y-4">
            {transactions.slice(0, 5).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.categorie}</p>
                </div>
                <p className={`font-semibold ${
                  transaction.type === 'depense' ? 'text-red-600' : 'text-green-600'
                }`}>
                  {transaction.type === 'depense' ? '-' : '+'}
                  {transaction.montant.toLocaleString('fr-FR')} €
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}