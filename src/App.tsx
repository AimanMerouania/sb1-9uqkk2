import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TableauDeBord from './pages/TableauDeBord';
import Transactions from './pages/Transactions';
import Budgets from './pages/Budgets';
import RevenuModal from './components/RevenuModal';
import { Transaction, Budget, Objectif, RevenuMensuel } from './types';
import { useFirestore } from './hooks/useFirestore';

function App() {
  const [showRevenuModal, setShowRevenuModal] = useState(false);
  const { 
    data: transactions,
    add: addTransaction
  } = useFirestore<Transaction>('transactions');
  
  const {
    data: objectifs,
    add: addObjectif
  } = useFirestore<Objectif>('objectifs');
  
  const {
    data: budgets,
    add: addBudget
  } = useFirestore<Budget>('budgets');
  
  const {
    data: revenusMensuels,
    add: addRevenuMensuel
  } = useFirestore<RevenuMensuel>('revenusMensuels');

  const revenuMensuel = revenusMensuels[0] || null;

  const verifierRevenuMensuel = useCallback(() => {
    const maintenant = new Date();
    const moisActuel = `${maintenant.getFullYear()}-${String(maintenant.getMonth() + 1).padStart(2, '0')}`;

    if (!revenuMensuel || revenuMensuel.mois !== moisActuel) {
      setShowRevenuModal(true);
    }
  }, [revenuMensuel]);

  useEffect(() => {
    verifierRevenuMensuel();
  }, [verifierRevenuMensuel]);

  const handleAddRevenuMensuel = async (nouveauRevenu: Omit<RevenuMensuel, 'id' | 'dateCreation'>) => {
    await addRevenuMensuel({
      ...nouveauRevenu,
      dateCreation: new Date().toISOString(),
    });

    await addTransaction({
      montant: nouveauRevenu.montant,
      description: nouveauRevenu.description || 'Revenu mensuel',
      categorie: 'Salaire',
      date: new Date().toISOString(),
      type: 'revenu',
    });

    setShowRevenuModal(false);
  };

  const soldeTotal = transactions.reduce((acc, curr) => {
    return curr.type === 'depense' 
      ? acc - curr.montant 
      : acc + curr.montant;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <div className="min-h-screen">
                <Header />
                <main className="container mx-auto py-8 px-4">
                  <Routes>
                    <Route 
                      path="/" 
                      element={
                        <TableauDeBord 
                          transactions={transactions}
                          soldeTotal={soldeTotal}
                          objectifs={objectifs}
                          onAjoutObjectif={addObjectif}
                          revenuMensuel={revenuMensuel}
                        />
                      } 
                    />
                    <Route 
                      path="/transactions" 
                      element={
                        <Transactions 
                          transactions={transactions}
                          onAddTransaction={addTransaction}
                        />
                      } 
                    />
                    <Route 
                      path="/budgets" 
                      element={
                        <Budgets 
                          budgets={budgets}
                          transactions={transactions}
                          onAddBudget={addBudget}
                        />
                      } 
                    />
                  </Routes>
                </main>

                {showRevenuModal && (
                  <RevenuModal
                    onClose={() => setShowRevenuModal(false)}
                    onSubmit={handleAddRevenuMensuel}
                  />
                )}
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;