import { interval, Observable, map, filter, delay, of, ReplaySubject, take, throwError } from "rxjs";
import NotificationModele from "../modele/notification.modele";
import { NOTIFICATIONS } from "../constante/notification.constante";
import UtilisateurModele from "../modele/utilisateur.modele";
import { idtInconnu, UTILISTEURS } from "../constante/utilisateur.constante";
import { MailModele, MailReponseModele } from "../modele/mail.modele";
import CallbackService from "./callback.service";

export default class WebService {
    private notifications$: Observable<NotificationModele>;
    
    constructor(
        private readonly callbackService ?: CallbackService
    ) {
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

    envoyerMail(infoMail: MailModele): Observable<MailReponseModele> {
        if (!this.callbackService?.serveurInstalle) {
            return throwError(() => new Error('Le serveur n\'a pas été installé'));
        }
        return of(true).pipe(
            delay(10),
            map((): MailReponseModele => ({ 
                ...infoMail, 
                statutEnvoi: infoMail.idtDestinataire === idtInconnu ? 'KO' : 'OK', 
            }))
        )
    }
}