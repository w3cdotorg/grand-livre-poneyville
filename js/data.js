// Le Grand livre de Poneyville — données des personnages et des lieux.

export const PERSONNAGES = [
  {
    id: "twilight",
    nom: "Twilight Sparkle",
    espece: "licorne",
    couleurs: { robe: "#d291eb", criniere: ["#152878", "#fc0b8a", "#600a92"], yeux: "#561c81" },
    cutieMark: "une grande étoile rose entourée de petites étoiles blanches",
    lieuId: "bibliotheque",
    liens: {
      famille: [],
      amis: ["applejack", "rainbow-dash", "pinkie-pie", "fluttershy", "rarity", "spike"],
      animal: "owlowiscious"
    },
    carte: { x: 48, y: 55 },
    texte: "Twilight Sparkle est une licorne qui adore les livres et la magie. Elle habite dans la bibliothèque de Poneyville avec son ami Spike. C'est l'élève préférée de la princesse Celestia.",
    leSaisTu: "Un jour, Twilight aura des ailes et deviendra une princesse !"
  },
  {
    id: "applejack",
    nom: "Applejack",
    espece: "terrestre",
    couleurs: { robe: "#f8a65d", criniere: ["#f3dc79"], yeux: "#4cb157", chapeau: "#a9742f" },
    cutieMark: "trois pommes rouges",
    lieuId: "sweet-apple-acres",
    liens: {
      famille: ["big-macintosh", "apple-bloom", "granny-smith"],
      amis: ["twilight", "rainbow-dash", "pinkie-pie", "fluttershy", "rarity"],
      animal: "winona"
    },
    carte: { x: 18, y: 58 },
    texte: "Applejack est une pouliche terrestre honnête et très forte. Elle travaille dur à la ferme Sweet Apple Acres pour récolter les pommes. Elle aime sa famille par-dessus tout.",
    leSaisTu: "Applejack sait attraper presque n'importe quoi avec son lasso !"
  },
  {
    id: "rainbow-dash",
    nom: "Rainbow Dash",
    espece: "pegase",
    couleurs: {
      robe: "#9edbf9",
      criniere: ["#ee4144", "#f37033", "#fdf6af", "#62bc4d", "#1e98d3", "#672f89"],
      yeux: "#d2377b"
    },
    cutieMark: "un nuage avec un éclair arc-en-ciel",
    lieuId: "cloudsdale",
    liens: {
      famille: [],
      amis: ["twilight", "applejack", "pinkie-pie", "fluttershy", "rarity"],
      animal: "tank"
    },
    carte: { x: 20, y: 12 },
    texte: "Rainbow Dash est une pégase, la plus rapide de toute Equestria. Elle adore voler dans le ciel et dégager les nuages. Son rêve est de rejoindre les Wonderbolts.",
    leSaisTu: "Rainbow Dash peut faire un arc-en-ciel supersonique quand elle vole très très vite !"
  },
  {
    id: "pinkie-pie",
    nom: "Pinkie Pie",
    espece: "terrestre",
    couleurs: { robe: "#f6b7d2", criniere: ["#ed72aa"], yeux: "#6dc0ea" },
    cutieMark: "trois ballons colorés",
    lieuId: "sugarcube-corner",
    liens: {
      famille: [],
      amis: ["twilight", "applejack", "rainbow-dash", "fluttershy", "rarity"],
      animal: "gummy"
    },
    carte: { x: 58, y: 50 },
    texte: "Pinkie Pie est une pouliche terrestre pleine de joie de vivre. Elle travaille à la pâtisserie Sugarcube Corner et adore organiser des fêtes. Elle habite juste au-dessus, dans le grenier.",
    leSaisTu: "Pinkie Pie a un « Pinkie sens » qui la prévient quand quelque chose va tomber !"
  },
  {
    id: "fluttershy",
    nom: "Fluttershy",
    espece: "pegase",
    couleurs: { robe: "#fdf6af", criniere: ["#f7b6cf"], yeux: "#35c4b5" },
    cutieMark: "trois papillons roses",
    lieuId: "chaumiere-fluttershy",
    liens: {
      famille: [],
      amis: ["twilight", "applejack", "rainbow-dash", "pinkie-pie", "rarity"],
      animal: "angel"
    },
    carte: { x: 68, y: 72 },
    texte: "Fluttershy est une pégase timide et très douce. Elle habite près de la forêt Désenchantée et s'occupe de tous les animaux. Elle prend soin d'eux avec beaucoup de patience.",
    leSaisTu: "Le regard calme de Fluttershy peut apaiser même un dragon !"
  },
  {
    id: "rarity",
    nom: "Rarity",
    espece: "licorne",
    couleurs: { robe: "#f2f0f7", criniere: ["#5b4a8e"], yeux: "#1f6bb1" },
    cutieMark: "trois diamants bleus",
    lieuId: "carousel-boutique",
    liens: {
      famille: ["sweetie-belle"],
      amis: ["twilight", "applejack", "rainbow-dash", "pinkie-pie", "fluttershy"],
      animal: "opale"
    },
    carte: { x: 40, y: 48 },
    texte: "Rarity est une licorne élégante et généreuse. Elle est couturière et crée de jolies robes dans sa boutique, la Carousel Boutique. Elle adore tout ce qui brille.",
    leSaisTu: "La magie de Rarity lui permet de trouver des gemmes cachées sous la terre !"
  },
  {
    id: "spike",
    nom: "Spike",
    espece: "dragon",
    couleurs: { robe: "#a56fc0", criniere: ["#3fa541"], yeux: "#2f9e41", ventre: "#c9ea94" },
    cutieMark: null,
    lieuId: "bibliotheque",
    liens: { famille: [], amis: ["twilight"] },
    texte: "Spike est un bébé dragon, le fidèle assistant de Twilight Sparkle. Il envoie les lettres à la princesse Celestia grâce à son feu magique. Il adore aussi collectionner les gemmes."
  },
  {
    id: "big-macintosh",
    nom: "Big Macintosh",
    espece: "terrestre",
    couleurs: { robe: "#c6553b", criniere: ["#f4a93f"], yeux: "#77b255" },
    cutieMark: "une moitié de pomme verte",
    lieuId: "sweet-apple-acres",
    liens: { famille: ["applejack", "apple-bloom", "granny-smith"], amis: [] },
    texte: "Big Macintosh est un grand poney terrestre, très fort et travailleur. Il vit à Sweet Apple Acres avec toute sa famille. Il parle peu, mais on peut toujours compter sur lui.",
    leSaisTu: "Quand on lui pose une question, Big Macintosh répond presque toujours « Eeyup » !"
  },
  {
    id: "apple-bloom",
    nom: "Apple Bloom",
    espece: "terrestre",
    couleurs: { robe: "#fbf1a6", criniere: ["#e8595d"], yeux: "#f18a44", noeud: "#f27a9c" },
    cutieMark: null,
    lieuId: "sweet-apple-acres",
    liens: {
      famille: ["applejack", "big-macintosh", "granny-smith"],
      amis: ["sweetie-belle", "scootaloo"]
    },
    texte: "Apple Bloom est une jeune pouliche terrestre de la famille Apple. Elle n'a pas encore de marque de beauté sur son flanc. Avec ses amies Sweetie Belle et Scootaloo, elle fait partie des Chercheuses de talent."
  },
  {
    id: "sweetie-belle",
    nom: "Sweetie Belle",
    espece: "licorne",
    couleurs: { robe: "#f5eff7", criniere: ["#e8b9de", "#c9a2e0"], yeux: "#a8e06e" },
    cutieMark: null,
    lieuId: "carousel-boutique",
    liens: { famille: ["rarity"], amis: ["apple-bloom", "scootaloo"] },
    texte: "Sweetie Belle est une jeune licorne, la petite sœur de Rarity. Elle chante merveilleusement bien. Avec ses amies Apple Bloom et Scootaloo, elle cherche encore sa marque de beauté."
  },
  {
    id: "scootaloo",
    nom: "Scootaloo",
    espece: "pegase",
    couleurs: { robe: "#f19b5b", criniere: ["#ee4c93"], yeux: "#8b60c6" },
    cutieMark: null,
    lieuId: "ecole-poneyville",
    liens: { famille: [], amis: ["apple-bloom", "sweetie-belle"] },
    texte: "Scootaloo est une jeune pégase qui adore filer en trottinette. Elle admire beaucoup Rainbow Dash. Avec ses amies Apple Bloom et Sweetie Belle, elle fait partie des Chercheuses de talent."
  },
  {
    id: "zecora",
    nom: "Zecora",
    espece: "zebre",
    couleurs: { robe: "#8e8e99", rayures: "#ededf2", criniere: ["#54545e", "#ededf2"], yeux: "#7ecbc4" },
    cutieMark: "un soleil gris en spirale",
    lieuId: "hutte-zecora",
    liens: { famille: [], amis: [] },
    texte: "Zecora vit dans la forêt Désenchantée. Elle prépare des potions dans sa hutte et parle toujours en rimes. Sage et gentille, elle est très appréciée des poneys de Poneyville."
  },
  {
    id: "celestia",
    nom: "Princesse Celestia",
    espece: "alicorne",
    couleurs: { robe: "#fdfdff", criniere: ["#9be0dc", "#8fcaf0", "#f8b3c9"], yeux: "#d19fe0", or: "#f7c55c" },
    cutieMark: "un soleil doré",
    lieuId: "canterlot",
    liens: { famille: ["luna"], amis: [] },
    texte: "La princesse Celestia est une alicorne qui dirige Equestria. Chaque matin, c'est elle qui lève le soleil. Elle est aussi la mentor de Twilight Sparkle."
  },
  {
    id: "luna",
    nom: "Princesse Luna",
    espece: "alicorne",
    couleurs: { robe: "#3b4699", criniere: ["#232c6b", "#3d4fb5"], yeux: "#9fe6e2" },
    cutieMark: "un croissant de lune",
    lieuId: "canterlot",
    liens: { famille: ["celestia"], amis: [] },
    texte: "La princesse Luna est une alicorne qui lève la lune chaque soir. Elle veille avec attention sur les rêves de tous les poneys. Elle habite au château de Canterlot avec sa sœur Celestia."
  },
  {
    id: "granny-smith",
    nom: "Granny Smith",
    espece: "terrestre",
    couleurs: { robe: "#c6e5a7", criniere: ["#efefef"], yeux: "#f5a65a" },
    cutieMark: "une tarte aux pommes",
    lieuId: "sweet-apple-acres",
    liens: { famille: ["applejack", "big-macintosh", "apple-bloom"], amis: [] },
    texte: "Granny Smith est la grand-mère de la famille Apple. C'est elle qui a fondé Poneyville il y a très longtemps. Elle prépare la meilleure tarte aux pommes de toute la région."
  },
  {
    id: "discord",
    nom: "Discord",
    espece: "draconequus",
    couleurs: { robe: "#a0714f", criniere: ["#3d3554"], yeux: "#f9c816" },
    cutieMark: null,
    lieuId: null,
    liens: { famille: [], amis: ["fluttershy"] },
    texte: "Discord est un draconequus, un esprit espiègle fait de morceaux de plusieurs animaux différents. Il aimait autrefois semer la pagaille partout. Grâce à l'amitié de Fluttershy, il est devenu bien plus gentil."
  },
  {
    id: "trixie",
    nom: "Trixie",
    espece: "licorne",
    couleurs: { robe: "#99cce8", criniere: ["#c8cfe0", "#a9b2c8"], yeux: "#c14fb0", cape: "#6157b5" },
    cutieMark: "une baguette magique et un croissant de lune",
    lieuId: null,
    liens: { famille: [], amis: [] },
    texte: "Trixie est une licorne magicienne qui adore donner des spectacles. Elle porte un grand chapeau et une cape étoilés. Elle aime se présenter comme « la Grande et Puissante Trixie »."
  },
  {
    id: "derpy",
    nom: "Derpy",
    espece: "pegase",
    couleurs: { robe: "#a5a7ce", criniere: ["#f3dc79"], yeux: "#f9c816" },
    cutieMark: "des bulles grises",
    lieuId: null,
    liens: { famille: [], amis: [] },
    texte: "Derpy est une pégase toujours souriante qui adore les muffins. Elle livre le courrier dans tout Poneyville. Elle est un peu maladroite, mais tout le monde l'aime beaucoup."
  },
  {
    id: "cheerilee",
    nom: "Cheerilee",
    espece: "terrestre",
    couleurs: { robe: "#d57ea5", criniere: ["#f581b6", "#eda9cc"], yeux: "#7ece73" },
    cutieMark: "trois fleurs souriantes",
    lieuId: "ecole-poneyville",
    liens: { famille: [], amis: [] },
    texte: "Cheerilee est la maîtresse de l'école de Poneyville. Elle est patiente et toujours joyeuse avec ses élèves. Elle adore apprendre de nouvelles choses aux petits poneys."
  },
  {
    id: "angel",
    nom: "Angel",
    espece: "lapin",
    couleurs: { robe: "#f4f4f6", criniere: [], yeux: "#74b9e0" },
    cutieMark: null,
    lieuId: "chaumiere-fluttershy",
    liens: { famille: [], amis: [], proprietaire: "fluttershy" },
    texte: "Angel est le petit lapin blanc de Fluttershy. Il a un caractère bien trempé, mais Fluttershy l'aime beaucoup. Il vit avec elle dans sa chaumière."
  },
  {
    id: "gummy",
    nom: "Gummy",
    espece: "alligator",
    couleurs: { robe: "#a3d46e", criniere: [], yeux: "#cd8bd6" },
    cutieMark: null,
    lieuId: "sugarcube-corner",
    liens: { famille: [], amis: [], proprietaire: "pinkie-pie" },
    texte: "Gummy est le bébé alligator de Pinkie Pie. Il n'a pas encore de dents, alors il mordille tout ce qu'il trouve. Il vit avec elle à Sugarcube Corner."
  },
  {
    id: "winona",
    nom: "Winona",
    espece: "chien",
    couleurs: { robe: "#b5773f", blanc: "#f6efe3", criniere: [], yeux: "#6b4a2b" },
    cutieMark: null,
    lieuId: "sweet-apple-acres",
    liens: { famille: [], amis: [], proprietaire: "applejack" },
    texte: "Winona est la chienne de berger d'Applejack. Elle aide à rassembler le troupeau à la ferme. Elle vit avec la famille Apple à Sweet Apple Acres."
  },
  {
    id: "opale",
    nom: "Opale",
    espece: "chat",
    couleurs: { robe: "#f0ebf5", criniere: ["#c4b7d9"], yeux: "#4fbfa0", noeud: "#7a5fb5" },
    cutieMark: null,
    lieuId: "carousel-boutique",
    liens: { famille: [], amis: [], proprietaire: "rarity" },
    texte: "Opale est la chatte blanche de Rarity. Elle est un peu grognonne, mais Rarity l'aime énormément. Elle vit avec elle dans la Carousel Boutique."
  },
  {
    id: "tank",
    nom: "Tank",
    espece: "tortue",
    couleurs: { robe: "#9bc463", carapace: "#6e8f4f", criniere: [], yeux: "#e8a33d" },
    cutieMark: null,
    lieuId: "cloudsdale",
    liens: { famille: [], amis: [], proprietaire: "rainbow-dash" },
    texte: "Tank est la tortue de compagnie de Rainbow Dash. Il est tranquille et prend son temps, mais grâce à une petite hélice, il peut voler. Il vit à Cloudsdale avec elle."
  },
  {
    id: "owlowiscious",
    nom: "Owlowiscious",
    espece: "hibou",
    couleurs: { robe: "#8e6742", ventre: "#d8b98c", criniere: [], yeux: "#f2c14e" },
    cutieMark: null,
    lieuId: "bibliotheque",
    liens: { famille: [], amis: [], proprietaire: "twilight" },
    texte: "Owlowiscious est le hibou de nuit de Twilight Sparkle. Il l'aide à surveiller la bibliothèque pendant la nuit. Quand on lui parle, il répond toujours « hou-hou »."
  }
];

