# DEAL AVENUE — site de commandes

## Ce que contient le site
- Page d'accueil
- Catalogue de produits
- Filtre par catégorie
- Panier
- Formulaire de commande
- Envoi de la commande directement sur TON WhatsApp
- Panier sauvegardé dans le navigateur
- Aucun abonnement Shopify/Webador

## Installation
1. Ouvre `script.js`.
2. Remplace `33600000000` par ton numéro WhatsApp au format international, sans `+`.
3. Mets tes photos dans le dossier `images`.
4. Dans `PRODUCTS`, modifie les noms, prix et noms des photos.
5. Ouvre `index.html` pour tester.

## Important
Cette version ne prend PAS les paiements en ligne. Le client passe la commande et toi tu confirmes ensuite le paiement et la livraison.

Pour rendre le site public, il faudra utiliser un hébergement statique gratuit (par exemple GitHub Pages). Il n'y a pas de solution pour qu'un site accessible à tous fonctionne "sans hébergement" : les fichiers doivent être stockés quelque part.

## Pour un vrai espace admin
On peut ensuite remplacer WhatsApp par une base de données gratuite (par exemple Supabase) afin d'avoir une page `/admin` avec:
- nouvelles commandes
- commandes en préparation
- commandes expédiées
- suppression/archivage
- ajout/modification de produits
