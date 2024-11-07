import { Wallet, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg transition-colors ${
      isActive
        ? 'bg-indigo-700 text-white'
        : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
    }`;

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <header className="bg-indigo-600 text-white py-4 px-6 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 hover:text-indigo-200 transition-colors">
          <Wallet size={32} />
          <h1 className="text-2xl font-bold">MonBudget</h1>
        </NavLink>
        <div className="flex items-center gap-6">
          <nav className="flex gap-4">
            <NavLink to="/" className={navLinkClass}>
              Tableau de bord
            </NavLink>
            <NavLink to="/transactions" className={navLinkClass}>
              Transactions
            </NavLink>
            <NavLink to="/budgets" className={navLinkClass}>
              Budgets
            </NavLink>
          </nav>
          <div className="flex items-center gap-4 pl-4 border-l border-indigo-500">
            <span className="text-sm">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <LogOut size={20} />
              <span className="text-sm">Déconnexion</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}