import jsPDF from 'jspdf'

export const generatePDF = async (formData, totalScore) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      // Page dimensions
      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()
      const margin = 12
      
      // Draw outer border (blue)
      doc.setLineWidth(0.8)
      doc.setDrawColor(42, 90, 160)
      doc.rect(margin - 2, margin - 2, pageWidth - 2 * (margin - 2), pageHeight - 2 * (margin - 2), 'S')
      
      // Draw inner border
      doc.setLineWidth(0.3)
      doc.setDrawColor(42, 90, 160)
      doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin, 'S')

      let yPos = margin + 10

      // === HEADER SECTION ===
      
      // Top small text (Shubhamulu / Telugu / Kalyanamulu)
      doc.setFontSize(9)
      doc.setTextColor(200, 50, 50)
      doc.text('Shubhamulu', 30, yPos)
      doc.setTextColor(42, 90, 160)
      doc.text('Sri Tirumalai Ramarao', pageWidth / 2, yPos, { align: 'center' })
      doc.setTextColor(200, 50, 50)
      doc.text('Kalyanamulu', pageWidth - 40, yPos)
      
      yPos += 8

      // Main title
      doc.setFontSize(18)
      doc.setTextColor(196, 30, 58)
      doc.setFont('helvetica', 'bold')
      doc.text('Vadhu - Vara', pageWidth / 2, yPos, { align: 'center' })
      
      yPos += 7
      doc.setFontSize(14)
      doc.setTextColor(196, 30, 58)
      doc.text('Gunamelana Jathaka Panthathina Vivaramu', pageWidth / 2, yPos, { align: 'center' })
      
      yPos += 8

      // === BRIDE AND GROOM NAMES ===
      
      doc.setFontSize(11)
      doc.setTextColor(0, 0, 0)
      doc.setFont('helvetica', 'normal')
      
      const leftX = margin + 15
      const rightX = pageWidth - margin - 60
      
      // Ammaayi (Bride) label
      doc.setFont('helvetica', 'bold')
      doc.text('Ammaayi:', leftX, yPos)
      doc.setFont('helvetica', 'normal')
      doc.text(`${formData.brideName}`, leftX + 20, yPos)
      
      // Abbaayi (Groom) label  
      doc.setFont('helvetica', 'bold')
      doc.text('Abbaayi:', rightX, yPos)
      doc.setFont('helvetica', 'normal')
      doc.text(`${formData.groomName}`, rightX + 20, yPos)
      
      yPos += 6

      // Bride father name
      doc.setFontSize(9)
      doc.text(`${formData.brideFatherName || 'Tandri peru'}`, leftX, yPos)
      
      // Groom father name
      doc.text(`${formData.groomFatherName || 'Tandri peru'}`, rightX, yPos)
      
      yPos += 8

      // === BIRTH DETAILS ===
      
      doc.setFontSize(10)
      
      // Bride details
      doc.setFont('helvetica', 'bold')
      doc.text('Ammaayi Nakshatram Raasi Paadamulu:', leftX, yPos)
      yPos += 5
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.text(`${formData.brideNakshatra || ''}`, leftX + 5, yPos)
      
      yPos += 6
      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')
      // Reset yPos for groom side
      const tempY = yPos - 11
      doc.text('Abbaayi Nakshatram Raasi Paadamulu:', rightX, tempY)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.text(`${formData.groomNakshatra || ''}`, rightX + 5, tempY + 5)
      
      yPos += 2

      // Birth dates and times
      doc.setFontSize(9)
      doc.text(`Janma: ${formData.brideDate || ''} - ${formData.brideTime || ''}`, leftX, yPos)
      doc.text(`Janma: ${formData.groomDate || ''} - ${formData.groomTime || ''}`, rightX, yPos)
      
      yPos += 10

      // Divider line
      doc.setDrawColor(42, 90, 160)
      doc.setLineWidth(0.3)
      doc.line(margin + 5, yPos, pageWidth - margin - 5, yPos)
      yPos += 8

      // === MATCHING PARAMETERS TABLE ===
      
      doc.setFontSize(11)
      doc.setTextColor(0, 0, 0)
      doc.setFont('helvetica', 'bold')
      doc.text('Iruvarila Parakutamulu', margin + 15, yPos)
      doc.text('Ganamulu', pageWidth / 2 + 20, yPos)
      
      yPos += 7

      // Left column - Kootas
      const kootaX = margin + 15
      const maxScoreX = kootaX + 45
      const scoreX = kootaX + 55
      
      // Right column - Other parameters
      const param2X = pageWidth / 2 + 20
      const value2X = param2X + 45
      
      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')

      // Varna Koota
      doc.text('Varnakutamulu', kootaX, yPos)
      doc.text(`- ${formData.varna.max || 1}/${formData.varna.obtained || ''}`, maxScoreX, yPos)
      doc.setTextColor(formData.varnaStatus === 'ఉన్నది' ? 0 : 255, formData.varnaStatus === 'ఉన్నది' ? 128 : 0, 0)
      doc.text(formData.varnaStatus === 'ఉన్నది' ? '✓' : '✗', scoreX, yPos)
      doc.setTextColor(0, 0, 0)
      
      // Sreevarmalu
      doc.text('Sreevarmalu', param2X, yPos)
      doc.text(`- ${formData.sreevarmalu || '27/11'}`, value2X, yPos)
      yPos += 6

      // Vashya Koota
      doc.text('Vashyakutamulu', kootaX, yPos)
      doc.text(`- ${formData.vashya.max || 2}/${formData.vashya.obtained || ''}`, maxScoreX, yPos)
      doc.setTextColor(formData.vashyaStatus === 'ఉన్నది' ? 0 : 255, formData.vashyaStatus === 'ఉన్నది' ? 128 : 0, 0)
      doc.text(formData.vashyaStatus === 'ఉన్నది' ? '✓' : '✗', scoreX, yPos)
      doc.setTextColor(0, 0, 0)
      
      // Rasi Maitri
      doc.text('Raasimaitri', param2X, yPos)
      doc.text(`- ${formData.rasimaitri || 'Unnadi/Ledu'}`, value2X, yPos)
      yPos += 6

      // Tara Koota
      doc.text('Tarakutamulu', kootaX, yPos)
      doc.text(`- ${formData.tara.max || 3}/${formData.tara.obtained || ''}`, maxScoreX, yPos)
      doc.setTextColor(formData.taraStatus === 'ఉన్నది' ? 0 : 255, formData.taraStatus === 'ఉన్నది' ? 128 : 0, 0)
      doc.text(formData.taraStatus === 'ఉన్నది' ? '✓' : '✗', scoreX, yPos)
      doc.setTextColor(0, 0, 0)
      
      // Graha Maitri
      doc.text('Grahamaitri', param2X, yPos)
      doc.text(`- ${formData.chandraNavamsha || 'Unnadi/Ledu'}`, value2X, yPos)
      yPos += 6

      // Yoni Koota
      doc.text('Yonikutamulu', kootaX, yPos)
      doc.text(`- ${formData.yoni.max || 4}/${formData.yoni.obtained || ''}`, maxScoreX, yPos)
      doc.setTextColor(formData.yoniStatus === 'ఉన్నది' ? 0 : 255, formData.yoniStatus === 'ఉన్నది' ? 128 : 0, 0)
      doc.text(formData.yoniStatus === 'ఉన్నది' ? '✓' : '✗', scoreX, yPos)
      doc.setTextColor(0, 0, 0)
      
      // Janma Lagna Maitri
      doc.text('Janmalagnnamaitri', param2X, yPos)
      doc.text(`- ${formData.papashatra || 'Unnadi/Ledu'}`, value2X, yPos)
      yPos += 6

      // Graha Maitri
      doc.text('Grahamaitri', kootaX, yPos)
      doc.text(`- ${formData.graha.max || 5}/${formData.graha.obtained || ''}`, maxScoreX, yPos)
      doc.setTextColor(formData.grahaStatus === 'ఉన్నది' ? 0 : 255, formData.grahaStatus === 'ఉన్నది' ? 128 : 0, 0)
      doc.text(formData.grahaStatus === 'ఉన్నది' ? '✓' : '✗', scoreX, yPos)
      doc.setTextColor(0, 0, 0)
      
      // Jantuveramu
      doc.text('Jantuveram', param2X, yPos)
      doc.text(`- ${formData.vedhaChakra || 'Anukulam/Kavadu'}`, value2X, yPos)
      yPos += 6

      // Gana Koota
      doc.text('Ganakutamulu', kootaX, yPos)
      doc.text(`- ${formData.gana.max || 6}/${formData.gana.obtained || ''}`, maxScoreX, yPos)
      doc.setTextColor(formData.ganaStatus === 'ఉన్నది' ? 0 : 255, formData.ganaStatus === 'ఉన్నది' ? 128 : 0, 0)
      doc.text(formData.ganaStatus === 'ఉన్నది' ? '✓' : '✗', scoreX, yPos)
      doc.setTextColor(0, 0, 0)
      
      // Tharabalamu
      doc.text('Tharabalamu', param2X, yPos)
      doc.text(`- ${formData.tharabalamu || 'Unnadi/Ledu'}`, value2X, yPos)
      yPos += 6

      // Rashi Koota
      doc.text('Rashikutamulu', kootaX, yPos)
      doc.text(`- ${formData.rashi.max || 7}/${formData.rashi.obtained || ''}`, maxScoreX, yPos)
      doc.setTextColor(formData.rashiStatus === 'ఉన్నది' ? 0 : 255, formData.rashiStatus === 'ఉన్నది' ? 128 : 0, 0)
      doc.text(formData.rashiStatus === 'ఉన్నది' ? '✓' : '✗', scoreX, yPos)
      doc.setTextColor(0, 0, 0)
      
      // Raashyabhinayetulu
      doc.text('Raashyabhinayetulu', param2X, yPos)
      doc.text(`- ${formData.rashnabhinayetulu || 'Chenukovachhu'}`, value2X, yPos)
      yPos += 6

      // Nadi Koota
      doc.text('Nadikutamulu', kootaX, yPos)
      doc.text(`- ${formData.nadi.max || 8}/${formData.nadi.obtained || ''}`, maxScoreX, yPos)
      doc.setTextColor(formData.nadiStatus === 'ఉన్నది' ? 0 : 255, formData.nadiStatus === 'ఉన్నది' ? 128 : 0, 0)
      doc.text(formData.nadiStatus === 'ఉన్నది' ? '✓' : '✗', scoreX, yPos)
      doc.setTextColor(0, 0, 0)
      yPos += 6

      // === TOTAL SCORE SECTION ===
      
      doc.setLineWidth(1)
      doc.setDrawColor(0, 0, 0)
      doc.line(kootaX, yPos, scoreX + 5, yPos)
      yPos += 6
      
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.text('36/', kootaX + 20, yPos)
      doc.setFontSize(14)
      doc.text(`${totalScore}`, kootaX + 32, yPos)
      
      yPos += 2

      // Ganamulu total
      doc.setFontSize(10)
      doc.text(`Marusulu - ${formData.ganamulu || '100/120'}`, param2X, yPos - 8)
      yPos += 6

      // === DOSHAM SECTION ===
      
      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')
      doc.text(`Kuladoshamu Ammayiki`, kootaX, yPos)
      doc.text(`- ${formData.kuladoshamBride || 'Unnadi/Ledu'}`, maxScoreX, yPos)
      yPos += 5
      
      doc.text(`Kuladoshamu Abbayiki`, kootaX, yPos)
      doc.text(`- ${formData.kuladoshamGroom || 'Unnadi/Ledu'}`, maxScoreX, yPos)
      yPos += 8

      // === REMARKS SECTION ===
      
      if (formData.remarks) {
        doc.setFontSize(8)
        doc.setFont('helvetica', 'italic')
        const remarksLines = doc.splitTextToSize(formData.remarks, pageWidth - 2 * margin - 10)
        remarksLines.forEach(line => {
          doc.text(line, margin + 15, yPos)
          yPos += 4
        })
        yPos += 5
      }

      // === FOOTER SECTION ===
      
      yPos = pageHeight - margin - 25

      // Red border box for message
      doc.setDrawColor(196, 30, 58)
      doc.setLineWidth(0.5)
      doc.roundedRect(margin + 10, yPos - 5, pageWidth - 2 * margin - 20, 12, 2, 2, 'S')
      
      yPos += 2
      doc.setFontSize(9)
      doc.setTextColor(196, 30, 58)
      doc.setFont('helvetica', 'bold')
      const message = 'Mitrulaku Panicheralu ivvani thaarani ivvandi.'
      doc.text(message, pageWidth / 2, yPos, { align: 'center' })
      yPos += 4
      doc.setFontSize(8)
      const message2 = 'Inka meeku vivahadosh prasna unnanu cheyandi.'
      doc.text(message2, pageWidth / 2, yPos, { align: 'center' })
      
      yPos += 10

      // Contact details
      doc.setFontSize(10)
      doc.setTextColor(42, 90, 160)
      doc.setFont('helvetica', 'bold')
      doc.text('TNR Lagnam Padhavipeduru Nivedana Navveena Vaaru', pageWidth / 2, yPos, { align: 'center' })
      
      yPos += 5
      doc.setFontSize(9)
      doc.setTextColor(0, 0, 0)
      doc.text('Seemalu & Sri Kommudru Nagaraaju Sresht S/o. Venapalakayya', pageWidth / 2, yPos, { align: 'center' })
      
      yPos += 5
      doc.setFontSize(11)
      doc.setTextColor(0, 150, 0)
      doc.setFont('helvetica', 'bold')
      doc.text('WhatsApp: 9440 990 134,', pageWidth / 2 - 20, yPos, { align: 'center' })
      doc.setTextColor(196, 30, 58)
      doc.text('📱 9299 993 516', pageWidth / 2 + 25, yPos, { align: 'center' })

      // Generate blob
      const pdfBlob = doc.output('blob')
      resolve(pdfBlob)
      
    } catch (error) {
      reject(error)
    }
  })
}
