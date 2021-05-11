# Impressionist Artworks at The Art Institute of Chicago
## Overview
***Impressionist Artworks at The Art Institute of Chicago*** is a coding challenge for MIT xPRO [Front-End Development with React](https://executive-ed.xpro.mit.edu/front-end-development-react?utm_source=Google&utm_medium=c&utm_term=%2Bmit%20%2B%20react&utm_location=9033313&utm_campaign=B-365D_US_GG_SE_FREN_Brand&utm_content=MIT-Front-End-Development&gclid=Cj0KCQjwsqmEBhDiARIsANV8H3Y7VF1IsEfTGFApZ8oXItAFXl_Kjvnipt8rh6ji4XkwSCj-3m3z6tIaAnHGEALw_wcB) program.

This exercise has the following goals:
* Fetch, and render data from external source with React
* Have practice with [Axios](https://github.com/axios/axios) library
* Have practice with [useEffect](https://reactjs.org/docs/hooks-effect.html) and [useReducer](https://reactjs.org/docs/hooks-reference.html) React hooks
* Create client-side pagination

The data for this project is retrieved from [Art Institute of Chicago API](https://api.artic.edu/docs/).
## Features
***Impressionist Artworks at The Art Institute of Chicago*** project has the following features:
* Users are able to select impressionist artists from dropdown list
* List of artworks for selected artist is downloaded using [Art Institute of Chicago API](https://api.artic.edu/docs/)
* Images are downloaded using [](https://iiif.io/api/image/2.0/)
* Data is paginated with one artwork per page
* For each artwork, title and image are displayed
* Each artwork's title is a link to the page with more detailed information about the artwork

![image](https://user-images.githubusercontent.com/53233637/117896878-67113c80-b276-11eb-97d2-d5a592384106.png)

### API Calls
To get the list of artworks for an artist, the following API query is used:
```
https://api.artic.edu/api/v1/artworks/search?q={artist}&&fields=id,title,image_id
```
The response looks like this:
```
"data": [
  {
    "_score": 254.86807,
    "id": 16568,
    "image_id": "3c27b499-af56-f0d5-93b5-a7f2f1ad5813",
    "title": "Water Lilies"
  }
]
```
To get images, the following URL is used:
```
https://www.artic.edu/iiif/2/{image_id}/full/843,/0/default.jpg
```
## Getting Started
To run the project locally,
1. Clone this repo.
2. ```cd``` into current directory.
3. Run ```index.html``` on local server.
