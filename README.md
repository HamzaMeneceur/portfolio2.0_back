# Le projet Portfolio 2.0

Pour tester le projet :

```bash
npm i
```

Vérifier le env.example et remplir les champs correspondant

Utiliser le script :

```bash
npm run build
```

>Build vas permettre de supprimer le fichier dist et de relancer TSC, certaint fichier sont copier avec le script `npm run copy`

## A partir d'ici

### Le projet se décline en deux sous projets

* D'un côté : 
un portail administrateur

>Le portail est gérer de façon Monolithic

* De l'autre :
l'API REST du portfolio 2.0 front-end

>Les ports sont différents, j'utilise `npm run start:all` ceci sert à écouter les deux ports

