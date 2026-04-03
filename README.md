Gestionnaire de Réservation de Ressources
Présentation du Projet
Ce projet consiste en une application web full-stack dédiée à la gestion et à la réservation des ressources (salles de cours et matériel pédagogique). L'objectif est de centraliser les réservations pour éviter les conflits d'emploi du temps et faciliter le suivi des stocks par l'administration.

Durée du projet : 6 semaines

Objectif : Livraison d'un MVP (Produit Minimum Viable) fonctionnel.

Fonctionnalités principales (MVP)
Gestion des Utilisateurs
Authentification avec distinction de deux rôles : Etudiant et Administrateur.

Consultation de l'historique des réservations personnelles.

Administration des Ressources
Interface CRUD (Création, Lecture, Mise à jour, Suppression) pour les salles.

Gestion de l'inventaire matériel (caméras, accessoires, câblage).

Système de Réservation
Sélection de la ressource par date et plage horaire.

Algorithme de vérification automatique des disponibilités pour empêcher les doublons.

Vue Calendrier : Affichage dynamique des réservations par semaine ou par mois.

Stack Technique
Front-end : Blazor (WebAssembly ou Server)

Composants UI : MudBlazor ou Radzen (utilisation de bibliothèques de composants pour le Scheduler).

Back-end : API ASP.NET Core.

Accès aux données : Entity Framework Core.

Base de données : SQL Server (ou SQLite pour la phase de prototypage).

Organisation du développement (Roadmap)

Semaine 1 : Conception, modélisation de la base de données et maquettage des écrans.

Semaine 2 : Développement de l'API Back-end et intégration de la base de données.

Semaine 3 & 4 : Développement du Front-end Blazor et intégration du calendrier interactif.

Semaine 5 : Implémentation de la logique de gestion des conflits et tests unitaires.

Semaine 6 : Correction des bugs, polissage de l'interface et préparation du support de soutenance.

Extensions envisagées (Bonus)
Envoi de courriels de confirmation automatiques (MailKit).

Module de gestion des retours matériel via scan de QR Code.

Application de règles métier spécifiques (limitation de la durée des réservations).
