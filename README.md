# Nyantown

We're going to extend [Meowtown](http://meowtown.herokuapp.com/cats) that was written by [Eugene](https://github.com/data-doge).

We'll do this by using the flickr API to get more photos of cats, so the user doesn't have to provide their own link.

## Release 1

For Release 1, open the `cats.js` file and complete the two functions, one to write the `cats` object out to a file using `fs`, and the other to read that file and return the object. You'll want to convert (`stringify`) the object into JSON before writing it to the file, and `parse` it back to a JavaScript object after reading it from the file.

There are tests to see if you've successfully coded your functions. You can run them with `npm test`. When both tests pass, you've successfully completed Release 1. (Don't change the tests.)

## Release 2

We need to provide some cats to choose from. Currently, the "Cat Generator" form on the [new](http://localhost:3000/cats/new) page takes the URL of a cat photo. Your job is to use Flickr's API to retrieve photos with the tag `cat`.

You'll need to sign up on Flickr if you aren't already, and then read the [API documentation](https://www.flickr.com/services/api/) to see how to use the API. After you sign up and receive an API key and secret, create a `.env` file in the project root folder and add the following, replacing `<your api key>` with your Flickr API key:

```
FLICKR_APP_KEY=<your api key>
```

The read the instructions on the [search](https://www.flickr.com/services/api/flickr.photos.search.html) page. You'll also want to read up on [request](https://www.npmjs.com/package/request), we'll bet.

Now implement the code in the `cats.js` file to make the API request, and pass the body back to the caller. Then use this `getCatPhotoLinks` (remember to use a callback) in the `new` route (`GET /cats/new`) to provide the cats JSON to the `new.hbs` template, and in the template use the JSON to create a cat photo selector to replace the Image URL field.

Then make the form work, so that the user can create a new cat, which gets saved to the `db/cats.json` file. Got it?

Then go to `tests/cat-test.js` and finish the third test as directed (you're testing that your whole integrated call to `/cats/new` works).


## Newtown

Number | Name
-------|------
1      | [REST](http://www.restapitutorial.com/lessons/whatisrest.html)
2      | [Express](http://expressjs.com/)
3      | [Handlebars](http://handlebarsjs.com/)
4      | [Eugene](http://fuckafucka.com)
5      | [fs](https://nodejs.org/api/fs.html) (file system)
6      | [path](https://nodejs.org/api/path.html)
7      | [tape](https://github.com/substack/tape)
8      | [request](https://www.npmjs.com/package/request)
9      | [Flickr API explorer](https://www.flickr.com/services/api/explore/flickr.photos.search)
10     | [Nyancat](http://www.nyan.cat/original)
=======
# meotown

