export default interface UtilisateurModele {
    idt: string;

    nom: string;

    prenom: string;

    nationnalite: string;

    role: Role;
}

export type Role = 'USER' | 'ADMIN' | 'SUPER-ADMIN' | 'INCONNU';