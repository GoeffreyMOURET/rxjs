import { Subject, map } from "rxjs";

/**
* La question est toujorus la même : qu'est-ce qu'il y aura d'affiché dans la console (et dans quel ordre) ?
*/
export default class Quiz2 {

    question1(): void {
        const notifieur = new Subject<string>();
        notifieur.subscribe({
            next: (resultat) => console.log(resultat),
            complete: () => console.log('COMPLETE'),
        });

        notifieur.next('BONJOUR');
        notifieur.next('Comment ça va ?');
    }

    question2(): void {
        const notifieur = new Subject<string>();
        notifieur.pipe(
            map((texte) => 'Abonnement 1 : ' + texte)
        ).subscribe({
            next: (resultat) => console.log(resultat),
            complete: () => console.log('COMPLETE'),
        });

        notifieur.next('BONJOUR');

        notifieur.pipe(
            map((texte) => 'Abonnement 2 : ' + texte)
        ).subscribe({
            next: (resultat) => console.log(resultat),
            complete: () => console.log('COMPLETE'),
        });
        
        notifieur.next('Comment ça va ?');
    }

    question3(): void {

    }

    
}

const quiz2 = new Quiz2();
quiz2.question2();