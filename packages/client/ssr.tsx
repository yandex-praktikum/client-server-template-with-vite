import { renderToString } from 'react-dom/server'
import StaticApp from './src/StaticApp'

export function render() {
  renderToString(<StaticApp />)
}
