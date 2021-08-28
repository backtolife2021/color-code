import createApp from './app'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
GM.registerMenuCommand('Setting', () => {
  createApp().show()
})
