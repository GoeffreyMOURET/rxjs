import { Subject, merge, forkJoin, combineLatest } from "rxjs";

/**
* La question est toujorus la même : qu'est-ce qu'il y aura d'affiché dans la console (et dans quel ordre) ?
*/
export default class Quiz3 {
    /**
     * Output : 
     * 
     * RESULTAT :  Notif 3
     * TEMPS ECOULE (ms) :  508
     * RESULTAT :  Notif 1
     * TEMPS ECOULE (ms) :  1005
     * RESULTAT :  Notif 2
     * TEMPS ECOULE (ms) :  2014
     */
    question1(): void {
        const notifieur1 = new Subject();
        setTimeout(
            () => notifieur1.next('Notif 1'), 
            1000
        );
        setTimeout(
            () => notifieur1.next('Notif 2'),
            2000
        );

        const notifieur2 = new Subject();
        setTimeout(
            () => notifieur2.next('Notif 3'),
            500
        );

        const tempsAvantNotif = new Date().getTime();

        merge(notifieur1, notifieur2).subscribe({
            next: (resultat) => {
                console.log('RESULTAT : ', resultat);
                console.log('TEMPS ECOULE (ms) : ', new Date().getTime() - tempsAvantNotif)
            },
            complete: () => console.log('COMPLETED'),
        });
    }

    /**
     * Output :
     * RESULTAT :  { notifieur1: 'Notif 1', notifieur2: 'Notif 3' }
     * TEMPS ECOULE (ms) :  1002
     * RESULTAT :  { notifieur1: 'Notif 2', notifieur2: 'Notif 3' }
     * TEMPS ECOULE (ms) :  2009
     */
    question2(): void {
        const notifieur1 = new Subject();
        setTimeout(
            () => notifieur1.next('Notif 1'), 
            1000
        );
        setTimeout(
            () => notifieur1.next('Notif 2'),
            2000
        );

        const notifieur2 = new Subject();
        setTimeout(
            () => notifieur2.next('Notif 3'),
            500
        );

        const tempsAvantNotif = new Date().getTime();

        // Même question avec un forkJoin
        combineLatest({
            notifieur1, 
            notifieur2,
        }).subscribe({
            next: (resultat) => {
                console.log('RESULTAT : ', resultat);
                console.log('TEMPS ECOULE (ms) : ', new Date().getTime() - tempsAvantNotif)
            },
            complete: () => console.log('COMPLETED'),
        });
    }
    
}

const quiz = new Quiz3();
quiz.question2();