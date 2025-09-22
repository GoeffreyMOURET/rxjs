import { BehaviorSubject, ReplaySubject, Subject, map } from "rxjs";

/**
* La question est toujorus la même : qu'est-ce qu'il y aura d'affiché dans la console (et dans quel ordre) ?
*/
export default class Quiz2 {

    /**
     * -> On remarque que l'on n'a pas le COMPLETE qui apparaît dans la console
     * Ouput : 
     * BONJOUR
     * Comment ça va ?
     */
    question1(): void {
        const notifieur = new Subject<string>();
        notifieur.subscribe({
            next: (resultat) => console.log(resultat),
            complete: () => console.log('COMPLETE'),
        });

        notifieur.next('BONJOUR');
        notifieur.next('Comment ça va ?');
    }

    /**
     * Ouput : 
     * Abonnement 1 : BONJOUR
     * Abonnement 1 : Comment ça va ?
     * Abonnement 2 : Comment ça va ?
     */
    question2(): void {
        const notifieur = new Subject<string>();
        notifieur.pipe(
            map((texte) => 'Abonnement 1 : ' + texte)
        ).subscribe({
            next: (resultat) => console.log(resultat),
            complete: () => console.log('COMPLETE Abonnement 1'),
        });

        notifieur.next('BONJOUR');

        notifieur.pipe(
            map((texte) => 'Abonnement 2 : ' + texte)
        ).subscribe({
            next: (resultat) => console.log(resultat),
            complete: () => console.log('COMPLETE Abonnement 2'),
        });
        
        notifieur.next('Comment ça va ?');
    }

    /**
     * Output : 
     * Tata
     * Bonjour
     * COMPLETE
     */
    question3(): void {
        const notifieur = new BehaviorSubject<string>('Tata');

        notifieur.subscribe({
            next: (resultat) => console.log(resultat),
            complete: () => console.log('COMPLETE')
        });

        notifieur.next('Bonjour');
        notifieur.complete();

    }

    /**
     * Output :
     * Abonnement 1 : Tata
     * Abonnement 1 : Bonjour
     * Abonnement 2 : Bonjour
     * COMPLETE Abonnement 1
     * COMPLETE Abonnement 2
     */
    question4(): void {
        const notifieur = new BehaviorSubject<string>('Tata');

        notifieur
        .pipe(map((t) => 'Abonnement 1 : ' + t))
        .subscribe({
            next: (resultat) => console.log(resultat),
            complete: () => console.log('COMPLETE Abonnement 1')
        });

        notifieur.next('Bonjour');

        notifieur
        .pipe(map((t) => 'Abonnement 2 : ' + t))
        .subscribe({
            next: (resultat) => console.log(resultat),
            complete: () => console.log('COMPLETE Abonnement 2')
        });

        notifieur.complete();
    }

    /**
     * Output :
     * Bonjour
     * COMPLETE
     */
    question5(): void {
        const notifieur = new ReplaySubject<string>(2);

        notifieur.subscribe({
            next: (resultat) => console.log(resultat),
            complete: () => console.log('COMPLETE')
        });

        notifieur.next('Bonjour');
        notifieur.complete();

    }

    /**
     * Output :
     * Bonjour 2
     * Bonjour 3
     * Bonjour 4
     * COMPLETE
     */
    question6(): void {
        const notifieur = new ReplaySubject<string>(2);
        notifieur.next('Bonjour 1');
        notifieur.next('Bonjour 2');
        notifieur.next('Bonjour 3');

        notifieur.subscribe({
            next: (resultat) => console.log(resultat),
            complete: () => console.log('COMPLETE')
        });

        notifieur.next('Bonjour 4');
        notifieur.complete();
    }

    /**
     * Output :
     * Abonnement 1 : Bonjour
     * Abonnement 2 : Bonjour
     * Abonnement 1 : Au revoir
     * Abonnement 2 : Au revoir
     * Abonnement 3 : Au revoir
     * Abonnement 1 : Bye
     * Abonnement 2 : Bye
     * Abonnement 3 : Bye
     * COMPLETE Abonnement 1
     * COMPLETE Abonnement 2
     * COMPLETE Abonnement 3
     */
    question7(): void {
        const notifieur = new ReplaySubject<string>(1);

        notifieur
        .pipe(map((t) => 'Abonnement 1 : ' + t))
        .subscribe({
            next: (resultat) => console.log(resultat),
            complete: () => console.log('COMPLETE Abonnement 1')
        });

        notifieur.next('Bonjour');

        notifieur
        .pipe(map((t) => 'Abonnement 2 : ' + t))
        .subscribe({
            next: (resultat) => console.log(resultat),
            complete: () => console.log('COMPLETE Abonnement 2')
        });

        notifieur.next('Au revoir');

        notifieur
        .pipe(map((t) => 'Abonnement 3 : ' + t))
        .subscribe({
            next: (resultat) => console.log(resultat),
            complete: () => console.log('COMPLETE Abonnement 3')
        });

        notifieur.next('Bye');

        notifieur.complete();
    }
}

const quiz2 = new Quiz2();
quiz2.question1();