# video-thumbnailer

Video thumbnails from Core Media documents

## Usage

Open up the `index.html` page and append a query string with the id of a Core Media video document: `?id=9876543210`.

If the query string contains a value for `originalLinkTarget` (which `news-core`'s thumbnail functionality does automatically), the entire thumbnail will link to that URL, e.g.: `?id=9876543210&originalLinkTarget=https://abc.net.au/news/`.

## Volume setting for homepage collection

`ARTICLE_CMID_OR_POSITION(image-full,interactive,data:{"i":"video-thumbnailer/latest/?id=VIDEO_CMID"})`

## Development

Every release also deploys to /res/sites/news-projects/video-thumbnailer/latest/ on ContentFTP, so we need to bust a coupld of URLs in our Akamai cache, to ensure that resources referenced by the above volume setting are not stale:

```
https://www.abc.net.au/res/sites/news-projects/video-thumbnailer/latest/
https://www.abc.net.au/res/sites/news-projects/video-thumbnailer/latest/index.html
https://www.abc.net.au/res/sites/news-projects/video-thumbnailer/latest/index.js
```

## Authors

- Colin Gourlay ([Gourlay.Colin@abc.net.au](mailto:Gourlay.Colin@abc.net.au))

A project generated from [aunty](https://github.com/abcnews/aunty)'s `basic` project template.
