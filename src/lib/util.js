

/**
 *
 * @param {Blob} file
 * @param {Function} callback
 */
export const convertBlobToBase64 = (file, callback) => {
  const handleError = (error) => {
    console.log('[lib/util] convertBlobToBase64 error', error)
    callback('')
  }

  try {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      const base64data = reader.result
      callback(base64data)
    }
    reader.onerror = (error) => {
      handleError(error)
    }
  } catch (error) {
    handleError(error)
  }
}

export const convertBlobToBase64Promise = async (res) => {
  return new Promise((resolve, reject) => {
    convertBlobToBase64(res, (base64) => {
      resolve(base64)
    })
  })
}

/**
 * 延遲 x 秒
 * @param {number} time 秒
 */
export const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time * 1000)
  })
}
