export default class CallbackService {

    private serveurMailMisEnPlace = false;

    reussiteMiseEnPlaceServeurMail = true;
    mettreEnPlaceServeurMail(
        url: string,
        port: number,
        callbackMiseEnPlaceTerminee ?: (reussite: boolean) => void,
    ): void {
        console.log('Un serveur va être démarré à l\'url ' + url + ' au port ' + port);
        setTimeout(
            () => {
                this.serveurMailMisEnPlace = true;
                if (callbackMiseEnPlaceTerminee) callbackMiseEnPlaceTerminee(this.reussiteMiseEnPlaceServeurMail);
            },
            150
        );
    }

    get serveurInstalle(): boolean {
        return this.serveurMailMisEnPlace;
    }

    afficherQuestion(
        question: string,
        callbackReponse: (reponse: boolean) => void
    ): void {
        console.log('Question posée à l\'utilisateur : ', question);
        setTimeout(
            () => {
                callbackReponse(this.reponseUtilisateur);
            },
            100
        )
    }
    reponseUtilisateur = true;
}
