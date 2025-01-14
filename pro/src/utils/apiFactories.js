/* istanbul ignore file */
import { OfferStatus } from 'apiClient/v1'
import { BookingRecapStatus } from 'apiClient/v1/models/BookingRecapStatus'

let offerId = 1
let venueId = 1
let offererId = 1
let stockId = 1
let bookingId = 1

export const collectiveOfferFactory = (
  customCollectiveOffer = {},
  customStock = collectiveStockFactory() || null,
  customVenue = venueFactory()
) => {
  const stocks = customStock === null ? [] : [customStock]
  const currentOfferId = offerId++

  return {
    id: `OFFER${currentOfferId}`,
    name: `Le nom de l’offre ${currentOfferId}`,
    isActive: true,
    isEditable: true,
    isEvent: true,
    isFullyBooked: false,
    isThing: false,
    nonHumanizedId: currentOfferId,
    status: OfferStatus.ACTIVE,
    stocks,
    venue: customVenue,
    hasBookingLimitDatetimesPassed: false,
    isEducational: true,
    ...customCollectiveOffer,
  }
}

export const collectiveStockFactory = (customStock = {}) => {
  return {
    bookingsQuantity: 0,
    id: `STOCK${stockId++}`,
    offerId: `OFFER${offerId}`,
    price: 100,
    quantity: 1,
    remainingQuantity: 1,
    beginningDatetime: new Date('2021-10-15T12:00:00Z'),
    bookingLimitdatetime: new Date('2021-09-15T12:00:00Z'),
    ...customStock,
  }
}

export const offerFactory = (
  customOffer = {},
  customStock = stockFactory() || null,
  customVenue = venueFactory()
) => {
  const stocks = customStock === null ? [] : [customStock]
  const currentOfferId = offerId++

  return {
    id: `OFFER${currentOfferId}`,
    name: `Le nom de l’offre ${currentOfferId}`,
    isActive: true,
    isEditable: true,
    isEvent: false,
    isFullyBooked: false,
    isThing: true,
    nonHumanizedId: currentOfferId,
    status: OfferStatus.ACTIVE,
    stocks,
    venue: customVenue,
    hasBookingLimitDatetimesPassed: false,
    isEducational: false,
    ...customOffer,
  }
}

export const venueFactory = (
  customVenue = {},
  customOfferer = offererFactory()
) => {
  const currentVenueId = venueId++
  return {
    address: 'Ma Rue',
    city: 'Ma Ville',
    id: `VENUE${currentVenueId}`,
    nonHumanizedId: currentVenueId,
    isVirtual: false,
    name: `Le nom du lieu ${currentVenueId}`,
    managingOfferer: customOfferer,
    managingOffererId: customOfferer.id,
    postalCode: '11100',
    publicName: 'Mon Lieu',
    offererName: 'Ma structure',
    departementCode: '973',
    hasMissingReimbursementPoint: false,
    hasCreatedOffer: false,
    ...customVenue,
  }
}

export const offererFactory = (customOfferer = {}) => {
  const currentOffererId = offererId++
  return {
    id: `OFFERER${currentOffererId}`,
    name: `La nom de la structure ${currentOffererId}`,
    ...customOfferer,
  }
}

export const stockFactory = (customStock = {}) => {
  return {
    bookingsQuantity: 0,
    id: `STOCK${stockId++}`,
    offerId: `OFFER${offerId}`,
    price: 10,
    quantity: null,
    activationCodes: [],
    remainingQuantity: 2,
    isbn: '9787605639121',
    ...customStock,
  }
}

export const bookingRecapFactory = (customBookingRecap = {}) => {
  const offer = offerFactory()

  return {
    beneficiary: {
      email: 'user@example.com',
      firstname: 'First',
      lastname: 'Last',
      phonenumber: '0606060606',
    },
    bookingAmount: 0,
    bookingDate: '2020-04-12T19:31:12Z',
    bookingIsDuo: false,
    bookingId: '1',
    bookingStatus: BookingRecapStatus.BOOKED,
    bookingStatusHistory: [
      {
        date: '2020-04-12T19:31:12Z',
        status: BookingRecapStatus.BOOKED,
      },
    ],
    bookingToken: `TOKEN${bookingId++}`,
    stock: {
      offerIdentifier: offer.id,
      offerNonHumanizedId: offer.nonHumanizedId,
      offerName: offer.name,
      offerIsEducational: false,
      stockIdentifier: offer.stocks[0].id,
      offerIsbn: offer.stocks[0].isbn,
    },
    ...customBookingRecap,
  }
}
