import markdownItAnchor from "markdown-it-anchor";
import markdownIt from "markdown-it";
import markdownItFootnote from 'markdown-it-footnote';
import { DateTime } from "luxon";
import markdownItEleventyImg from "markdown-it-eleventy-img";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginBundle from "@11ty/eleventy-plugin-bundle";
import pluginNavigation from "@11ty/eleventy-navigation";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import embedEverything from "eleventy-plugin-embed-everything";
import pluginDrafts from "./eleventy.config.drafts.js";
import pluginImages from "./eleventy.config.images.js";
import { execSync } from 'child_process';
import metadata from "./_data/metadata.js";

import path from "path"; // not sure how this works, but it does

export default function (eleventyConfig) {
	// Copy the contents of the `public` folder to the output folder
	// For example, `./public/css/` ends up in `_site/css/`
	eleventyConfig.addPassthroughCopy({
		"./public/": "/",
		"./node_modules/prismjs/themes/prism-okaidia.css": "/css/prism-okaidia.css"
	});

	// Run Eleventy when these files change:
	// https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

	// Watch content images for the image pipeline.
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");

	// App plugins
	eleventyConfig.addPlugin(pluginDrafts);
	eleventyConfig.addPlugin(pluginImages);

	// Official plugins
	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: { tabindex: 0 }
	});
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPlugin(pluginBundle);

	// Filters
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).setLocale("fr").toFormat(format || "dd LLLL yyyy");
	});

	eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if(!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if( n < 0 ) {
			return array.slice(n);
		}
		return array.slice(0, n);
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Return all the tags used in a collection
	eleventyConfig.addFilter("getAllTags", collection => {
		let tagSet = new Set();
		for(let item of collection) {
			(item.data.tags || []).forEach(tag => tagSet.add(tag));
		}
		return Array.from(tagSet);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "nav", "post", "posts", "bySize", "archive"].indexOf(tag) === -1);
	});

	eleventyConfig.addFilter("getAllTags", collection => {
		let tagSet = new Set();
		for(let item of collection) {
			(item.data.tags || []).forEach(tag => tagSet.add(tag));
		}
		return Array.from(tagSet);
	});


  // Sorted collection by n of posts; 
  	eleventyConfig.addCollection('bySize', (collectionApi) => {
	const filterTag = "posts"
    const allPosts = collectionApi.getFilteredByTag(filterTag) 
    const countPostsByTag = new Map()
    allPosts.forEach((post) => {
      const tags = post.data.tags || []
      tags.forEach((tag) => {
		if (tag !== filterTag) {
			const count = countPostsByTag.get(tag) || 0
			countPostsByTag.set(tag, count + 1)
		}
      })
    })
	const sortedArray = [...countPostsByTag].sort((a, b) => b[1] - a[1]) //needs to remove "posts" tag
    return sortedArray 
  	});

	// Authors for archive
	eleventyConfig.addFilter('authorFilter', function(collection, author) {
	if (!author) {return collection}
		const filtered = collection.filter(item => item.data.author == author)
		return filtered;
	  });

	// Amend md library
	eleventyConfig.setLibrary("md", markdownIt ({html: true,
		breaks: true,
		linkify: true}));

	// Customize Markdown library settings:
	//const path = require("path"); 

	eleventyConfig.amendLibrary("md", mdLib => {

		mdLib.use(markdownItAnchor, {
			permalink: markdownItAnchor.permalink.ariaHidden({
				placement: "after",
				class: "header-anchor",
				symbol: "#",
				ariaHidden: false,
			}),
			level: [1,2,3,4],
			slugify: eleventyConfig.getFilter("slugify")
		});

		mdLib.use(markdownItFootnote); 		// add markdown footnotes

		mdLib.use(markdownItEleventyImg, { 	//add markdown image
			resolvePath: (filepath, env) => path.join(path.dirname(env.page.inputPath), filepath),
			globalAttributes: {
				sizes: "100vw",
				decoding: "async"
			},
			imgOptions: {
			widths: [800, "auto"],
			outputDir: "docs/img/", // this doesn't keep the folder structure so needs path change
			urlPath: "/img/", 		// path change mentionned above
		},
		renderImage(image, attributes) {
			const [ Image, options ] = image;
			const [ src, attrs ] = attributes;
		
			Image(src, options);
		
			const metadata = Image.statsSync(src, options);
			const imageMarkup = Image.generateHTML(metadata, attrs, {
				whitespaceMode: "inline"
			});
		
			return `<figure>${imageMarkup}${attrs.title ? `<figcaption>${attrs.title}</figcaption>` : ""}</figure>`;
			}
		}); 
	});

	// add yt embedd
	eleventyConfig.addPlugin(embedEverything);

	// add excerpt
	// use with <p>{{ post.templateContent | excerpt }}</p>
	eleventyConfig.addFilter("excerpt", (post) => {
		const content = post.replace(/(<([^>]+)>)|#|&quot;/gi, "");
		return content.substr(0, content.lastIndexOf(" ", 250)) + "...";
	  });

	// add search
	// if it crashes, do pagefind command after your Eleventy site build script has finished instead of in the after event.
	eleventyConfig.on('eleventy.after', () => {
		execSync(`npx pagefind --glob \"**/*.html\"`, { encoding: 'utf-8' })
	})
	
	//RSS plugin
	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom", // or "rss", "json"
		outputPath: "/feed.xml",
		collection: {
			name: "posts", // iterate over `collections.posts`
			limit: 10,     // 0 means no limit
		},
		metadata
	});

	// Features to make your build faster (when you need them)

	// If your passthrough copy gets heavy and cumbersome, add this line
	// to emulate the file copy on the dev server. Learn more:
	// https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

	// eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

	return {
		// Control which files Eleventy will process
		// e.g.: *.md, *.njk, *.html, *.liquid
		templateFormats: [
			"md",
			"njk",
			"html",
			"liquid",
		],

		// Pre-process *.md files with: (default: `liquid`)
		markdownTemplateEngine: "njk",

		// Pre-process *.html files with: (default: `liquid`)
		htmlTemplateEngine: "njk",

		// These are all optional:
		dir: {
			input: "content",          // default: "."
			includes: "../_includes",  // default: "_includes"
			data: "../_data",          // default: "_data"
			output: "docs"
		},

		// -----------------------------------------------------------------
		// Optional items:
		// -----------------------------------------------------------------

		// If your site deploys to a subdirectory, change `pathPrefix`.
		// Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

		// When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
		// it will transform any absolute URLs in your HTML to include this
		// folder name and does **not** affect where things go in the output folder.
		pathPrefix: "",
	};
};
