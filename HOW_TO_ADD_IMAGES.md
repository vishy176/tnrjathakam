# 📸 How to Add Images to PDF

## ✅ Quick Steps

### 1. Add Your Image Files

Place your image files in the `public/images/` folder:

```
jathakam-app/
└── public/
    └── images/
        ├── ganesha.png          (Left side deity)
        ├── lakshmi-vishnu.png   (Right side deity 1)
        └── venkateswara.png     (Right side deity 2)
```

### 2. Image File Requirements

- **Formats:** PNG, JPG, JPEG, GIF, WebP
- **Recommended sizes:**
  - **Small (20mm):** 100-150px width
  - **Medium (30mm):** 200-250px width
  - **Large (50mm):** 300-400px width
- **Aspect ratio:** Maintain original (height auto-adjusts)

### 3. Current Image Placements

Images are automatically added in the **header section** of the PDF:

- **Left side:** Ganesha image (25mm wide)
- **Right side:** Two deity images side-by-side (20mm each)

---

## 🎨 Customizing Images

### Change Image File Names

Edit `src/PDFGenerator.jsx` around **line 292-297**:

```html
<!-- Left side image -->
<img src="/images/YOUR_FILE_NAME.png" alt="Description" class="header-image-left" onerror="this.style.display='none'">

<!-- Right side images -->
<img src="/images/YOUR_FILE_1.png" alt="Description" class="pdf-image-small" onerror="this.style.display='none'">
<img src="/images/YOUR_FILE_2.png" alt="Description" class="pdf-image-small" onerror="this.style.display='none'">
```

### Change Image Sizes

Edit `src/PDFGenerator.jsx` CSS section (around **line 135-146**):

```css
.header-image-left {
  width: 30mm;  /* Change this value */
  height: auto;
}

.header-image-right img {
  width: 25mm;  /* Change this value */
  height: auto;
}
```

Or use predefined classes:
- `pdf-image-small` - 20mm wide
- `pdf-image-medium` - 30mm wide
- `pdf-image-large` - 50mm wide

### Add Images in Other Locations

To add images elsewhere in the PDF (e.g., footer, middle section):

1. **Find the location** in `createPDFHTML()` function in `PDFGenerator.jsx`

2. **Add image tag:**
   ```html
   <img src="/images/your-image.png" class="pdf-image-small" alt="Description" onerror="this.style.display='none'">
   ```

3. **Position it** using CSS or inline styles

---

## 📝 Examples

### Example 1: Add Logo in Footer

In `PDFGenerator.jsx`, find the footer section and add:

```html
<div class="footer-contact">
  <img src="/images/logo.png" class="pdf-image-small" style="margin: 0 auto 5mm;" alt="Logo" onerror="this.style.display='none'">
  <div class="footer-contact-name">...</div>
</div>
```

### Example 2: Add Small Icon Next to Phone Numbers

```html
<span style="display: inline-flex; align-items: center; gap: 3mm;">
  <img src="/images/whatsapp-icon.png" style="width: 5mm; height: 5mm;" alt="WhatsApp">
  <span class="footer-phone">📱 WhatsApp: 9440 990 134</span>
</span>
```

### Example 3: Add Decorative Image Between Sections

```html
<div style="text-align: center; margin: 5mm 0;">
  <img src="/images/divider.png" class="pdf-image-medium" alt="Divider" onerror="this.style.display='none'">
</div>
```

---

## 🔧 Troubleshooting

### Image Not Showing?

1. **Check file path:** Must be `/images/filename.png` (not `images/` or `./images/`)
2. **Check file name:** Must match exactly (case-sensitive on some systems)
3. **Check file location:** Must be in `public/images/` folder
4. **Check format:** Use PNG, JPG, or JPEG formats
5. **Clear browser cache:** Refresh the page

### Image Too Large/Small?

Adjust the CSS width in `PDFGenerator.jsx`:
- `width: 20mm` - Small image
- `width: 30mm` - Medium image
- `width: 50mm` - Large image

### Image Not Loading in PDF?

- Make sure images are in `public/images/` folder (not `src/images/`)
- Check browser console for errors
- Verify image file is not corrupted
- Try different image format (PNG usually works best)

---

## 📂 Folder Structure

```
jathakam-app/
├── public/
│   ├── images/              ← Put images here
│   │   ├── ganesha.png
│   │   ├── lakshmi-vishnu.png
│   │   └── venkateswara.png
│   └── manifest.json
└── src/
    └── PDFGenerator.jsx     ← Edit image paths here
```

---

## 💡 Tips

1. **Use PNG for transparency** (no background)
2. **Optimize images** before adding (reduce file size)
3. **Use consistent sizes** for similar images
4. **Test on mobile** to ensure images load properly
5. **Keep file names simple** (lowercase, no spaces)

---

## 🎯 Quick Reference

| Location | Current Image | Size Class | CSS Variable |
|----------|--------------|------------|--------------|
| Header Left | Ganesha | `header-image-left` | 25mm |
| Header Right 1 | Lakshmi-Vishnu | `pdf-image-small` | 20mm |
| Header Right 2 | Venkateswara | `pdf-image-small` | 20mm |

---

**Ready to add your images?** Just place them in `public/images/` and they'll appear automatically! 🎉

