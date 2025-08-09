
const fs = require('fs');
const path = require('path');
const marked = require('marked');

const categories = ['writeups', 'misc'];
const postsData = {};

categories.forEach(category => {
    const folderPath = path.join(__dirname, 'posts', category);
    const files = fs.readdirSync(folderPath);

    postsData[category] = files.map(file => {
        const filePath = path.join(folderPath, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const htmlContent = marked.parse(content);

        const slug = file.replace('.md', '');
        const htmlFilePath = path.join(__dirname, `${slug}.html`);


        fs.writeFileSync(htmlFilePath, `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <title>${slug}</title>
                <link rel="stylesheet" href="style.css">
            </head>
            <body>
                <header>
                    <a href="index.html">Inicio</a> | 
                    <a href="${category}.html">${category}</a>
                </header>
                <main>${htmlContent}</main>
            </body>
            </html>
        `);

        return {
            title: slug,
            file: file,
            url: `${slug}.html`
        };
    });
});

fs.writeFileSync(path.join(__dirname, 'posts.json'), JSON.stringify(postsData, null, 2));
console.log("✅ Posts.json generado con éxito");

