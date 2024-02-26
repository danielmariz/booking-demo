import { DATE_FORMAT } from "@utils/constants"
import dayjs from "dayjs"
// import { useBookingsStore } from "@utils/store"
import { DateRangeProps } from "@components/Booking"

const startDate = dayjs() as DateRangeProps
const endDate = dayjs().add(1, 'day') as DateRangeProps
const guests = 2
const description = 'text should be saved'
const formatedStartDate = startDate.format(DATE_FORMAT)
const formatedEndDate = endDate.format(DATE_FORMAT)

const addBooking = () => {
  cy.get('#\\:r1\\:').type(formatedStartDate)
  cy.get('#\\:r3\\:').type(formatedEndDate)
  cy.get('#guests').type('{selectall}', {force: true}).type(guests.toString(), {force: true})
  cy.get('[data-testid="booking-description"]').type(description, {force: true})
  cy.get('#booking-submit').click({ force: true});
}

describe('Booking Demo', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })
  
  it('should have an empty bookings list with proper message', () => {
    
    cy.get('[data-testid="bookings-list"]').should('not.exist')

    cy.get('[data-testid="bookings-empty-message"]')
      .should('exist')
      .should('have.text', 'No bookings yet, try creating one!')
  })
  
  
  describe('Manipulating bookings', () => {
    beforeEach(() => {
      //TODO: Should set the state, needs investigation
      /*useBookingsStore.setState({
        bookins: [{
          id: '123',
          startDate: startDate.$d,
          endDate: endDate.$d,
          guests,
          description
        }]
      })*/
      //FIXME: workaround 
      addBooking()
    })
    
    afterEach(() => {
      //TODO: should reset state
      // useBookingsStore.setState(useBookingsStore.getInitialState())
    })
    
    it('should create a booking', () => {
      //check ui
      cy.get('[data-testid="form-title"]').should('have.text', 'Create a booking')
      cy.get('#booking-submit').should('have.text', 'Request booking')
      cy.get('#booking-reset').should('not.exist')
      cy.get('[data-testid="booking-details-0"]')
        .should('be.visible')
        .should('have.text', `Guests ${guests} - Dates: ${formatedStartDate} - ${formatedEndDate}${description}`);
    })

    it('should remove a booking', () => {
      cy.get('[data-testid="booking-details-0"]')
      .should('exist')
      .within(() => {
        cy.get('[aria-label="delete"]')
          .should('exist')
          .click({force: true})
      })
      .should('not.exist')
    })
    
    it.only('should update a booking', () => {
      cy.get('[data-testid="booking-details-0"]')
      .should('exist')
      .within(() => {
        cy.get('[aria-label="edit"]')
          .should('exist')
          .click({force: true})
      })

      //check ui
      cy.get('[data-testid="form-title"]').should('have.text', 'Update booking')
      cy.get('#booking-submit').should('have.text', 'Update booking')
      cy.get('#booking-reset').should('exist')

      //change data
      const newGuests = 5
      const newDescription = 'Should update booking description'
      
      cy.get('#guests').type('{selectall}', {force: true}).type(newGuests.toString(), {force: true})
      cy.get('[data-testid="booking-description"]').type('{selectall}', {force: true}).type(newDescription, {force: true})
      cy.get('#booking-submit').click({ force: true});

      cy.get('[data-testid="booking-details-0"]')
        .should('be.visible')
        .should('have.text', `Guests ${newGuests} - Dates: ${formatedStartDate} - ${formatedEndDate}${newDescription}`);
      
    })
  })
    
})