import { interval, Observable, map, merge, of } from "rxjs";
import { TypeNotification } from "../modele/notification.modele";
import { idtInconnu, idtJohnDoe, idtKateSmith, idtUtilisateurActuel } from "../constante/utilisateur.constante";

const NOTIF_POSSIBLES: TypeNotification[] = ["ERROR", "INFO", "WARNING"];

const IDTS_UTILISATEUR_POSSIBLES: string[] = [idtJohnDoe, idtKateSmith, idtUtilisateurActuel, idtInconnu];

export default class InputUtilisateurService {
    /**
     * Renvoie un observable simulant la sélection du type de notification de l'utilisateur.
     * Cet observable émet sa première valeur dès qu'on s'y abonne
     * @returns observable simulant la sélection du type de notification de l'utilisateur
     */
    recupererTypeNotificationSelectionnee(): Observable<TypeNotification | undefined> {
        return merge(of(0), interval(200)).pipe(
            map((i) => i%10 === 0 ? undefined : NOTIF_POSSIBLES[i%NOTIF_POSSIBLES.length]),
        )
    }

        /**
     * Renvoie un observable simulant la sélection de l'utilisateur
     * Cet observable émet sa première valeur dès qu'on s'y abonne
     * @returns observable simulant la sélection de l'utilisateur
     */
    recupererIdtUtilisateurSelectionne(): Observable<string | undefined> {
        return merge(of(-1), interval(80)).pipe(
            map((i) => i === -1 ? undefined : IDTS_UTILISATEUR_POSSIBLES[i%IDTS_UTILISATEUR_POSSIBLES.length])
        )
    }
}