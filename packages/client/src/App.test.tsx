import { render } from '@testing-library/react'

import App from './App'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Document has title', async () => {
  render(<App />)
  expect(document.head.title).toBeDefined()
})
