
# rxjs-exercices
  Des exercices de RXJS permettant de pratiquer les bases de la librairie.
  
  ## Installer le projet
  Le projet fonctionne avec une version de Node supérieure à 18.16 ainsi qu'avec une version de npm supérieure à 8.18.0.
  ```sh
$ node -v && npm -v
v18.16.0
8.18.0
```
Après avoir cloné le répertoire, lancer un `npm install` et le tour est joué !

## Description du contenu du projet
Ce projet est un regroupement d'exercices et de quiz visant à se familiariser avec l'utilisation de RXJS. 

### Les exercices
Les exercices sont disponibles dans le dossier `exercice`. Pour chaque exercice, un test unitaire est disponible afin de vérifier si la réponse à l'exercice est correcte. Une correction est aussi proposée (évidemment, il y a toujours plusieurs manières de faire la même chose...). Chaque exercice est accompagné d'un jeu de tests. Par exemple, si vous avez répondu à l'exercice 1 et que vous voulez vérifier que votre réponse est correcte, vous pouvez exécuter la commande suivante :  
  ```sh
$ npm run test exo1.spec.ts
```

### Les quiz
Les quiz sont disponibles dans le dossier `quiz`. Chaque quiz est découpé en question, l'objectif à chaque fois est de savoir ce qui sera affiché dans la console pour chaque question exécutée. Pour lancer une question, ajouter l'appel de la méthode en bas de fichier de quiz et lancer ensuite le quiz via la commande (exemple pour lancer le quiz1) :
  ```sh
$ npm run quiz --numero=1
```

## Outil mis à disposition 
Afin de simuler certains comportement, différents outils sont mis à disposition : une classe simulant un service web ainsi que différents objets et modèle afin de rendre le plus concret possible les exercices demandés.
