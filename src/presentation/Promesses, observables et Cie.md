# Promesses, observables... Mais pourquoi ?

## On peut pas coder du JS comme du Java ?

La question est relativement simple : pourquoi est-ce que en java, pour effectuer une requête HTTP puis une requête en BDD, on peut écrire : 
```
public void maSuperbeFonction() {
    try {
        var photosChats = googleService.rechercher('PhotoChat');
        photoChatDao.enregistrerNouvellePhoto(photosChats);
    } catch (Exception e) {
        LOGGER.error("Une erreur est survenue");
    }
}
```

Bon, la question est : Pourquoi est-ce qu'on ne peut pas écrire ça en JavaScript ? La réponse se trouve dans la définition du Javascript : 

>JavaScript is single threaded, non-blocking, asynchronous and concurrent programming language

Regardons ce que cela veut dire :
- `single threaded` signifie qu'il ne possède qu'une seule call-stack. Dit autrement, on ne peut exécuter qu'un bout de code à la fois.
- `non-blocking` signifie que Javascript n'attend pas la réponse d'un appel API, d'une requête Ajax, d'un timer... avant de passer au bout de code suivant. 
- `concurrent`... Quoi ? Unithread mais concurrent ? Bon... On va essayer d'expliquer ça. Le caractère concurrent vient de la manière dont les API Web sont gérées. En effet, ces API ne sont pas gérées par la callStack de JS mais dans une API à part (en C++ pour node) qui a sa propre thread. Ce qui laisse de la place pour que JS traite d'autres choses en parallèle.
- `asynchronous` fait référence à la gestion de l'exécution des fonctions dans sa callStack. Par exemple, pour exécuter un traitement suite à une réponse d'un API Web de JS, ce traitement sera ajouter <b>uniquement une fois que l'API Web aura répondu</b> dans la callStack de JS. Et si vous voulez savoir ce que signifie "la callStack de JS", rendez-vous [ici](https://www.youtube.com/watch?v=Qe0IKzAB1OE).

Avec des mots plus simples, cela signifie que si on écrivait en JS le même code qu'en Java, tant que le serveur et l'enregistrement n'ont pas répondu, l'application serait complètement freeze. Ce n'est pas idéal. 

Pour remédier à ce soucis, plusieurs options ont été trouvées au fur à mesure du temps en JS.

### Option 1 : Le Callback (Hell)

```
function maSuperbeFonction(): void {
    googleService.rechercher(
        'PhotoChat',
        (photosChats) => photoChatDao.enregistrerNouvellePhoto(photosChats)
    );
}
```
Avantage : Ca marche, hein...

Inconvénient : 
- Complexité d'écriture et de lecture
- Pas de passage à l'échelle
- Logique complexe impossible à mettre en place
- Gestion des erreurs difficile


### Option 2 : Les promesses
```
function maSuperbeFonction(): void {
    googleService.rechercher('PhotoChat')
        .then((photosChats) => photoChatDao.enregistrerNouvellePhoto(photosChats))
        .catch(() => console.error('Une erreur est survenue'));
}
```
Avantage : 
- Natif en JS
- Permet de sortir du callback hell
- Passage à l'échelle possible
- Simplicité de la gestion des erreurs

Inconvénient : 
- Impossible de traiter le multi-événement (une promesse n'est pas un pipeline de données qui peut émettre plusieurs fois). Par exemple, traiter un événement de double-click à partir de promesses uniquement n'est pas simple.
- Une promesse est lancée au moment où elle est construite, il ne sera pas possible de l'annuler ultérieurement.

### Option 3 : async / await
```
async function maSuperbeFonction(): void {
    try {
        const photosChats = await googleService.rechercher('PhotoChat');
        await photoChatDao.enregistrerNouvellePhoto(photosChats);
    } catch (error) {
        console.error('Une erreur est survenue');
    }
}
```
En fait, il s'agit d'une réécriture sexy des Promesses. Elle hérite donc de ses avantages et défauts : 

Avantage : 
- Natif en JS
- Permet de sortir du callback hell
- Passage à l'échelle possible
- Simplicité de la gestion des erreurs (plus que pour les promesses, un simple try / catch fait le job)

Inconvénient : 
- Impossible de traiter le multi-événement (une promesse n'est pas un pipeline de données qui peut émettre plusieurs fois). Par exemple, traiter un événement de double-click à partir de promesses uniquement n'est pas simple.
- Une promesse est lancée au moment où elle est construite, il ne sera pas possible de l'annuler ultérieurement.
- Rapidement, tout devient `async`, et si une sous-sous-sous fonction appelée à un endroit devient `async`, alors toute la hiérarchie des fonctions appelantes devient `async`.


### Option 4 : Les observables
```
function maSuperbeFonction(): void {
    googleService.rechercher('PhotoChat').pipe(
        switchMap((photosChats) => photoChatDao.enregistrerNouvellePhoto(photosChats)),
        catchError(() => {
            console.error('Une erreur est survenue');
            return of(undefined);
        })
    ).subscribe();
}
```
Avantage : 
- Permet de sortir du callback hell
- Passage à l'échelle possible
- Simplicité de la gestion des erreurs
- Permet de traiter le multi-événement
- Possède tout une bibliothèque d'opérateur sympa pour faire tout plein d'opérations
- Utilise un design-pattern d'écriture de code (Observer) 

Inconvénient : 
- Nécessite une bibliothèque à importer
- Lourd pour des opérations asynchrones simples



## Sources de cette introduction : 
- [Callbacks VS Promises VS RXJS VS async / await](https://academind.com/tutorials/callbacks-vs-promises-vs-rxjs-vs-async-awaits/)
- [Single Threaded, Non-blocking, Asynchronous and Concurrent nature of JavaScript](https://medium.com/@monuchaudhary/single-threaded-non-blocking-asynchronous-and-concurrent-nature-of-javascript-a0d5483bcf4c)
- [Vidéo de présentation de la callstack de JS](https://www.youtube.com/watch?v=Qe0IKzAB1OE)