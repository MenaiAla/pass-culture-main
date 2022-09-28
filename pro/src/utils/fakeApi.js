import * as pcapi from 'repository/pcapi/pcapi'

export const bulkFakeApiCreateOrEditStock = ({ ...stockIds }) =>
  jest.spyOn(pcapi, 'bulkCreateOrEditStock').mockResolvedValue([stockIds])

export const getFakeApiUserValidatedOfferersNames = ({ ...offerers }) =>
  jest
    .spyOn(pcapi, 'getUserValidatedOfferersNames')
    .mockResolvedValue([offerers])

export const getFakeApiVenuesForOfferer = ({ ...venues }) =>
  jest.spyOn(pcapi, 'getVenuesForOfferer').mockResolvedValue([venues])

export const loadFakeApiStocks = stocks =>
  jest.spyOn(pcapi, 'loadStocks').mockResolvedValue({ stocks })

export const loadFakeApiVenueStats = venue =>
  jest.spyOn(pcapi, 'getVenueStats').mockResolvedValue(venue)

export const generateFakeOffererApiKey = apiKey =>
  jest.spyOn(pcapi, 'generateOffererApiKey').mockResolvedValue(apiKey)

export const failToGenerateOffererApiKey = () =>
  jest.spyOn(pcapi, 'generateOffererApiKey').mockRejectedValue(null)

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
        proLabel: 'Jeux',
        isSelectable: true,
      },
      {
        id: 'LIVRE',
        proLabel: 'Livre',
        isSelectable: true,
      },
      {
        id: 'MUSEE',
        proLabel: 'Musée, patrimoine, architecture, arts visuels',
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
        proLabel: 'Support physique (DVD, Bluray...)',
        appLabel: 'Support physique (DVD, Bluray...)',
        searchGroup: 'Films, séries, podcasts',
        isEvent: false,
        conditionalFields: [],
        canExpire: true,
        canBeDuo: false,
        canBeEducational: false,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'ABO_MEDIATHEQUE',
        categoryId: 'FILM',
        proLabel: 'Abonnement médiathèque',
        appLabel: 'Abonnement médiathèque',
        searchGroup: 'Films, séries, podcasts',
        isEvent: false,
        conditionalFields: [],
        canExpire: true,
        canBeDuo: false,
        canBeEducational: false,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'VOD',
        categoryId: 'FILM',
        proLabel: 'Vidéo à la demande',
        appLabel: 'Vidéo à la demande',
        searchGroup: 'Films, séries, podcasts',
        isEvent: false,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: false,
        canBeEducational: false,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'NOT_REIMBURSED',
        isSelectable: true,
      },
      {
        id: 'ABO_PLATEFORME_VIDEO',
        categoryId: 'FILM',
        proLabel: 'Abonnement plateforme streaming',
        appLabel: 'Abonnement plateforme streaming',
        searchGroup: 'Films, séries, podcasts',
        isEvent: false,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: false,
        canBeEducational: false,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'NOT_REIMBURSED',
        isSelectable: true,
      },
      {
        id: 'AUTRE_SUPPORT_NUMERIQUE',
        categoryId: 'FILM',
        proLabel: 'Autre support numérique',
        appLabel: 'Autre support numérique',
        searchGroup: 'Films, séries, podcasts',
        isEvent: false,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: false,
        canBeEducational: false,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'NOT_REIMBURSED',
        isSelectable: true,
      },
      {
        id: 'SOUS-CATEGORIE-NON-SELECTIONNABLE',
        categoryId: 'FILM',
        proLabel: 'Sous-catégorie non sélectionnable',
        appLabel: 'Sous-catégorie non sélectionnable',
        searchGroup: 'Films, séries, podcasts',
        isEvent: false,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: false,
        canBeEducational: false,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'NOT_REIMBURSED',
        isSelectable: false,
      },
      {
        id: 'CARTE_CINE_MULTISEANCES',
        categoryId: 'CINEMA',
        proLabel: 'Carte cinéma multi-séances',
        appLabel: 'Carte cinéma multi-séances',
        searchGroup: 'Cinéma',
        isEvent: false,
        conditionalFields: [],
        canExpire: true,
        canBeDuo: false,
        canBeEducational: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'CARTE_CINE_ILLIMITE',
        categoryId: 'CINEMA',
        proLabel: 'Carte cinéma illimité',
        appLabel: 'Carte cinéma illimité',
        searchGroup: 'Cinéma',
        isEvent: false,
        conditionalFields: [],
        canExpire: true,
        canBeDuo: false,
        canBeEducational: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'SEANCE_CINE',
        categoryId: 'CINEMA',
        proLabel: 'Séance de cinéma',
        appLabel: 'Séance de cinéma',
        searchGroup: 'Cinéma',
        isEvent: true,
        conditionalFields: ['author', 'visa', 'stageDirector'],
        canExpire: false,
        canBeDuo: true,
        canBeEducational: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'EVENEMENT_CINE',
        categoryId: 'CINEMA',
        proLabel: 'Évènement cinématographique',
        appLabel: 'Évènement cinéma',
        searchGroup: 'Cinéma',
        isEvent: true,
        conditionalFields: ['author', 'visa', 'stageDirector'],
        canExpire: false,
        canBeDuo: true,
        canBeEducational: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'FESTIVAL_CINE',
        categoryId: 'CINEMA',
        proLabel: 'Festival de cinéma',
        appLabel: 'Festival de cinéma',
        searchGroup: 'Cinéma',
        isEvent: true,
        conditionalFields: ['author', 'visa', 'stageDirector'],
        canExpire: false,
        canBeDuo: true,
        canBeEducational: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'CINE_VENTE_DISTANCE',
        categoryId: 'CINEMA',
        proLabel: 'Cinéma vente à distance',
        appLabel: 'Cinéma',
        searchGroup: 'Cinéma',
        isEvent: false,
        conditionalFields: ['author', 'visa', 'stageDirector'],
        canExpire: false,
        canBeDuo: false,
        canBeEducational: true,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'CONFERENCE',
        categoryId: 'CONFERENCE',
        proLabel: 'Conférence',
        appLabel: 'Conférence',
        searchGroup: 'Conférences, rencontres',
        isEvent: true,
        conditionalFields: ['speaker'],
        canExpire: false,
        canBeDuo: true,
        canBeEducational: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'RENCONTRE',
        categoryId: 'CONFERENCE',
        proLabel: 'Rencontre',
        appLabel: 'Rencontre',
        searchGroup: 'Conférences, rencontres',
        isEvent: true,
        conditionalFields: ['speaker'],
        canExpire: false,
        canBeDuo: true,
        canBeEducational: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'DECOUVERTE_METIERS',
        categoryId: 'CONFERENCE',
        proLabel: 'Découverte des métiers',
        appLabel: 'Découverte des métiers',
        searchGroup: 'Conférences, rencontres',
        isEvent: true,
        conditionalFields: ['speaker'],
        canExpire: false,
        canBeDuo: true,
        canBeEducational: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'SALON',
        categoryId: 'CONFERENCE',
        proLabel: 'Salon / Convention',
        appLabel: 'Salon / Convention',
        searchGroup: 'Conférences, rencontres',
        isEvent: true,
        conditionalFields: ['speaker'],
        canExpire: false,
        canBeDuo: true,
        canBeEducational: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'CONCOURS',
        categoryId: 'JEU',
        proLabel: 'Concours - jeux',
        appLabel: 'Concours - jeux',
        searchGroup: 'Jeux',
        isEvent: true,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: true,
        canBeEducational: false,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'RENCONTRE_JEU',
        categoryId: 'JEU',
        proLabel: 'Rencontres - jeux',
        appLabel: 'Rencontres - jeux',
        searchGroup: 'Jeux',
        isEvent: true,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: true,
        canBeEducational: false,
        onlineOfflinePlatform: 'ONLINE_OR_OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'ESCAPE_GAME',
        categoryId: 'JEU',
        proLabel: 'Escape game',
        appLabel: 'Escape game',
        searchGroup: 'Jeux',
        isEvent: true,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: true,
        canBeEducational: true,
        onlineOfflinePlatform: 'ONLINE_OR_OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'EVENEMENT_JEU',
        categoryId: 'JEU',
        proLabel: 'Évènements - jeux',
        appLabel: 'Évènements - jeux',
        searchGroup: 'Jeux',
        isEvent: true,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: true,
        canBeEducational: false,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'JEU_EN_LIGNE',
        categoryId: 'JEU',
        proLabel: 'Jeux en ligne',
        appLabel: 'Jeux en ligne',
        searchGroup: 'Jeux',
        isEvent: false,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: false,
        canBeEducational: false,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'NOT_REIMBURSED',
        isSelectable: true,
      },
      {
        id: 'ABO_JEU_VIDEO',
        categoryId: 'JEU',
        proLabel: 'Abonnement jeux vidéos',
        appLabel: 'Abonnement jeux vidéos',
        searchGroup: 'Jeux',
        isEvent: false,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: false,
        canBeEducational: false,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'NOT_REIMBURSED',
        isSelectable: true,
      },
      {
        id: 'ABO_LUDOTHEQUE',
        categoryId: 'JEU',
        proLabel: 'Abonnement ludothèque',
        appLabel: 'Abonnement ludothèque',
        searchGroup: 'Jeux',
        isEvent: false,
        conditionalFields: [],
        canExpire: true,
        canBeDuo: false,
        canBeEducational: false,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'LIVRE_PAPIER',
        categoryId: 'LIVRE',
        proLabel: 'Livre papier',
        appLabel: 'Livre',
        searchGroup: 'Livres',
        isEvent: false,
        conditionalFields: ['author', 'isbn'],
        canExpire: true,
        canBeDuo: false,
        canBeEducational: false,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'BOOK',
        isSelectable: true,
      },
      {
        id: 'LIVRE_NUMERIQUE',
        categoryId: 'LIVRE',
        proLabel: 'Livre numérique, e-book',
        appLabel: 'Livre numérique, e-book',
        searchGroup: 'Livres',
        isEvent: false,
        conditionalFields: ['author', 'isbn'],
        canExpire: false,
        canBeDuo: false,
        canBeEducational: false,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'BOOK',
        isSelectable: true,
      },
      {
        id: 'TELECHARGEMENT_LIVRE_AUDIO',
        categoryId: 'LIVRE',
        proLabel: 'Livre audio à télécharger',
        appLabel: 'Livre audio à télécharger',
        searchGroup: 'Livres',
        isEvent: false,
        conditionalFields: ['author'],
        canExpire: false,
        canBeDuo: false,
        canBeEducational: false,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'NOT_REIMBURSED',
        isSelectable: true,
      },
      {
        id: 'LIVRE_AUDIO_PHYSIQUE',
        categoryId: 'LIVRE',
        proLabel: 'Livre audio sur support physique',
        appLabel: 'Livre audio sur support physique',
        searchGroup: 'Livres',
        isEvent: false,
        conditionalFields: ['author', 'isbn'],
        canExpire: true,
        canBeDuo: false,
        canBeEducational: false,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'ABO_BIBLIOTHEQUE',
        categoryId: 'LIVRE',
        proLabel: 'Abonnement (bibliothèques, médiathèques...)',
        appLabel: 'Abonnement (bibliothèques, médiathèques...)',
        searchGroup: 'Livres',
        isEvent: false,
        conditionalFields: [],
        canExpire: true,
        canBeDuo: false,
        canBeEducational: false,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'ABO_LIVRE_NUMERIQUE',
        categoryId: 'LIVRE',
        proLabel: 'Abonnement livres numériques',
        appLabel: 'Abonnement livres numériques',
        searchGroup: 'Livres',
        isEvent: false,
        conditionalFields: [],
        canExpire: true,
        canBeDuo: false,
        canBeEducational: false,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'BOOK',
        isSelectable: true,
      },
      {
        id: 'FESTIVAL_LIVRE',
        categoryId: 'LIVRE',
        proLabel: 'Festival et salon du livre',
        appLabel: 'Festival et salon du livre',
        searchGroup: 'Livres',
        isEvent: true,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: true,
        canBeEducational: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'CARTE_MUSEE',
        categoryId: 'MUSEE',
        proLabel:
          'Cartes musées, patrimoine, architecture, arts visuels ou contemporains',
        appLabel: 'Cartes musées, patrimoine...',
        searchGroup: 'Visites, expositions',
        isEvent: false,
        conditionalFields: [],
        canExpire: true,
        canBeDuo: true,
        canBeEducational: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'ABO_MUSEE',
        categoryId: 'MUSEE',
        proLabel: 'Abonnement musée, patrimoine...',
        appLabel: 'Abonnement musée, patrimoine...',
        searchGroup: 'Visites, expositions',
        isEvent: false,
        conditionalFields: [],
        canExpire: true,
        canBeDuo: true,
        canBeEducational: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'VISITE',
        categoryId: 'MUSEE',
        proLabel: 'Visite',
        appLabel: 'Visite',
        searchGroup: 'Visites, expositions',
        isEvent: true,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: true,
        canBeEducational: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'VISITE_GUIDEE',
        categoryId: 'MUSEE',
        proLabel: 'Visite guidée',
        appLabel: 'Visite guidée',
        searchGroup: 'Visites, expositions',
        isEvent: true,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: true,
        canBeEducational: true,
        onlineOfflinePlatform: 'ONLINE_OR_OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'EVENEMENT_PATRIMOINE',
        categoryId: 'MUSEE',
        proLabel: 'Évènement et atelier patrimoine',
        appLabel: 'Évènement et atelier patrimoine',
        searchGroup: 'Visites, expositions',
        isEvent: true,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: true,
        canBeEducational: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'VISITE_VIRTUELLE',
        categoryId: 'MUSEE',
        proLabel: 'Visite virtuelle',
        appLabel: 'Visite virtuelle',
        searchGroup: 'Visites, expositions',
        isEvent: false,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: false,
        canBeEducational: false,
        onlineOfflinePlatform: 'ONLINE_OR_OFFLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'NOT_REIMBURSED',
        isSelectable: true,
      },
      {
        id: 'CONCERT',
        categoryId: 'MUSIQUE_LIVE',
        proLabel: 'Concert',
        appLabel: 'Concert',
        searchGroup: 'Musique',
        isEvent: true,
        conditionalFields: ['author', 'musicType', 'performer'],
        canExpire: false,
        canBeDuo: true,
        canBeEducational: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'EVENEMENT_MUSIQUE',
        categoryId: 'MUSIQUE_LIVE',
        proLabel: "Autre type d'évènement musical",
        appLabel: "Autre type d'évènement musical",
        searchGroup: 'Musique',
        isEvent: true,
        conditionalFields: ['author', 'musicType', 'performer'],
        canExpire: false,
        canBeDuo: true,
        canBeEducational: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'LIVESTREAM_MUSIQUE',
        categoryId: 'MUSIQUE_LIVE',
        proLabel: 'Livestream musical',
        appLabel: 'Livestream musical',
        searchGroup: 'Musique',
        isEvent: true,
        conditionalFields: ['author', 'musicType', 'performer'],
        canExpire: false,
        canBeDuo: false,
        canBeEducational: false,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'ABO_CONCERT',
        categoryId: 'MUSIQUE_LIVE',
        proLabel: 'Abonnement concert',
        appLabel: 'Abonnement concert',
        searchGroup: 'Musique',
        isEvent: false,
        conditionalFields: ['musicType'],
        canExpire: true,
        canBeDuo: false,
        canBeEducational: false,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'SUPPORT_PHYSIQUE_MUSIQUE',
        categoryId: 'MUSIQUE_ENREGISTREE',
        proLabel: 'Support physique (CD, vinyle...)',
        appLabel: 'Support physique (CD, vinyle...)',
        searchGroup: 'Musique',
        isEvent: false,
        conditionalFields: ['author', 'musicType', 'performer'],
        canExpire: true,
        canBeDuo: false,
        canBeEducational: false,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'TELECHARGEMENT_MUSIQUE',
        categoryId: 'MUSIQUE_ENREGISTREE',
        proLabel: 'Téléchargement de musique',
        appLabel: 'Téléchargement de musique',
        searchGroup: 'Musique',
        isEvent: false,
        conditionalFields: ['author', 'musicType', 'performer'],
        canExpire: false,
        canBeDuo: false,
        canBeEducational: false,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'NOT_REIMBURSED',
        isSelectable: true,
      },
      {
        id: 'ABO_PLATEFORME_MUSIQUE',
        categoryId: 'MUSIQUE_ENREGISTREE',
        proLabel: 'Abonnement plateforme musicale',
        appLabel: 'Abonnement plateforme musicale',
        searchGroup: 'Musique',
        isEvent: false,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: false,
        canBeEducational: false,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'NOT_REIMBURSED',
        isSelectable: true,
      },
      {
        id: 'CAPTATION_MUSIQUE',
        categoryId: 'MUSIQUE_ENREGISTREE',
        proLabel: 'Captation musicale',
        appLabel: 'Captation musicale',
        searchGroup: 'Musique',
        isEvent: false,
        conditionalFields: ['author', 'musicType', 'performer'],
        canExpire: false,
        canBeDuo: false,
        canBeEducational: false,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'NOT_REIMBURSED',
        isSelectable: false,
      },
      {
        id: 'FESTIVAL_MUSIQUE',
        categoryId: 'MUSIQUE_LIVE',
        proLabel: 'Festival de musique',
        appLabel: 'Festival de musique',
        searchGroup: 'Musique',
        isEvent: true,
        conditionalFields: ['author', 'musicType', 'performer'],
        canExpire: false,
        canBeDuo: true,
        canBeEducational: true,
        onlineOfflinePlatform: 'ONLINE_OR_OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'SEANCE_ESSAI_PRATIQUE_ART',
        categoryId: 'PRATIQUE_ART',
        proLabel: "Séance d'essai",
        appLabel: "Séance d'essai",
        searchGroup: 'Cours, ateliers',
        isEvent: true,
        conditionalFields: ['speaker'],
        canExpire: true,
        canBeDuo: true,
        canBeEducational: false,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'ATELIER_PRATIQUE_ART',
        categoryId: 'PRATIQUE_ART',
        proLabel: 'Atelier, stage de pratique artistique',
        appLabel: 'Atelier, stage de pratique artistique',
        searchGroup: 'Cours, ateliers',
        isEvent: true,
        conditionalFields: ['speaker'],
        canExpire: false,
        canBeDuo: true,
        canBeEducational: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'ABO_PRATIQUE_ART',
        categoryId: 'PRATIQUE_ART',
        proLabel: 'Abonnement pratique artistique',
        appLabel: 'Abonnement pratique artistique',
        searchGroup: 'Cours, ateliers',
        isEvent: false,
        conditionalFields: [],
        canExpire: true,
        canBeDuo: false,
        canBeEducational: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'ABO_PRESSE_EN_LIGNE',
        categoryId: 'MEDIA',
        proLabel: 'Abonnement presse en ligne',
        appLabel: 'Abonnement presse en ligne',
        searchGroup: 'Presse',
        isEvent: false,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: false,
        canBeEducational: true,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'NOT_REIMBURSED',
        isSelectable: true,
      },
      {
        id: 'ARTICLE_PRESSE',
        categoryId: 'MEDIA',
        proLabel: 'Article de presse',
        appLabel: 'Article de presse',
        searchGroup: 'Presse',
        isEvent: false,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: false,
        canBeEducational: false,
        onlineOfflinePlatform: 'ONLINE_OR_OFFLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'NOT_REIMBURSED',
        isSelectable: true,
      },
      {
        id: 'PODCAST',
        categoryId: 'MEDIA',
        proLabel: 'Podcast',
        appLabel: 'Podcast',
        searchGroup: 'Films, séries, podcasts',
        isEvent: false,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: false,
        canBeEducational: false,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'NOT_REIMBURSED',
        isSelectable: true,
      },
      {
        id: 'APP_CULTURELLE',
        categoryId: 'MEDIA',
        proLabel: 'Application culturelle',
        appLabel: 'Application culturelle',
        searchGroup: 'Presse',
        isEvent: false,
        conditionalFields: [],
        canExpire: false,
        canBeDuo: false,
        canBeEducational: false,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'NOT_REIMBURSED',
        isSelectable: true,
      },
      {
        id: 'SPECTACLE_REPRESENTATION',
        categoryId: 'SPECTACLE',
        proLabel: 'Spectacle, représentation',
        appLabel: 'Spectacle, représentation',
        searchGroup: 'Spectacles',
        isEvent: true,
        conditionalFields: ['author', 'showType', 'stageDirector', 'performer'],
        canExpire: false,
        canBeDuo: true,
        canBeEducational: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'SPECTACLE_ENREGISTRE',
        categoryId: 'SPECTACLE',
        proLabel: 'Spectacle enregistré',
        appLabel: 'Spectacle enregistré',
        searchGroup: 'Spectacles',
        isEvent: false,
        conditionalFields: ['author', 'showType', 'stageDirector', 'performer'],
        canExpire: false,
        canBeDuo: false,
        canBeEducational: true,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'NOT_REIMBURSED',
        isSelectable: true,
      },
      {
        id: 'LIVESTREAM_EVENEMENT',
        categoryId: 'SPECTACLE',
        proLabel: "Livestream d'évènement",
        appLabel: "Livestream d'évènement",
        searchGroup: 'Spectacles',
        isEvent: true,
        conditionalFields: ['author', 'showType', 'stageDirector', 'performer'],
        canExpire: false,
        canBeDuo: false,
        canBeEducational: false,
        onlineOfflinePlatform: 'ONLINE',
        isDigitalDeposit: true,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'FESTIVAL_SPECTACLE',
        categoryId: 'SPECTACLE',
        proLabel: 'Festival',
        appLabel: 'Festival',
        searchGroup: 'Spectacles',
        isEvent: true,
        conditionalFields: ['author', 'showType', 'stageDirector', 'performer'],
        canExpire: false,
        canBeDuo: true,
        canBeEducational: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'ABO_SPECTACLE',
        categoryId: 'SPECTACLE',
        proLabel: 'Abonnement spectacle',
        appLabel: 'Abonnement spectacle',
        searchGroup: 'Spectacles',
        isEvent: false,
        conditionalFields: ['showType'],
        canExpire: true,
        canBeDuo: false,
        canBeEducational: true,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: false,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'ACHAT_INSTRUMENT',
        categoryId: 'INSTRUMENT',
        proLabel: 'Achat instrument',
        appLabel: 'Achat instrument',
        searchGroup: 'Instruments de musique',
        isEvent: false,
        conditionalFields: [],
        canExpire: true,
        canBeDuo: false,
        canBeEducational: false,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'BON_ACHAT_INSTRUMENT',
        categoryId: 'INSTRUMENT',
        proLabel: "Bon d'achat instrument",
        appLabel: "Bon d'achat instrument",
        searchGroup: 'Instruments de musique',
        isEvent: false,
        conditionalFields: [],
        canExpire: true,
        canBeDuo: false,
        canBeEducational: false,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'LOCATION_INSTRUMENT',
        categoryId: 'INSTRUMENT',
        proLabel: 'Location instrument',
        appLabel: 'Location instrument',
        searchGroup: 'Instruments de musique',
        isEvent: false,
        conditionalFields: [],
        canExpire: true,
        canBeDuo: false,
        canBeEducational: false,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'PARTITION',
        categoryId: 'INSTRUMENT',
        proLabel: 'Partition',
        appLabel: 'Partition',
        searchGroup: 'Instruments de musique',
        isEvent: false,
        conditionalFields: [],
        canExpire: true,
        canBeDuo: false,
        canBeEducational: false,
        onlineOfflinePlatform: 'ONLINE_OR_OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
      {
        id: 'MATERIEL_ART_CREATIF',
        categoryId: 'BEAUX_ARTS',
        proLabel: 'Matériel arts créatifs',
        appLabel: 'Matériel arts créatifs',
        searchGroup: 'Matériel arts créatifs',
        isEvent: false,
        conditionalFields: [],
        canExpire: true,
        canBeDuo: false,
        canBeEducational: false,
        onlineOfflinePlatform: 'OFFLINE',
        isDigitalDeposit: false,
        isPhysicalDeposit: true,
        reimbursementRule: 'STANDARD',
        isSelectable: true,
      },
    ],
  }

  jest.spyOn(pcapi, 'loadCategories').mockResolvedValue(categories)
}