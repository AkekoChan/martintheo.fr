---
layout: about
title: A propos de moi
description: Moi, c'est Théo Martin. Un jeu développeur web orienté sur la partie frontend. Je suis créatif et j'aime découvrir de nouvelles choses.
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

<ul class="about-items"><li class="about-item">{% render "button.html" isLink: true, buttonText: "Mon Email", buttonClass: "about-btn", buttonLink: "mailto:artapp.theo@gmail.com", buttonIcon: "envelope" %}</li>
    <li class="about-item">{% render "button.html" isLink: true, isDownload: true, buttonText: "Télécharger mon CV",buttonClass: "about-btn", buttonLink: "/assets/images/cv/cv.pdf", buttonIcon: "download" %}</li></ul>

**Développeur web** passionné par la création de sites web, j'ai fini mon cursus universitaire. Je suis diplômé d'un BUT MMI (Métiers du Multimédia et de l'Internet) en option développement web..

**Curieux** et à **l'affût des dernières** tendances du web, je suis en constante recherche de nouvelles connaissances et d'outils pour améliorer mes compétences.

Je suis également doté d'un excellent esprit d'analyse et de résolution de problèmes, ce qui me permet de mener à bien des projets complexes de **manière autonome** et **efficace**.

**Rigoureux** et **méthodique**, j'accorde une grande importance à la qualité de mon travail.
