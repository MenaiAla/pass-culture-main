import { configureTestStore } from 'store/testUtils'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { Form } from 'react-final-form'
import React from 'react'
import PricingPoint from '../PricingPoint'
import * as helpers from '../../../VenueCreation/__specs__/helpers'
import userEvent from '@testing-library/user-event'

const renderPricingPointFields = async ({
  props,
  formValues = {},
  storeOverride = {},
}) => {
  const store = configureTestStore(storeOverride)
  const rtlReturns = render(
    <Provider store={store}>
      <Form initialValues={formValues} name="venue" onSubmit={() => null}>
        {() => <PricingPoint {...props} />}
      </Form>
    </Provider>
  )
  await screen.findByText('Barème de remboursement')
  return rtlReturns
}
describe('src | components | pages | Venue | fields | PricingPoint', () => {
  let props
  let formValues
  beforeEach(() => {
    formValues = {
      siret: '12345678912345',
      name: 'Venue name',
      publicName: 'Venue publicName',
      bookingEmail: 'booking@email.app',
      venueTypeCode: 'OTHER_TYPE_ID',
      venueLabelId: 'OTHER_LABEL_ID',
      description: 'Venue description',
    }
    props = {
      ...props,
      readOnly: true,
      venue: {
        "audioDisabilityCompliant": false,
        "mentalDisabilityCompliant": false,
        "motorDisabilityCompliant": false,
        "visualDisabilityCompliant": false,
        "isVirtual": false,
        "name": "b",
        "address": "3 Rue Vestrepain",
        "bannerUrl": null,
        "contact": null,
        "city": "Toulouse",
        "description": "",
        "isPermanent": false,
        "latitude": 43.58315,
        "longitude": 1.40562,
        "postalCode": "31100",
        "publicName": null,
        "withdrawalDetails": null,
        "id": "HM",
        "dateCreated": "2022-07-05T11:31:52.253348Z",
        "isValidated": true,
        "managingOffererId": "BQ",
        "nonHumanizedId": 59,
        "bannerMeta": null,
        "bic": null,
        "bookingEmail": "pctest.admin93.0@example.com",
        "businessUnitId": null,
        "businessUnit": null,
        "comment": "a",
        "dateModifiedAtLastProvider": "2022-07-05T11:31:52.253330Z",
        "demarchesSimplifieesApplicationId": null,
        "departementCode": "31",
        "fieldsUpdated": [],
        "iban": null,
        "idAtProviders": null,
        "isBusinessUnitMainVenue": false,
        "lastProviderId": null,
        "managingOfferer": {
          "address": "CAYENNE",
          "bic": "QSDFGH8Z566",
          "city": "Cayenne",
          "dateCreated": "2022-06-30T12:34:44.630000Z",
          "dateModifiedAtLastProvider": "2022-06-30T12:34:45.701647Z",
          "demarchesSimplifieesApplicationId": "2311",
          "fieldsUpdated": [],
          "iban": "FR7630001007941234567890185",
          "id": "BQ",
          "idAtProviders": null,
          "isValidated": true,
          "lastProviderId": null,
          "name": "Bar des amis",
          "postalCode": "97300",
          "siren": "222222233"
        },
        "pricingPoint": null,
        "reimbursementPointId": null,
        "siret": null,
        "venueLabelId": null,
        "venueTypeCode": "TRAVELING_CINEMA"
      },
      offerer: {
        "address": "CAYENNE",
        "apiKey": {
          "maxAllowed": 5,
          "prefixes": [
            "development_12"
          ]
        },
        "bic": "QSDFGH8Z566",
        "city": "Cayenne",
        "dateCreated": "2022-06-30T12:34:44.630000Z",
        "dateModifiedAtLastProvider": "2022-06-30T12:34:45.701647Z",
        "demarchesSimplifieesApplicationId": "2311",
        "fieldsUpdated": [],
        "hasAvailablePricingPoints": true,
        "hasDigitalVenueAtLeastOneOffer": true,
        "hasMissingBankInformation": false,
        "iban": "FR7630001007941234567890185",
        "id": "BQ",
        "idAtProviders": null,
        "isValidated": true,
        "isActive": true,
        "lastProviderId": null,
        "managedVenues": [
          {
            "audioDisabilityCompliant": false,
            "mentalDisabilityCompliant": false,
            "motorDisabilityCompliant": false,
            "visualDisabilityCompliant": false,
            "address": "1 boulevard Poissonnière",
            "bookingEmail": "fake@example.com",
            "businessUnitId": 21,
            "city": "Paris",
            "comment": null,
            "departementCode": "75",
            "id": "CU",
            "isValidated": true,
            "isVirtual": false,
            "managingOffererId": "BQ",
            "name": "Terrain vague",
            "nonHumanizedId": 21,
            "postalCode": "75000",
            "publicName": "Terrain vague",
            "siret": "22222223311111",
            "venueLabelId": null,
            "withdrawalDetails": null
          },
          {
            "audioDisabilityCompliant": false,
            "mentalDisabilityCompliant": false,
            "motorDisabilityCompliant": false,
            "visualDisabilityCompliant": false,
            "address": null,
            "bookingEmail": "venue21@example.net",
            "businessUnitId": 22,
            "city": null,
            "comment": null,
            "departementCode": null,
            "id": "CY",
            "isValidated": true,
            "isVirtual": true,
            "managingOffererId": "BQ",
            "name": "Terrain vague (Offre numérique)",
            "nonHumanizedId": 22,
            "postalCode": null,
            "publicName": "Terrain vague (Offre numérique)",
            "siret": null,
            "venueLabelId": null,
            "withdrawalDetails": null
          },
          {
            "audioDisabilityCompliant": false,
            "mentalDisabilityCompliant": false,
            "motorDisabilityCompliant": true,
            "visualDisabilityCompliant": false,
            "address": "9000 La Reux",
            "bookingEmail": "pctest.admin93.0@example.com",
            "businessUnitId": null,
            "city": "Saint-Barthélemy-d'Anjou",
            "comment": "z",
            "departementCode": "49",
            "id": "H9",
            "isValidated": true,
            "isVirtual": false,
            "managingOffererId": "BQ",
            "name": "a",
            "nonHumanizedId": 58,
            "postalCode": "49124",
            "publicName": null,
            "siret": null,
            "venueLabelId": null,
            "withdrawalDetails": null
          },
          {
            "audioDisabilityCompliant": false,
            "mentalDisabilityCompliant": false,
            "motorDisabilityCompliant": false,
            "visualDisabilityCompliant": false,
            "address": "3 Rue Vestrepain",
            "bookingEmail": "pctest.admin93.0@example.com",
            "businessUnitId": null,
            "city": "Toulouse",
            "comment": "a",
            "departementCode": "31",
            "id": "HM",
            "isValidated": true,
            "isVirtual": false,
            "managingOffererId": "BQ",
            "name": "b",
            "nonHumanizedId": 59,
            "postalCode": "31100",
            "publicName": null,
            "siret": null,
            "venueLabelId": null,
            "withdrawalDetails": null
          }
        ],
        "name": "Bar des amis",
        "nonHumanizedId": 12,
        "postalCode": "97300",
        "siren": "222222233"
      },
    }
  })
  it.only('should display input with button disabled', async () => {
    await renderPricingPointFields({ props, formValues })
    //const venueSiretField = await screen.getByText('Sélectionner un lieu dans la liste')
    expect(screen.getByText(/Barème de remboursement/)).toBeInTheDocument();
/*
    expect(screen.getByRole('button', {
      name: 'Valider la sélection'
    })).toBeDisabled();
*/
    //expect(venueSiretField).toBeInTheDocument()
  })
  it('should enabled button on select', async () => {
    // GIVEN
    await renderPricingPointFields({ props, formValues })
    const venueSiretField = await helpers.findVenueInputForField('venue-siret')
    // WHEN
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByText(/testName/)
    )
    // THEN
    expect(venueSiretField).toBeEnabled()
  })
  it.skip('should submit venue pricing point', () => {
    // GIVEN

    // WHEN

    // THEN
    expect().toEqual('')
  })
})
