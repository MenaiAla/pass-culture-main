const state = {
  data: {
    bookings: [],
    events: [],
    mediations: [
      {
        id: 'H4',
        authorId: null,
        backText: 'Some back test',
        credit: null,
        dateCreated: '2019-03-07T10:39:23.560464Z',
        dateModifiedAtLastProvider: '2019-03-07T10:40:08.324689Z',
        frontText: 'Some front text',
        idAtProviders: null,
        isActive: true,
        lastProviderId: null,
        modelName: 'Mediation',
        offerId: 'UU',
        thumbCount: 1,
        tutoIndex: null,
      },
      {
        id: 'HY',
        authorId: null,
        backText: 'Some back test',
        credit: null,
        dateCreated: '2019-03-07T10:39:23.560464Z',
        dateModifiedAtLastProvider: '2019-03-07T10:40:08.320914Z',
        frontText: 'Some front text',
        idAtProviders: null,
        isActive: true,
        lastProviderId: null,
        modelName: 'Mediation',
        offerId: 'UM',
        thumbCount: 1,
        tutoIndex: null,
      },
      {
        id: 'HU',
        authorId: null,
        backText: 'Some back test',
        credit: null,
        dateCreated: '2019-03-07T10:39:23.560464Z',
        dateModifiedAtLastProvider: '2019-03-07T10:40:08.313034Z',
        frontText: 'Some front text',
        idAtProviders: null,
        isActive: true,
        lastProviderId: null,
        modelName: 'Mediation',
        offerId: 'UE',
        thumbCount: 1,
        tutoIndex: null,
      },
      {
        id: 'HQ',
        authorId: null,
        backText: 'Some back test',
        credit: null,
        dateCreated: '2019-03-07T10:39:23.560464Z',
        dateModifiedAtLastProvider: '2019-03-07T10:40:08.306636Z',
        frontText: 'Some front text',
        idAtProviders: null,
        isActive: true,
        lastProviderId: null,
        modelName: 'Mediation',
        offerId: 'T4',
        thumbCount: 1,
        tutoIndex: null,
      },
      {
        id: 'HM',
        authorId: null,
        backText: 'Some back test',
        credit: null,
        dateCreated: '2019-03-07T10:39:23.560464Z',
        dateModifiedAtLastProvider: '2019-03-07T10:40:08.299908Z',
        frontText: 'Some front text',
        idAtProviders: null,
        isActive: true,
        lastProviderId: null,
        modelName: 'Mediation',
        offerId: 'TU',
        thumbCount: 1,
        tutoIndex: null,
      },
    ],
    offerers: [
      {
        id: 'BA',
        address: 'RUE DES SAPOTILLES',
        bic: 'QSDFGH8Z566',
        city: 'Cayenne',
        dateCreated: '2019-03-07T10:39:23.560414Z',
        dateModifiedAtLastProvider: '2019-03-07T10:39:57.823508Z',
        iban: 'FR7630001007941234567890185',
        idAtProviders: null,
        isActive: true,
        isValidated: true,
        lastProviderId: null,
        modelName: 'Offerer',
        nOffers: 5,
        name: 'Bar des amis',
        postalCode: '97300',
        siren: '222222233',
        thumbCount: 0,
        validationToken: null,
      },
      {
        id: 'CA',
        address: 'RUE DES POMMES ROSAS',
        city: 'Cayenne',
        dateCreated: '2019-03-07T10:39:23.560414Z',
        dateModifiedAtLastProvider: '2019-03-07T10:39:57.843884Z',
        idAtProviders: null,
        isActive: true,
        isValidated: false,
        lastProviderId: null,
        modelName: 'Offerer',
        nOffers: 10,
        name: 'Cinéma du coin',
        postalCode: '97300',
        siren: '222222232',
        thumbCount: 0,
        validationToken: 'w3hDQgjYRIyYTxOYY08nwgH3BzI',
      },
    ],
    providers: [],
    stocks: [
      {
        id: 'MU',
        quantity: 10,
        bookingLimitDatetime: null,
        bookingRecapSent: null,
        dateModified: '2019-03-07T10:40:07.318721Z',
        dateModifiedAtLastProvider: '2019-03-07T10:40:07.318695Z',
        eventOccurrenceId: null,
        idAtProviders: null,
        isSoftDeleted: false,
        lastProviderId: null,
        modelName: 'Stock',
        offerId: 'UU',
        price: 17,
      },
      {
        id: 'MQ',
        quantity: 10,
        bookingLimitDatetime: null,
        bookingRecapSent: null,
        dateModified: '2019-03-07T10:40:07.315722Z',
        dateModifiedAtLastProvider: '2019-03-07T10:40:07.315702Z',
        eventOccurrenceId: null,
        idAtProviders: null,
        isSoftDeleted: false,
        lastProviderId: null,
        modelName: 'Stock',
        offerId: 'UM',
        price: 16,
      },
      {
        id: 'MM',
        quantity: 10,
        bookingLimitDatetime: null,
        bookingRecapSent: null,
        dateModified: '2019-03-07T10:40:07.312234Z',
        dateModifiedAtLastProvider: '2019-03-07T10:40:07.312216Z',
        eventOccurrenceId: null,
        idAtProviders: null,
        isSoftDeleted: false,
        lastProviderId: null,
        modelName: 'Stock',
        offerId: 'U9',
        price: 51,
      },
      {
        id: 'M9',
        quantity: 10,
        bookingLimitDatetime: null,
        bookingRecapSent: null,
        dateModified: '2019-03-07T10:40:07.309108Z',
        dateModifiedAtLastProvider: '2019-03-07T10:40:07.309075Z',
        eventOccurrenceId: null,
        idAtProviders: null,
        isSoftDeleted: false,
        lastProviderId: null,
        modelName: 'Stock',
        offerId: 'UA',
        price: 50,
      },
      {
        id: 'ME',
        quantity: 10,
        bookingLimitDatetime: null,
        bookingRecapSent: null,
        dateModified: '2019-03-07T10:40:07.306052Z',
        dateModifiedAtLastProvider: '2019-03-07T10:40:07.306033Z',
        eventOccurrenceId: null,
        idAtProviders: null,
        isSoftDeleted: false,
        lastProviderId: null,
        modelName: 'Stock',
        offerId: 'T4',
        price: 28,
      },
      {
        id: 'MA',
        quantity: 10,
        bookingLimitDatetime: null,
        bookingRecapSent: null,
        dateModified: '2019-03-07T10:40:07.303564Z',
        dateModifiedAtLastProvider: '2019-03-07T10:40:07.303546Z',
        eventOccurrenceId: null,
        idAtProviders: null,
        isSoftDeleted: false,
        lastProviderId: null,
        modelName: 'Stock',
        offerId: 'TU',
        price: 15,
      },
      {
        id: 'L4',
        quantity: 10,
        bookingLimitDatetime: null,
        bookingRecapSent: null,
        dateModified: '2019-03-07T10:40:07.300968Z',
        dateModifiedAtLastProvider: '2019-03-07T10:40:07.300950Z',
        eventOccurrenceId: null,
        idAtProviders: null,
        isSoftDeleted: false,
        lastProviderId: null,
        modelName: 'Stock',
        offerId: 'TQ',
        price: 11,
      },
    ],
    products: [
      {
        id: 'LY',
        dateModifiedAtLastProvider: '2019-03-07T10:40:03.865368Z',
        description:
          'Ainsi la personne avec qui elle avait confessé qu’elle allait goûter, avec qui elle vous avait supplié de la laisser goûter, cette personne, raison avouée par la nécessité, ce n’était pas elle, c’était une autre, c’était encore autre chose ! Autre chose, quoi ? Une autre, qui ?',
        extraData: {
          author: 'Eloise Jomenrency',
        },
        idAtProviders: '1297',
        isNational: true,
        lastProviderId: null,
        mediaUrls: ['test/urls'],
        modelName: 'Product',
        name: 'Dormons peu soupons bien',
        offerType: {
          description:
            'Résoudre l’énigme d’un jeu de piste dans votre ville ? Jouer en ligne entre amis ? Découvrir cet univers étrange avec une manette ?',
          proLabel: 'Jeux Vidéo',
          offlineOnly: false,
          onlineOnly: true,
          sublabel: 'Jouer',
          type: 'Thing',
          value: 'ThingType.JEUX_VIDEO',
        },
        thumbCount: 1,
        url: 'https://ilestencoretemps.fr/',
      },
      {
        id: 'L9',
        dateModifiedAtLastProvider: '2019-03-07T10:40:03.850903Z',
        description: 'T’ont-ils chargé pour nous de leur salut lointain ?',
        extraData: {
          author: 'Max et Compagnie',
        },
        idAtProviders: '1293',
        isNational: true,
        lastProviderId: null,
        mediaUrls: ['test/urls'],
        modelName: 'Product',
        name: 'Autant tu t’en vas',
        offerType: {
          description:
            'S’abonner à un quotidien d’actualité ? À un hebdomadaire humoristique ? À un mensuel dédié à la nature ? Acheter une BD ou un manga ? Ou tout simplement ce livre dont tout le monde parle ?',
          proLabel: 'Presse (Abonnements)',
          offlineOnly: false,
          onlineOnly: true,
          sublabel: 'Lire',
          type: 'Thing',
          value: 'ThingType.PRESSE_ABO',
        },
        thumbCount: 1,
        url: 'https://ilestencoretemps.fr/',
      },
      {
        id: 'KQ',
        dateModifiedAtLastProvider: '2019-03-07T10:40:03.820667Z',
        description:
          'Combattant sans risque, vous devez agir sans précaution. En effet, pour vous autres hommes, les défaites ne sont que des succès de moins. Dans cette partie si inégale, notre fortune est de ne pas perdre, et votre malheur de ne pas gagner.',
        extraData: {
          author: 'Rackham le Vert',
        },
        idAtProviders: '1287',
        isNational: true,
        lastProviderId: null,
        mediaUrls: ['test/urls'],
        modelName: 'Product',
        name: 'Dansons jusqu’en 2030',
        offerType: {
          description:
            'Résoudre l’énigme d’un jeu de piste dans votre ville ? Jouer en ligne entre amis ? Découvrir cet univers étrange avec une manette ?',
          proLabel: 'Jeux Vidéo',
          offlineOnly: false,
          onlineOnly: true,
          sublabel: 'Jouer',
          type: 'Thing',
          value: 'ThingType.JEUX_VIDEO',
        },
        thumbCount: 1,
        url: 'https://ilestencoretemps.fr/',
      },
      {
        id: 'KA',
        dateModifiedAtLastProvider: '2019-03-07T10:40:03.793350Z',
        description:
          'Sur ta route, aussi loin que ton regard atteint, N’as-tu vu comme ici que douleurs et misères ? Dans ces mondes épars, dis ! avons-nous des frères ?',
        extraData: {
          author: 'Usule et Franck',
        },
        idAtProviders: '1283',
        isNational: true,
        lastProviderId: null,
        mediaUrls: ['test/urls'],
        modelName: 'Product',
        name: 'La première paix mondiale',
        offerType: {
          description:
            'S’abonner à un quotidien d’actualité ? À un hebdomadaire humoristique ? À un mensuel dédié à la nature ? Acheter une BD ou un manga ? Ou tout simplement ce livre dont tout le monde parle ?',
          proLabel: 'Presse (Abonnements)',
          offlineOnly: false,
          onlineOnly: true,
          sublabel: 'Lire',
          type: 'Thing',
          value: 'ThingType.PRESSE_ABO',
        },
        thumbCount: 1,
        url: 'https://ilestencoretemps.fr/',
      },
      {
        id: 'J9',
        dateModifiedAtLastProvider: '2019-03-07T10:40:03.757550Z',
        description:
          'Un baiser, mais à tout prendre, qu’est-ce ? Un serment fait d’un peu plus près, une promesse plus précise, un aveu qui veut se confirmer, Un point rose qu’on met sur l’i du verbe aimer ; C’est un secret qui prend la bouche pour oreille, Un instant d’infini qui fait un bruit d’abeille, Une communion ayant un goût de fleur, Une façon d’un peu se respirer le cœur, Et d’un peu se goûter, au bord des lèvres, l’âme !',
        extraData: {
          author: 'Nicolas Duplot',
        },
        idAtProviders: '1277',
        isNational: true,
        lastProviderId: null,
        mediaUrls: ['test/urls'],
        modelName: 'Product',
        name: 'Ravage sous un océan',
        offerType: {
          description:
            'Résoudre l’énigme d’un jeu de piste dans votre ville ? Jouer en ligne entre amis ? Découvrir cet univers étrange avec une manette ?',
          proLabel: 'Jeux Vidéo',
          offlineOnly: false,
          onlineOnly: true,
          sublabel: 'Jouer',
          type: 'Thing',
          value: 'ThingType.JEUX_VIDEO',
        },
        thumbCount: 1,
        url: 'https://ilestencoretemps.fr/',
      },
      {
        id: '9Y',
        dateModifiedAtLastProvider: '2019-03-07T10:40:03.727260Z',
        description:
          'Bel astre voyageur, hôte qui nous arrives, Des profondeurs du ciel et qu’on n’attendait pas, Où vas-tu ? Quel dessein pousse vers nous tes pas ? Toi qui vogues au large en cette mer sans rives',
        extraData: {
          author: 'Gerard Stadt',
        },
        idAtProviders: '1273',
        isNational: true,
        lastProviderId: null,
        mediaUrls: ['test/urls'],
        modelName: 'Product',
        name: 'Mensch ! Où sont les Hommes ?',
        offerType: {
          description:
            'S’abonner à un quotidien d’actualité ? À un hebdomadaire humoristique ? À un mensuel dédié à la nature ? Acheter une BD ou un manga ? Ou tout simplement ce livre dont tout le monde parle ?',
          proLabel: 'Presse (Abonnements)',
          offlineOnly: false,
          onlineOnly: true,
          sublabel: 'Lire',
          type: 'Thing',
          value: 'ThingType.PRESSE_ABO',
        },
        thumbCount: 1,
        url: 'https://ilestencoretemps.fr/',
      },
      {
        id: '9Q',
        dateModifiedAtLastProvider: '2019-03-07T10:40:03.713847Z',
        description:
          'Vous?... Au contraire! J’ignorais la douceur féminine. Ma mère Ne m’a pas trouvé beau. Je n’ai pas eu de soeur. Plus tard, j’ai redouté l’amante à l’oeil moqueur. Je vous dois d’avoir eu, tout au moins, une amie. Grâce à vous une robe a passé dans ma vie.',
        extraData: {
          author: 'Jeanne Plomb',
        },
        idAtProviders: '1271',
        isNational: false,
        lastProviderId: null,
        mediaUrls: ['test/urls'],
        modelName: 'Product',
        name: 'Guerre et youpi matin',
        offerType: {
          description:
            'Plutôt rock, rap ou classique ? Sur un smartphone avec des écouteurs ou entre amis au concert ?',
          proLabel: 'Musique (sur supports physiques ou en ligne)',
          offlineOnly: false,
          onlineOnly: false,
          sublabel: 'Écouter',
          type: 'Thing',
          value: 'ThingType.MUSIQUE',
        },
        thumbCount: 1,
        url: null,
      },
      {
        id: '99',
        dateModifiedAtLastProvider: '2019-03-07T10:40:03.702942Z',
        description:
          'Combattant sans risque, vous devez agir sans précaution. En effet, pour vous autres hommes, les défaites ne sont que des succès de moins. Dans cette partie si inégale, notre fortune est de ne pas perdre, et votre malheur de ne pas gagner.',
        extraData: {
          author: 'Rackham le Vert',
        },
        idAtProviders: '1269',
        isNational: false,
        lastProviderId: null,
        mediaUrls: ['test/urls'],
        modelName: 'Product',
        name: 'Dansons jusqu’en 2030',
        offerType: {
          description:
            'Action, science-fiction, documentaire ou comédie sentimentale ? En salle, en plein air ou bien au chaud chez soi ? Et si c’était plutôt cette exposition qui allait faire son cinéma ?',
          proLabel: 'Musées — Patrimoine (Abonnements, Visites libres)',
          offlineOnly: true,
          onlineOnly: false,
          sublabel: 'Regarder',
          type: 'Thing',
          value: 'ThingType.MUSEES_PATRIMOINE_ABO',
        },
        thumbCount: 1,
        url: null,
      },
      {
        id: '9A',
        dateModifiedAtLastProvider: '2019-03-07T10:40:03.682044Z',
        description:
          'Les tout jeunes gens, lorsqu’ils goûtent pour la première fois aux échanges d’arguments, en font un usage pervers, comme d’un jeu, s’en servant toujours pour contredire, et qu’en imitant ceux qui réfutent, eux-mêmes en réfutent d’autres, prenant plaisir, comme de jeunes chiens, à tirer et à déchiqueter par la parole quiconque se trouve près d’eux.',
        extraData: {
          author: 'Denis Chat',
        },
        idAtProviders: '1267',
        isNational: true,
        lastProviderId: null,
        mediaUrls: ['test/urls'],
        modelName: 'Product',
        name: 'En rentrant de Palerme',
        offerType: {
          description:
            'Résoudre l’énigme d’un jeu de piste dans votre ville ? Jouer en ligne entre amis ? Découvrir cet univers étrange avec une manette ?',
          proLabel: 'Jeux Vidéo',
          offlineOnly: false,
          onlineOnly: true,
          sublabel: 'Jouer',
          type: 'Thing',
          value: 'ThingType.JEUX_VIDEO',
        },
        thumbCount: 1,
        url: 'https://ilestencoretemps.fr/',
      },
      {
        id: 'HY',
        dateModifiedAtLastProvider: '2019-03-07T10:40:03.673159Z',
        description:
          'Mais quels seront enfin les objets de ces Spectacles ? Qu’y montrera-t-on ? Rien, si l’on veut. Avec la liberté, partout où règne l’affluence, le bien-être y règne aussi. Plantez au milieu d’une place un piquet couronnée de fleurs, rassemblez-y le Peuple, et vous aurez une fête. Faites mieux encore : donnez les spectateurs en spectacle ; rendez-les acteurs eux-mêmes ; faites que chacun se voye et s’aime dans les autres, afin que tous en soient mieux unis.',
        extraData: {
          author: 'Camille Forêt',
        },
        idAtProviders: '1265',
        isNational: false,
        lastProviderId: null,
        mediaUrls: ['test/urls'],
        modelName: 'Product',
        name: 'Sun aux lentilles',
        offerType: {
          description:
            'Action, science-fiction, documentaire ou comédie sentimentale ? En salle, en plein air ou bien au chaud chez soi ? Et si c’était plutôt cette exposition qui allait faire son cinéma ?',
          proLabel: 'Cinéma (Abonnements)',
          offlineOnly: true,
          onlineOnly: false,
          sublabel: 'Regarder',
          type: 'Thing',
          value: 'ThingType.CINEMA_ABO',
        },
        thumbCount: 1,
        url: null,
      },
    ],
    types: [
      {
        appLabel: 'pass Culture : activation évènementielle',
        id: 0,
        description: 'Activez votre pass Culture grâce à cette offre',
        offlineOnly: true,
        onlineOnly: false,
        proLabel: 'pass Culture : activation évènementielle',
        sublabel: 'Activation',
        type: 'Event',
        value: 'EventType.ACTIVATION',
      },
      {
        appLabel: 'Cinéma (Projections, Séances, Évènements)',
        id: 1,
        description:
          'Action, science-fiction, documentaire ou comédie sentimentale ? En salle, en plein air ou bien au chaud chez soi ? Et si c’était plutôt cette exposition qui allait faire son cinéma ?',
        proLabel: 'Cinéma (Projections, Séances, Évènements)',
        offlineOnly: true,
        onlineOnly: false,
        sublabel: 'Regarder',
        type: 'Event',
        value: 'EventType.CINEMA',
      },
      {
        appLabel: 'Rencontrer',
        id: 2,
        description: 'Parfois une simple rencontre peut changer une vie...',
        label: 'Conférence — Débat — Dédicace',
        offlineOnly: true,
        onlineOnly: false,
        proLabel: 'Rencontrer',
        type: 'Event',
        value: 'EventType.CONFERENCE_DEBAT_DEDICACE',
      },
      {
        appLabel: 'Jeux (Évenements, Rencontres, Concours)',
        id: 3,
        description:
          'Résoudre l’énigme d’un jeu de piste dans votre ville ? Jouer en ligne entre amis ? Découvrir cet univers étrange avec une manette ?',
        proLabel: 'Jeux (Évenements, Rencontres, Concours)',
        offlineOnly: true,
        onlineOnly: false,
        sublabel: 'Jouer',
        type: 'Event',
        value: 'EventType.JEUX',
      },
      {
        appLabel: 'Musique (Concerts, Festivals)',
        id: 4,
        description:
          'Plutôt rock, rap ou classique ? Sur un smartphone avec des écouteurs ou entre amis au concert ?',
        proLabel: 'Musique (Concerts, Festivals)',
        offlineOnly: true,
        onlineOnly: false,
        sublabel: 'Écouter',
        type: 'Event',
        value: 'EventType.MUSIQUE',
      },
      {
        appLabel: 'Musées — Patrimoine (Expositions, Visites guidées, Activités spécifiques)',
        id: 5,
        description:
          'Action, science-fiction, documentaire ou comédie sentimentale ? En salle, en plein air ou bien au chaud chez soi ? Et si c’était plutôt cette exposition qui allait faire son cinéma ?',
        proLabel: 'Musées — Patrimoine (Expositions, Visites guidées, Activités spécifiques)',
        offlineOnly: true,
        onlineOnly: false,
        sublabel: 'Regarder',
        type: 'Event',
        value: 'EventType.MUSEES_PATRIMOINE',
      },
      {
        appLabel: 'Pratique Artistique (Stages ponctuels)',
        id: 6,
        description:
          'Jamais osé monter sur les planches ? Tenter d’apprendre la guitare, le piano ou la photographie ? Partir cinq jours découvrir un autre monde ? Bricoler dans un fablab, ou pourquoi pas, enregistrer votre premier titre ?',
        proLabel: 'Pratique Artistique (Stages ponctuels)',
        offlineOnly: true,
        onlineOnly: false,
        sublabel: 'Pratiquer',
        type: 'Event',
        value: 'EventType.PRATIQUE_ARTISTIQUE',
      },
      {
        appLabel: 'Spectacle vivant',
        id: 7,
        description:
          'Suivre un géant de 12 mètres dans la ville ? Rire aux éclats devant un stand up ? Rêver le temps d’un opéra ou d’un spectacle de danse ? Assister à une pièce de théâtre, ou se laisser conter une histoire ?',
        proLabel: 'Spectacle vivant',
        offlineOnly: true,
        onlineOnly: false,
        sublabel: 'Applaudir',
        type: 'Event',
        value: 'EventType.SPECTACLE_VIVANT',
      },
      {
        appLabel: 'pass Culture : activation en ligne',
        id: 8,
        description: 'Activez votre pass Culture grâce à cette offre',
        proLabel: 'pass Culture : activation en ligne',
        offlineOnly: false,
        onlineOnly: true,
        sublabel: 'Activation',
        type: 'Thing',
        value: 'ThingType.ACTIVATION',
      },
      {
        appLabel: 'Audiovisuel (Films sur supports physiques et VOD)',
        id: 9,
        description:
          'Action, science-fiction, documentaire ou comédie sentimentale ? En salle, en plein air ou bien au chaud chez soi ? Et si c’était plutôt cette exposition qui allait faire son cinéma ?',
        proLabel: 'Audiovisuel (Films sur supports physiques et VOD)',
        offlineOnly: false,
        onlineOnly: false,
        sublabel: 'Regarder',
        type: 'Thing',
        value: 'ThingType.AUDIOVISUEL',
      },
      {
        appLabel: 'Cinéma (Abonnements)',
        id: 10,
        description:
          'Action, science-fiction, documentaire ou comédie sentimentale ? En salle, en plein air ou bien au chaud chez soi ? Et si c’était plutôt cette exposition qui allait faire son cinéma ?',
        proLabel: 'Cinéma (Abonnements)',
        offlineOnly: true,
        onlineOnly: false,
        sublabel: 'Regarder',
        type: 'Thing',
        value: 'ThingType.CINEMA_ABO',
      },
      {
        appLabel: 'Jeux (Abonnements)',
        id: 11,
        description:
          'Résoudre l’énigme d’un jeu de piste dans votre ville ? Jouer en ligne entre amis ? Découvrir cet univers étrange avec une manette ?',
        proLabel: 'Jeux (Abonnements)',
        offlineOnly: true,
        onlineOnly: false,
        sublabel: 'Jouer',
        type: 'Thing',
        value: 'ThingType.JEUX_ABO',
      },
      {
        appLabel: 'Jeux Vidéo',
        id: 12,
        description:
          'Résoudre l’énigme d’un jeu de piste dans votre ville ? Jouer en ligne entre amis ? Découvrir cet univers étrange avec une manette ?',
        proLabel: 'Jeux Vidéo',
        offlineOnly: false,
        onlineOnly: true,
        sublabel: 'Jouer',
        type: 'Thing',
        value: 'ThingType.JEUX_VIDEO',
      },
      {
        appLabel: 'Livre — Édition',
        id: 13,
        description:
          'S’abonner à un quotidien d’actualité ? À un hebdomadaire humoristique ? À un mensuel dédié à la nature ? Acheter une BD ou un manga ? Ou tout simplement ce livre dont tout le monde parle ?',
        proLabel: 'Livre — Édition',
        offlineOnly: false,
        onlineOnly: false,
        sublabel: 'Lire',
        type: 'Thing',
        value: 'ThingType.LIVRE_EDITION',
      },
      {
        appLabel: 'Musées — Patrimoine (Abonnements, Visites libres)',
        id: 14,
        description:
          'Action, science-fiction, documentaire ou comédie sentimentale ? En salle, en plein air ou bien au chaud chez soi ? Et si c’était plutôt cette exposition qui allait faire son cinéma ?',
        proLabel: 'Musées — Patrimoine (Abonnements, Visites libres)',
        offlineOnly: true,
        onlineOnly: false,
        sublabel: 'Regarder',
        type: 'Thing',
        value: 'ThingType.MUSEES_PATRIMOINE_ABO',
      },
      {
        appLabel: 'Musique (Abonnements concerts)',
        id: 15,
        description:
          'Plutôt rock, rap ou classique ? Sur un smartphone avec des écouteurs ou entre amis au concert ?',
        proLabel: 'Musique (Abonnements concerts)',
        offlineOnly: true,
        onlineOnly: false,
        sublabel: 'Écouter',
        type: 'Thing',
        value: 'ThingType.MUSIQUE_ABO',
      },
      {
        appLabel: 'Musique (sur supports physiques ou en ligne)',
        id: 16,
        description:
          'Plutôt rock, rap ou classique ? Sur un smartphone avec des écouteurs ou entre amis au concert ?',
        proLabel: 'Musique (sur supports physiques ou en ligne)',
        offlineOnly: false,
        onlineOnly: false,
        sublabel: 'Écouter',
        type: 'Thing',
        value: 'ThingType.MUSIQUE',
      },
      {
        appLabel: 'Pratique Artistique (Abonnements)',
        id: 17,
        description:
          'Jamais osé monter sur les planches ? Tenter d’apprendre la guitare, le piano ou la photographie ? Partir cinq jours découvrir un autre monde ? Bricoler dans un fablab, ou pourquoi pas, enregistrer votre premier titre ?',
        proLabel: 'Pratique Artistique (Abonnements)',
        offlineOnly: true,
        onlineOnly: false,
        sublabel: 'Pratiquer',
        type: 'Thing',
        value: 'ThingType.PRATIQUE_ARTISTIQUE_ABO',
      },
      {
        appLabel: 'Presse (Abonnements)',
        id: 18,
        description:
          'S’abonner à un quotidien d’actualité ? À un hebdomadaire humoristique ? À un mensuel dédié à la nature ? Acheter une BD ou un manga ? Ou tout simplement ce livre dont tout le monde parle ?',
        proLabel: 'Presse (Abonnements)',
        offlineOnly: false,
        onlineOnly: true,
        sublabel: 'Lire',
        type: 'Thing',
        value: 'ThingType.PRESSE_ABO',
      },
    ],
    things: [
      {
        lastProviderId: 123,
      },
    ],
    users: [
      {
        id: 'FE',
        canBookFeeOffers: false,
        dateCreated: '2019-03-07T10:39:23.560374Z',
        dateOfBirth: '2001-01-01T00:00:00Z',
        departementCode: '93',
        email: 'pctest.admin93.0@example.com',
        firstName: 'PC Test Admin',
        isAdmin: true,
        lastName: '93 0',
        modelName: 'User',
        phoneNumber: '0612345678',
        postalCode: '93100',
        publicName: 'PC Test Admin 93 0',
        thumbCount: 0,
      },
    ],
    userOfferers: [
      {
        offererId: 'FE',
        userId: 'FE',
        rights: 'admin',
      },
    ],
    venues: [
      {
        id: 'DA',
        address: null,
        bookingEmail: 'john.doe@test.com',
        city: null,
        comment: null,
        dateModifiedAtLastProvider: '2019-03-07T10:40:03.234016Z',
        departementCode: null,
        idAtProviders: null,
        isValidated: true,
        isVirtual: true,
        lastProviderId: null,
        latitude: 48.83638,
        longitude: 2.40027,
        managingOffererId: 'BA',
        modelName: 'Venue',
        name: 'Le Sous-sol (Offre numérique)',
        postalCode: null,
        siret: null,
        thumbCount: 0,
        validationToken: null,
      },
      {
        id: 'C4',
        address: null,
        bookingEmail: 'john.doe@test.com',
        city: null,
        comment: null,
        dateModifiedAtLastProvider: '2019-03-07T10:40:03.219473Z',
        departementCode: null,
        idAtProviders: null,
        isValidated: true,
        isVirtual: true,
        lastProviderId: null,
        latitude: 48.83638,
        longitude: 2.40027,
        managingOffererId: 'CA',
        modelName: 'Venue',
        name: 'Terrain vague (Offre numérique)',
        postalCode: null,
        siret: null,
        thumbCount: 0,
        validationToken: null,
      },
      {
        id: 'CY',
        address: 'RUE DES POMMES ROSAS',
        bookingEmail: 'fake@example.com',
        city: 'Cayenne',
        comment: null,
        dateModifiedAtLastProvider: '2019-03-07T10:40:03.216279Z',
        departementCode: '97',
        idAtProviders: null,
        isValidated: true,
        isVirtual: false,
        lastProviderId: null,
        latitude: 4.93339,
        longitude: -52.32536,
        managingOffererId: 'CA',
        modelName: 'Venue',
        name: 'Terrain vague',
        postalCode: '97300',
        siret: '22222223211111',
        thumbCount: 0,
        validationToken: null,
      },
    ],
    venueProviders: [],
  },
  errors: {
    user: null,
    offer: null,
    'mediation-H4': null,
    stockMU: null,
  },
  form: {
    offer: {
      name: 'Dormons peu soupons bien',
      type: 'ThingType.JEUX_VIDEO',
      offererId: 'BA',
      venueId: 'DA',
      url: 'https://ilestencoretemps.fr/',
      bookingEmail: 'booking.email@test.com',
      description:
        'Ainsi la personne avec qui elle avait confessé qu’elle allait goûter, avec qui elle vous avait supplié de la laisser goûter, cette personne, raison avouée par la nécessité, ce n’était pas elle, c’était une autre, c’était encore autre chose ! Autre chose, quoi ? Une autre, qui ?',
      isNational: true,
    },
    'mediation-H4': {
      isActive: true,
    },
    stockMU: {
      eventOccurrenceId: null,
      offerId: 'UU',
      price: 17,
      bookingLimitDatetime: null,
      quantity: 10,
    },
  },
  modal: {
    $modal: null,
    config: {
      isUnclosable: true,
    },
    isActive: false,
  },
  notification: null,
  tracker: {},
  offers: {
    list: [
      {
        id: 'UU',
        bookingEmail: 'booking.email@test.com',
        dateCreated: '2019-03-07T10:39:23.560392Z',
        dateModifiedAtLastProvider: '2019-03-07T10:40:05.443621Z',
        idAtProviders: null,
        isActive: true,
        lastProviderId: null,
        modelName: 'Offer',
        productId: 'LY',
        isEvent: false,
        isThing: true,
        venueId: 'DA',
        mediationsIds: ['H4'],
        stocksIds: ['MU'],
      },
      {
        id: 'UQ',
        bookingEmail: 'booking.email@test.com',
        dateCreated: '2019-03-07T10:39:23.560392Z',
        dateModifiedAtLastProvider: '2019-03-07T10:40:05.441307Z',
        idAtProviders: null,
        isActive: false,
        isEvent: false,
        isThing: true,
        lastProviderId: null,
        modelName: 'Offer',
        productId: 'L9',
        venueId: 'DA',
        mediationsIds: [],
        stocksIds: [],
      },
      {
        id: 'UM',
        bookingEmail: 'booking.email@test.com',
        dateCreated: '2019-03-07T10:39:23.560392Z',
        dateModifiedAtLastProvider: '2019-03-07T10:40:05.438988Z',
        idAtProviders: null,
        isActive: true,
        isEvent: false,
        isThing: true,
        lastProviderId: null,
        modelName: 'Offer',
        productId: 'KQ',
        venueId: 'DA',
        mediationsIds: ['HY'],
        stocksIds: ['MQ'],
      },
      {
        id: 'U9',
        bookingEmail: 'booking.email@test.com',
        dateCreated: '2019-03-07T10:39:23.560392Z',
        dateModifiedAtLastProvider: '2019-03-07T10:40:05.436390Z',
        isEvent: false,
        isThing: true,
        idAtProviders: null,
        isActive: true,
        lastProviderId: null,
        modelName: 'Offer',
        productId: 'KA',
        venueId: 'DA',
        mediationsIds: [],
        stocksIds: ['MM'],
      },
      {
        id: 'UE',
        bookingEmail: 'booking.email@test.com',
        dateCreated: '2019-03-07T10:39:23.560392Z',
        dateModifiedAtLastProvider: '2019-03-07T10:40:05.433228Z',
        isEvent: false,
        isThing: true,
        idAtProviders: null,
        isActive: false,
        lastProviderId: null,
        modelName: 'Offer',
        productId: 'J9',
        venueId: 'DA',
        mediationsIds: ['HU'],
        stocksIds: [],
      },
      {
        id: 'UA',
        bookingEmail: 'booking.email@test.com',
        dateCreated: '2019-03-07T10:39:23.560392Z',
        dateModifiedAtLastProvider: '2019-03-07T10:40:05.409454Z',
        isEvent: false,
        isThing: true,
        idAtProviders: null,
        isActive: true,
        lastProviderId: null,
        modelName: 'Offer',
        productId: '9Y',
        venueId: 'C4',
        mediationsIds: [],
        stocksIds: ['M9'],
      },
      {
        id: 'T4',
        bookingEmail: 'booking.email@test.com',
        dateCreated: '2019-03-07T10:39:23.560392Z',
        dateModifiedAtLastProvider: '2019-03-07T10:40:05.407437Z',
        isEvent: false,
        isThing: true,
        idAtProviders: null,
        isActive: true,
        lastProviderId: null,
        modelName: 'Offer',
        productId: '9Q',
        venueId: 'CY',
        mediationsIds: ['HQ'],
        stocksIds: ['ME'],
      },
      {
        id: 'TY',
        bookingEmail: 'booking.email@test.com',
        dateCreated: '2019-03-07T10:39:23.560392Z',
        dateModifiedAtLastProvider: '2019-03-07T10:40:05.405387Z',
        isEvent: false,
        isThing: true,
        idAtProviders: null,
        isActive: false,
        lastProviderId: null,
        modelName: 'Offer',
        productId: '99',
        venueId: 'CY',
        mediationsIds: [],
        stocksIds: [],
      },
      {
        id: 'TU',
        bookingEmail: 'booking.email@test.com',
        dateCreated: '2019-03-07T10:39:23.560392Z',
        dateModifiedAtLastProvider: '2019-03-07T10:40:05.403138Z',
        isEvent: false,
        isThing: true,
        idAtProviders: null,
        isActive: true,
        lastProviderId: null,
        modelName: 'Offer',
        productId: '9A',
        venueId: 'C4',
        mediationsIds: ['HM'],
        stocksIds: ['MA'],
      },
      {
        id: 'TQ',
        bookingEmail: 'booking.email@test.com',
        dateCreated: '2019-03-07T10:39:23.560392Z',
        dateModifiedAtLastProvider: '2019-03-07T10:40:05.400896Z',
        isEvent: false,
        isThing: true,
        idAtProviders: null,
        isActive: true,
        lastProviderId: null,
        modelName: 'Offer',
        productId: 'HY',
        venueId: 'CY',
        mediationsIds: [],
        stocksIds: ['L4'],
      },
    ],
    searchFilters: {},
  },
  user: {
    id: 'FE',
    canBookFeeOffers: false,
    dateCreated: '2019-03-07T10:39:23.560374Z',
    dateOfBirth: '2001-01-01T00:00:00Z',
    departementCode: '93',
    email: 'pctest.admin93.0@example.com',
    firstName: 'PC Test Admin',
    isAdmin: true,
    lastName: '93 0',
    modelName: 'User',
    phoneNumber: '67856557574',
    postalCode: '93100',
    publicName: 'PC Test Admin 93 0',
    thumbCount: 0,
  },
  _persist: {
    version: -1,
    rehydrated: true,
  },
}

export default state
