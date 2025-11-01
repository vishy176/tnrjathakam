import jsPDF from 'jspdf'

// Language text mappings
const TEXT = {
  telugu: {
    title1: 'శుభములు',
    title2: 'శ్రీ తిరుమలై రామారావు',
    title3: 'కల్యాణములు',
    mainTitle: 'వధూ-వర',
    subtitle: 'గుణమేళన జాతక పంథతిన వివరము',
    bride: 'అమ్మాయి:',
    groom: 'అబ్బాయి:',
    brideDetails: 'అమ్మాయి నక్షత్రం రాశి పాదములు:',
    groomDetails: 'అబ్బాయి నక్షత్రం రాశి పాదములు:',
    janma: 'జన్మ:',
    matchingParams: 'ఇరువురిలా పరకుటములు',
    otherParams: 'గణములు',
    varna: 'వర్ణకూటములు',
    vashya: 'వశ్యకూటములు',
    tara: 'తారకూటములు',
    yoni: 'యోనికూటములు',
    graha: 'గ్రహమైత్రి',
    gana: 'గణకూటములు',
    rashi: 'రాశికూటములు',
    nadi: 'నాడికూటములు',
    sreevarmalu: 'శ్రీవర్మలు',
    rasimaitri: 'రాసిమైత్రి',
    grahamaitri: 'గ్రహమైత్రి',
    janmaLagna: 'జన్మలగ్నమైత్రి',
    jantuveram: 'జంతువేరము',
    tharabalamu: 'తారాబలము',
    rashyabhinayetulu: 'రాశ్యాభినయేతులు',
    marusulu: 'మరుసులు',
    kuladoshamBride: 'కులదోషము అమ్మాయికి',
    kuladoshamGroom: 'కులదోషము అబ్బాయికి',
    unnadi: 'ఉన్నది',
    ledu: 'లేదు',
    message1: 'మిత్రులకు పంచిచేరలు ఇవ్వని త్వరని ఇవ్వండి.',
    message2: 'ఇంక మీకు వివాహదోష ప్రశ్న ఉన్నను చేయండి.',
    footer1: 'TNR లగ్నం పధవిపెదురు నివేదన నవ్వీన వారు',
    footer2: 'సీమలు & శ్రీ కొమ్ముదురు నాగరాజు శ్రేష్ఠ S/o. వేనపలకయ్య',
  },
  english: {
    title1: 'Shubhamulu',
    title2: 'Sri Tirumalai Ramarao',
    title3: 'Kalyanamulu',
    mainTitle: 'Vadhu - Vara',
    subtitle: 'Gunamelana Jathaka Panthathina Vivaramu',
    bride: 'Bride:',
    groom: 'Groom:',
    brideDetails: 'Bride Nakshatra Rasi Paadamulu:',
    groomDetails: 'Groom Nakshatra Rasi Paadamulu:',
    janma: 'Janma:',
    matchingParams: 'Iruvurila Parakutamulu',
    otherParams: 'Ganamulu',
    varna: 'Varnakutamulu',
    vashya: 'Vashyakutamulu',
    tara: 'Tarakutamulu',
    yoni: 'Yonikutamulu',
    graha: 'Grahamaitri',
    gana: 'Ganakutamulu',
    rashi: 'Rashikutamulu',
    nadi: 'Nadikutamulu',
    sreevarmalu: 'Sreevarmalu',
    rasimaitri: 'Rasimaitri',
    grahamaitri: 'Grahamaitri',
    janmaLagna: 'Janmalagnnamaitri',
    jantuveram: 'Jantuveram',
    tharabalamu: 'Tharabalamu',
    rashyabhinayetulu: 'Rashyabhinayetulu',
    marusulu: 'Marusulu',
    kuladoshamBride: 'Kuladoshamu Ammayiki',
    kuladoshamGroom: 'Kuladoshamu Abbayiki',
    unnadi: 'Unnadi',
    ledu: 'Ledu',
    message1: 'Mitrulaku Panicheralu ivvani thaarani ivvandi.',
    message2: 'Inka meeku vivahadosh prasna unnanu cheyandi.',
    footer1: 'TNR Lagnam Padhavipeduru Nivedana Navveena Vaaru',
    footer2: 'Seemalu & Sri Kommudru Nagaraaju Sresht S/o. Venapalakayya',
  }
}

