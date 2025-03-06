import { Subject, merge, forkJoin, combineLatest } from "rxjs";

/**
* La question est toujorus la même : qu'est-ce qu'il y aura d'affiché dans la console (et dans quel ordre) ?
*/
export default class Quiz3 {
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