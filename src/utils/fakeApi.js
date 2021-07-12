import * as pcapi from 'repository/pcapi/pcapi'

export const bulkFakeApiCreateOrEditStock = ({ ...stockIds }) =>
  jest.spyOn(pcapi, 'bulkCreateOrEditStock').mockResolvedValue([stockIds])

export const getFakeApiUserValidatedOfferersNames = ({ ...offerers }) =>
  jest.spyOn(pcapi, 'getUserValidatedOfferersNames').mockResolvedValue([offerers])

export const getFakeApiVenuesForOfferer = ({ ...venues }) =>
  jest.spyOn(pcapi, 'getVenuesForOfferer').mockResolvedValue([venues])

export const loadFakeApiOffer = offer => jest.spyOn(pcapi, 'loadOffer').mockResolvedValue(offer)

export const loadFakeApiStocks = stocks =>
  jest.spyOn(pcapi, 'loadStocks').mockResolvedValue({ stocks })

export const loadFakeApiVenueStats = venue =>
  jest.spyOn(pcapi, 'getVenueStats').mockResolvedValue(venue)

export const generateFakeOffererApiKey = apiKey =>
  jest.spyOn(pcapi, 'generateOffererApiKey').mockResolvedValue(apiKey)

export const failToGenerateOffererApiKey = () =>
  jest.spyOn(pcapi, 'generateOffererApiKey').mockRejectedValue(null)

export const loadFakeApiTypes = () => {
  const types = [
    {
      appLabel: 'Cinéma',
      conditionalFields: ['author', 'visa', 'stageDirector'],
      description:
        "Action, science-fiction, documentaire ou comédie sentimentale ? En salle, en plein air ou bien au chaud chez soi ? Et si c'était plutôt cette exposition qui allait faire son cinéma ?",
      isActive: true,
      offlineOnly: true,
      onlineOnly: false,
      proLabel: 'Cinéma - projections et autres évènements',
      sublabel: 'Regarder',
      type: 'Event',
      value: 'EventType.CINEMA',
    },
    {
      appLabel: 'Film',
      canExpire: true,
      conditionalFields: [],
      description:
        "Action, science-fiction, documentaire ou comédie sentimentale ? En salle, en plein air ou bien au chaud chez soi ? Et si c'était plutôt cette exposition qui allait faire son cinéma ?",
      isActive: true,
      offlineOnly: false,
      onlineOnly: false,
      proLabel: 'Audiovisuel - films sur supports physiques et VOD',
      sublabel: 'Regarder',
      type: 'Thing',
      value: 'ThingType.AUDIOVISUEL',
    },
  ]

  jest.spyOn(pcapi, 'loadTypes').mockResolvedValue(types)

  return types
}

export const loadFakeApiVenue = venue => {
  jest.spyOn(pcapi, 'getVenue').mockResolvedValueOnce(venue)

  return {
    resolvingVenuePromise: Promise.resolve(venue),
  }
}

