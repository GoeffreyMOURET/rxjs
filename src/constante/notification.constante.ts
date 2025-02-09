import NotificationModele from "../modele/notification.modele";
import { idtInconnu, idtJohnDoe, idtKateSmith, idtUtilisateurActuel } from "./utilisateur.constante";

export const NOTIFICATIONS: NotificationModele[] = [
    {
        titre: 'Bienvenue',
        message: 'Bienvenue dans la nouvelle application',
        type: 'INFO',
        idUtilisateur: idtUtilisateurActuel,
    },
    {
        titre: 'Nouveau Message',
        message: 'Vous avez reçu un nouveau message',
        type: 'INFO',
    },
    {
        titre: 'Nouvel Utilisateur',
        message: 'Un nouvel utilisateur s\'est inscrit',
        type: 'INFO',
        idUtilisateur: idtInconnu,
    },
    {
        titre: 'Mauvaise connexion',
        message: 'Une tentative de connexion au compte de John Doe a été effectuée avec un mauvais mot de passe',
        type: 'WARNING',
    },
    {
        titre: 'Mauvaise connexion',
        message: 'Une tentative de connexion au compte de Kate Smith a été effectuée avec un mauvais mot de passe',
        type: 'WARNING',
    },
    {
        titre: 'Perte de la connexion',
        message: 'La connexion a été perdue',
        type: 'ERROR',
        idUtilisateur: idtJohnDoe,
    },
    {
        titre: 'Erreur inattendue',
        message: 'Une erreur a été rencontrée dans le traitement de la notification',
        type: 'ERROR',
        idUtilisateur: idtKateSmith,
    },
]