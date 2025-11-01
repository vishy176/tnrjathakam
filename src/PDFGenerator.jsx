import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

// Language text mappings
const TEXT = {
  telugu: {
    title1: 'శుభమస్తు!!',
    title2: '!!జై శ్రీమన్నారయణ!!',
    title3: 'కళ్యాణమస్తు!!',
    mainTitle: 'వధూ-వర',
    subtitle: 'గుణమేళన జాతక పొంతన వివరణ',
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

// Create HTML template for PDF content
const createPDFHTML = (formData, totalScore, language) => {
  const lang = language === 'english' ? TEXT.english : TEXT.telugu
  const isBoth = language === 'both'
  
  const getText = (teluguText, englishText) => {
    if (isBoth) return `${teluguText} / ${englishText}`
    return language === 'telugu' ? teluguText : englishText
  }

  const getStatusText = (status) => {
    if (status === 'ఉన్నది') return '✓'
    if (status === 'లేదు') return '✗'
    return status === lang.unnadi ? '✓' : '✗'
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Noto Sans Telugu', Arial, sans-serif;
          padding: 12mm;
          font-size: 11pt;
          color: #000;
          background: white;
        }
        .border {
          border: 2px solid #2a5aa0;
          padding: 3mm;
          border-radius: 2px;
        }
        .inner-border {
          border: 1px solid #2a5aa0;
          padding: 2mm;
        }
        .header {
          text-align: center;
          margin-bottom: 8mm;
          position: relative;
        }
        .header-images {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 3mm;
        }
        .header-image-left {
          width: 25mm;
          height: auto;
        }
        .header-image-right {
          display: flex;
          gap: 5mm;
        }
        .header-image-right img {
          width: 20mm;
          height: auto;
        }
        .header-top {
          font-size: 9pt;
          margin-bottom: 3mm;
        }
        .header-top .red { color: #c8323a; }
        .header-top .blue { color: #2a5aa0; }
        .header-title {
          font-size: 18pt;
          font-weight: bold;
          color: #c41e3a;
          margin: 4mm 0;
        }
        .header-subtitle {
          font-size: 14pt;
          color: #c41e3a;
          margin-bottom: 4mm;
        }
        .names-section {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8mm;
        }
        .name-col {
          flex: 1;
        }
        .name-label {
          font-weight: bold;
          margin-bottom: 2mm;
        }
        .name-value {
          margin-bottom: 2mm;
        }
        .details {
          font-size: 9pt;
          margin-top: 2mm;
        }
        .divider {
          border-top: 1px solid #2a5aa0;
          margin: 5mm 0;
        }
        .params-section {
          margin: 5mm 0;
        }
        .params-header {
          font-weight: bold;
          font-size: 11pt;
          margin-bottom: 3mm;
          display: flex;
          justify-content: space-between;
        }
        .params-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 3mm;
          font-size: 9pt;
        }
        .param-left {
          width: 48%;
        }
        .param-right {
          width: 48%;
        }
        .param-name {
          display: inline-block;
          min-width: 80px;
        }
        .param-value {
          display: inline-block;
          color: #000;
        }
        .status {
          color: green;
          font-weight: bold;
        }
        .status-x {
          color: red;
          font-weight: bold;
        }
        .total-line {
          border-top: 2px solid #000;
          margin: 4mm 0;
          padding-top: 2mm;
          font-size: 12pt;
          font-weight: bold;
        }
        .dosham {
          font-size: 9pt;
          margin: 3mm 0;
        }
        .footer-box {
          border: 2px solid #c41e3a;
          border-radius: 3px;
          padding: 3mm;
          margin: 8mm 0;
          text-align: center;
        }
        .footer-box .message {
          color: #c41e3a;
          font-weight: bold;
          font-size: 9pt;
          margin-bottom: 2mm;
        }
        .footer-contact {
          text-align: center;
          margin-top: 5mm;
          font-size: 9pt;
        }
        .footer-contact-name {
          color: #2a5aa0;
          font-weight: bold;
          font-size: 10pt;
          margin-bottom: 2mm;
        }
        .footer-phone {
          color: #009600;
          font-weight: bold;
          font-size: 11pt;
        }
        /* Image styles - you can customize size here */
        .pdf-image {
          max-width: 100%;
          height: auto;
          display: block;
        }
        .pdf-image-small {
          width: 20mm;
          height: auto;
        }
        .pdf-image-medium {
          width: 30mm;
          height: auto;
        }
        .pdf-image-large {
          width: 50mm;
          height: auto;
        }
      </style>
    </head>
    <body>
      <div class="border">
        <div class="inner-border">
          <div class="header">
            <!-- Deity Images Section - Add your images here -->
            <div class="header-images">
              <!-- Left side image (e.g., Ganesha) -->
              <img src="/images/ganesha.png" alt="Ganesha" class="header-image-left" onerror="this.style.display='none'">
              
              <!-- Right side images (e.g., Lakshmi-Vishnu, Venkateswara) -->
              <div class="header-image-right">
                <img src="/images/lakshmi-vishnu.png" alt="Lakshmi Vishnu" class="pdf-image-small" onerror="this.style.display='none'">
                <img src="/images/venkateswara.png" alt="Venkateswara" class="pdf-image-small" onerror="this.style.display='none'">
              </div>
            </div>
            
            <div class="header-top">
              <span class="red">${lang.title1}</span>
              <span class="blue" style="margin: 0 20px;">${lang.title2}</span>
              <span class="red">${lang.title3}</span>
            </div>
            <div class="header-title">${getText(TEXT.telugu.mainTitle, TEXT.english.mainTitle)}</div>
            <div class="header-subtitle">${getText(TEXT.telugu.subtitle, TEXT.english.subtitle)}</div>
          </div>

          <div class="names-section">
            <div class="name-col">
              <div class="name-label">${getText(TEXT.telugu.bride, TEXT.english.bride)} ${formData.brideName}</div>
              <div class="name-value">${formData.brideFatherName || ''}</div>
              <div class="details">${getText(TEXT.telugu.brideDetails, TEXT.english.brideDetails)}</div>
              <div class="details">${formData.brideNakshatra || ''}</div>
              <div class="details">${getText(TEXT.telugu.janma, TEXT.english.janma)} ${formData.brideDate || ''} - ${formData.brideTime || ''}</div>
            </div>
            <div class="name-col">
              <div class="name-label">${getText(TEXT.telugu.groom, TEXT.english.groom)} ${formData.groomName}</div>
              <div class="name-value">${formData.groomFatherName || ''}</div>
              <div class="details">${getText(TEXT.telugu.groomDetails, TEXT.english.groomDetails)}</div>
              <div class="details">${formData.groomNakshatra || ''}</div>
              <div class="details">${getText(TEXT.telugu.janma, TEXT.english.janma)} ${formData.groomDate || ''} - ${formData.groomTime || ''}</div>
            </div>
          </div>

          <div class="divider"></div>

          <div class="params-section">
            <div class="params-header">
              <span>${getText(TEXT.telugu.matchingParams, TEXT.english.matchingParams)}</span>
              <span>${getText(TEXT.telugu.otherParams, TEXT.english.otherParams)}</span>
            </div>
            
            <div class="params-row">
              <div class="param-left">
                <span class="param-name">${getText(TEXT.telugu.varna, TEXT.english.varna)}</span>
                <span class="param-value">- ${formData.varna.max}/${formData.varna.obtained || ''}</span>
                <span class="${getStatusText(formData.varnaStatus) === '✓' ? 'status' : 'status-x'}">${getStatusText(formData.varnaStatus)}</span>
              </div>
              <div class="param-right">
                <span class="param-name">${getText(TEXT.telugu.sreevarmalu, TEXT.english.sreevarmalu)}</span>
                <span class="param-value">- ${formData.sreevarmalu || '27/11'}</span>
              </div>
            </div>

            <div class="params-row">
              <div class="param-left">
                <span class="param-name">${getText(TEXT.telugu.vashya, TEXT.english.vashya)}</span>
                <span class="param-value">- ${formData.vashya.max}/${formData.vashya.obtained || ''}</span>
                <span class="${getStatusText(formData.vashyaStatus) === '✓' ? 'status' : 'status-x'}">${getStatusText(formData.vashyaStatus)}</span>
              </div>
              <div class="param-right">
                <span class="param-name">${getText(TEXT.telugu.rasimaitri, TEXT.english.rasimaitri)}</span>
                <span class="param-value">- ${formData.rasimaitri || lang.unnadi}</span>
              </div>
            </div>

            <div class="params-row">
              <div class="param-left">
                <span class="param-name">${getText(TEXT.telugu.tara, TEXT.english.tara)}</span>
                <span class="param-value">- ${formData.tara.max}/${formData.tara.obtained || ''}</span>
                <span class="${getStatusText(formData.taraStatus) === '✓' ? 'status' : 'status-x'}">${getStatusText(formData.taraStatus)}</span>
              </div>
              <div class="param-right">
                <span class="param-name">${getText(TEXT.telugu.grahamaitri, TEXT.english.grahamaitri)}</span>
                <span class="param-value">- ${formData.chandraNavamsha || lang.unnadi}</span>
              </div>
            </div>

            <div class="params-row">
              <div class="param-left">
                <span class="param-name">${getText(TEXT.telugu.yoni, TEXT.english.yoni)}</span>
                <span class="param-value">- ${formData.yoni.max}/${formData.yoni.obtained || ''}</span>
                <span class="${getStatusText(formData.yoniStatus) === '✓' ? 'status' : 'status-x'}">${getStatusText(formData.yoniStatus)}</span>
              </div>
              <div class="param-right">
                <span class="param-name">${getText(TEXT.telugu.janmaLagna, TEXT.english.janmaLagna)}</span>
                <span class="param-value">- ${formData.papashatra || lang.unnadi}</span>
              </div>
            </div>

            <div class="params-row">
              <div class="param-left">
                <span class="param-name">${getText(TEXT.telugu.graha, TEXT.english.graha)}</span>
                <span class="param-value">- ${formData.graha.max}/${formData.graha.obtained || ''}</span>
                <span class="${getStatusText(formData.grahaStatus) === '✓' ? 'status' : 'status-x'}">${getStatusText(formData.grahaStatus)}</span>
              </div>
              <div class="param-right">
                <span class="param-name">${getText(TEXT.telugu.jantuveram, TEXT.english.jantuveram)}</span>
                <span class="param-value">- ${formData.vedhaChakra || 'అనుకూలం'}</span>
              </div>
            </div>

            <div class="params-row">
              <div class="param-left">
                <span class="param-name">${getText(TEXT.telugu.gana, TEXT.english.gana)}</span>
                <span class="param-value">- ${formData.gana.max}/${formData.gana.obtained || ''}</span>
                <span class="${getStatusText(formData.ganaStatus) === '✓' ? 'status' : 'status-x'}">${getStatusText(formData.ganaStatus)}</span>
              </div>
              <div class="param-right">
                <span class="param-name">${getText(TEXT.telugu.tharabalamu, TEXT.english.tharabalamu)}</span>
                <span class="param-value">- ${formData.tharabalamu || lang.unnadi}</span>
              </div>
            </div>

            <div class="params-row">
              <div class="param-left">
                <span class="param-name">${getText(TEXT.telugu.rashi, TEXT.english.rashi)}</span>
                <span class="param-value">- ${formData.rashi.max}/${formData.rashi.obtained || ''}</span>
                <span class="${getStatusText(formData.rashiStatus) === '✓' ? 'status' : 'status-x'}">${getStatusText(formData.rashiStatus)}</span>
              </div>
              <div class="param-right">
                <span class="param-name">${getText(TEXT.telugu.rashyabhinayetulu, TEXT.english.rashyabhinayetulu)}</span>
                <span class="param-value">- ${formData.rashnabhinayetulu || 'చేనుకోవచ్చు'}</span>
              </div>
            </div>

            <div class="params-row">
              <div class="param-left">
                <span class="param-name">${getText(TEXT.telugu.nadi, TEXT.english.nadi)}</span>
                <span class="param-value">- ${formData.nadi.max}/${formData.nadi.obtained || ''}</span>
                <span class="${getStatusText(formData.nadiStatus) === '✓' ? 'status' : 'status-x'}">${getStatusText(formData.nadiStatus)}</span>
              </div>
              <div class="param-right"></div>
            </div>
          </div>

          <div class="total-line">
            <span>36/</span> <span style="font-size: 14pt;">${totalScore}</span>
            <span style="float: right;">${getText(TEXT.telugu.marusulu, TEXT.english.marusulu)} - ${formData.ganamulu || '100/120'}</span>
          </div>

          <div class="dosham">
            <div>${getText(TEXT.telugu.kuladoshamBride, TEXT.english.kuladoshamBride)} - ${formData.kuladoshamBride || lang.unnadi}</div>
            <div>${getText(TEXT.telugu.kuladoshamGroom, TEXT.english.kuladoshamGroom)} - ${formData.kuladoshamGroom || lang.unnadi}</div>
          </div>

          ${formData.remarks ? `<div style="margin: 4mm 0; font-size: 8pt; font-style: italic;">${formData.remarks}</div>` : ''}

          <div class="footer-box">
            <div class="message">${getText(TEXT.telugu.message1, TEXT.english.message1)}</div>
            <div class="message" style="font-size: 8pt;">${getText(TEXT.telugu.message2, TEXT.english.message2)}</div>
          </div>

          <div class="footer-contact">
            <div class="footer-contact-name">${getText(TEXT.telugu.footer1, TEXT.english.footer1)}</div>
            <div style="margin: 2mm 0;">${getText(TEXT.telugu.footer2, TEXT.english.footer2)}</div>
            <div class="footer-phone">📱 WhatsApp: 9440 990 134, 📞 9299 993 516</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

export const generatePDF = async (formData, totalScore, language = 'telugu') => {
  return new Promise(async (resolve, reject) => {
    try {
      // Create HTML content
      const htmlContent = createPDFHTML(formData, totalScore, language)
      
      // Create a temporary div with the HTML
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = htmlContent
      tempDiv.style.position = 'absolute'
      tempDiv.style.left = '-9999px'
      tempDiv.style.top = '0'
      tempDiv.style.width = '210mm' // A4 width
      document.body.appendChild(tempDiv)
      
      // Wait for fonts to load
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Convert HTML to canvas
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: 794, // A4 width in pixels at 96 DPI
        height: 1123, // A4 height in pixels
        backgroundColor: '#ffffff'
      })
      
      // Remove temp div
      document.body.removeChild(tempDiv)
      
      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })
      
      const imgData = canvas.toDataURL('image/png')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgScaledWidth = imgWidth * ratio
      const imgScaledHeight = imgHeight * ratio
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgScaledWidth, imgScaledHeight)
      
      const pdfBlob = pdf.output('blob')
      resolve(pdfBlob)
      
    } catch (error) {
      console.error('PDF generation error:', error)
      reject(error)
    }
  })
}