export const LIEUX = [
  {
    id: "bibliotheque",
    nom: "La bibliothèque Golden Oak",
    habitants: ["twilight", "spike", "owlowiscious"],
    carte: { x: 48, y: 55 },
    texte: "La bibliothèque Golden Oak est une maison creusée dans un grand chêne vivant. Elle est remplie de livres du sol au plafond. C'est ici qu'habitent Twilight, Spike et Owlowiscious."
  },
  {
    id: "sweet-apple-acres",
    nom: "Sweet Apple Acres",
    habitants: ["applejack", "big-macintosh", "apple-bloom", "granny-smith", "winona"],
    carte: { x: 18, y: 58 },
    texte: "Sweet Apple Acres est la grande ferme de la famille Apple. Des vergers de pommiers s'étendent à perte de vue. Une grande grange rouge trône au milieu des champs."
  },
  {
    id: "carousel-boutique",
    nom: "La Carousel Boutique",
    habitants: ["rarity", "sweetie-belle", "opale"],
    carte: { x: 40, y: 48 },
    texte: "La Carousel Boutique est la boutique de couture de Rarity. Elle est ronde comme un manège, avec un toit tout en pointe. C'est là que Rarity crée ses plus belles robes."
  },
  {
    id: "sugarcube-corner",
    nom: "Sugarcube Corner",
    habitants: ["pinkie-pie", "gummy"],
    carte: { x: 58, y: 50 },
    texte: "Sugarcube Corner est la pâtisserie de Poneyville. Elle ressemble à une maison en pain d'épices, toute décorée de bonbons. Pinkie Pie habite juste au-dessus, dans le grenier."
  },
  {
    id: "chaumiere-fluttershy",
    nom: "La chaumière de Fluttershy",
    habitants: ["fluttershy", "angel"],
    carte: { x: 68, y: 72 },
    texte: "La chaumière de Fluttershy est une petite maison au bord de la forêt Désenchantée. Elle est entourée de terriers et de nichoirs pour tous ses amis animaux. C'est un endroit calme et paisible."
  },
  {
    id: "foret-desenchantee",
    nom: "La forêt Désenchantée",
    habitants: ["zecora"],
    carte: { x: 55, y: 88 },
    texte: "La forêt Désenchantée est un lieu mystérieux où la nature pousse toute seule. Les arbres y sont un peu tordus et les plantes poussent librement. Les poneys de Poneyville n'y vont pas très souvent."
  },
  {
    id: "hutte-zecora",
    nom: "La hutte de Zecora",
    habitants: ["zecora"],
    carte: { x: 42, y: 90 },
    texte: "La hutte de Zecora est une cabane installée dans un gros arbre, au cœur de la forêt Désenchantée. Elle est remplie de masques colorés et de potions mystérieuses. C'est là que Zecora prépare ses remèdes."
  },
  {
    id: "canterlot",
    nom: "Canterlot",
    habitants: ["celestia", "luna"],
    carte: { x: 80, y: 18 },
    texte: "Canterlot est la capitale d'Equestria. Son château blanc et or est accroché à flanc de montagne. C'est là que vivent les princesses Celestia et Luna."
  },
  {
    id: "cloudsdale",
    nom: "Cloudsdale",
    habitants: ["rainbow-dash", "tank"],
    carte: { x: 20, y: 12 },
    texte: "Cloudsdale est la ville des pégases, posée tout en haut sur les nuages. C'est ici que l'on fabrique la météo et les arcs-en-ciel. Rainbow Dash y vit avec sa tortue Tank."
  },
  {
    id: "ecole-poneyville",
    nom: "L'école de Poneyville",
    habitants: ["cheerilee", "scootaloo"],
    carte: { x: 65, y: 60 },
    texte: "L'école de Poneyville est reconnaissable à sa cloche rouge. C'est là que les petits poneys du village viennent apprendre. La maîtresse d'école s'appelle Cheerilee."
  }
];

const parId = (liste) => Object.fromEntries(liste.map(e => [e.id, e]));
export const PERSONNAGE = parId(PERSONNAGES);
export const LIEU = parId(LIEUX);
