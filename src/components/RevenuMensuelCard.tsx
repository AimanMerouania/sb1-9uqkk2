import { Banknote } from 'lucide-react';
import { RevenuMensuel } from '../types';

interface RevenuMensuelCardProps {
  revenuMensuel: RevenuMensuel | null;
}

export default function RevenuMensuelCard({ revenuMensuel }: RevenuMensuelCardProps) {
  if (!revenuMensuel) return null;

  const moisFormate = new Date(revenuMensuel.mois + '-01').toLocaleDateString('fr-FR', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Banknote className="text-indigo-600" />
          Revenu mensuel
        </h2>
        <span className="text-sm text-gray-500">{moisFormate}</span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Montant</span>
          <span className="text-2xl font-bold text-green-600">
            {revenuMensuel.montant.toLocaleString('fr-FR')} €
          </span>
        </div>

        {revenuMensuel.description && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Description</span>
            <span className="text-gray-900">{revenuMensuel.description}</span>
          </div>
        )}

        <div className="text-sm text-gray-500 pt-2">
          Prochain revenu à renseigner le mois prochain
        </div>
      </div>
    </div>
  );
}