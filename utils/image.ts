export async function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export async function downscaleIfNeeded(file: File, maxEdge = 1920): Promise<string> {
  const dataUrl = await fileToDataURL(file)
  const img = new Image()
  img.src = dataUrl
  await img.decode()
  const { width, height } = img

  const needsResize = Math.max(width, height) > maxEdge
  if (!needsResize) return dataUrl

  const ratio = width > height ? maxEdge / width : maxEdge / height
  const newW = Math.round(width * ratio)
  const newH = Math.round(height * ratio)

  const canvas = document.createElement('canvas')
  canvas.width = newW
  canvas.height = newH
  const ctx = canvas.getContext('2d')
  if (!ctx) return dataUrl

  ctx.drawImage(img, 0, 0, newW, newH)
  return canvas.toDataURL('image/jpeg', 0.9)
}
