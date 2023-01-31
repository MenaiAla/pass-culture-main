import { render } from '@testing-library/react'
import type { LocationDescriptor } from 'history'
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'

import { configureTestStore } from 'store/testUtils'

export const renderWithProviders = (
  component: ReactNode,
  overrides?: {
    storeOverrides?: any
    initialRouterEntries?: LocationDescriptor<unknown>[]
  }
) => {
  const store = configureTestStore(overrides?.storeOverrides)

  const { rerender, ...otherRenderResult } = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={overrides?.initialRouterEntries}>
        {component}
      </MemoryRouter>
    </Provider>
  )

  return {
    ...otherRenderResult,
    rerender: (newChildren: ReactNode) =>
      rerender(
        <Provider store={store}>
          <MemoryRouter initialEntries={overrides?.initialRouterEntries}>
            {newChildren}
          </MemoryRouter>
        </Provider>
      ),
  }
}
