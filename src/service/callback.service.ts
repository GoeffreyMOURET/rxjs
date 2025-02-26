export default class CallbackService {

    private serveurMailMisEnPlace = false;

    mettreEnPlaceServeurMail(
        url: string,
        port: number,
        callbackReussite ?: () => void,
    ): void {
        console.log('Un serveur va être démarré à l\'url ' + url + ' au port ' + port);
        setTimeout(
            () => {
                this.serveurMailMisEnPlace = true;
                if (callbackReussite) callbackReussite();
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

    effectuerActionLorsqueDisponible(
        actionAEffectuer: () => void
    ): void {
        if (this.disponible) actionAEffectuer();
        else setTimeout(actionAEffectuer, 100);
    }
    disponible = false;
}