export const generatePDF = async (formData, totalScore, language = 'telugu') => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      // Select language
      const lang = language === 'english' ? TEXT.english : TEXT.telugu
      const isBoth = language === 'both'

      // Set font based on language
      if (language === 'telugu' || isBoth) {
        // For Telugu, we'll use Unicode-compatible font
        doc.setFont('helvetica')
      } else {
        doc.setFont('helvetica')
      }

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
      
      // Top small text
      doc.setFontSize(9)
      doc.setTextColor(200, 50, 50)
      doc.text(lang.title1, 30, yPos)
      doc.setTextColor(42, 90, 160)
      doc.text(lang.title2, pageWidth / 2, yPos, { align: 'center' })
      doc.setTextColor(200, 50, 50)
      doc.text(lang.title3, pageWidth - 40, yPos)
      
      yPos += 8

      // Main title
      doc.setFontSize(18)
      doc.setTextColor(196, 30, 58)
      doc.setFont('helvetica', 'bold')
      doc.text(lang.mainTitle, pageWidth / 2, yPos, { align: 'center' })
      
      // Add English subtitle if 'both' mode
      if (isBoth) {
        yPos += 6
        doc.setFontSize(16)
        doc.text(TEXT.english.mainTitle, pageWidth / 2, yPos, { align: 'center' })
      }
      
      yPos += 7
      doc.setFontSize(14)
      doc.setTextColor(196, 30, 58)
      doc.text(lang.subtitle, pageWidth / 2, yPos, { align: 'center' })
      
      if (isBoth) {
        yPos += 6
        doc.setFontSize(12)
        doc.text(TEXT.english.subtitle, pageWidth / 2, yPos, { align: 'center' })
      }
      
      yPos += 8

      // === BRIDE AND GROOM NAMES ===
      
      doc.setFontSize(11)
      doc.setTextColor(0, 0, 0)
      doc.setFont('helvetica', 'normal')
      
      const leftX = margin + 15
      const rightX = pageWidth - margin - 60
      
      // Bride label
      doc.setFont('helvetica', 'bold')
      doc.text(lang.bride, leftX, yPos)
      doc.setFont('helvetica', 'normal')
      doc.text(`${formData.brideName}`, leftX + (isBoth ? 25 : 20), yPos)
      
      // Groom label  
      doc.setFont('helvetica', 'bold')
      doc.text(lang.groom, rightX, yPos)
      doc.setFont('helvetica', 'normal')
      doc.text(`${formData.groomName}`, rightX + (isBoth ? 25 : 20), yPos)
      
      yPos += 6

      // Father names
      doc.setFontSize(9)
      doc.text(`${formData.brideFatherName || 'Tandri peru'}`, leftX, yPos)
      doc.text(`${formData.groomFatherName || 'Tandri peru'}`, rightX, yPos)
      
      yPos += 8

      // === BIRTH DETAILS ===
      
      doc.setFontSize(10)
      
      // Bride details
      doc.setFont('helvetica', 'bold')
      doc.text(lang.brideDetails, leftX, yPos)
      yPos += 5
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.text(`${formData.brideNakshatra || ''}`, leftX + 5, yPos)
      
      yPos += 6
      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')
      const tempY = yPos - 11
      doc.text(lang.groomDetails, rightX, tempY)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.text(`${formData.groomNakshatra || ''}`, rightX + 5, tempY + 5)
      
      yPos += 2

      // Birth dates and times
      doc.setFontSize(9)
      doc.text(`${lang.janma} ${formData.brideDate || ''} - ${formData.brideTime || ''}`, leftX, yPos)
      doc.text(`${lang.janma} ${formData.groomDate || ''} - ${formData.groomTime || ''}`, rightX, yPos)
      
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
      doc.text(lang.matchingParams, margin + 15, yPos)
      doc.text(lang.otherParams, pageWidth / 2 + 20, yPos)
      
      yPos += 7

      // Column positions
      const kootaX = margin + 15
      const maxScoreX = kootaX + 45
      const scoreX = kootaX + 55
      const param2X = pageWidth / 2 + 20
      const value2X = param2X + 45
      
      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')

      // Helper function to add parameter
      const addParam = (teluguName, englishName, value, status, rightParam, rightValue) => {
        const name = isBoth ? `${teluguName} / ${englishName}` : (language === 'telugu' ? teluguName : englishName)
        doc.text(name, kootaX, yPos)
        doc.text(`- ${value.max || value}/${value.obtained || ''}`, maxScoreX, yPos)
        
        const isPresent = status === 'ఉన్నది' || status === lang.unnadi
        doc.setTextColor(isPresent ? 0 : 255, isPresent ? 128 : 0, 0)
        doc.text(isPresent ? '✓' : '✗', scoreX, yPos)
        doc.setTextColor(0, 0, 0)
        
        if (rightParam) {
          const rightName = isBoth ? rightParam.te + ' / ' + rightParam.en : rightParam[language === 'telugu' ? 'te' : 'en']
          doc.text(rightName, param2X, yPos)
          doc.text(`- ${rightValue || ''}`, value2X, yPos)
        }
        yPos += 6
      }

      // Row 1
      addParam(TEXT.telugu.varna, TEXT.english.varna, formData.varna, formData.varnaStatus, 
        {te: TEXT.telugu.sreevarmalu, en: TEXT.english.sreevarmalu}, formData.sreevarmalu || '27/11')

      // Row 2
      addParam(TEXT.telugu.vashya, TEXT.english.vashya, formData.vashya, formData.vashyaStatus,
        {te: TEXT.telugu.rasimaitri, en: TEXT.english.rasimaitri}, formData.rasimaitri || lang.unnadi)

      // Row 3
      addParam(TEXT.telugu.tara, TEXT.english.tara, formData.tara, formData.taraStatus,
        {te: TEXT.telugu.grahamaitri, en: TEXT.english.grahamaitri}, formData.chandraNavamsha || lang.unnadi)

      // Row 4
      addParam(TEXT.telugu.yoni, TEXT.english.yoni, formData.yoni, formData.yoniStatus,
        {te: TEXT.telugu.janmaLagna, en: TEXT.english.janmaLagna}, formData.papashatra || lang.unnadi)

      // Row 5
      addParam(TEXT.telugu.graha, TEXT.english.graha, formData.graha, formData.grahaStatus,
        {te: TEXT.telugu.jantuveram, en: TEXT.english.jantuveram}, formData.vedhaChakra || 'అనుకూలం')

      // Row 6
      addParam(TEXT.telugu.gana, TEXT.english.gana, formData.gana, formData.ganaStatus,
        {te: TEXT.telugu.tharabalamu, en: TEXT.english.tharabalamu}, formData.tharabalamu || lang.unnadi)

      // Row 7
      addParam(TEXT.telugu.rashi, TEXT.english.rashi, formData.rashi, formData.rashiStatus,
        {te: TEXT.telugu.rashyabhinayetulu, en: TEXT.english.rashyabhinayetulu}, formData.rashnabhinayetulu || 'చేనుకోవచ్చు')

      // Row 8
      addParam(TEXT.telugu.nadi, TEXT.english.nadi, formData.nadi, formData.nadiStatus, null, null)

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
      
      // Marusulu total
      const marusuluLabel = isBoth ? `${TEXT.telugu.marusulu} / ${TEXT.english.marusulu}` : lang.marusulu
      doc.setFontSize(10)
      doc.text(`${marusuluLabel} - ${formData.ganamulu || '100/120'}`, param2X, yPos - 8)
      yPos += 6

      // === DOSHAM SECTION ===
      
      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')
      const kuladoshamBrideLabel = isBoth ? `${TEXT.telugu.kuladoshamBride} / ${TEXT.english.kuladoshamBride}` : lang.kuladoshamBride
      const kuladoshamGroomLabel = isBoth ? `${TEXT.telugu.kuladoshamGroom} / ${TEXT.english.kuladoshamGroom}` : lang.kuladoshamGroom
      
      doc.text(kuladoshamBrideLabel, kootaX, yPos)
      doc.text(`- ${formData.kuladoshamBride || lang.unnadi}`, maxScoreX, yPos)
      yPos += 5
      
      doc.text(kuladoshamGroomLabel, kootaX, yPos)
      doc.text(`- ${formData.kuladoshamGroom || lang.unnadi}`, maxScoreX, yPos)
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
      doc.roundedRect(margin + 10, yPos - 5, pageWidth - 2 * margin - 20, isBoth ? 16 : 12, 2, 2, 'S')
      
      yPos += 2
      doc.setFontSize(9)
      doc.setTextColor(196, 30, 58)
      doc.setFont('helvetica', 'bold')
      doc.text(lang.message1, pageWidth / 2, yPos, { align: 'center' })
      yPos += 4
      
      if (isBoth) {
        doc.setFontSize(8)
        doc.text(TEXT.english.message1, pageWidth / 2, yPos, { align: 'center' })
        yPos += 4
      }
      
      doc.setFontSize(8)
      doc.text(lang.message2, pageWidth / 2, yPos, { align: 'center' })
      
      if (isBoth) {
        yPos += 3
        doc.setFontSize(7)
        doc.text(TEXT.english.message2, pageWidth / 2, yPos, { align: 'center' })
      }
      
      yPos += isBoth ? 8 : 10

      // Contact details
      doc.setFontSize(10)
      doc.setTextColor(42, 90, 160)
      doc.setFont('helvetica', 'bold')
      doc.text(lang.footer1, pageWidth / 2, yPos, { align: 'center' })
      
      yPos += 5
      doc.setFontSize(9)
      doc.setTextColor(0, 0, 0)
      doc.text(lang.footer2, pageWidth / 2, yPos, { align: 'center' })
      
      yPos += 5
      doc.setFontSize(11)
      doc.setTextColor(0, 150, 0)
      doc.setFont('helvetica', 'bold')
      doc.text('📱 WhatsApp: 9440 990 134,', pageWidth / 2 - 20, yPos, { align: 'center' })
      doc.setTextColor(196, 30, 58)
      doc.text('📞 9299 993 516', pageWidth / 2 + 25, yPos, { align: 'center' })

      // Generate blob
      const pdfBlob = doc.output('blob')
      resolve(pdfBlob)
      
    } catch (error) {
      reject(error)
    }
  })
}
