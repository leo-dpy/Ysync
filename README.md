# 1. Le MVP (Minimum Viable Product)

**Authentification basique :** Deux rôles "Étudiant" et "Admin"
**Gestion des ressources (CRUD) :** L'admin doit pouvoir créer, modifier et supprimer des salles ou du matos
**Le système de réservation :** L'étudiant sélectionne une ressource, choisit une date et une plage horaire. L'appli doit vérifier qu'il n'y a pas de conflits
**Le calendrier partagé :** Un visuel au mois ou à la semaine où on voit les disponibilités etc...

# 2. La Stack Technique

**Front-end :** Blazor Server. Utilisation d'une bibliothèque comme MudBlazor ou Radzen. Ils ont des composants "Scheduler" ou "Calendar" déjà fait
**Back-end :** Une API en ASP.NET
**Base de données :** Une base SQL. La modélisation de la base de données (Tables : Utilisateurs, Ressources, Réservations)

## 3. Les bonus pour exploser la note (si vous avez le temps)

**Envoi d'emails auto :** Un mail de confirmation quand la réservation est validée, ou un rappel la veille
**Règles métier poussées :** Empêcher un étudiant de réserver plus de 4 heures d'affilée, ou bloquer les réservations la nuit etc...

## 4. Le plan d'attaque de conceptualisation

**_Semaine 1 :_** Création d'une première maquette graphique du site

**_Semaine 2 :_** Création de l'API et de la base de données (le back-end)

**_Semaine 3 & 4 :_** Création des écrans avec Blazor, connexion à l'API, mise en place du calendrier visuel

**_Semaine 5 :_** Gestion des conflits entre les salles

**_Semaine 6 :_** Recherche des bugs et ajout des bonus
