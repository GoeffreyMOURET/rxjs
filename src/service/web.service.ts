import { interval, Observable, map, filter, delay, of, ReplaySubject, take } from "rxjs";
import NotificationModele from "../modele/notification.modele";
import { NOTIFICATIONS } from "../constante/notification.constante";
import UtilisateurModele from "../modele/utilisateur.modele";
import { UTILISTEURS } from "../constante/utilisateur.constante";

export default class WebService {
    private notifications$: Observable<NotificationModele>;
    
    constructor() {
        const controleur = new ReplaySubject<NotificationModele>();
        interval(10).pipe(
            take(500),
            delay(100),
            map((n) => NOTIFICATIONS.at((n*3)%NOTIFICATIONS.length)),
            filter((n) => n != undefined),
            map((n) => ({ ...n, dateEmission: new Date()}))
        ).subscribe((notif) => controleur.next(notif));
        this.notifications$ = controleur.asObservable();
    }

    recupererNotifications(): Observable<NotificationModele> {
        return this.notifications$;
    }

    recupererUtilisateur(idtUtilisateur: string): Observable<UtilisateurModele> {
        const utilisateur = UTILISTEURS.find((u) => u.idt === idtUtilisateur)
        return of(utilisateur).pipe(
            delay(100 + (Math.random() * 200)),
            map((utilisateur) => {
                if (!utilisateur) throw new Error('Utilisateur non-trouvé');
                return utilisateur;
            })
        )
    }
}