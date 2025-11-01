# 📸 Adding Images to PDF

## How to Add Images

1. **Place your image files in this folder** (`public/images/`)

2. **Current placeholder images:**
   - `ganesha.png` - Left side deity image (Ganesha)
   - `lakshmi-vishnu.png` - Right side deity image 1
   - `venkateswara.png` - Right side deity image 2

3. **Supported formats:** PNG, JPG, JPEG, GIF, WebP

4. **Recommended sizes:**
   - Small images (20mm): 100-150px width
   - Medium images (30mm): 200-250px width  
   - Large images (50mm): 300-400px width

## Customizing Image Sizes

Edit `src/PDFGenerator.jsx` and modify the CSS classes:
- `.header-image-left` - Left side image width
- `.header-image-right img` - Right side images width
- `.pdf-image-small` - 20mm width
- `.pdf-image-medium` - 30mm width
- `.pdf-image-large` - 50mm width

## Adding More Images

To add images in other parts of the PDF:

1. **In the HTML template** (inside `createPDFHTML` function):
   ```html
   <img src="/images/your-image.png" class="pdf-image-small" onerror="this.style.display='none'">
   ```

2. **Use appropriate CSS class:**
   - `pdf-image-small` - 20mm wide
   - `pdf-image-medium` - 30mm wide
   - `pdf-image-large` - 50mm wide
   - Or create custom size

## Notes

- Images are referenced from `/images/` (public folder)
- Use `onerror="this.style.display='none'"` to hide if image not found
- Images will automatically scale to fit the PDF width

