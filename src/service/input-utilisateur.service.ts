import { interval, Observable, map } from "rxjs";
import { TypeNotification } from "../modele/notification.modele";
import { idtInconnu, idtJohnDoe, idtKateSmith, idtUtilisateurActuel } from "../constante/utilisateur.constante";

const NOTIF_POSSIBLES: TypeNotification[] = ["ERROR", "INFO", "WARNING"];

const IDTS_UTILISATEUR_POSSIBLES: string[] = [idtJohnDoe, idtKateSmith, idtUtilisateurActuel, idtInconnu];

export default class InputUtilisateurService {
    recupererTypeNotificationSelectionnee(): Observable<TypeNotification> {
        return interval(200).pipe(
            map((i) => NOTIF_POSSIBLES[i%NOTIF_POSSIBLES.length])
        )
    }

    recupererIdtUtilisateurSelectionne(): Observable<string> {
        return interval(500).pipe(
            map((i) => IDTS_UTILISATEUR_POSSIBLES[i%IDTS_UTILISATEUR_POSSIBLES.length])
        )
    }
}