export const loadFakeApiCategories = () => {
  const categories = {
    categories: [
      {
        id: 'FILM',
        proLabel: 'Films, vidéos',
        isSelectable: true,
      },
      {
        id: 'CINEMA',
        proLabel: 'Cinéma',
        isSelectable: true,
      },
      {
        id: 'CONFERENCE',
        proLabel: 'Conférences, rencontres, découverte des métiers',
        isSelectable: true,
      },
      {
        id: 'JEU',
        proLabel: 'Jeux (événements, rencontres, concours)',
        isSelectable: true,
      },
      {
        id: 'LIVRE',
        proLabel: 'Livre',
        isSelectable: true,
      },
      {
        id: 'MUSEE',
        proLabel: 'Musée, patrimoine, architecture, arts visuels ou contemporains',
        isSelectable: true,
      },
      {
        id: 'MUSIQUE_LIVE',
        proLabel: 'Musique live',
        isSelectable: true,
      },
      {
        id: 'MUSIQUE_ENREGISTREE',
        proLabel: 'Musique enregistrée',
        isSelectable: true,
      },
      {
        id: 'PRATIQUE_ART',
        proLabel: 'Pratique artistique',
        isSelectable: true,
      },
      {
        id: 'MEDIA',
        proLabel: 'Médias',
        isSelectable: true,
      },
      {
        id: 'SPECTACLE',
        proLabel: 'Spectacle vivant',
        isSelectable: true,
      },
      {
        id: 'INSTRUMENT',
        proLabel: 'Instrument de musique',
        isSelectable: true,
      },
      {
        id: 'BEAUX_ARTS',
        proLabel: 'Beaux-arts',
        isSelectable: true,
      },
    ],
    subcategories: [
      {
        id: 'SUPPORT_PHYSIQUE_FILM',
        categoryId: 'FILM',
        matchingType: 'ThingType.AUDIOVISUEL',
        proLabel: 'Support physique (DVD, Bluray...)',
        appLabel: 'Support physique (DVD, Bluray...)',
        searchGroup: 'Films, séries, podcasts',
        isEvent: false,
        conditionalFields: [],
        canExpire: true,
        canBeDuo: false,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'ABO_MEDIATHEQUE',
        categoryId: 'FILM',
        matchingType: 'ThingType.AUDIOVISUEL',
        proLabel: 'Abonnement médiathèque',
        appLabel: 'Abonnement médiathèque',
        searchGroup: 'Films, séries, podcasts',
        isEvent: false,
        conditionalFields: [],
        canExpire: true,
        canBeDuo: false,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'VOD',
        categoryId: 'FILM',
        matchingType: 'ThingType.AUDIOVISUEL',
        proLabel: 'Vidéo à la demande',
        appLabel: 'Vidéo à la demande',
        searchGroup: 'Films, séries, podcasts',
        isEvent: false,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: false,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'NOT_REIMBURSED',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'ABO_PLATEFORME_VIDEO',
        categoryId: 'FILM',
        matchingType: 'ThingType.AUDIOVISUEL',
        proLabel: 'Abonnement à une plateforme',
        appLabel: 'Abonnement à une plateforme',
        searchGroup: 'Films, séries, podcasts',
        isEvent: false,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: false,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'NOT_REIMBURSED',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'AUTRE_SUPPORT_NUMERIQUE',
        categoryId: 'FILM',
        matchingType: 'ThingType.AUDIOVISUEL',
        proLabel: 'Autre support numérique',
        appLabel: 'Autre support numérique',
        searchGroup: 'Films, séries, podcasts',
        isEvent: false,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: false,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'NOT_REIMBURSED',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'CARTE_CINE_MULTISEANCES',
        categoryId: 'CINEMA',
        matchingType: 'ThingType.CINEMA_ABO',
        proLabel: 'Carte cinéma multi-séances',
        appLabel: 'Carte cinéma multi-séances',
        searchGroup: 'Cinéma',
        isEvent: false,
        conditionalFields: [],
        canExpire: true,
        canBeDuo: false,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'CARTE_CINE_ILLIMITE',
        categoryId: 'CINEMA',
        matchingType: 'ThingType.CINEMA_ABO',
        proLabel: 'Carte cinéma illimité',
        appLabel: 'Carte cinéma illimité',
        searchGroup: 'Cinéma',
        isEvent: false,
        conditionalFields: [],
        canExpire: true,
        canBeDuo: false,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'SEANCE_CINE',
        categoryId: 'CINEMA',
        matchingType: 'EventType.CINEMA',
        proLabel: 'Séance de cinéma',
        appLabel: 'Séance de cinéma',
        searchGroup: 'Cinéma',
        isEvent: true,
        conditionalFields: ['author', 'visa', 'stageDirector'],
        canExpire: false,
        canBeDuo: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'EVENEMENT_CINE',
        categoryId: 'CINEMA',
        matchingType: 'EventType.CINEMA',
        proLabel: 'Événement cinématographique',
        appLabel: 'Événement cinéma',
        searchGroup: 'Cinéma',
        isEvent: true,
        conditionalFields: ['author', 'visa', 'stageDirector'],
        canExpire: false,
        canBeDuo: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'FESTIVAL_CINE',
        categoryId: 'CINEMA',
        matchingType: 'EventType.CINEMA',
        proLabel: 'Festival de cinéma',
        appLabel: 'Festival de cinéma',
        searchGroup: 'Cinéma',
        isEvent: true,
        conditionalFields: ['author', 'visa', 'stageDirector'],
        canExpire: false,
        canBeDuo: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'CINE_VENTE_DISTANCE',
        categoryId: 'CINEMA',
        matchingType: 'ThingType.CINEMA_CARD',
        proLabel: 'Cinéma vente à distance',
        appLabel: 'Cinéma',
        searchGroup: 'Cinéma',
        isEvent: false,
        conditionalFields: ['author', 'visa', 'stageDirector'],
        canExpire: false,
        canBeDuo: false,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'CONFERENCE',
        categoryId: 'CONFERENCE',
        matchingType: 'EventType.CONFERENCE_DEBAT_DEDICACE',
        proLabel: 'Conférence',
        appLabel: 'Conférence',
        searchGroup: 'Conférences, rencontres',
        isEvent: true,
        conditionalFields: ['speaker'],
        canExpire: false,
        canBeDuo: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'RENCONTRE',
        categoryId: 'CONFERENCE',
        matchingType: 'EventType.CONFERENCE_DEBAT_DEDICACE',
        proLabel: 'Rencontre',
        appLabel: 'Rencontre',
        searchGroup: 'Conférences, rencontres',
        isEvent: true,
        conditionalFields: ['speaker'],
        canExpire: false,
        canBeDuo: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'DECOUVERTE_METIERS',
        categoryId: 'CONFERENCE',
        matchingType: 'EventType.CONFERENCE_DEBAT_DEDICACE',
        proLabel: 'Découverte des métiers',
        appLabel: 'Découverte des métiers',
        searchGroup: 'Conférences, rencontres',
        isEvent: true,
        conditionalFields: ['speaker'],
        canExpire: false,
        canBeDuo: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'SALON',
        categoryId: 'CONFERENCE',
        matchingType: 'EventType.CONFERENCE_DEBAT_DEDICACE',
        proLabel: 'Salon / Convention',
        appLabel: 'Salon / Convention',
        searchGroup: 'Conférences, rencontres',
        isEvent: true,
        conditionalFields: ['speaker'],
        canExpire: false,
        canBeDuo: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'CONCOURS',
        categoryId: 'JEU',
        matchingType: 'EventType.JEUX',
        proLabel: 'Concours - jeux',
        appLabel: 'Concours - jeux',
        searchGroup: 'Jeux',
        isEvent: true,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'RENCONTRE_JEU',
        categoryId: 'JEU',
        matchingType: 'EventType.JEUX',
        proLabel: 'Rencontres - jeux',
        appLabel: 'Rencontres - jeux',
        searchGroup: 'Jeux',
        isEvent: true,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: true,
        onlineOfflinePlatform: 'ONLINE_OR_OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'ESCAPE_GAME',
        categoryId: 'JEU',
        matchingType: 'EventType.JEUX',
        proLabel: 'Escape game',
        appLabel: 'Escape game',
        searchGroup: 'Jeux',
        isEvent: true,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: true,
        onlineOfflinePlatform: 'ONLINE_OR_OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'EVENEMENT_JEU',
        categoryId: 'JEU',
        matchingType: 'EventType.JEUX',
        proLabel: 'Événements - jeux',
        appLabel: 'Événements - jeux',
        searchGroup: 'Jeux',
        isEvent: true,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: true,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'JEU_EN_LIGNE',
        categoryId: 'JEU',
        matchingType: 'ThingType.JEUX_VIDEO',
        proLabel: 'Jeux en ligne',
        appLabel: 'Jeux en ligne',
        searchGroup: 'Jeux',
        isEvent: false,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: false,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'NOT_REIMBURSED',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'ABO_JEU_VIDEO',
        categoryId: 'JEU',
        matchingType: 'ThingType.JEUX_VIDEO_ABO',
        proLabel: 'Abonnement jeux vidéos',
        appLabel: 'Abonnement jeux vidéos',
        searchGroup: 'Jeux',
        isEvent: false,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: false,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'NOT_REIMBURSED',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'ABO_LUDOTHEQUE',
        categoryId: 'JEU',
        matchingType: 'ThingType.JEUX_VIDEO_ABO',
        proLabel: 'Abonnement ludothèque',
        appLabel: 'Abonnement ludothèque',
        searchGroup: 'Jeux',
        isEvent: false,
        conditionalFields: [],
        canExpire: true,
        canBeDuo: false,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'LIVRE_PAPIER',
        categoryId: 'LIVRE',
        matchingType: 'ThingType.LIVRE_EDITION',
        proLabel: 'Livre papier',
        appLabel: 'Livre',
        searchGroup: 'Livres',
        isEvent: false,
        conditionalFields: ['author', 'isbn'],
        canExpire: true,
        canBeDuo: false,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'BOOK',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'LIVRE_NUMERIQUE',
        categoryId: 'LIVRE',
        matchingType: 'ThingType.LIVRE_AUDIO',
        proLabel: 'Livre numérique, e-book',
        appLabel: 'Livre numérique, e-book',
        searchGroup: 'Livres',
        isEvent: false,
        conditionalFields: ['author', 'isbn'],
        canExpire: false,
        canBeDuo: false,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'BOOK',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'TELECHARGEMENT_LIVRE_AUDIO',
        categoryId: 'LIVRE',
        matchingType: 'ThingType.LIVRE_AUDIO',
        proLabel: 'Livre audio à télécharger',
        appLabel: 'Livre audio à télécharger',
        searchGroup: 'Livres',
        isEvent: false,
        conditionalFields: ['author'],
        canExpire: false,
        canBeDuo: false,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'NOT_REIMBURSED',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'LIVRE_AUDIO_PHYSIQUE',
        categoryId: 'LIVRE',
        matchingType: 'ThingType.LIVRE_AUDIO',
        proLabel: 'Livre audio sur support physique',
        appLabel: 'Livre audio sur support physique',
        searchGroup: 'Livres',
        isEvent: false,
        conditionalFields: ['author', 'isbn'],
        canExpire: true,
        canBeDuo: false,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'ABO_BIBLIOTHEQUE',
        categoryId: 'LIVRE',
        matchingType: 'ThingType.LIVRE_AUDIO',
        proLabel: 'Abonnement (bibliothèques, médiathèques...)',
        appLabel: 'Abonnement (bibliothèques, médiathèques...)',
        searchGroup: 'Livres',
        isEvent: false,
        conditionalFields: [],
        canExpire: true,
        canBeDuo: false,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'ABO_LIVRE_NUMERIQUE',
        categoryId: 'LIVRE',
        matchingType: 'ThingType.LIVRE_AUDIO',
        proLabel: 'Abonnement (livres numériques)',
        appLabel: 'Abonnement (livres numériques)',
        searchGroup: 'Livres',
        isEvent: false,
        conditionalFields: [],
        canExpire: true,
        canBeDuo: false,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'BOOK',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'FESTIVAL_LIVRE',
        categoryId: 'LIVRE',
        matchingType: 'ThingType.LIVRE_AUDIO',
        proLabel: 'Festival et salon du livre',
        appLabel: 'Festival et salon du livre',
        searchGroup: 'Livres',
        isEvent: true,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'CARTE_MUSEE',
        categoryId: 'MUSEE',
        matchingType: 'ThingType.MUSEES_PATRIMOINE_ABO',
        proLabel: 'Cartes musées, patrimoine, architecture, arts visuels ou contemporains',
        appLabel: 'Cartes musées, patrimoine...',
        searchGroup: 'Visites, expositions',
        isEvent: false,
        conditionalFields: [],
        canExpire: true,
        canBeDuo: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'ABO_MUSEE',
        categoryId: 'MUSEE',
        matchingType: 'ThingType.MUSEES_PATRIMOINE_ABO',
        proLabel: 'Abonnement musée, patrimoine...',
        appLabel: 'Abonnement musée, patrimoine...',
        searchGroup: 'Visites, expositions',
        isEvent: false,
        conditionalFields: [],
        canExpire: true,
        canBeDuo: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'VISITE',
        categoryId: 'MUSEE',
        matchingType: 'EventType.MUSEES_PATRIMOINE',
        proLabel: 'Visite',
        appLabel: 'Visite',
        searchGroup: 'Visites, expositions',
        isEvent: true,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'VISITE_GUIDEE',
        categoryId: 'MUSEE',
        matchingType: 'EventType.MUSEES_PATRIMOINE',
        proLabel: 'Visite guidée',
        appLabel: 'Visite guidée',
        searchGroup: 'Visites, expositions',
        isEvent: true,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: true,
        onlineOfflinePlatform: 'ONLINE_OR_OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'EVENEMENT_PATRIMOINE',
        categoryId: 'MUSEE',
        matchingType: 'EventType.MUSEES_PATRIMOINE',
        proLabel: 'Événement et atelier patrimoine',
        appLabel: 'Événement et atelier patrimoine',
        searchGroup: 'Visites, expositions',
        isEvent: true,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'VISITE_VIRTUELLE',
        categoryId: 'MUSEE',
        matchingType: 'EventType.MUSEES_PATRIMOINE',
        proLabel: 'Visite virtuelle',
        appLabel: 'Visite virtuelle',
        searchGroup: 'Visites, expositions',
        isEvent: false,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: false,
        onlineOfflinePlatform: 'ONLINE_OR_OFFLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'NOT_REIMBURSED',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'CONCERT',
        categoryId: 'MUSIQUE_LIVE',
        matchingType: 'EventType.MUSIQUE',
        proLabel: 'Concert',
        appLabel: 'Concert',
        searchGroup: 'Musique',
        isEvent: true,
        conditionalFields: ['author', 'musicType', 'performer'],
        canExpire: false,
        canBeDuo: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'EVENEMENT_MUSIQUE',
        categoryId: 'MUSIQUE_LIVE',
        matchingType: 'EventType.MUSIQUE',
        proLabel: "Autre type d'événement musical",
        appLabel: "Autre type d'événement musical",
        searchGroup: 'Musique',
        isEvent: true,
        conditionalFields: ['author', 'musicType', 'performer'],
        canExpire: false,
        canBeDuo: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'LIVESTREAM_MUSIQUE',
        categoryId: 'MUSIQUE_LIVE',
        matchingType: 'EventType.MUSIQUE',
        proLabel: 'Livestream musical',
        appLabel: 'Livestream musical',
        searchGroup: 'Musique',
        isEvent: true,
        conditionalFields: ['author', 'musicType', 'performer'],
        canExpire: false,
        canBeDuo: false,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'ABO_CONCERT',
        categoryId: 'MUSIQUE_LIVE',
        matchingType: 'ThingType.MUSIQUE_ABO',
        proLabel: 'Abonnement concert',
        appLabel: 'Abonnement concert',
        searchGroup: 'Musique',
        isEvent: false,
        conditionalFields: ['musicType'],
        canExpire: true,
        canBeDuo: false,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'SUPPORT_PHYSIQUE_MUSIQUE',
        categoryId: 'MUSIQUE_ENREGISTREE',
        matchingType: 'ThingType.MUSIQUE',
        proLabel: 'Support physique (CD, vinyle...)',
        appLabel: 'Support physique (CD, vinyle...)',
        searchGroup: 'Musique',
        isEvent: false,
        conditionalFields: ['author', 'musicType', 'performer'],
        canExpire: true,
        canBeDuo: false,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'TELECHARGEMENT_MUSIQUE',
        categoryId: 'MUSIQUE_ENREGISTREE',
        matchingType: 'ThingType.MUSIQUE',
        proLabel: 'Téléchargement de musique',
        appLabel: 'Téléchargement de musique',
        searchGroup: 'Musique',
        isEvent: false,
        conditionalFields: ['author', 'musicType', 'performer'],
        canExpire: false,
        canBeDuo: false,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'NOT_REIMBURSED',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'ABO_PLATEFORME_MUSIQUE',
        categoryId: 'MUSIQUE_ENREGISTREE',
        matchingType: 'ThingType.MUSIQUE_ABO',
        proLabel: 'Abonnement plateforme musicale',
        appLabel: 'Abonnement plateforme musicale',
        searchGroup: 'Musique',
        isEvent: false,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: false,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'NOT_REIMBURSED',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'CAPTATION_MUSIQUE',
        categoryId: 'MUSIQUE_ENREGISTREE',
        matchingType: 'ThingType.MUSIQUE',
        proLabel: 'Captation musicale',
        appLabel: 'Captation musicale',
        searchGroup: 'Musique',
        isEvent: false,
        conditionalFields: ['author', 'musicType', 'performer'],
        canExpire: false,
        canBeDuo: false,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'NOT_REIMBURSED',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'FESTIVAL_MUSIQUE',
        categoryId: 'MUSIQUE_LIVE',
        matchingType: 'EventType.MUSIQUE',
        proLabel: 'Festival de musique',
        appLabel: 'Festival de musique',
        searchGroup: 'Musique',
        isEvent: true,
        conditionalFields: ['author', 'musicType', 'performer'],
        canExpire: false,
        canBeDuo: true,
        onlineOfflinePlatform: 'ONLINE_OR_OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'SEANCE_ESSAI_PRATIQUE_ART',
        categoryId: 'PRATIQUE_ART',
        matchingType: 'EventType.PRATIQUE_ARTISTIQUE',
        proLabel: "Séance d'essai",
        appLabel: "Séance d'essai",
        searchGroup: 'Cours, ateliers',
        isEvent: true,
        conditionalFields: ['speaker'],
        canExpire: true,
        canBeDuo: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'ATELIER_PRATIQUE_ART',
        categoryId: 'PRATIQUE_ART',
        matchingType: 'EventType.PRATIQUE_ARTISTIQUE',
        proLabel: 'Atelier, stage de pratique artistique',
        appLabel: 'Atelier, stage de pratique artistique',
        searchGroup: 'Cours, ateliers',
        isEvent: true,
        conditionalFields: ['speaker'],
        canExpire: false,
        canBeDuo: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'ABO_PRATIQUE_ART',
        categoryId: 'PRATIQUE_ART',
        matchingType: 'ThingType.PRATIQUE_ARTISTIQUE_ABO',
        proLabel: 'Abonnement pratique artistique',
        appLabel: 'Abonnement pratique artistique',
        searchGroup: 'Cours, ateliers',
        isEvent: false,
        conditionalFields: [],
        canExpire: true,
        canBeDuo: false,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'ABO_PRESSE_EN_LIGNE',
        categoryId: 'MEDIA',
        matchingType: 'ThingType.PRESSE_ABO',
        proLabel: 'Abonnement presse en ligne',
        appLabel: 'Abonnement presse en ligne',
        searchGroup: 'Presse',
        isEvent: false,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: false,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'NOT_REIMBURSED',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'ARTICLE_PRESSE',
        categoryId: 'MEDIA',
        matchingType: 'ThingType.PRESSE_ABO',
        proLabel: 'Article de presse',
        appLabel: 'Article de presse',
        searchGroup: 'Presse',
        isEvent: false,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: false,
        onlineOfflinePlatform: 'ONLINE_OR_OFFLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'NOT_REIMBURSED',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'PODCAST',
        categoryId: 'MEDIA',
        matchingType: 'ThingType.PRESSE_ABO',
        proLabel: 'Podcast',
        appLabel: 'Podcast',
        searchGroup: 'Films, séries, podcasts',
        isEvent: false,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: false,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'NOT_REIMBURSED',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'APP_CULTURELLE',
        categoryId: 'MEDIA',
        matchingType: 'ThingType.PRESSE_ABO',
        proLabel: 'Application culturelle',
        appLabel: 'Application culturelle',
        searchGroup: 'Presse',
        isEvent: false,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: false,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'NOT_REIMBURSED',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'SPECTACLE_REPRESENTATION',
        categoryId: 'SPECTACLE',
        matchingType: 'EventType.SPECTACLE_VIVANT',
        proLabel: 'Spectacle, représentation',
        appLabel: 'Spectacle, représentation',
        searchGroup: 'Spectacles',
        isEvent: true,
        conditionalFields: ['author', 'showType', 'stageDirector', 'performer'],
        canExpire: false,
        canBeDuo: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'SPECTACLE_ENREGISTRE',
        categoryId: 'SPECTACLE',
        matchingType: 'EventType.SPECTACLE_VIVANT',
        proLabel: 'Spectacle enregistré',
        appLabel: 'Spectacle enregistré',
        searchGroup: 'Spectacles',
        isEvent: false,
        conditionalFields: ['author', 'showType', 'stageDirector', 'performer'],
        canExpire: false,
        canBeDuo: false,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'NOT_REIMBURSED',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'LIVESTREAM_EVENEMENT',
        categoryId: 'SPECTACLE',
        matchingType: 'EventType.SPECTACLE_VIVANT',
        proLabel: "Livestream d'événement",
        appLabel: "Livestream d'événement",
        searchGroup: 'Spectacles',
        isEvent: true,
        conditionalFields: ['author', 'showType', 'stageDirector', 'performer'],
        canExpire: false,
        canBeDuo: false,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'FESTIVAL_SPECTACLE',
        categoryId: 'SPECTACLE',
        matchingType: 'EventType.SPECTACLE_VIVANT',
        proLabel: 'Festival',
        appLabel: 'Festival',
        searchGroup: 'Spectacles',
        isEvent: true,
        conditionalFields: ['author', 'showType', 'stageDirector', 'performer'],
        canExpire: false,
        canBeDuo: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'ABO_SPECTACLE',
        categoryId: 'SPECTACLE',
        matchingType: 'ThingType.SPECTACLE_VIVANT_ABO',
        proLabel: 'Abonnement spectacle',
        appLabel: 'Abonnement spectacle',
        searchGroup: 'Spectacles',
        isEvent: false,
        conditionalFields: ['showType'],
        canExpire: true,
        canBeDuo: false,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'ACHAT_INSTRUMENT',
        categoryId: 'INSTRUMENT',
        matchingType: 'ThingType.INSTRUMENT',
        proLabel: 'Achat instrument',
        appLabel: 'Achat instrument',
        searchGroup: 'Instruments de musique',
        isEvent: false,
        conditionalFields: [],
        canExpire: true,
        canBeDuo: false,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'BON_ACHAT_INSTRUMENT',
        categoryId: 'INSTRUMENT',
        matchingType: 'ThingType.INSTRUMENT',
        proLabel: "Bon d'achat instrument",
        appLabel: "Bon d'achat instrument",
        searchGroup: 'Instruments de musique',
        isEvent: false,
        conditionalFields: [],
        canExpire: true,
        canBeDuo: false,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'LOCATION_INSTRUMENT',
        categoryId: 'INSTRUMENT',
        matchingType: 'ThingType.INSTRUMENT',
        proLabel: 'Location instrument',
        appLabel: 'Location instrument',
        searchGroup: 'Instruments de musique',
        isEvent: false,
        conditionalFields: [],
        canExpire: true,
        canBeDuo: false,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'PARTITION',
        categoryId: 'INSTRUMENT',
        matchingType: 'ThingType.INSTRUMENT',
        proLabel: 'Partition',
        appLabel: 'Partition',
        searchGroup: 'Instruments de musique',
        isEvent: false,
        conditionalFields: [],
        canExpire: true,
        canBeDuo: false,
        onlineOfflinePlatform: 'ONLINE_OR_OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
      {
        id: 'MATERIEL_ART_CREATIF',
        categoryId: 'BEAUX_ARTS',
        matchingType: 'ThingType.MATERIEL_ART_CREA',
        proLabel: 'Matériel arts créatifs',
        appLabel: 'Matériel arts créatifs',
        searchGroup: 'Matériel arts créatifs',
        isEvent: false,
        conditionalFields: [],
        canExpire: true,
        canBeDuo: false,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
        isActive: true,
      },
    ],
  }

  jest.spyOn(pcapi, 'loadCategories').mockResolvedValue(categories)
}
