# జాతక మేళన యాప్ వాడుకరి మార్గదర్శి
# Jathakam Matching App - User Guide

## 🚀 Getting Started

### Step 1: Start the Application

Open terminal in the `jathakam-app` folder and run:

```bash
npm run dev
```

You'll see output like:
```
➜  Local:   http://localhost:3000/
➜  Network: http://192.168.1.5:3000/
```

### Step 2: Access on Your Phone

**Option A: Use Network URL**
- Note the Network URL from terminal (e.g., `http://192.168.1.5:3000`)
- Open this URL in your phone's browser
- Make sure your phone is on the same WiFi network

**Option B: Use QR Code** (if available)
- Some terminals show a QR code
- Scan it with your phone camera

### Step 3: Install as Mobile App (Optional but Recommended)

**For Android:**
1. Open the URL in Chrome browser
2. Tap the three dots menu (⋮)
3. Select "Add to Home Screen"
4. Tap "Add"
5. The app icon will appear on your home screen!

**For iPhone:**
1. Open the URL in Safari browser
2. Tap the Share button (square with arrow)
3. Scroll and tap "Add to Home Screen"
4. Tap "Add"
5. The app icon will appear on your home screen!

---

## 📝 Using the Form

### Section 1: Bride Details (అమ్మాయి వివరములు)

