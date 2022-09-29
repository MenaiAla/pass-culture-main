import {
  getFilteredBookingsCSV,
  signout,
  updateUserInformations,
  deleteStock,
  postThumbnail,
  setHasSeenTutos,
} from 'repository/pcapi/pcapi'
import { client } from 'repository/pcapi/pcapiClient'

jest.mock('repository/pcapi/pcapiClient', () => ({
  client: {
    delete: jest.fn(),
    get: jest.fn().mockResolvedValue({}),
    getPlainText: jest.fn().mockResolvedValue(''),
    patch: jest.fn(),
    post: jest.fn().mockResolvedValue({}),
    postWithFormData: jest.fn(),
  },
}))

jest.mock('utils/date', () => {
  return {
    ...jest.requireActual('utils/date'),
    getToday: jest.fn().mockReturnValue(new Date(2020, 8, 12)),
  }
})

describe('pcapi', () => {
  describe('deleteStock', () => {
    it('should delete stock given its id', () => {
      // When
      deleteStock('2E')

      // Then
      expect(client.delete).toHaveBeenCalledWith('/stocks/2E')
    })
  })

  describe('signout', () => {
    it('should sign out the user', () => {
      // When
      signout()

      // Then
      expect(client.get).toHaveBeenCalledWith('/users/signout')
    })
  })

  describe('postThumbnail', () => {
    it('should call the api correct POST route with thumbnail info as body param', () => {
      // given
      const file = new File([''], 'myThumb.png')
      const body = new FormData()
      body.append('offerId', 'AA')
      body.append('credit', 'Mon crédit')
      body.append('croppingRectX', '12')
      body.append('croppingRectY', '32')
      body.append('croppingRectHeight', '350')
      body.append('croppingRectWidth', '220')
      body.append('thumb', file)
      body.append('thumbUrl', '')

      // when
      postThumbnail('AA', 'Mon crédit', file, '', '12', '32', '350', '220')

      // then
      expect(client.postWithFormData).toHaveBeenCalledWith(
        `/offers/thumbnails`,
        body
      )
    })
  })

  describe('hasSeenTutos', () => {
    it('should call api', () => {
      // when
      setHasSeenTutos()

      // then
      expect(client.patch).toHaveBeenCalledWith('/users/tuto-seen')
    })
  })

  describe('update profile informations', () => {
    it('should call api patch with user informations', () => {
      // when
      const body = {
        firstName: 'Example',
        lastName: 'User',
        email: 'example.user@example.com',
        phoneNumber: '0606060606',
      }

      updateUserInformations(body)

      // then
      expect(client.patch).toHaveBeenCalledWith('/users/current', body)
    })
  })

  describe('getFilteredBookingsCSV', () => {
    const returnedResponse = "i'm a text response"

    beforeEach(() => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockResolvedValue' does not exist on typ... Remove this comment to see the full error message
      client.getPlainText.mockResolvedValue(returnedResponse)
    })

    it('should return api response', async () => {
      // When
      const response = await getFilteredBookingsCSV({})

      // Then
      expect(response).toBe(returnedResponse)
    })

    it('should call bookings csv route with "page=1" and default period when no other filters are provided', async () => {
      // Given
      const filters = {
        page: 1,
      }

      // When
      await getFilteredBookingsCSV(filters)

      // Then
      expect(client.getPlainText).toHaveBeenCalledWith(
        '/bookings/csv?page=1&bookingPeriodBeginningDate=2020-08-13&bookingPeriodEndingDate=2020-09-12&bookingStatusFilter=booked'
      )
    })

    it('should call offers route with filters when provided', async () => {
      // Given
      const filters = {
        venueId: 'AA',
        eventDate: new Date(2020, 8, 13),
        page: 2,
        bookingPeriodBeginningDate: new Date(2020, 6, 8),
        bookingPeriodEndingDate: new Date(2020, 8, 4),
        bookingStatusFilter: 'validated',
      }

      // When
      await getFilteredBookingsCSV(filters)

      // Then
      expect(client.getPlainText).toHaveBeenCalledWith(
        '/bookings/csv?page=2&venueId=AA&eventDate=2020-09-13&bookingPeriodBeginningDate=2020-07-08&bookingPeriodEndingDate=2020-09-04&bookingStatusFilter=validated'
      )
    })
  })
})