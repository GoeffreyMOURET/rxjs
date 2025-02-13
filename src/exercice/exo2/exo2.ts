import { EMPTY, Observable } from "rxjs";
import NotificationModele from "../../modele/notification.modele";
import UtilisateurModele, { Role } from "../../modele/utilisateur.modele";
import WebService from "../../service/web.service";
import ConsoleUtils from "../../utils/console.utils";

/**
 * L'objectif de cet exercice est de réagir à des données reçues dans une pipeline
 * en contactant un autre service asynchrone pour en extraire des infos.
 * 
 * Les signatures des fonctions ne sont pas à changer
 */
export default class Exercice2 {
    private serviceWeb = new WebService();

    /**
     * Doit créer une fonction qui expose une pipeline de données qui va réémettre les informations utilisateurs des notifications d'erreurs.
     * Seules les notifications d'erreur avec un idtUtilisateur de renseigné doivent provoquer une émission de données.
     * 
     * L'ordre de la réémission ne nous importe pas
     */
    transmettreInfoUtilisateurDeNotificationErreur(): Observable<UtilisateurModele> {
        return EMPTY;
    }

    /**
     * Doit créer une fonction qui expose une pipeline de données qui va réémettre et enrichir les 
     * notifications d'erreur ou de warning émises par serviceWeb.recupererNotifications en ajoutant le rôle de l'utilisateur
     * transmis dans l'objet.
     * 
     * L'ordre de la réémission nous importe ! Les données doivent être réémises dans le même ordre que 
     * l'ordre d'émission de serviceWeb.recupererNotifications.
     *
     * Les données des utilisateurs sont récupérées via le service serviceWeb.recupererUtilisateur
     */
    transmettreErreursEtWarningsEnrichis(): Observable<NotificationModele & { role ?: Role, }> {
        return EMPTY;
    }

    /**
     * On reprend la pipeline ci-dessus et maintenant on retire le filtre sur le type de notification
     * ATTENTION : serviceWeb.recupererUtilisateur peut renvoyer une erreur si jamais l'utilisateur donné
     * n'est pas trouvé. Si ce cas est rencontré, on vous demande alors de ne pas interrompre votre
     * pipeline et de compléter le rôle avec la valeur INCONNU. il vous faudra aussi logger l'erreur rencontrée
     * grâce à la fonction ConsoleUtils.error
     * 
     * L'ordre de la réémission nous importe ! Les données doivent être réémises dans le même ordre que 
     * l'ordre d'émission de serviceWeb.recupererNotifications.
     */
    transmettreToutesNotificationsEnrichies(): Observable<NotificationModele & { role ?: Role, }> {
        return EMPTY;
    }

    
}