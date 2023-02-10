



let jsonData = ""
const apiUrl = "https://api.discogs.com/artists/597407/releases"



let requestH = new Headers()
requestH.append('Content-Type', 'application/x-www-form-urlencoded')
requestH.append('Authorization', 'OAuth oauth_consumer_key="hysKJIoxMLdHSpTXIYQg", oauth_nonce="670798321", oauth_timestamp="1675587615", oauth_signature_method="PLAINTEXT", oauth_version="1.0", oauth_signature="KoCrgebGJaMhxfWYyYjhNvAROktauSWY&XBvZtcuKpUVYRyrsgYKkjcoRGHmwmrPLOhUKdUAv", oauth_verifier="JDKPrmdBNd", oauth_token="ckXuaNBvHlPeckTdEojzersSJkdPTHIxHjntbUSs"')
requestH.append('User-Agent', 'PostmanRuntime/7.30.0')




let req = new Request(apiUrl, {
    method: 'GET',
    headers: requestH,
    mode: 'cors'
})


const getAlbums = async (url) => {
    let response = await fetch(url)
    let data = await response.json()
    let releasesArr = data.releases
    for (release of releasesArr) {
        if (release.format == "CD, Album") {
            await getRelease(release.resource_url)
        }
    }
}

const getRelease = async (releaseID) => {

    let relUrl = `${releaseID}`

    let reqRelease = new Request(relUrl, {
        method: 'GET',
        headers: requestH,
        mode: 'cors'
    })

    const response = await fetch(reqRelease)
    let data = await response.json()
    displayData(data, "releases")
    
}

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

// const main = async () => {
//     await getAlbums(req)
// }

// main()

getAlbums(req)
