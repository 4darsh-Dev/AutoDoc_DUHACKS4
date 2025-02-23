const pdfParse = require('pdf-parse')
const { createWorker } = require('tesseract.js')
const { createCanvas, Image } = require('canvas')
const fs = require('fs').promises

async function extractTextFromPdf(pdfPath) {
  try {
    console.log('Starting extractTextFromPdf')
    const dataBuffer = await fs.readFile(pdfPath)
    console.log('PDF file read successfully')

    const data = await pdfParse(dataBuffer)
    console.log('PDF parsed successfully')
    console.log('Number of pages:', data.numpages)
    console.log('PDF Version:', data.info.PDFFormatVersion)
    console.log('Is Encrypted:', data.info.IsEncrypted)
    console.log('Is AcroForm Present:', data.info.IsAcroFormPresent)
    console.log('Is XFA Present:', data.info.IsXFAPresent)

    // If the PDF has extractable text, return it
    if (data.text.trim().length > 0) {
      console.log('Extractable text found')
      console.log('Extracted text:', data.text.substring(0, 100) + '...') // Log first 100 characters
      return data.text
    }

    // If no extractable text, perform OCR
    console.log('No extractable text found. Performing OCR...')
    return await performOCR(dataBuffer)
  } catch (error) {
    console.error('Error in extractTextFromPdf:', error)
    throw error // Re-throw the error for the caller to handle
  }
}

async function performOCR(pdfBuffer) {
  console.log('Starting performOCR')
  const worker = await createWorker()
  console.log('Tesseract worker initialized')

  let fullText = ''

  try {
    // Use pdf-parse again to render pages
    await pdfParse(pdfBuffer, {
      max: 0, // 0 means parse all pages
      renderPage: async (pageData) => {
        console.log(`Processing page ${pageData.pageIndex + 1}`)
        const canvas = createCanvas(pageData.width, pageData.height)
        const ctx = canvas.getContext('2d')
        await pageData.render({
          canvasContext: ctx,
          viewport: pageData.getViewport({ scale: 1 })
        })
        console.log('Page rendered to canvas')

        const {
          data: { text }
        } = await worker.recognize(canvas.toBuffer())
        console.log(
          `OCR result for page ${pageData.pageIndex + 1}:`,
          text.substring(0, 50) + '...'
        ) // Log first 50 characters
        fullText += text + '\n\n'
      }
    })
  } catch (error) {
    console.error('Error in pdf-parse or OCR process:', error)
  } finally {
    await worker.terminate()
    console.log('Tesseract worker terminated')
  }

  if (fullText.trim().length === 0) {
    console.log('Warning: No text extracted from OCR process')
  } else {
    console.log('OCR completed. Total extracted text length:', fullText.length)
  }

  return fullText
}

module.exports = { extractTextFromPdf }
