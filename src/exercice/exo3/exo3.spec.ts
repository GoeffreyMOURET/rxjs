import { take } from "rxjs";
import Exercice3 from "./exo3";

describe('Exercice 3', () => {
    let exo3: Exercice3;
    let donneesRecues: unknown[];
    
    beforeEach(() => {
        exo3 = new Exercice3();
        const maintenant = new Date('2021-10-05T14:48:00.000Z');
        jest.spyOn(global, 'Date').mockImplementation(() => {
            maintenant.setSeconds(maintenant.getSeconds() + 1);
            return maintenant;
        });
        donneesRecues = [];
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    describe('recupererChampSaisiUtilisateur', () => {
        it('doit récupérer les différents inputs utilisateur', (done) => {
            exo3.recupererChampsSaisiUtilisateur()
            .pipe(take(15))
            .subscribe({
                error: done.fail,
                next: (resultat) => donneesRecues.push(resultat)
            });
            jest.advanceTimersByTime(1000000);

            expect(donneesRecues).toEqual([
                { idtUtilisateurSelectionne: undefined, typeSelectionne: undefined },
                {
                    idtUtilisateurSelectionne: 'a5ded7e5-35bc-42b9-b9e4-dd6860324540',
                    typeSelectionne: undefined
                },
                {
                    idtUtilisateurSelectionne: '4e4d3b1d-8a09-4fae-82f5-34082a90c25e',
                    typeSelectionne: undefined
                },
                {
                    idtUtilisateurSelectionne: '9ee3f416-2964-4026-833c-2f236c77cb42',
                    typeSelectionne: undefined
                },
                {
                    idtUtilisateurSelectionne: 'f00d63e8-9493-4280-8eb0-540146f6438e',
                    typeSelectionne: undefined
                },
                {
                    idtUtilisateurSelectionne: 'a5ded7e5-35bc-42b9-b9e4-dd6860324540',
                    typeSelectionne: undefined
                },
                {
                    idtUtilisateurSelectionne: 'a5ded7e5-35bc-42b9-b9e4-dd6860324540',
                    typeSelectionne: 'INFO'
                },
                {
                    idtUtilisateurSelectionne: '4e4d3b1d-8a09-4fae-82f5-34082a90c25e',
                    typeSelectionne: 'INFO'
                },
                {
                    idtUtilisateurSelectionne: '9ee3f416-2964-4026-833c-2f236c77cb42',
                    typeSelectionne: 'INFO'
                },
                {
                    idtUtilisateurSelectionne: '9ee3f416-2964-4026-833c-2f236c77cb42',
                    typeSelectionne: 'WARNING'
                },
                {
                    idtUtilisateurSelectionne: 'f00d63e8-9493-4280-8eb0-540146f6438e',
                    typeSelectionne: 'WARNING'
                },
                {
                    idtUtilisateurSelectionne: 'a5ded7e5-35bc-42b9-b9e4-dd6860324540',
                    typeSelectionne: 'WARNING'
                },
                {
                    idtUtilisateurSelectionne: '4e4d3b1d-8a09-4fae-82f5-34082a90c25e',
                    typeSelectionne: 'WARNING'
                },
                {
                    idtUtilisateurSelectionne: '4e4d3b1d-8a09-4fae-82f5-34082a90c25e',
                    typeSelectionne: 'ERROR'
                },
                {
                    idtUtilisateurSelectionne: '9ee3f416-2964-4026-833c-2f236c77cb42',
                    typeSelectionne: 'ERROR'
                }
            ])
            done();
        });
    });

    describe('recupererNotificationsFiltreesParType', () => {
        it('doit récupérer les notifications filtrées par le type sélectionné par l\'utilisateur', (done) => {
            exo3.recupererNotificationsFiltreesParType()
            .pipe(take(50))
            .subscribe({
               error: done.fail,
               next: (notif) => donneesRecues.push(notif) 
            });
            jest.advanceTimersByTime(1000000);
            expect(donneesRecues).toEqual(
                [
                    "[INFO] Bienvenue : Bienvenue dans la nouvelle application",
                    "[WARNING] Mauvaise connexion : Une tentative de connexion au compte de John Doe a été effectuée avec un mauvais mot de passe",
                    "[ERROR] Erreur inattendue : Une erreur a été rencontrée dans le traitement de la notification",
                    "[INFO] Nouvel Utilisateur : Un nouvel utilisateur s'est inscrit",
                    "[ERROR] Perte de la connexion : La connexion a été perdue",
                    "[INFO] Nouveau Message : Vous avez reçu un nouveau message",
                    "[WARNING] Mauvaise connexion : Une tentative de connexion au compte de Kate Smith a été effectuée avec un mauvais mot de passe",
                    "[INFO] Bienvenue : Bienvenue dans la nouvelle application",
                    '[WARNING] Mauvaise connexion : Une tentative de connexion au compte de John Doe a été effectuée avec un mauvais mot de passe',
                    '[ERROR] Erreur inattendue : Une erreur a été rencontrée dans le traitement de la notification',
                    "[INFO] Nouvel Utilisateur : Un nouvel utilisateur s'est inscrit",
                    '[ERROR] Perte de la connexion : La connexion a été perdue',
                    '[INFO] Nouveau Message : Vous avez reçu un nouveau message',
                    '[WARNING] Mauvaise connexion : Une tentative de connexion au compte de Kate Smith a été effectuée avec un mauvais mot de passe',
                    '[INFO] Bienvenue : Bienvenue dans la nouvelle application',
                    '[WARNING] Mauvaise connexion : Une tentative de connexion au compte de John Doe a été effectuée avec un mauvais mot de passe',
                    '[ERROR] Erreur inattendue : Une erreur a été rencontrée dans le traitement de la notification',
                    "[INFO] Nouvel Utilisateur : Un nouvel utilisateur s'est inscrit",
                    '[ERROR] Perte de la connexion : La connexion a été perdue',
                    '[INFO] Nouveau Message : Vous avez reçu un nouveau message',
                    '[WARNING] Mauvaise connexion : Une tentative de connexion au compte de Kate Smith a été effectuée avec un mauvais mot de passe',
                    '[INFO] Bienvenue : Bienvenue dans la nouvelle application',
                    '[WARNING] Mauvaise connexion : Une tentative de connexion au compte de John Doe a été effectuée avec un mauvais mot de passe',
                    '[ERROR] Erreur inattendue : Une erreur a été rencontrée dans le traitement de la notification',
                    "[INFO] Nouvel Utilisateur : Un nouvel utilisateur s'est inscrit",
                    '[ERROR] Perte de la connexion : La connexion a été perdue',
                    '[INFO] Nouveau Message : Vous avez reçu un nouveau message',
                    '[WARNING] Mauvaise connexion : Une tentative de connexion au compte de Kate Smith a été effectuée avec un mauvais mot de passe',
                    '[INFO] Bienvenue : Bienvenue dans la nouvelle application',
                    "[INFO] Nouvel Utilisateur : Un nouvel utilisateur s'est inscrit",
                    '[INFO] Nouveau Message : Vous avez reçu un nouveau message',
                    '[INFO] Bienvenue : Bienvenue dans la nouvelle application',
                    "[INFO] Nouvel Utilisateur : Un nouvel utilisateur s'est inscrit",
                    '[INFO] Nouveau Message : Vous avez reçu un nouveau message',
                    '[INFO] Bienvenue : Bienvenue dans la nouvelle application',
                    "[INFO] Nouvel Utilisateur : Un nouvel utilisateur s'est inscrit",
                    '[INFO] Nouveau Message : Vous avez reçu un nouveau message',
                    '[WARNING] Mauvaise connexion : Une tentative de connexion au compte de John Doe a été effectuée avec un mauvais mot de passe',
                    '[WARNING] Mauvaise connexion : Une tentative de connexion au compte de Kate Smith a été effectuée avec un mauvais mot de passe',
                    '[WARNING] Mauvaise connexion : Une tentative de connexion au compte de John Doe a été effectuée avec un mauvais mot de passe',
                    '[WARNING] Mauvaise connexion : Une tentative de connexion au compte de Kate Smith a été effectuée avec un mauvais mot de passe',
                    '[WARNING] Mauvaise connexion : Une tentative de connexion au compte de John Doe a été effectuée avec un mauvais mot de passe',
                    '[ERROR] Erreur inattendue : Une erreur a été rencontrée dans le traitement de la notification',
                    '[ERROR] Perte de la connexion : La connexion a été perdue',
                    '[ERROR] Erreur inattendue : Une erreur a été rencontrée dans le traitement de la notification',
                    '[ERROR] Perte de la connexion : La connexion a été perdue',
                    '[ERROR] Erreur inattendue : Une erreur a été rencontrée dans le traitement de la notification',
                    '[ERROR] Perte de la connexion : La connexion a été perdue',
                    '[INFO] Nouveau Message : Vous avez reçu un nouveau message',
                    '[INFO] Bienvenue : Bienvenue dans la nouvelle application',
                  ]
            );
            done();

        });
    });

    describe('recupererNotificationUtilisateurSelectionne', () => {
        it('doit récupérer les notifications concernant l\'utilisateur sélectionné', (done) => {
            exo3.recupererNotificationUtilisateurSelectionne()
            .pipe(take(20))
            .subscribe({
                next: (resultat) => donneesRecues.push(resultat),
                error: done.fail,
            });
            jest.advanceTimersByTime(1000000);

            expect(donneesRecues).toEqual(
                [
                    '[Utilisateur : Doe John] Perte de la connexion : La connexion a été perdue',
                    '[Utilisateur : Smith Kate] Erreur inattendue : Une erreur a été rencontrée dans le traitement de la notification',
                    '[Utilisateur : Durand Anaëlle] Bienvenue : Bienvenue dans la nouvelle application',
                    "[Utilisateur : INCONNU] Nouvel Utilisateur : Un nouvel utilisateur s'est inscrit",
                    '[Utilisateur : Doe John] Perte de la connexion : La connexion a été perdue',
                    '[Utilisateur : Smith Kate] Erreur inattendue : Une erreur a été rencontrée dans le traitement de la notification',
                    '[Utilisateur : Smith Kate] Erreur inattendue : Une erreur a été rencontrée dans le traitement de la notification',
                    '[Utilisateur : Durand Anaëlle] Bienvenue : Bienvenue dans la nouvelle application',
                    "[Utilisateur : INCONNU] Nouvel Utilisateur : Un nouvel utilisateur s'est inscrit",
                    '[Utilisateur : Doe John] Perte de la connexion : La connexion a été perdue',
                    '[Utilisateur : Smith Kate] Erreur inattendue : Une erreur a été rencontrée dans le traitement de la notification',
                    '[Utilisateur : Durand Anaëlle] Bienvenue : Bienvenue dans la nouvelle application',
                    '[Utilisateur : Durand Anaëlle] Bienvenue : Bienvenue dans la nouvelle application',
                    "[Utilisateur : INCONNU] Nouvel Utilisateur : Un nouvel utilisateur s'est inscrit",
                    '[Utilisateur : Doe John] Perte de la connexion : La connexion a été perdue',
                    "[Utilisateur : Smith Kate] Erreur inattendue : Une erreur a été rencontrée dans le traitement de la notification",
                    "[Utilisateur : Durand Anaëlle] Bienvenue : Bienvenue dans la nouvelle application",
                    "[Utilisateur : INCONNU] Nouvel Utilisateur : Un nouvel utilisateur s'est inscrit",
                    "[Utilisateur : Doe John] Perte de la connexion : La connexion a été perdue",
                    "[Utilisateur : Smith Kate] Erreur inattendue : Une erreur a été rencontrée dans le traitement de la notification",
                  ]
            )

            done();
        });
    });

});