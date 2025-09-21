import { delay, filter, from, interval, map, merge, Observable, of, take, tap } from "rxjs";


/**
* La question est toujorus la même : qu'est-ce qu'il y aura d'affiché dans la console (et dans quel ordre) ?
*/
export default class Quiz1 {
    question1(): void {
        of("toto").pipe(
            map((t) => t.toUpperCase())
        ).subscribe({
            next: (r) => console.log(r),
            error: console.log,
            complete: () => console.log('COMPLETE')
        });
    }

    question2(): void {
        merge(of("toto"), of("tata")).pipe(
            map((t) => t.toUpperCase())
        ).subscribe({
            next: (r) => console.log(r),
            error: console.log,
            complete: () => console.log('COMPLETE')
        });
    }

    question3(): void {
        interval(10).pipe(
            take(5)
        ).subscribe({
            next: (r) => console.log(r),
            error: console.log,
            complete: () => console.log('COMPLETE')
        });
    }

    question3bis(): void {
        interval(10).pipe(
            take(5),
            filter(i => i%2 == 0)
        ).subscribe({
            next: (r) => console.log(r),
            error: console.log,
            complete: () => console.log('COMPLETE')
        });
    }

    private mettreAuCarreAvecDelai$(i: number): Observable<number> {
        return of(undefined).pipe(
            delay(i <= 4 ? 100 : 0),
            map(() => i*i)
        );
    }

    question4(): void {
        of(1, 2, 3, 4, 5, 6, 7, 8, 9).pipe(
            map((i) => this.mettreAuCarreAvecDelai$(i)),
        ).subscribe({
            next: (r) => console.log(r),
            error: console.log,
            complete: () => console.log('COMPLETE')
        });
    }

    question5(): void {
        from(
            new Promise(resolve => setTimeout(resolve, 1000)).then(() => 'TOTO')
        ).subscribe({
            next: (r) => console.log(r),
            error: console.log,
            complete: () => console.log('COMPLETE')
        });
    }

    question6(): void {
        of(10).pipe(
            delay(10),
            tap(() => console.log('Coucou')),
            map(() => {
                throw new Error('toto');
            }),
            tap(() => console.log('Au revoir')),
        ).subscribe({
            next: (r) => console.log(r),
            error: console.log,
            complete: () => console.log('COMPLETE')
        });
    }

    question7(): void {
        of('Coucou').pipe(
            delay(5),
            tap((s) => console.log('TAP : ' + s))
        ).subscribe({
            next: (r) => console.log('NEXT : ' + r),
            error: () => console.log('Erreur'),
            complete: () => console.log('COMPLETE')
        });

        console.log('Comment ça va ?');
    }
}

const quiz = new Quiz1();
quiz.question1();