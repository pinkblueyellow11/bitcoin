/**
 *
 * @param {string} link
 */
export const handleDynamicLink = (link) => {

}

/**
 *
 * @param {object} message
 */
export const handleBackgroundMessage = (message) => {
  console.log('[lib/firebase] Message handled in the background!', message)
  const { topic, timestamp } = message.data
  switch (topic) {
    default:
      break
  }
}
