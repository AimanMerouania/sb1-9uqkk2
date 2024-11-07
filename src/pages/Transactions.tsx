import TransactionForm from '../components/TransactionForm';
import { Transaction } from '../types';
import { Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface TransactionsProps {
  transactions: Transaction[];
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

export default function Transactions({ transactions, onAddTransaction }: TransactionsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Historique des transactions</h2>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'depense' ? 'bg-red-100' : 'bg-green-100'
                  }`}>
                    {transaction.type === 'depense' ? (
                      <ArrowDownRight className="text-red-600" size={20} />
                    ) : (
                      <ArrowUpRight className="text-green-600" size={20} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{transaction.categorie}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{new Date(transaction.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                  </div>
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
      <div>
        <TransactionForm onAddTransaction={onAddTransaction} />
      </div>
    </div>
  );
}