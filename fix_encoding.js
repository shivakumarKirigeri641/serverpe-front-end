const fs = require('fs');
const path = require('path');

const files = [
    'src/pages/PurchaseDetails.jsx',
    'src/pages/PurchaseHistory.jsx',
    'src/pages/Profile.jsx',
    'src/pages/PurchasePages.jsx'
];

files.forEach(file => {
    const filePath = path.resolve(file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        // Remove BOM if present
        if (content.charCodeAt(0) === 0xFEFF) {
            content = content.slice(1);
            console.log(`Removed BOM from ${file}`);
        }
        // Force write as UTF-8
        fs.writeFileSync(filePath, content, { encoding: 'utf8' });
        console.log(`Rewrote ${file} as UTF-8`);
    } else {
        console.log(`File not found: ${file}`);
    }
});
