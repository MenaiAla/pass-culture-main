import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { MemoryRouter, Route } from 'react-router'
import { Link } from 'react-router-dom'

import * as useAnalytics from 'hooks/useAnalytics'
import useLogPageView from 'hooks/useLogPageView'

const mockLogEvent = jest.fn()

const LogPageView = (): null => {
  useLogPageView()
  return null
}

describe('useLogPageViewAndSetTitle', () => {
  beforeEach(() => {
    jest.spyOn(useAnalytics, 'default').mockImplementation(() => ({
      logEvent: mockLogEvent,
      setLogEvent: null,
    }))

    render(
      <MemoryRouter initialEntries={['/accueil']}>
        <LogPageView />
        <Route path="/accueil">
          <span>Main page</span>
          <Link to="/structures">Structures</Link>
        </Route>
        <Route path="/structures">
          <span>Structure page</span>
        </Route>
      </MemoryRouter>
    )
  })
  it('should log a page event when the user navigates to a new page', async () => {
    const button = screen.getByRole('link', { name: 'Structures' })
    await userEvent.click(button)
    expect(mockLogEvent).toHaveBeenCalledTimes(2)

    expect(mockLogEvent).toHaveBeenNthCalledWith(1, 'page_view', {
      from: '/accueil',
    })
    expect(mockLogEvent).toHaveBeenNthCalledWith(2, 'page_view', {
      from: '/structures',
    })
  })
})
