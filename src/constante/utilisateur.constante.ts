import UtilisateurModele from "../modele/utilisateur.modele";

export const idtUtilisateurActuel = '9ee3f416-2964-4026-833c-2f236c77cb42';

export const idtJohnDoe = 'a5ded7e5-35bc-42b9-b9e4-dd6860324540';

export const idtKateSmith = '4e4d3b1d-8a09-4fae-82f5-34082a90c25e';

export const idtInconnu = 'f00d63e8-9493-4280-8eb0-540146f6438e';

export const UTILISTEURS: UtilisateurModele[] = [
    {
        idt: idtUtilisateurActuel,
        nationnalite: 'FR',
        prenom: 'Anaëlle',
        nom: 'Durand',
        role: 'SUPER-ADMIN',
    },
    {
        idt: idtJohnDoe,
        nationnalite: 'EN',
        prenom: 'John',
        nom: 'Doe',
        role: 'ADMIN',
    },
    {
        idt: idtKateSmith,
        nationnalite: 'EN',
        prenom: 'Kate',
        nom: 'Smith',
        role: 'USER',
    },
    
]