Fill in the following:
- **పేరు (Name)**: Bride's full name **(Required)**
- **తండ్రి పేరు (Father's Name)**: Father's name
- **నక్షత్రం (Nakshatra)**: Birth star
- **తేదీ (Date)**: Date of birth (format: DD/MM/YY)
- **సమయం (Time)**: Time of birth (format: HH:MM)

### Section 2: Groom Details (అబ్బాయి వివరములు)

Fill in the following:
- **పేరు (Name)**: Groom's full name **(Required)**
- **తండ్రి పేరు (Father's Name)**: Father's name
- **నక్షత్రం (Nakshatra)**: Birth star
- **తేదీ (Date)**: Date of birth (format: DD/MM/YY)
- **సమయం (Time)**: Time of birth (format: HH:MM)

### Section 3: Matching Parameters (గుణమేళన పరకుటములు)

This is the core matching section. For each parameter:

1. **వర్ణకూటములు (Varna Koota)** - Max: 1
2. **వశ్యకూటములు (Vashya Koota)** - Max: 2
3. **తారకూటములు (Tara Koota)** - Max: 3
4. **యోనికూటములు (Yoni Koota)** - Max: 4
5. **గ్రహమైత్రి (Graha Maitri)** - Max: 5
6. **గణకూటములు (Gana Koota)** - Max: 6
7. **రాశికూటములు (Rashi Koota)** - Max: 7
8. **నాడికూటములు (Nadi Koota)** - Max: 8

For each parameter:
- Enter the **obtained score** in the number field
- Select status: **ఉన్నది (Present)** or **లేదు (Not Present)**

**Total Score:** Automatically calculated out of 36

### Section 4: Other Details (ఇతర వివరములు)

Additional matching information:
- **గణములు (Ganamulu)**: e.g., "36/20"
- **శ్రీవర్మలు (Sreevarmalu)**: e.g., "27/11"
- **రాసిమైత్రి (Rasi Maitri)**: Select status
- **గ్రహమైత్రి (Graha Maitri)**: Select status
- **జన్మలగ్నమైత్రి (Janma Lagna Maitri)**: Select status
- **జంతువేరము (Jantuveramu)**: Select status
- **తారాబలము (Thara Balamu)**: Select status
- **రాశ్యాభినయేతులు (Rashyabhinayetulu)**: Can proceed or not
- **కులదోషము (Kula Doshamu)**: For both bride and groom
- **గమనికలు (Remarks)**: Any additional notes

---

## 📱 Generating and Sharing PDF

### Generate PDF

1. After filling all required fields, click the button:
   **📱 WhatsApp లో పంపండి**

2. The app will generate a professional PDF with:
   - Header with traditional design
   - All filled details
   - Matching scores
   - Total calculation
   - Footer with date

### Share via WhatsApp

**On Mobile (Automatic):**
1. Click the WhatsApp share button
2. Native share dialog will open
3. Select WhatsApp
4. Choose contact or group
5. Send!

**On Desktop (Manual):**
1. PDF will download automatically
2. Open WhatsApp Web or Desktop
3. Attach the downloaded PDF
4. Send to desired contact

---

## 💡 Tips and Best Practices

### For Best Results:

1. **Use Mobile Device**: The app is optimized for mobile use
2. **Install as PWA**: Works offline and faster
3. **Fill Carefully**: Double-check all details before generating PDF
4. **Save Regularly**: Use the form multiple times without reinstalling

### Keyboard Shortcuts:

- **Tab**: Move to next field
- **Shift + Tab**: Move to previous field
- **Enter**: Submit in text fields

### Data Entry Tips:

1. **Names**: Use full names for clarity
2. **Dates**: Use format DD/MM/YY (e.g., 15/08/95)
3. **Time**: Use 24-hour format (e.g., 14:30 for 2:30 PM)
4. **Scores**: Can use decimal values (e.g., 0.5, 1.5)

---

## 🔄 Managing Forms

### Clear Form:

Click **🔄 క్లియర్** button to reset all fields

⚠️ **Warning**: This will erase all entered data!

### Create New Match:

Simply clear the form and start fresh

### Save Previous Matches:

The PDF is saved to your device, so you can keep records of multiple matches

---

## 🎨 Understanding the Interface

### Color Coding:

- **Blue Headers**: Section titles
- **Green ✓**: Matching parameter present
- **Red ✗**: Matching parameter absent
- **Purple Box**: Total score display
- **Green Button**: WhatsApp share (primary action)
- **Blue Button**: Clear form (secondary action)

### Score Calculation:

The app automatically sums all obtained scores to show:
```
మొత్తం గుణములు: XX / 36
```

Good match: Usually 18+ out of 36
Very good match: 24+ out of 36
Excellent match: 30+ out of 36

---

## 📊 Sample Workflow

1. **Receive Jathakams**: Get horoscopes from both families
2. **Open App**: Launch on mobile
3. **Fill Details**: Enter all information from both jathakams
4. **Enter Scores**: Fill matching parameters
5. **Review**: Check total score and details
6. **Generate PDF**: Click WhatsApp button
7. **Share**: Send to families via WhatsApp
8. **Clear**: Reset for next match

---

## ❓ FAQ

**Q: Do I need internet?**
A: Only for first load. After installing as PWA, works offline!

**Q: Can I edit PDF after generation?**
A: No, but you can modify form and regenerate

**Q: Where are PDFs saved?**
A: Downloads folder on your device

**Q: Can I use on multiple devices?**
A: Yes! Just open the URL on any device

**Q: Is data saved?**
A: Currently no auto-save. Generate PDF to save data

**Q: Can I customize the letterhead?**
A: Currently fixed design, matching traditional format

**Q: How many matches can I create?**
A: Unlimited! Each generates a new PDF

**Q: Works on iOS and Android?**
A: Yes! Works on all modern mobile browsers

---

## 🛠️ Troubleshooting

### App Won't Load:
- Check internet connection
- Clear browser cache
- Try different browser

### Can't Access on Phone:
- Verify same WiFi network
- Check firewall settings
- Try using Local URL instead

### PDF Not Generating:
- Fill required fields (names)
- Check browser permissions
- Try on different browser

### WhatsApp Share Not Working:
- On desktop: Use manual download
- On mobile: Check WhatsApp installed
- Try saving PDF first, then share

### Form Looks Weird:
- Check screen rotation (portrait recommended)
- Zoom in/out to fit screen
- Clear browser cache

---

## 📞 Support

For technical issues or questions:
1. Check this guide first
2. Review SETUP.md for installation issues
3. Check README.md for technical details

---

## 🙏 Traditional Note

This app is designed to help with the sacred process of matching horoscopes (జాతక మేళన). Please use it as a tool to complement traditional astrological consultation, not replace it.

**శుభం భవతు** (May it be auspicious!)

---

*Made with love for the Telugu community* ❤️

