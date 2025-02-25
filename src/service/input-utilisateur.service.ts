import { interval, Observable, map, merge, of, ReplaySubject, take } from "rxjs";
import { TypeNotification } from "../modele/notification.modele";
import { idtInconnu, idtJohnDoe, idtKateSmith, idtUtilisateurActuel } from "../constante/utilisateur.constante";

const NOTIF_POSSIBLES: TypeNotification[] = ["ERROR", "INFO", "WARNING"];

const IDTS_UTILISATEUR_POSSIBLES: string[] = [idtJohnDoe, idtKateSmith, idtUtilisateurActuel, idtInconnu];

export default class InputUtilisateurService {

    private typeNotificationSelectionnee$: Observable<TypeNotification | undefined>;
    private idtUtilisateurSelectionne$: Observable<string | undefined>;

    constructor() {
        const controleurIdtUtilisateur = new ReplaySubject<string | undefined>();
        merge(of(-1), interval(80)).pipe(
            take(500),
            map((i) => i === -1 ? undefined : IDTS_UTILISATEUR_POSSIBLES[i%IDTS_UTILISATEUR_POSSIBLES.length])
        ).subscribe((resultat) => controleurIdtUtilisateur.next(resultat));
        this.idtUtilisateurSelectionne$ = controleurIdtUtilisateur.asObservable();

        const controleurTypeNotif = new ReplaySubject<TypeNotification | undefined>();
        merge(of(0), interval(200)).pipe(
            take(500),
            map((i) => i%10 === 0 ? undefined : NOTIF_POSSIBLES[i%NOTIF_POSSIBLES.length]),
        ).subscribe((resultat) => controleurTypeNotif.next(resultat));
        this.typeNotificationSelectionnee$ = controleurTypeNotif.asObservable();
    }

    /**
     * Renvoie un observable simulant la sélection du type de notification de l'utilisateur.
     * Cet observable émet sa première valeur dès qu'on s'y abonne
     * @returns observable simulant la sélection du type de notification de l'utilisateur
     */
    recupererTypeNotificationSelectionnee(): Observable<TypeNotification | undefined> {
        return this.typeNotificationSelectionnee$;
    }

        /**
     * Renvoie un observable simulant la sélection de l'utilisateur
     * Cet observable émet sa première valeur dès qu'on s'y abonne
     * @returns observable simulant la sélection de l'utilisateur
     */
    recupererIdtUtilisateurSelectionne(): Observable<string | undefined> {
        return this.idtUtilisateurSelectionne$;
    }
}