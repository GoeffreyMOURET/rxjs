import { Observable, EMPTY } from "rxjs";
import InputUtilisateurService from "../../service/input-utilisateur.service";
import WebService from "../../service/web.service";

interface SelectionUtilisateur { 
    idtUtilisateurSelectionne: string | undefined; 
    typeSelectionne: string | undefined;
}

/**
 * L'objectif de cet exercice est de combiner différentes pipelines afin 
 * d'obtenir les comportements souhaités
 * 
 * Les signatures des fonctions ne sont pas à changer
 */
export default class Exercice3 {

    // Service simulant la récupération d'un input utilisateur service
    private serviceInputUser = new InputUtilisateurService();

    // Service simulant la récupération d'info du web
    private webService = new WebService();

    /**
     * Afficher les inputs utilisateurs concernant l'utilisateur sélectionné et le type de notification sélectionné.
     * Pour chacun des champs, la valeur "undefined" doit être émise par défaut.
     * 
     * L'observable résultat doit émettre à chaque changement de sélection.
     */
    recupererChampsSaisiUtilisateur(): Observable<SelectionUtilisateur> {
        return EMPTY;
    }


    /**
     * L'utilisateur est capable de sélectionner un type de notification. La sélection de l'utilisateur 
     * peut évoluer avec le temps.
     * 
     * Récupérer le contenu des notifications uniquement si elle est du type sélectionné par l'utilisateur.
     * Si l'utilisateur n'a pas sélectionné de type, émettre toutes les notifications trouvées. Le format des 
     * notifications attendu est le suivant : '[typeNotif] titre : message'. 
     */
    recupererNotificationsFiltreesParType(): Observable<string> {
        return EMPTY;
    }


    /**
     * L'utilisateur est capable de sélectionner un utilisateur. L'objectif est d'afficher les notifications 
     * concernant uniquement l'utilisateur sélectionné. L'utilisateur sélectionné peut évoluer au cours du temps.
     *   
     * Récupérer les notifications appartenant à l'utilisateur sélectionné. Si aucun utilisateur est sélectionné,
     * rien ne doit être émis. Les notifications devront être au formation '[Utilisateur : nom prenom] dateEmission titre : message'
     * Par exemple, si John Doe a recu le message dont le titre est "BONJOUR" et dont le message est "Comment ça va ?",
     * l'attendu sera "[Utilisateur : Doe John] BONJOUR : Comment ça va ?"
     * En cas d'utilisateur non trouvé par webService.recupererUtilisateur, mettre INCONNU à la place du nom / prenom de l'utilisateur
     * 
     * L'ordre de réception des messages doit être l'ordre d'émission de l'observable construit. Lorsqu'il y a un changement 
     * d'utilisateur sélectionné, seuls les messages postérieurs au changement sont à prendre en compte.
     */
    recupererNotificationUtilisateurSelectionne(): Observable<string> {
        return EMPTY;
    }

}