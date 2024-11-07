import Dashboard from '../components/Dashboard';
import ObjectifsEpargne from '../components/ObjectifsEpargne';
import AnalyseDepenses from '../components/AnalyseDepenses';
import RevenuMensuelCard from '../components/RevenuMensuelCard';
import { Transaction, Objectif, RevenuMensuel } from '../types';

interface TableauDeBordProps {
  transactions: Transaction[];
  soldeTotal: number;
  objectifs: Objectif[];
  onAjoutObjectif: (objectif: Omit<Objectif, 'id'>) => void;
  revenuMensuel: RevenuMensuel | null;
}

export default function TableauDeBord({
  transactions,
  soldeTotal,
  objectifs,
  onAjoutObjectif,
  revenuMensuel,
}: TableauDeBordProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <Dashboard transactions={transactions} soldeTotal={soldeTotal} />
        <AnalyseDepenses transactions={transactions} />
      </div>
      <div className="space-y-8">
        <RevenuMensuelCard revenuMensuel={revenuMensuel} />
        <ObjectifsEpargne objectifs={objectifs} onAjoutObjectif={onAjoutObjectif} />
      </div>
    </div>
  );
}