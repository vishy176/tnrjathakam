import { useState, useRef } from 'react'
import { generatePDF } from './PDFGenerator'

const JathakamForm = () => {
  const [formData, setFormData] = useState({
    // Bride Details
    brideName: '',
    brideFatherName: '',
    brideNakshatra: '',
    brideDate: '',
    brideTime: '',
    
    // Groom Details
    groomName: '',
    groomFatherName: '',
    groomNakshatra: '',
    groomDate: '',
    groomTime: '',
    
    // Matching Parameters (పరకుటములు)
    varna: { max: 1, obtained: '' },
    vashya: { max: 2, obtained: '' },
    tara: { max: 3, obtained: '' },
    yoni: { max: 4, obtained: '' },
    graha: { max: 5, obtained: '' },
    gana: { max: 6, obtained: '' },
    rashi: { max: 7, obtained: '' },
    nadi: { max: 8, obtained: '' },
    
    // Status for each parameter
    varnaStatus: 'ఉన్నది',
    vashyaStatus: 'ఉన్నది',
    taraStatus: 'ఉన్నది',
    yoniStatus: 'ఉన్నది',
    grahaStatus: 'ఉన్నది',
    ganaStatus: 'ఉన్నది',
    rashiStatus: 'ఉన్నది',
    nadiStatus: 'ఉన్నది',
    
    // Other matching details
    ganamulu: '',
    sreevarmalu: '',
    rasimaitri: '',
    chandraNavamsha: '',
    papashatra: '',
    vedhaChakra: '',
    tharabalamu: '',
    rashnabhinayetulu: '',
    
    // Additional fields
    kuladoshamBride: 'ఉన్నది',
    kuladoshamGroom: 'ఉన్నది',
    remarks: ''
  })

  const [isGenerating, setIsGenerating] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleMatchingChange = (param, type, value) => {
    setFormData(prev => ({
      ...prev,
      [param]: {
        ...prev[param],
        [type]: value
      }
    }))
  }

  const calculateTotal = () => {
    const params = ['varna', 'vashya', 'tara', 'yoni', 'graha', 'gana', 'rashi', 'nadi']
    return params.reduce((sum, param) => {
      const obtained = parseFloat(formData[param].obtained) || 0
      return sum + obtained
    }, 0)
  }

  const getTotalMax = () => {
    return 36 // Total maximum score
  }

  const shareToWhatsApp = async () => {
    try {
      setIsGenerating(true)
      const pdfBlob = await generatePDF(formData, calculateTotal())
      
      // Create a URL for the blob
      const url = URL.createObjectURL(pdfBlob)
      
      // Create a temporary link to download the PDF
      const link = document.createElement('a')
      link.href = url
      link.download = `జాతక_మేళన_${formData.brideName || 'form'}_${Date.now()}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Clean up the URL
      setTimeout(() => URL.revokeObjectURL(url), 100)
      
      // On mobile, this will allow the user to share via WhatsApp
      if (navigator.share) {
        const file = new File([pdfBlob], `జాతక_మేళన_${formData.brideName || 'form'}.pdf`, { 
          type: 'application/pdf' 
        })
        
        await navigator.share({
          title: 'జాతక మేళన వివరములు',
          text: 'వధూ-వర గుణమేళన జాతక పంథతిన వివరము',
          files: [file]
        })
      } else {
        alert('PDF డౌన్‌లోడ్ చేసారు! ఇప్పుడు WhatsApp లో షేర్ చేయవచ్చు.')
      }
      
      setIsGenerating(false)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('PDF సృష్టించడంలో లోపం. దయచేసి మళ్లీ ప్రయత్నించండి.')
      setIsGenerating(false)
    }
  }

  const clearForm = () => {
    if (window.confirm('ఫారం క్లియర్ చేయాలా?')) {
      window.location.reload()
    }
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>🕉️ శ్రీ గణేశాయ నమః 🕉️</h1>
        <h1>వధూ-వర</h1>
        <h1>గుణమేళన జాతక పంథతిన వివరము</h1>
        <div className="subtitle">పద్ధ - పర</div>
      </div>

      <div className="form-body">
        {/* Bride Details */}
        <div className="form-section">
          <div className="section-title">అమ్మాయి వివరములు (Bride Details)</div>
          <div className="form-row">
            <div className="form-group">
              <label>పేరు (Name) *</label>
              <input 
                type="text" 
                value={formData.brideName}
                onChange={(e) => handleInputChange('brideName', e.target.value)}
                placeholder="అమ్మాయి పేరు"
              />
            </div>
            <div className="form-group">
              <label>తండ్రి పేరు (Father's Name)</label>
              <input 
                type="text" 
                value={formData.brideFatherName}
                onChange={(e) => handleInputChange('brideFatherName', e.target.value)}
                placeholder="తండ్రి పేరు"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>నక్షత్రం (Nakshatra)</label>
              <input 
                type="text" 
                value={formData.brideNakshatra}
                onChange={(e) => handleInputChange('brideNakshatra', e.target.value)}
                placeholder="నక్షత్రం"
              />
            </div>
            <div className="form-group">
              <label>తేదీ (Date)</label>
              <input 
                type="text" 
                value={formData.brideDate}
                onChange={(e) => handleInputChange('brideDate', e.target.value)}
                placeholder="DD/MM/YY"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>సమయం (Time)</label>
              <input 
                type="text" 
                value={formData.brideTime}
                onChange={(e) => handleInputChange('brideTime', e.target.value)}
                placeholder="HH:MM"
              />
            </div>
          </div>
        </div>

        {/* Groom Details */}
        <div className="form-section">
          <div className="section-title">అబ్బాయి వివరములు (Groom Details)</div>
          <div className="form-row">
            <div className="form-group">
              <label>పేరు (Name) *</label>
              <input 
                type="text" 
                value={formData.groomName}
                onChange={(e) => handleInputChange('groomName', e.target.value)}
                placeholder="అబ్బాయి పేరు"
              />
            </div>
            <div className="form-group">
              <label>తండ్రి పేరు (Father's Name)</label>
              <input 
                type="text" 
                value={formData.groomFatherName}
                onChange={(e) => handleInputChange('groomFatherName', e.target.value)}
                placeholder="తండ్రి పేరు"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>నక్షత్రం (Nakshatra)</label>
              <input 
                type="text" 
                value={formData.groomNakshatra}
                onChange={(e) => handleInputChange('groomNakshatra', e.target.value)}
                placeholder="నక్షత్రం"
              />
            </div>
            <div className="form-group">
              <label>తేదీ (Date)</label>
              <input 
                type="text" 
                value={formData.groomDate}
                onChange={(e) => handleInputChange('groomDate', e.target.value)}
                placeholder="DD/MM/YY"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>సమయం (Time)</label>
              <input 
                type="text" 
                value={formData.groomTime}
                onChange={(e) => handleInputChange('groomTime', e.target.value)}
                placeholder="HH:MM"
              />
            </div>
          </div>
        </div>

        {/* Matching Parameters */}
        <div className="form-section">
          <div className="section-title">గుణమేళన పరకుటములు (Matching Parameters)</div>
          <div className="matching-grid">
            <div className="matching-item">
              <label>వర్ణకూటములు</label>
              <input 
                type="number" 
                step="0.5"
                max="1"
                value={formData.varna.obtained}
                onChange={(e) => handleMatchingChange('varna', 'obtained', e.target.value)}
                placeholder="1"
              />
              <select value={formData.varnaStatus} onChange={(e) => handleInputChange('varnaStatus', e.target.value)}>
                <option value="ఉన్నది">ఉన్నది ✓</option>
                <option value="లేదు">లేదు ✗</option>
              </select>
            </div>

            <div className="matching-item">
              <label>వశ్యకూటములు</label>
              <input 
                type="number" 
                step="0.5"
                max="2"
                value={formData.vashya.obtained}
                onChange={(e) => handleMatchingChange('vashya', 'obtained', e.target.value)}
                placeholder="2"
              />
              <select value={formData.vashyaStatus} onChange={(e) => handleInputChange('vashyaStatus', e.target.value)}>
                <option value="ఉన్నది">ఉన్నది ✓</option>
                <option value="లేదు">లేదు ✗</option>
              </select>
            </div>

            <div className="matching-item">
              <label>తారకూటములు</label>
              <input 
                type="number" 
                step="0.5"
                max="3"
                value={formData.tara.obtained}
                onChange={(e) => handleMatchingChange('tara', 'obtained', e.target.value)}
                placeholder="3"
              />
              <select value={formData.taraStatus} onChange={(e) => handleInputChange('taraStatus', e.target.value)}>
                <option value="ఉన్నది">ఉన్నది ✓</option>
                <option value="లేదు">లేదు ✗</option>
              </select>
            </div>

            <div className="matching-item">
              <label>యోనికూటములు</label>
              <input 
                type="number" 
                step="0.5"
                max="4"
                value={formData.yoni.obtained}
                onChange={(e) => handleMatchingChange('yoni', 'obtained', e.target.value)}
                placeholder="4"
              />
              <select value={formData.yoniStatus} onChange={(e) => handleInputChange('yoniStatus', e.target.value)}>
                <option value="ఉన్నది">ఉన్నది ✓</option>
                <option value="లేదు">లేదు ✗</option>
              </select>
            </div>

            <div className="matching-item">
              <label>గ్రహమైత్రి</label>
              <input 
                type="number" 
                step="0.5"
                max="5"
                value={formData.graha.obtained}
                onChange={(e) => handleMatchingChange('graha', 'obtained', e.target.value)}
                placeholder="5"
              />
              <select value={formData.grahaStatus} onChange={(e) => handleInputChange('grahaStatus', e.target.value)}>
                <option value="ఉన్నది">ఉన్నది ✓</option>
                <option value="లేదు">లేదు ✗</option>
              </select>
            </div>

            <div className="matching-item">
              <label>గణకూటములు</label>
              <input 
                type="number" 
                step="0.5"
                max="6"
                value={formData.gana.obtained}
                onChange={(e) => handleMatchingChange('gana', 'obtained', e.target.value)}
                placeholder="6"
              />
              <select value={formData.ganaStatus} onChange={(e) => handleInputChange('ganaStatus', e.target.value)}>
                <option value="ఉన్నది">ఉన్నది ✓</option>
                <option value="లేదు">లేదు ✗</option>
              </select>
            </div>

            <div className="matching-item">
              <label>రాశికూటములు</label>
              <input 
                type="number" 
                step="0.5"
                max="7"
                value={formData.rashi.obtained}
                onChange={(e) => handleMatchingChange('rashi', 'obtained', e.target.value)}
                placeholder="7"
              />
              <select value={formData.rashiStatus} onChange={(e) => handleInputChange('rashiStatus', e.target.value)}>
                <option value="ఉన్నది">ఉన్నది ✓</option>
                <option value="లేదు">లేదు ✗</option>
              </select>
            </div>

            <div className="matching-item">
              <label>నాడికూటములు</label>
              <input 
                type="number" 
                step="0.5"
                max="8"
                value={formData.nadi.obtained}
                onChange={(e) => handleMatchingChange('nadi', 'obtained', e.target.value)}
                placeholder="8"
              />
              <select value={formData.nadiStatus} onChange={(e) => handleInputChange('nadiStatus', e.target.value)}>
                <option value="ఉన్నది">ఉన్నది ✓</option>
                <option value="లేదు">లేదు ✗</option>
              </select>
            </div>
          </div>

          <div className="total-score">
            మొత్తం గుణములు: {calculateTotal()} / {getTotalMax()}
          </div>
        </div>

        {/* Additional Details */}
        <div className="form-section">
          <div className="section-title">ఇతర వివరములు (Other Details)</div>
          <div className="form-row">
            <div className="form-group">
              <label>గణములు</label>
              <input 
                type="text" 
                value={formData.ganamulu}
                onChange={(e) => handleInputChange('ganamulu', e.target.value)}
                placeholder="36 / 20"
              />
            </div>
            <div className="form-group">
              <label>శ్రీవర్మలు</label>
              <input 
                type="text" 
                value={formData.sreevarmalu}
                onChange={(e) => handleInputChange('sreevarmalu', e.target.value)}
                placeholder="27 / 11"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>రాసిమైత్రి</label>
              <select value={formData.rasimaitri} onChange={(e) => handleInputChange('rasimaitri', e.target.value)}>
                <option value="">ఎంచుకోండి</option>
                <option value="ఉన్నది">ఉన్నది</option>
                <option value="లేదు">లేదు</option>
              </select>
            </div>
            <div className="form-group">
              <label>గ్రహమైత్రి</label>
              <select value={formData.chandraNavamsha} onChange={(e) => handleInputChange('chandraNavamsha', e.target.value)}>
                <option value="">ఎంచుకోండి</option>
                <option value="ఉన్నది">ఉన్నది</option>
                <option value="లేదు">లేదు</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>జన్మలగ్నమైత్రి</label>
              <select value={formData.papashatra} onChange={(e) => handleInputChange('papashatra', e.target.value)}>
                <option value="">ఎంచుకోండి</option>
                <option value="ఉన్నది">ఉన్నది</option>
                <option value="లేదు">లేదు</option>
              </select>
            </div>
            <div className="form-group">
              <label>జంతువేరము</label>
              <select value={formData.vedhaChakra} onChange={(e) => handleInputChange('vedhaChakra', e.target.value)}>
                <option value="">ఎంచుకోండి</option>
                <option value="ఉన్నది">ఉన్నది</option>
                <option value="అప్పుతుంది">అప్పుతుంది</option>
                <option value="కాదు">కాదు</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>తారాబలము</label>
              <select value={formData.tharabalamu} onChange={(e) => handleInputChange('tharabalamu', e.target.value)}>
                <option value="">ఎంచుకోండి</option>
                <option value="ఉన్నది">ఉన్నది</option>
                <option value="లేదు">లేదు</option>
              </select>
            </div>
            <div className="form-group">
              <label>రాశ్యాభినయేతులు</label>
              <select value={formData.rashnabhinayetulu} onChange={(e) => handleInputChange('rashnabhinayetulu', e.target.value)}>
                <option value="">ఎంచుకోండి</option>
                <option value="చేనుకోవచ్చు">చేనుకోవచ్చు</option>
                <option value="చేనుకోకూడదు">చేనుకోకూడదు</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>కులదోషము అమ్మాయికి</label>
              <select value={formData.kuladoshamBride} onChange={(e) => handleInputChange('kuladoshamBride', e.target.value)}>
                <option value="ఉన్నది">ఉన్నది</option>
                <option value="లేదు">లేదు</option>
              </select>
            </div>
            <div className="form-group">
              <label>కులదోషము అబ్బాయికి</label>
              <select value={formData.kuladoshamGroom} onChange={(e) => handleInputChange('kuladoshamGroom', e.target.value)}>
                <option value="ఉన్నది">ఉన్నది</option>
                <option value="లేదు">లేదు</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label>గమనికలు (Remarks)</label>
              <textarea 
                value={formData.remarks}
                onChange={(e) => handleInputChange('remarks', e.target.value)}
                placeholder="ఏదైనా అదనపు వివరములు..."
                rows="3"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="button-group">
          <button 
            className="btn btn-primary" 
            onClick={shareToWhatsApp}
            disabled={isGenerating || !formData.brideName || !formData.groomName}
          >
            {isGenerating ? '⏳ తయారు చేస్తోంది...' : '📱 WhatsApp లో పంపండి'}
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={clearForm}
            disabled={isGenerating}
          >
            🔄 క్లియర్
          </button>
        </div>
      </div>
    </div>
  )
}

export default JathakamForm

