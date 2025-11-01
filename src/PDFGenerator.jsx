import jsPDF from 'jspdf'

export const generatePDF = async (formData, totalScore) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      // Set default font
      doc.setFont('helvetica')
      
      // Page dimensions
      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()
      const margin = 15
      
      // Draw border
      doc.setLineWidth(0.5)
      doc.setDrawColor(42, 90, 160)
      doc.rect(margin - 5, margin - 5, pageWidth - 2 * (margin - 5), pageHeight - 2 * (margin - 5), 'S')
      
      doc.setLineWidth(0.3)
      doc.rect(margin - 3, margin - 3, pageWidth - 2 * (margin - 3), pageHeight - 2 * (margin - 3), 'S')

      let yPos = margin + 5

      // Header
      doc.setFontSize(16)
      doc.setTextColor(196, 30, 58)
      doc.text('Sri Ganesaya Namah', pageWidth / 2, yPos, { align: 'center' })
      
      yPos += 8
      doc.setFontSize(14)
      doc.setTextColor(42, 90, 160)
      doc.text('Vadhu - Vara', pageWidth / 2, yPos, { align: 'center' })
      
      yPos += 7
      doc.setFontSize(13)
      doc.text('Gunamelana Jathaka Panthathina Vivaramu', pageWidth / 2, yPos, { align: 'center' })
      
      yPos += 6
      doc.setFontSize(10)
      doc.text('Paddha - Para', pageWidth / 2, yPos, { align: 'center' })
      
      yPos += 10
      doc.setDrawColor(42, 90, 160)
      doc.line(margin, yPos, pageWidth - margin, yPos)
      yPos += 8

      // Bride Details
      doc.setFontSize(11)
      doc.setTextColor(42, 90, 160)
      doc.setFont('helvetica', 'bold')
      doc.text('Ammaayi Vivarulu (Bride Details):', margin, yPos)
      
      yPos += 6
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(0, 0, 0)
      
      doc.text(`Penu: ${formData.brideName}`, margin + 5, yPos)
      doc.text(`Tandri: ${formData.brideFatherName}`, margin + 80, yPos)
      
      yPos += 6
      doc.text(`Nakshatram: ${formData.brideNakshatra}`, margin + 5, yPos)
      doc.text(`Tedhi: ${formData.brideDate}`, margin + 80, yPos)
      doc.text(`Samayam: ${formData.brideTime}`, margin + 130, yPos)
      
      yPos += 8

      // Groom Details
      doc.setFontSize(11)
      doc.setTextColor(42, 90, 160)
      doc.setFont('helvetica', 'bold')
      doc.text('Abbaayi Vivarulu (Groom Details):', margin, yPos)
      
      yPos += 6
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(0, 0, 0)
      
      doc.text(`Penu: ${formData.groomName}`, margin + 5, yPos)
      doc.text(`Tandri: ${formData.groomFatherName}`, margin + 80, yPos)
      
      yPos += 6
      doc.text(`Nakshatram: ${formData.groomNakshatra}`, margin + 5, yPos)
      doc.text(`Tedhi: ${formData.groomDate}`, margin + 80, yPos)
      doc.text(`Samayam: ${formData.groomTime}`, margin + 130, yPos)
      
      yPos += 10
      doc.setDrawColor(42, 90, 160)
      doc.line(margin, yPos, pageWidth - margin, yPos)
      yPos += 8

      // Matching Parameters
      doc.setFontSize(11)
      doc.setTextColor(42, 90, 160)
      doc.setFont('helvetica', 'bold')
      doc.text('Gunamelana Parakutamulu (Matching Parameters):', margin, yPos)
      
      yPos += 8
      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(0, 0, 0)

      // Table-like layout for matching parameters
      const matchingParams = [
        { name: 'Varnakutamulu', max: 1, obtained: formData.varna.obtained, status: formData.varnaStatus },
        { name: 'Vashyakutamulu', max: 2, obtained: formData.vashya.obtained, status: formData.vashyaStatus },
        { name: 'Tarakutamulu', max: 3, obtained: formData.tara.obtained, status: formData.taraStatus },
        { name: 'Yonikutamulu', max: 4, obtained: formData.yoni.obtained, status: formData.yoniStatus },
        { name: 'Grahamaitri', max: 5, obtained: formData.graha.obtained, status: formData.grahaStatus },
        { name: 'Ganakutamulu', max: 6, obtained: formData.gana.obtained, status: formData.ganaStatus },
        { name: 'Rashikutamulu', max: 7, obtained: formData.rashi.obtained, status: formData.rashiStatus },
        { name: 'Nadikutamulu', max: 8, obtained: formData.nadi.obtained, status: formData.nadiStatus }
      ]

      matchingParams.forEach((param, index) => {
        const row = Math.floor(index / 2)
        const col = index % 2
        const xPos = margin + 5 + (col * 90)
        const currentY = yPos + (row * 6)
        
        doc.text(`${param.name}`, xPos, currentY)
        doc.text(`- ${param.max}/${param.obtained || '0'}`, xPos + 45, currentY)
        
        if (param.status === 'ఉన్నది' || param.status.includes('unnadi')) {
          doc.setTextColor(0, 128, 0)
          doc.text('✓', xPos + 65, currentY)
        } else {
          doc.setTextColor(255, 0, 0)
          doc.text('✗', xPos + 65, currentY)
        }
        doc.setTextColor(0, 0, 0)
      })

      yPos += 30

      // Total Score
      doc.setFillColor(103, 126, 234)
      doc.rect(margin, yPos - 5, pageWidth - 2 * margin, 10, 'F')
      doc.setFontSize(12)
      doc.setTextColor(255, 255, 255)
      doc.setFont('helvetica', 'bold')
      doc.text(`Motham Gunamulu: ${totalScore} / 36`, pageWidth / 2, yPos, { align: 'center' })
      
      yPos += 12
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(0, 0, 0)

      // Other Details
      doc.setFontSize(11)
      doc.setTextColor(42, 90, 160)
      doc.setFont('helvetica', 'bold')
      doc.text('Ithara Vivarulu (Other Details):', margin, yPos)
      
      yPos += 6
      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(0, 0, 0)

      if (formData.ganamulu) {
        doc.text(`Ganamulu: ${formData.ganamulu}`, margin + 5, yPos)
        yPos += 5
      }
      if (formData.sreevarmalu) {
        doc.text(`Sreevarmalu: ${formData.sreevarmalu}`, margin + 5, yPos)
        yPos += 5
      }
      if (formData.rasimaitri) {
        doc.text(`Rasimaitri: ${formData.rasimaitri}`, margin + 5, yPos)
        yPos += 5
      }
      if (formData.vedhaChakra) {
        doc.text(`Jantuveram: ${formData.vedhaChakra}`, margin + 5, yPos)
        yPos += 5
      }
      if (formData.tharabalamu) {
        doc.text(`Tharabalamu: ${formData.tharabalamu}`, margin + 5, yPos)
        yPos += 5
      }

      yPos += 3
      doc.text(`Kuladoshamu Ammayiki: ${formData.kuladoshamBride}`, margin + 5, yPos)
      yPos += 5
      doc.text(`Kuladoshamu Abbayiki: ${formData.kuladoshamGroom}`, margin + 5, yPos)
      
      if (formData.remarks) {
        yPos += 8
        doc.setFontSize(10)
        doc.setFont('helvetica', 'bold')
        doc.text('Gamanikalu (Remarks):', margin, yPos)
        yPos += 5
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(9)
        
        // Split remarks into lines
        const remarksLines = doc.splitTextToSize(formData.remarks, pageWidth - 2 * margin - 10)
        remarksLines.forEach(line => {
          doc.text(line, margin + 5, yPos)
          yPos += 5
        })
      }

      // Footer
      yPos = pageHeight - margin - 15
      doc.setDrawColor(42, 90, 160)
      doc.line(margin, yPos, pageWidth - margin, yPos)
      yPos += 6
      
      doc.setFontSize(8)
      doc.setTextColor(100, 100, 100)
      doc.text('Generated on: ' + new Date().toLocaleDateString('te-IN'), pageWidth / 2, yPos, { align: 'center' })
      yPos += 4
      doc.text('Jathaka Melana Vivaramu', pageWidth / 2, yPos, { align: 'center' })

      // Generate blob
      const pdfBlob = doc.output('blob')
      resolve(pdfBlob)
      
    } catch (error) {
      reject(error)
    }
  })
}

