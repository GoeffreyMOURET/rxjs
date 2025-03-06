import { idtInconnu, idtJohnDoe } from "../../constante/utilisateur.constante";
import Exercice4 from "./exo4";

describe('Exercice 4', () => {
  let exo4: Exercice4;
  let donneesRecues: unknown[];
  let maintenant: Date;
  
  beforeEach(() => {
    exo4 = new Exercice4();
    maintenant = new Date('2021-10-05T14:48:00.000Z');
    jest.spyOn(global, 'Date').mockImplementation(() => maintenant);
    donneesRecues = [];
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('afficherQuestion$', () => {
    [true, false,].forEach((reponseUtilisateur) => {
      it('doit afficher la question puis émettre la réponse de l\'utilisateur lorque l\'utilisateur répond ' + 
        `${ reponseUtilisateur ? 'OUI' : 'NON' }`, (done) => {
        exo4.callbackService.reponseUtilisateur = reponseUtilisateur;
        
        const callbackReponse = jest.fn(() => {
          expect(donneesRecues.length).toEqual(0);
        });
        let aComplete = false;
        exo4.afficherQuestion$('question', callbackReponse).subscribe({
          error: () => done.fail('Une erreur s\'est produite'),
          next: (r) => donneesRecues.push(r),
          complete: () => aComplete = true,
        });
        jest.advanceTimersByTime(1000);

        expect(donneesRecues).toEqual([reponseUtilisateur,]);
        expect(callbackReponse).toHaveBeenCalledTimes(1);
        expect(callbackReponse).toHaveBeenLastCalledWith(reponseUtilisateur);
        expect(aComplete).toEqual(true);

        done();
      });
    });
  });

  describe('envoyerMail$', () => {
    it('doit envoyer le mail nominalement si tout se passe bien', (done) => {
      const spyMettreEnPlaceServeurMail = jest.spyOn(exo4.callbackService, 'mettreEnPlaceServeurMail');
      const spyEnvoyerMail = jest.spyOn(exo4.webService, 'envoyerMail');

      let aComplete = false;
      exo4.envoyerMail$('contenuMail', idtJohnDoe).subscribe({
        next: () => donneesRecues.push('MAIL ENVOYE'),
        error: done.fail,
        complete: () => aComplete = true,
      });

      jest.advanceTimersByTime(2000);

      expect(donneesRecues.length).toEqual(1);
      expect(spyMettreEnPlaceServeurMail).toHaveBeenCalledTimes(1);
      expect(spyMettreEnPlaceServeurMail).toHaveBeenLastCalledWith(
        exo4.URL_SERVEUR_MAIL,
        exo4.PORT,
        expect.any(Function)
      );
      expect(spyEnvoyerMail).toHaveBeenCalledTimes(1);
      expect(spyEnvoyerMail).toHaveBeenLastCalledWith({ 
        contenu: 'contenuMail', 
        idtDestinataire: idtJohnDoe, 
      });
      
      expect(aComplete).toEqual(true);
      done();
    });

    it('doit renvoyer une erreur si le serveur mail ne se configure pas bien', (done) => {
      exo4.callbackService.reussiteMiseEnPlaceServeurMail = false;
      const spyMettreEnPlaceServeurMail = jest.spyOn(exo4.callbackService, 'mettreEnPlaceServeurMail');
      const spyEnvoyerMail = jest.spyOn(exo4.webService, 'envoyerMail');

      let aComplete = false;
      exo4.envoyerMail$('contenuMail', idtJohnDoe).subscribe({
        next: () => done.fail(new Error('Aucune émission ne doit avoir été faite')),
        error: (err: unknown) => donneesRecues.push(err),
        complete: () => aComplete = true,
      });

      jest.advanceTimersByTime(2000);

      expect(donneesRecues.length).toEqual(1);
      expect(donneesRecues[0]).toEqual(expect.objectContaining({ message: 'Erreur lors de la mise en place du serveur de mail', }));
      expect(spyMettreEnPlaceServeurMail).toHaveBeenCalledTimes(1);
      expect(spyMettreEnPlaceServeurMail).toHaveBeenLastCalledWith(
        exo4.URL_SERVEUR_MAIL,
        exo4.PORT,
        expect.any(Function)
      );
      expect(spyEnvoyerMail).toHaveBeenCalledTimes(0);
      expect(aComplete).toEqual(false);
      done();
    });

    it('doit renvoyer une erreur si l\'envoi de mail ne se passe pas bien', (done) => {
      const spyMettreEnPlaceServeurMail = jest.spyOn(exo4.callbackService, 'mettreEnPlaceServeurMail');
      const spyEnvoyerMail = jest.spyOn(exo4.webService, 'envoyerMail');

      let aComplete = false;
      exo4.envoyerMail$('contenuMail', idtInconnu).subscribe({
        next: () => done.fail(new Error('Aucune émission autorisée')),
        error: (err: unknown) => donneesRecues.push(err),
        complete: () => aComplete = true,
      });

      jest.advanceTimersByTime(2000);

      expect(donneesRecues.length).toEqual(1);
      expect(donneesRecues[0]).toEqual(expect.objectContaining({
        message: 'Erreur lors de l\'envoi du mail',
      }));
      expect(spyMettreEnPlaceServeurMail).toHaveBeenCalledTimes(1);
      expect(spyMettreEnPlaceServeurMail).toHaveBeenLastCalledWith(
        exo4.URL_SERVEUR_MAIL,
        exo4.PORT,
        expect.any(Function)
      );
      expect(spyEnvoyerMail).toHaveBeenCalledTimes(1);
      expect(spyEnvoyerMail).toHaveBeenLastCalledWith({ 
        contenu: 'contenuMail', 
        idtDestinataire: idtInconnu, 
      });
      
      expect(aComplete).toEqual(false);
      done();
    });
  });
});
