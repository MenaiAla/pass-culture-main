import { WithdrawalTypeEnum } from 'apiClient/v1'
import { CATEGORY_STATUS, OFFER_STATUS_ACTIVE } from 'core/Offers'
import {
  IOfferCategory,
  IOfferIndividual,
  IOfferIndividualStock,
  IOfferSubCategory,
} from 'core/Offers/types'
import { AccessiblityEnum } from 'core/shared'

import { serializePropsFromOfferIndividual } from '../serializer'

describe('routes::Summary::serializers', () => {
  let offer: IOfferIndividual
  let categories: IOfferCategory[]
  let subCategoryList: IOfferSubCategory[]

  beforeEach(() => {
    offer = {
      id: 'AA',
      nonHumanizedId: 12,
      author: 'Offer author',
      bookingEmail: 'booking@email.com',
      description: 'Offer description',
      durationMinutes: 140,
      isbn: '',
      isDuo: false,
      isEducational: false,
      isEvent: true,
      accessibility: {
        [AccessiblityEnum.AUDIO]: true,
        [AccessiblityEnum.MENTAL]: true,
        [AccessiblityEnum.MOTOR]: true,
        [AccessiblityEnum.VISUAL]: true,
        [AccessiblityEnum.NONE]: false,
      },
      isNational: false,
      name: 'Offer name',
      musicSubType: '',
      musicType: '',
      offererId: 'OFID',
      offererName: '',
      performer: 'Offer performer',
      showSubType: '',
      showType: '',
      stageDirector: 'Offer stageDirector',
      speaker: 'Offer speaker',
      subcategoryId: 'SCID',
      image: {
        url: 'http://image.url.test',
        credit: 'John Do',
      },
      url: 'http://offer.example.com',
      externalTicketOfficeUrl: 'http://external.example.com',
      venueId: 'VID',
      venue: {
        id: 'VID',
        name: 'Venue name',
        publicName: 'Venue publicName',
        isVirtual: false,
        address: '15 rue de la corniche',
        postalCode: '75001',
        city: 'Paris',
        offerer: {
          id: 'OFID',
          name: 'Offerer name',
        },
        departmentCode: '75',
        accessibility: {
          [AccessiblityEnum.AUDIO]: false,
          [AccessiblityEnum.MENTAL]: false,
          [AccessiblityEnum.MOTOR]: false,
          [AccessiblityEnum.VISUAL]: false,
          [AccessiblityEnum.NONE]: true,
        },
      },
      visa: '',
      withdrawalDetails: 'Offer withdrawalDetails',
      withdrawalDelay: 140,
      withdrawalType: WithdrawalTypeEnum.ON_SITE,
      stocks: [
        {
          quantity: 5,
          price: 20,
          bookingLimitDatetime: '01-01-2022',
          beginningDatetime: '01-12-2022',
        } as IOfferIndividualStock,
        {
          quantity: 10,
          price: 12,
          bookingLimitDatetime: '01-01-2023',
          beginningDatetime: '01-12-2023',
        } as IOfferIndividualStock,
      ],
      lastProviderName: 'Last Provider Name',
      lastProvider: null,
      status: OFFER_STATUS_ACTIVE,
    }
    categories = [
      {
        id: 'CID',
        proLabel: 'Catégorie',
        isSelectable: true,
      },
    ]
    subCategoryList = [
      {
        id: 'SCID',
        categoryId: 'CID',
        proLabel: 'sub-category proLabel',
        isEvent: true,
        conditionalFields: ['stageDirector', 'speaker', 'author', 'performer'],
        canBeDuo: true,
        canBeEducational: false,
        onlineOfflinePlatform: CATEGORY_STATUS.OFFLINE,
        reimbursementRule: 'sub-category reimbursementRule',
        isSelectable: true,
      },
    ]
  })

  it('should serialize data with event stock', () => {
    const {
      offerStatus: offerStatusSerialized,
      providerName: providerNameSerialized,
      offer: offerSerialized,
      stockThing: stockThingSerialized,
      stockEventList: stockEventListSerialized,
      preview: previewSerialized,
    } = serializePropsFromOfferIndividual(offer, categories, subCategoryList)

    expect(offerStatusSerialized).toEqual(OFFER_STATUS_ACTIVE)
    expect(providerNameSerialized).toEqual('Last Provider Name')
    expect(offerSerialized).toEqual({
      id: 'AA',
      nonHumanizedId: 12,
      name: 'Offer name',
      description: 'Offer description',
      categoryName: 'Catégorie',
      subCategoryName: 'sub-category proLabel',
      subcategoryId: 'SCID',

      venueName: 'Venue name',
      venuePublicName: 'Venue publicName',
      venueDepartmentCode: '75',
      isVenueVirtual: false,
      offererName: 'Offerer name',
      bookingEmail: 'booking@email.com',
      withdrawalDetails: 'Offer withdrawalDetails',
      withdrawalDelay: 140,
      withdrawalType: WithdrawalTypeEnum.ON_SITE,
      accessibility: {
        [AccessiblityEnum.AUDIO]: true,
        [AccessiblityEnum.MENTAL]: true,
        [AccessiblityEnum.MOTOR]: true,
        [AccessiblityEnum.VISUAL]: true,
        [AccessiblityEnum.NONE]: false,
      },
      isDuo: false,
      url: 'http://offer.example.com',
      externalTicketOfficeUrl: 'http://external.example.com',

      author: 'Offer author',
      stageDirector: 'Offer stageDirector',
      musicTypeName: '',
      musicSubTypeName: '',
      showTypeName: '',
      showSubTypeName: '',
      speaker: 'Offer speaker',
      visa: '',
      performer: 'Offer performer',
      isbn: '',
      durationMinutes: '140',
    })
    expect(stockThingSerialized).toEqual(undefined)
    expect(stockEventListSerialized).toEqual([
      {
        quantity: 10,
        price: 12,
        bookingLimitDatetime: '01-01-2023',
        beginningDatetime: '01-12-2023',
        departmentCode: '75',
      },
      {
        quantity: 5,
        price: 20,
        bookingLimitDatetime: '01-01-2022',
        beginningDatetime: '01-12-2022',
        departmentCode: '75',
      },
    ])
    expect(previewSerialized).toEqual({
      imageSrc: 'http://image.url.test',
      offerData: {
        name: 'Offer name',
        description: 'Offer description',
        isEvent: true,
        isDuo: false,
      },
      venueData: {
        name: 'Venue name',
        publicName: 'Venue publicName',
        isVirtual: false,
        address: '15 rue de la corniche',
        postalCode: '75001',
        city: 'Paris',
        withdrawalDetails: 'Offer withdrawalDetails',
      },
    })
  })
  it('should serialize data with showType', () => {
    offer = {
      ...offer,
      showType: '400',
      showSubType: '401',
    }
    const { offer: offerSerialized } = serializePropsFromOfferIndividual(
      offer,
      categories,
      subCategoryList
    )
    expect(offerSerialized.showTypeName).toEqual('Humour / Café-théâtre')
    expect(offerSerialized.showSubTypeName).toEqual('Café Théâtre')
  })
  it('should serialize data with thing stock', () => {
    offer = {
      ...offer,
      isEvent: false,
      stocks: [
        {
          quantity: 10,
          price: 12,
        } as IOfferIndividualStock,
      ],
    }
    const {
      stockThing: stockThingSerialized,
      stockEventList: stockEventListSerialized,
    } = serializePropsFromOfferIndividual(offer, categories, subCategoryList)
    expect(stockEventListSerialized).toEqual(undefined)
    expect(stockThingSerialized).toEqual({
      quantity: 10,
      price: 12,
      bookingLimitDatetime: undefined,
    })
  })
})
