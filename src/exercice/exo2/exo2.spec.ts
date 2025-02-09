import { take } from "rxjs";
import ConsoleUtils from "../../utils/console.utils";
import Exercice2 from "./exo2";

describe('Exercice 2', () => {
    let exo2: Exercice2;
    let donneesRecues: unknown[];
    
    beforeEach(() => {
        exo2 = new Exercice2();
        const maintenant = new Date('2021-10-05T14:48:00.000Z');
        jest.spyOn(global, 'Date').mockImplementation(() => maintenant);
        donneesRecues = [];
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    describe('transmettreInfoUtilisateurDeNotificationErreur', () => {
        it('doit transmettre les informations utilisateurs des notifications en erreur qui ont des infos utilisateur', (done) => {
            exo2.transmettreInfoUtilisateurDeNotificationErreur()
                .pipe(take(5))
                .subscribe({
                    next: (resultat) => donneesRecues.push(resultat),
                    error: done.fail,
                });
            jest.advanceTimersByTime(10000);
            expect(donneesRecues.length).toEqual(5);
            expect(donneesRecues).toEqual(expect.arrayContaining([
                {
                  idt: '4e4d3b1d-8a09-4fae-82f5-34082a90c25e',
                  nationnalite: 'EN',
                  prenom: 'Kate',
                  nom: 'Smith',
                  role: 'USER'
                },
                {
                  idt: 'a5ded7e5-35bc-42b9-b9e4-dd6860324540',
                  nationnalite: 'EN',
                  prenom: 'John',
                  nom: 'Doe',
                  role: 'ADMIN'
                },
                {
                  idt: 'a5ded7e5-35bc-42b9-b9e4-dd6860324540',
                  nationnalite: 'EN',
                  prenom: 'John',
                  nom: 'Doe',
                  role: 'ADMIN'
                },
                {
                  idt: '4e4d3b1d-8a09-4fae-82f5-34082a90c25e',
                  nationnalite: 'EN',
                  prenom: 'Kate',
                  nom: 'Smith',
                  role: 'USER'
                },
                {
                  idt: '4e4d3b1d-8a09-4fae-82f5-34082a90c25e',
                  nationnalite: 'EN',
                  prenom: 'Kate',
                  nom: 'Smith',
                  role: 'USER'
                }
              ])
            );
            done();
        });
    });

    describe('transmettreErreursEtWarningsEnrichis', () => {
        it('doit réémettre les notifications en erreur et en Warning avec le rôle de l\'utilisateur lorsqu\'il ' + 
            'est renseigné', (done) => {
            exo2.transmettreErreursEtWarningsEnrichis()
            .pipe(take(10))
            .subscribe({
                next: (resultat) => donneesRecues.push(resultat),
                error: done.fail,
            })
            jest.advanceTimersByTime(10000);

            expect(donneesRecues).toEqual(
                [
                    {
                      titre: 'Mauvaise connexion',
                      message: 'Une tentative de connexion au compte de John Doe a été effectuée avec un mauvais mot de passe',
                      type: 'WARNING'
                    },
                    {
                      titre: 'Erreur inattendue',
                      message: 'Une erreur a été rencontrée dans le traitement de la notification',
                      type: 'ERROR',
                      idUtilisateur: '4e4d3b1d-8a09-4fae-82f5-34082a90c25e',
                      role: 'USER'
                    },
                    {
                      titre: 'Perte de la connexion',
                      message: 'La connexion a été perdue',
                      type: 'ERROR',
                      idUtilisateur: 'a5ded7e5-35bc-42b9-b9e4-dd6860324540',
                      role: 'ADMIN'
                    },
                    {
                      titre: 'Mauvaise connexion',
                      message: 'Une tentative de connexion au compte de Kate Smith a été effectuée avec un mauvais mot de passe',
                      type: 'WARNING'
                    },
                    {
                      titre: 'Mauvaise connexion',
                      message: 'Une tentative de connexion au compte de John Doe a été effectuée avec un mauvais mot de passe',
                      type: 'WARNING'
                    },
                    {
                      titre: 'Erreur inattendue',
                      message: 'Une erreur a été rencontrée dans le traitement de la notification',
                      type: 'ERROR',
                      idUtilisateur: '4e4d3b1d-8a09-4fae-82f5-34082a90c25e',
                      role: 'USER'
                    },
                    {
                      titre: 'Perte de la connexion',
                      message: 'La connexion a été perdue',
                      type: 'ERROR',
                      idUtilisateur: 'a5ded7e5-35bc-42b9-b9e4-dd6860324540',
                      role: 'ADMIN'
                    },
                    {
                      titre: 'Mauvaise connexion',
                      message: 'Une tentative de connexion au compte de Kate Smith a été effectuée avec un mauvais mot de passe',
                      type: 'WARNING'
                    },
                    {
                      titre: 'Mauvaise connexion',
                      message: 'Une tentative de connexion au compte de John Doe a été effectuée avec un mauvais mot de passe',
                      type: 'WARNING'
                    },
                    {
                      titre: 'Erreur inattendue',
                      message: 'Une erreur a été rencontrée dans le traitement de la notification',
                      type: 'ERROR',
                      idUtilisateur: '4e4d3b1d-8a09-4fae-82f5-34082a90c25e',
                      role: 'USER'
                    }
                  ]
            )
            done();
        });
    });

    describe('transmettreToutesNotificationsEnrichies', () => {
        it('doit transmettre toutes les notifications enrichies avec une gestion des erreurs', (done) => {
            const spyConsoleError = jest.spyOn(ConsoleUtils, 'error');
            exo2.transmettreToutesNotificationsEnrichies()
                .pipe(take(10))
                .subscribe({
                    next: (donnees) => donneesRecues.push(donnees),
                    error: done.fail,
                });
            jest.advanceTimersByTime(10000);

            expect(spyConsoleError).toHaveBeenCalledTimes(1);
            expect(spyConsoleError).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Utilisateur non-trouvé',
            }));

            expect(donneesRecues).toEqual([
                {
                  titre: 'Bienvenue',
                  message: 'Bienvenue dans la nouvelle application',
                  type: 'INFO',
                  idUtilisateur: '9ee3f416-2964-4026-833c-2f236c77cb42',
                  role: 'SUPER-ADMIN'
                },
                {
                  titre: 'Mauvaise connexion',
                  message: 'Une tentative de connexion au compte de John Doe a été effectuée avec un mauvais mot de passe',
                  type: 'WARNING'
                },
                {
                  titre: 'Erreur inattendue',
                  message: 'Une erreur a été rencontrée dans le traitement de la notification',
                  type: 'ERROR',
                  idUtilisateur: '4e4d3b1d-8a09-4fae-82f5-34082a90c25e',
                  role: 'USER'
                },
                {
                  titre: 'Nouvel Utilisateur',
                  message: "Un nouvel utilisateur s'est inscrit",
                  type: 'INFO',
                  idUtilisateur: 'f00d63e8-9493-4280-8eb0-540146f6438e',
                  role: 'INCONNU'
                },
                {
                  titre: 'Perte de la connexion',
                  message: 'La connexion a été perdue',
                  type: 'ERROR',
                  idUtilisateur: 'a5ded7e5-35bc-42b9-b9e4-dd6860324540',
                  role: 'ADMIN'
                },
                {
                  titre: 'Nouveau Message',
                  message: 'Vous avez reçu un nouveau message',
                  type: 'INFO'
                },
                {
                  titre: 'Mauvaise connexion',
                  message: 'Une tentative de connexion au compte de Kate Smith a été effectuée avec un mauvais mot de passe',
                  type: 'WARNING'
                },
                {
                  titre: 'Bienvenue',
                  message: 'Bienvenue dans la nouvelle application',
                  type: 'INFO',
                  idUtilisateur: '9ee3f416-2964-4026-833c-2f236c77cb42',
                  role: 'SUPER-ADMIN'
                },
                {
                  titre: 'Mauvaise connexion',
                  message: 'Une tentative de connexion au compte de John Doe a été effectuée avec un mauvais mot de passe',
                  type: 'WARNING'
                },
                {
                  titre: 'Erreur inattendue',
                  message: 'Une erreur a été rencontrée dans le traitement de la notification',
                  type: 'ERROR',
                  idUtilisateur: '4e4d3b1d-8a09-4fae-82f5-34082a90c25e',
                  role: 'USER'
                }
              ]);
            done();

        });
    })
});