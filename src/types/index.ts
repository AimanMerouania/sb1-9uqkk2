export interface Transaction {
  id: string;
  montant: number;
  categorie: string;
  description: string;
  date: string;
  type: 'depense' | 'revenu';
}

export interface Budget {
  id: string;
  categorie: string;
  montant: number;
  depense: number;
}

export interface Objectif {
  id: string;
  titre: string;
  montantCible: number;
  montantActuel: number;
  dateLimite: string;
  categorie: string;
  couleur: string;
}

export interface RevenuMensuel {
  id: string;
  montant: number;
  mois: string; // Format: 'YYYY-MM'
  description: string;
  dateCreation: string;
}

export interface Categorie {
  id: string;
  nom: string;
  couleur: string;
  icone: string;
}

export interface Prevision {
  mois: string;
  montantPrevu: number;
  montantReel: number;
  categories: {
    [key: string]: number;
  };
}