# Fodium — Billetterie Digitale & Transport Événementiel

> Développé par **Kanzey.co**  
> *Premier projet du Challenge Frontend Fodium (Fodium Public)*

---

## 1. Présentation du Projet

**Fodium** est une plateforme de billetterie digitale sécurisée conçue pour le grand public en Afrique de l’Ouest (Dakar, Diamniadio, Abidjan). Son objectif principal se résume en quatre étapes fluides :



Contrairement aux catalogues de billetterie froids et administratifs, Fodium intègre dès l’achat de billet la dimension critique du **transport événementiel** (*Fodium Transport*), résolvant le cauchemar des embouteillages, du stationnement introuvable et du retour nocturne complexe.

---

## 2. Stack Technique

* **Framework :** React 19 + TypeScript
* **Build tool :** Vite
* **Styling :** Tailwind CSS v4 (typographie personnalisée, palette sombre raffinée, safe areas mobiles)
* **Routage :** React Router v7 (`react-router-dom`)
* **Micro-interactions & Animations :** Motion (`motion/react`)
* **Iconographie :** Lucide React

---

## 3. Architecture du Code

```
src/
├── assets/
│   └── images/            # Visuels événementiels générés haute fidélité
├── components/
│   ├── events/            # Cartes d'événements, slots visuels
│   ├── layout/            # Layout principal avec header desktop & toast
│   ├── navigation/        # Header (Top Bar Contract) & BottomNavigation mobile
│   └── ui/                # Primitives (Button, Badge, etc.)
├── context/
│   └── BookingContext.tsx # État global panier, calculs dynamiques, portefeuille billets
├── data/
│   └── events.ts          # Données mockées réalistes et trajets navettes
├── pages/
│   ├── Home.tsx           # Page d'accueil avec recherche unifiée et raccourcis
│   ├── Events.tsx         # Découverte filtrée (catégories, villes, navette)
│   ├── EventDetails.tsx   # Page événement avec sélecteur Billet seul / Billet + Navette
│   ├── Checkout.tsx       # Parcours de paiement réinventé (Wave, OM, Carte)
│   ├── CheckoutSuccess.tsx# Écran de succès « Votre événement commence maintenant »
│   ├── Tickets.tsx        # Portefeuille « Mes billets » avec QR pass interactif
│   ├── Transport.tsx      # Teaser immersif Fodium Transport
│   └── Profile.tsx        # Profil utilisateur et préférences d'alertes
├── types/
│   └── index.ts           # Interfaces TypeScript strictes
├── App.tsx                # Définition des routes
└── index.css              # Règles CSS, polices et safe areas
```

---

## 4. Choix UX/UI

* **Mobile-First strict :** Conçu en priorité pour les écrans de smartphones (375px–430px) avec barre de navigation inférieure ergonomique à 5 accès, boutons d'action dans la zone naturelle du pouce et respect des `safe-area-inset-bottom`.
* **Règles Anti-Slop :** 
  * **Zéro-Pill pour les métadonnées statiques :** les informations (date, lieu, catégorie) utilisent du texte sobre et des séparateurs typographiques (`·`), sans bulles multicolores excessives.
  * **Top Bar Contract respecté :** un en-tête desktop clair à 3 zones (Marque textuelle unique, 4–6 liens de navigation, bouton d'action principal).
  * **Hiérarchie 60-30-10 :** 60% fond sombre carbone (`#0B0F17`), 30% cartes structurelles (`#121824`), 10% accent solaire (`#FF5500` / Orange Électrique).

---

## 5. Problème Identifié dans le Checkout Traditionnel

Les systèmes de billetterie traditionnels souffrent de frictions majeures :
1. **Rupture de contexte :** Redirection vers des passerelles bancaires tierces anxiogènes ou obligation de remplir un formulaire d'inscription en 4 étapes avant même de voir le récapitulatif.
2. **Ignorance de la logistique :** Le billet est acheté isolément, laissant l'acheteur face au problème non résolu du déplacement vers l'événement.
3. **Moyens de paiement inadaptés :** Forcer la carte bancaire dans une zone où Wave et Orange Money représentent plus de 80% des transactions du quotidien.

---

## 6. Solution Proposée pour le Paiement

Fodium propose un **parcours unifié et continu** :
* Présentation claire et différenciée des opérateurs mobiles dominants :
  * **Wave :** Expérience 1-Click avec notification push simulée.
  * **Orange Money :** Flux rapide avec code d'autorisation `#144#`.
  * **Carte Bancaire :** Formulaire direct et sécurisé pour cartes locales et internationales.
* Aucun rechargement de page agressif : le passage de la saisie au traitement se fait par une transition animée d'étapes de sécurisation en temps réel.

---

## 7. Pourquoi cette Expérience est Meilleure

* **Calcul dynamique transparent :** L'ajout de l'option « Billet + Navette » calcule instantanément le tarif en fonction du point de départ choisi (ex. Almadies +3 000 FCFA, Plateau +3 500 FCFA), sans surprise lors du paiement.
* **Gain de temps :** Moins de 60 secondes entre la découverte d'un concert et la mise à disposition du billet dans le portefeuille numérique.
* **Sérénité totale :** L'utilisateur sait exactement à quelle heure et où il embarque, avec retour garanti après la clôture de l'événement.

---

## 8. Choix des Animations

* Réalisées avec **Motion** (`motion/react`) en respectant les performances :
  * Uniquement des propriétés accélérées matériellement (`transform`, `opacity`).
  * Dépliement fluide du sélecteur de point de départ lors de l'activation du mode « Billet + Navette ».
  * Transition d'état de paiement fluide simulant les étapes de validation bancaire.
 

---

## 9. Responsive

* **Mobile (375px–430px) :** Navigation flottante basse 5 onglets, cartes verticales lisibles, CTA pleine largeur.
* **Tablette (768px–1024px) :** Grille 2 colonnes, détails d'événement équilibrés.
* **Desktop (1280px–1440px+) :** Header top bar complet, récapitulatif latéral sticky, grille 3 colonnes pour le catalogue.

---

## 10. Données Mockées

Toutes les données sont gérées localement dans `src/data/events.ts` et `src/context/BookingContext.tsx` :
* Événements phares : *Dakar Afro Fusion Fest*, *Sommet Africain de la Tech*, *Dakar Taste Nights*, *Dakar Haute Couture Runway*.
* Lignes de navettes : Almadies, Plateau, Mermoz/Point E, Rufisque, Ngor.
* Billets utilisateur stockés dynamiquement dans `localStorage` pour persister après achat pendant la démo.

---

## 11. Ce qui n'est Volontairement Pas Développé

* **Aucun backend réel :** Tout le calcul et la persistance fonctionnent côté client pour la démonstration.
* **Aucun prélèvement financier réel :** Les numéros de téléphone et cartes ne sont pas débités.
* **Pas de Fodium Pro :** L'interface organisateur / scanneur fait l'objet d'un module séparé conformément au cahier des charges.

---

## 12. Lancement en Local

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev

# 3. Ouvrir dans le navigateur
# http://localhost:3000
```

---

## 13. Pistes d'Évolution Future

Avec plus de temps et en intégrant les services de production :
1. Intégration des webhooks réels de l'API Wave Business et Orange Money Merchant.
2. Géolocalisation en direct sur carte interactive des navettes Fodium en approche de l'arrêt.
3. Transfert sécurisé de billet entre amis par QR code à usage unique (anti-revente spéculative).
4. Ajout de pass groupe avec réduction automatique sur le trajet navette partagé.
