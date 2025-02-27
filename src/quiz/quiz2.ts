import { BehaviorSubject, ReplaySubject, Subject, map } from "rxjs";

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

    question3(): void {
        const notifieur = new BehaviorSubject<string>('Tata');

        notifieur.subscribe({
            next: (resultat) => console.log(resultat),
            complete: () => console.log('COMPLETE')
        });

        notifieur.next('Bonjour');
        notifieur.complete();

    }

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

    question5(): void {
        const notifieur = new ReplaySubject<string>(2);

        notifieur.subscribe({
            next: (resultat) => console.log(resultat),
            complete: () => console.log('COMPLETE')
        });

        notifieur.next('Bonjour');
        notifieur.complete();

    }

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