---
title: Parkourpedia
date: 2026-03-13
tags:
  - parkour
description: Traces est un site sur le corps, la culture et l'apprentissage.
author: Yann Daout
---

<!-- more -->
Depuis le temps, on devrait avoir de bonnes ressources publiquement accessibles pour apprendre et enseigner le parkour. Pourtant, ce n'est pas le cas. J'ai donc créé [Parkourpedia](https://parkourpedia.ch) pour combler cette lacune.

# Il n'y a pas de bonnes ressources francophones
Il n'y a à ma connaissance même pas un répertoire publiquement accessible de mouvements en français, langue d'origine du parkour^[Au début des années 2000, des pratiquants du monde entier faisaient de grands efforts pour retrouver les noms des techniques en français et y faire référence lorsqu'ils proposaient leurs traductions, tutoriaux, etc.]. Plus précisément, les ressources accessibles sont peu exhaustives, se contentant généralement des "bases" du parkour, comme si une version stéréotypée du parkour de 2010 était figée dans le temps. Un risque évident est celui de la réification. A force, on a l'impression que le parkour *est* cette liste de techniques. C'est d'autant plus dommage si cette liste est une version limitée et dépassée de ce que pourrait être le parkour, ou qu'elle représente mal ce que font en fait les pratiquants contemporains. Imaginez ce que de telles ressources risquent de devenir entre les mains d'enseignants d'éducation physique qui n'ont pas d'autre expérience du parkour.

# Des ressources exhaustives ?
Les ressources plus exhaustives existant dans d'autres langues présentent une très forte asymétrie en faveur des mouvements les plus complexes et difficiles, aux dépens de mouvements plus simples. [Parkour Theory](https://parkourtheory.com/) est un bon exemple. Avec 1773 techniques répertoriées au moment où j'écris, c'est une bonne exploration de ce que le corps humain peut faire et de ce que le parkour peut être à ses frontières les plus reculées. Et pourtant, il manque de nombreuses techniques que des débutants peuvent apprendre rapidement^[Pour ne prendre qu'un exemple: pas de passement de sécurité en arrière. On ne peut pas considérer cela comme une technique de niche alors qu'il y a pléthore de *270 Dive Down Monkey Quarter* et autres *Aerial Twist Vault Method Grab Shuriken*.]. C'est une des raisons, entre autres, qui limite l'intérêt de Parkour Theory hormis pour les pratiquants les plus avancés.

# Le problème du technicisme
Le parkour ne se réduit pas à une liste de techniques corporelles. Et pourtant, c'est à peu près tout ce que les ressources disponibles proposent. Cela doit être relié à la question de la réification mentionnée plus haut. Si l'on est amenés à concevoir que le parkour *est* une liste de techniques, alors apprendre ou enseigner le parkour revient à simplement parcourir quelques unes de ces techniques. Pas de créativité, pas de challenges, pas de perspective ludique, pas d'exploration de l'environnement. D'aucuns diraient: de la gymnastique. 
C'est là une question de contenu (ce qui est à apprendre ou enseigner); mais c'est aussi une question de méthode. Implicitement, la pédagogie de ces ressources est de donner des instructions techniques explicites (description du mouvement) accompagnées par une démonstration (photo ou vidéo). C'est un peu la pédagogie par défaut, et aller au-delà est souhaitable mais difficile.
Il y a donc une double lacune de ressources non technicistes, à la fois pour ce qui est du contenu comme des méthodes.

# Quelle solution ?
Pour commencer à résoudre ces différents problèmes, j'ai créé [Parkourpedia](https://parkourpedia.ch). C'est une librairie des techniques; mais aussi de formes d'entrainement, c'est-à-dire de jeux, exercices et progressions. Voici un morceau de solution: comment enseigner le parkour ? pas seulement au travers d'instructions explicites, mais au travers de formes d'entrainement.

Lorsque nous avons conçu le modèle Jeunesse+Sport (J+S) pour le parkour^[Dutoit, J. et al.,  _Manuel Parkour_, 2022], nous avons découpé la discipline en 11 "formes caractéristiques". Certaines sont assez traditionnelles, comme les sauts ou passements. Mais on y trouve également la créativité et le respect de soi, des autres et de l'environnement. Voilà un deuxième morceau de solution: qu'est-ce qui est visé par les formes d'entrainement ? pas seulement des techniques corporelles, mais des formes caractéristiques plus générales. Et à l'inverse: comment peut-on apprendre des compétences "abstraites" comme la créativité ou le flow ? via les formes d'entrainement pertinentes.

Parkourpedia est une librairie *orientée*, elle ne vise pas l'exhaustivité complète étant donné que d'autres tentent déjà de le faire. Parkourpedia se centre sur ce qui peut raisonnablement être appris par tout le monde sans l'aide de matériel spécifique. Il y a de l'arbitraire ici, mais heuristiquement, mettons entre parenthèses les techniques qui n'ont été jusqu'ici réalisées que par une poignée des pratiquants les plus expérimentés dans le monde, et concentrons-nous sur ce qui trouverait le plus facilement sa place dans un cours de parkour.

Finalement, Parkourpedia mérite un développement sur le long terme pour être une vraie solution. Est notamment prévu:

- Traduction en plusieurs langues (en, de)
- Progressions détaillées pour une sélection de techniques
- Ressources "clé en main" pour le parkour scolaire

Vous pouvez soutenir le développement de parkourpedia [ici](https://parkourpedia.ch/fr/support/). Avec ces limitations en tête, j'espère que Parkourpedia sera utile, et je suis ouvert à tout feedback pour rendre cela possible.