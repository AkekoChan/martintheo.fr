---
layout: about
title: A propos de moi
description: Moi, c’est Théo Martin. Passionné par le développement front-end & le design web, je suis toujours à la recherche de nouvelles idées pour combiner créativité et code. J’adore découvrir de nouvelles technologies et relever des défis pour créer des projets palpitants.
permalink: "/about/"
stylesheets:
  - /assets/styles/about.css
eleventyComputed:
  preloads:
    - as: style
      type: text/css
      href: /assets/styles/about.css
---

# A propos de moi

<figure>
{% render "picture.html" src: "src/assets/images/theo_enorme.png", alt: "Une paire de lunettes stylisée, reflétant la personnalité et les passions du créateur du site.", className: "about-picture", imgClassName: "about-img img", isLazy: false %}
<figcaption>Illustration par Sophie Garreta</figcaption>
</figure>

**Développeur front-end** et **designer web** passionné par l’univers du web, j'aime créer des designs et leur donner vie.

Récemment diplômé d'un **BUT MMI** (Métiers du Multimédia et de l'Internet), option développement web, je ne compte pas m'arrêter là. Je souhaite approfondir mes compétences en suivant un **Mastère Product Manager** chez **Ynov Bordeaux** pour continuer à apprendre et à me perfectionner.

Je suis quelqu'un qui explore sans cesse, qui teste, qui apprend constamment. Mon objectif est de toujours rester à la pointe en expérimentant de nouvelles approches, que ce soit en code, en design ou en accessibilité.

**L’accessibilité** est une valeur que je défends et que je mets en avant autant que possible dans mes projets. C’est un aspect fondamental qui devrait être au cœur de chaque création, afin d’offrir une **expérience inclusive** à tous les utilisateurs.

J'accorde une grande importance aux détails et à la qualité de mes réalisations. J'aime aussi réfléchir à la manière dont une interface peut être à la fois esthétique et fonctionnelle. Pour moi, le véritable défi est de trouver cet équilibre subtil entre **technique** et **créativité**, et c’est cela qui me passionne.

Si une phrase résume bien ma vision, c'est celle-ci :

{% render "quote.html" quote: "J'ai envie de me retrouver dans la phase de l'élève qui apprend.", cite: "Damso"  %}

<ul class="about-items">
    <li class="about-item">{% render "button.html" isLink: true, isDownload: true, buttonText: "Télécharger mon CV", buttonClass: "about-btn", buttonLink: "/assets/cv/cv-theo-martin.pdf", buttonIcon: "download" %}</li>
</ul>
