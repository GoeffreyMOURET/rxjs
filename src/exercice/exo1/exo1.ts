import WebService from "../../service/web.service";
import ConsoleUtils from "../../utils/console.utils";


/**
 * L'objectif de ce premier exercice est de manipuler des données 
 * issue d'une pipeline qui pourrait correspondre aux réponses
 * d'un service contactant un backend
 */
export default class Exercice1 {
    public serviceWeb = new WebService()

    /**
     * Affiche dans la console (ConsoleUtils.log) les 10 premières notifications recues via la fonction
     * 'recupererNotifications' du service web
     */
    loggerNotifications(): void {

    }

    /**
     * Doit logger (ConsoleUtils.log) les 5 premiers titres des notifications de type INFO
     */
    loggerTitreInfo(): void {

    }

    /**
     * Doit logger (ConsoleUtils.log) les 2 premiers messages de type erreurs en y ajoutant 
     * la date et l'heure à laquelle la notification a été reçue. Le format attendu est le suivant :
     * 2011-10-05T14:48:00.000Z : Mon message de notification
     */
    loggerErreurAvecDate(): void {

    }

    /**
     * Doit logger (ConsoleUtils.log) toutes les 100ms les messages des notifications qui se sont écoulés durant les 100ms
     * Les logs doivent être regrouppés dans un objet de type : 
     * {
     *      INFO: [MessageNotif1, MessageNotif2, ...],
     *      WARNING: [MessageNotif3, MessageNotif4, ...],
     *      ERROR: [MessageNotif5, MessageNotif16, ...],
     * } 
     * Cet objet doit être émis toutes les 100ms. Si un type de notif ne possède pas de notification associée, une liste vide doit être mise à la place. 
     * On veut logguer les 3 premiers regroupements de notifications.
     */
    loggerNotificationParNiveau(): void {

    }
} 