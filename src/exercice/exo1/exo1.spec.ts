import { idtInconnu, idtJohnDoe, idtKateSmith, idtUtilisateurActuel } from "../../constante/utilisateur.constante";
import ConsoleUtils from "../../utils/console.utils";
import Exercice1 from "./exo1";

describe('Exercice 1', () => {
    let exo1: Exercice1;
    let donneesLoggees: unknown[];
    let spyConsole: jest.SpyInstance<void, [params: unknown], any>;
    let maintenant;
    
    beforeEach(() => {
        exo1 = new Exercice1();
        maintenant = new Date('2021-10-05T14:48:00.000Z');
        jest.spyOn(global, 'Date').mockImplementation(() => maintenant);
        donneesLoggees = []
        spyConsole = jest.spyOn(ConsoleUtils, 'log');
        spyConsole.mockReset();
        spyConsole.mockImplementation((obj) => {
          donneesLoggees.push(obj);
          console.log(obj);
        })
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    describe('loggerNotifications', () => {
        it('doit afficher les notifications recues dans la console ConsoleUtils', () => {
            
            exo1.loggerNotifications();
            jest.advanceTimersByTime(3000);
            expect(spyConsole).toHaveBeenCalledTimes(10);
            expect(donneesLoggees).toEqual([
                {
                  "idUtilisateur": idtUtilisateurActuel,
                  "message": "Bienvenue dans la nouvelle application",
                  "titre": "Bienvenue",
                  "type": "INFO",
                  "dateEmission": maintenant,
                }, {
                  "message": "Une tentative de connexion au compte de John Doe a été effectuée avec un mauvais mot de passe",
                  "titre": "Mauvaise connexion",
                  "type": "WARNING",
                  "dateEmission": maintenant,
                }, {
                  "message": "Une erreur a été rencontrée dans le traitement de la notification",
                  "titre": "Erreur inattendue",
                  "type": "ERROR",
                  "idUtilisateur": idtKateSmith,
                  "dateEmission": maintenant,
                }, {
                  "message": "Un nouvel utilisateur s'est inscrit",
                  "titre": "Nouvel Utilisateur",
                  "type": "INFO",
                  "idUtilisateur": idtInconnu,
                  "dateEmission": maintenant,
                }, {
                  "message": "La connexion a été perdue",
                  "titre": "Perte de la connexion",
                  "type": "ERROR",
                  "idUtilisateur": idtJohnDoe,
                  "dateEmission": maintenant,
                }, {
                  "message": "Vous avez reçu un nouveau message",
                  "titre": "Nouveau Message",
                  "type": "INFO",
                  "dateEmission": maintenant,
                }, {
                  "message": "Une tentative de connexion au compte de Kate Smith a été effectuée avec un mauvais mot de passe",
                  "titre": "Mauvaise connexion",
                  "type": "WARNING",
                  "dateEmission": maintenant,
                }, {
                  "idUtilisateur": "9ee3f416-2964-4026-833c-2f236c77cb42",
                  "message": "Bienvenue dans la nouvelle application",
                  "titre": "Bienvenue",
                  "type": "INFO",
                  "dateEmission": maintenant,
                }, {
                  "message": "Une tentative de connexion au compte de John Doe a été effectuée avec un mauvais mot de passe",
                  "titre": "Mauvaise connexion",
                  "type": "WARNING",
                  "dateEmission": maintenant,
                }, {
                  "message": "Une erreur a été rencontrée dans le traitement de la notification",
                  "titre": "Erreur inattendue",
                  "type": "ERROR",
                  "idUtilisateur": idtKateSmith,
                  "dateEmission": maintenant,
                },
            ]);
        });
    });

    describe('loggerTitreInfo', () => {
        it('doit logger les titres des notifications de type INFO', () => {
            exo1.loggerTitreInfo();
            jest.advanceTimersByTime(3000);

            expect(spyConsole).toHaveBeenCalledTimes(5);
            expect(donneesLoggees).toEqual([
                'Bienvenue',
                'Nouvel Utilisateur',
                'Nouveau Message',
                'Bienvenue',
                'Nouvel Utilisateur',
            ])
        });
    });

    describe('loggerErreurAvecDate', () => {
      it('doit logger les 2 premières notifications de type ERREUR avec la date d\'émission', () => {
        exo1.loggerErreurAvecDate();
        jest.advanceTimersByTime(3000);

        expect(spyConsole).toHaveBeenCalledTimes(2);
        expect(donneesLoggees).toEqual([
          '2021-10-05T14:48:00.000Z : Une erreur a été rencontrée dans le traitement de la notification',
          '2021-10-05T14:48:00.000Z : La connexion a été perdue',
        ])
      });
    });

    describe('loggerNotificationParNiveau', () => {
      it('doit logger les notifications par tranche de 1 seeconde et regroupées par type', () => {
        exo1.loggerNotificationParNiveau();
        jest.advanceTimersByTime(5000);

        expect(spyConsole).toHaveBeenCalledTimes(3);
        
        expect(donneesLoggees[0]).toEqual({ INFO: [], WARNING: [], ERROR: [] });

        expect(donneesLoggees[1]).toEqual({
          INFO: [
            'Bienvenue dans la nouvelle application',
            "Un nouvel utilisateur s'est inscrit",
            'Vous avez reçu un nouveau message',
            'Bienvenue dans la nouvelle application'
          ],
          WARNING: [
            'Une tentative de connexion au compte de John Doe a été effectuée avec un mauvais mot de passe',
            'Une tentative de connexion au compte de Kate Smith a été effectuée avec un mauvais mot de passe',
            'Une tentative de connexion au compte de John Doe a été effectuée avec un mauvais mot de passe'
          ],
          ERROR: [
            'Une erreur a été rencontrée dans le traitement de la notification',
            'La connexion a été perdue'
          ]
        });

        expect(donneesLoggees[2]).toEqual({
          INFO: [
            "Un nouvel utilisateur s'est inscrit",
            'Vous avez reçu un nouveau message',
            'Bienvenue dans la nouvelle application',
            "Un nouvel utilisateur s'est inscrit",
            'Vous avez reçu un nouveau message'
          ],
          WARNING: [
            'Une tentative de connexion au compte de Kate Smith a été effectuée avec un mauvais mot de passe',
            'Une tentative de connexion au compte de John Doe a été effectuée avec un mauvais mot de passe'
          ],
          ERROR: [
            'Une erreur a été rencontrée dans le traitement de la notification',
            'La connexion a été perdue',
            'Une erreur a été rencontrée dans le traitement de la notification',
            'La connexion a été perdue'
          ]
        });
      });
    });
});