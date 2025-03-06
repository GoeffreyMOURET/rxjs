import { Observable, ReplaySubject, switchMap, tap, map, noop } from "rxjs";
import CallbackService from "../../service/callback.service";
import WebService from "../../service/web.service";

export default class Exercice4 {
  callbackService = new CallbackService();
  webService = new WebService(this.callbackService);

  /**
   * Doit transformer la méthode afficherQuestion présente dans le service callbackService 
   * en une fonction intégrable dans une pipeline RXJS, qui renvoie un observable contenant la 
   * réponse obtenue (booléen). L'observable contenant la réponse doit émettre la réponse uniquement lorsque 
   * la fonction de callback a fini d'être exécutée.
   * 
   * @param question : Intitulé de la question
   * @param callbackReponse : Action à effectuer en fonction de la réponse de l'utilisateur
   * @returns : Un observable qui suit la réponse de l'utilisateur.
   */
  afficherQuestion$(
    question: string,
    callbackReponse: (reponse: boolean) => void
  ): Observable<boolean> {
    const reponseNotifieur = new ReplaySubject<boolean>(1);
    
    const callbackAvecNotifieur = (reponse: boolean) => {
      callbackReponse(reponse);
      reponseNotifieur.next(reponse);
      reponseNotifieur.complete();
    }

    this.callbackService.afficherQuestion(question, callbackAvecNotifieur);
    
    return reponseNotifieur.asObservable();
  }


  URL_SERVEUR_MAIL = 'https://mon-super-serveur-mail.com';
  PORT = 8080;

  /**
   * Doit renvoyer un observable émettant lorsque le mail a été correctement envoyé. Pour envoyer le mail,
   * il faudra bien penser à mettre en place le serveur mail (callbackService.mettreEnPlaceServuerMail) puis
   * ensuite envoyer le mail (webService.envoyerMail).
   * Si jamais la mise en place du serveur de mail échoue, une erreur avec comme message le string suivant : 
   * 'Erreur lors de la mise en place du serveur de mail' doit être émise.
   * Si jamais l'envoi du mail échoue, une erreur avec comme message le mstring suivant : 
   * 'Erreur lors de l\'envoi du mail' doit être émise.
   * 
   * @param contenuMail : contenu du mail
   * @param idtDestinataire : identifiant de l'utilisateur destinataire du mail
   * @returns : Un observable qui émet lorsque le mail a bien été envoyé
   */
  envoyerMail$(contenuMail: string, idtDestinataire: string): Observable<void> {
    const reussiteNotifieur = new ReplaySubject<boolean>(1);

    this.callbackService.mettreEnPlaceServeurMail(
      this.URL_SERVEUR_MAIL,
      this.PORT,
      (reussite) => {
        reussiteNotifieur.next(reussite);
        reussiteNotifieur.complete();
      }
    );
    
    return reussiteNotifieur.asObservable().pipe(
      tap((reussite) => {
        if (!reussite) throw new Error('Erreur lors de la mise en place du serveur de mail');
      }),
      switchMap(() => this.webService.envoyerMail({ contenu: contenuMail, idtDestinataire, })),
      tap((reponseMail) => {
        if (reponseMail.statutEnvoi === 'KO') throw new Error('Erreur lors de l\'envoi du mail');
      }),
      map(noop)
    );
    
  }
}