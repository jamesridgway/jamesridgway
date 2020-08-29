const fs = require('fs');
const Handlebars = require("handlebars");
const Parser = require('rss-parser');
const parser = new Parser();
 
(async () => {
 
    const feed = await parser.parseURL('https://www.jamesridgway.co.uk/rss/');

    const recentBlogPosts = feed.items.slice(0, 5).map(item => {
        return {
            title: item.title,
            link: item.link
        }
    });
    console.log(recentBlogPosts);

    const templateMarkdown = await fs.promises.readFile('README.tmpl.md', 'utf8');

    var template = Handlebars.compile(templateMarkdown);
    var rendered = template({recentBlogPosts});

    await fs.promises.writeFile('README.md', rendered, 'utf8');
 
})();