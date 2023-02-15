
// here I am fetching the albums released for the artist by using the Discogs API (https://www.discogs.com/developers) - pulling in album name, tracklist and album image. I make several API calls, as first I need to fetch the data about the artist containing the release IDs, then make an API call per release using the release ID.

// add options for fetch - oauth key & user-agent, required by discogs API
const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'OAuth oauth_consumer_key="hysKJIoxMLdHSpTXIYQg", oauth_nonce="670798321", oauth_timestamp="1675587615", oauth_signature_method="PLAINTEXT", oauth_version="1.0", oauth_signature="KoCrgebGJaMhxfWYyYjhNvAROktauSWY&XBvZtcuKpUVYRyrsgYKkjcoRGHmwmrPLOhUKdUAv", oauth_verifier="JDKPrmdBNd", oauth_token="ckXuaNBvHlPeckTdEojzersSJkdPTHIxHjntbUSs"',
      'User-Agent': 'DreamDolphinApp/0.1'
    }
  }

let jsonData = ""
const apiUrl = "https://api.discogs.com/artists/597407/releases"

// func to make an initial API call to get the release IDs of the artist
const getAlbums = async (url, opt) => {
    let response = await fetch(url, opt)
    let data = await response.json()
    // store the release IDs in array, then if the release ID is an album, call the getRelease func on it
    let releasesArr = data.releases
    for (release of releasesArr) {
        if (release.format == "CD, Album") {
            await getRelease(release.resource_url)
        }
    }
}

// funct to get the release info of the particular release ID and run the displayData func on it
const getRelease = async (releaseID) => {

    let relUrl = `${releaseID}`

    const response = await fetch(relUrl, options)
    let data = await response.json()
    displayData(data, "releases")
    
}

// function to add data from json to html
displayData = (data, element) => {
    let mainContainer = document.getElementById(element) 

    let content = `
        <div class="album">
        <div class="title-year">${data.title} (${data.year})</div>
        <div class="image-tracklist-container">
        `
        
    let url = data.images[0].resource_url
    
    content += `
    <div class="image"><img class ="album-img" src="${url}"></div>
    <div class="tracklist"><ol type="1">`

    const tracks = data.tracklist
    tracks.forEach((track) => {
        content += `
        <li>${track.title}</li>`
    })
    
    content += `
    </ol></div></div>`

    mainContainer.innerHTML += content
}

// call getAlbums func, with options created earlier
getAlbums(apiUrl, options)


// References:

// Discogs API Documentation. Available at: https://www.discogs.com/developers (Accessed: February 15, 2023). 


