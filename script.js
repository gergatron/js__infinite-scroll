const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let isInitialLoad = true 

let ready = false 
let imagesLoaded = 0
let totalImages = 0
let photosArray = [] 
let initialLoad = true 

// Unsplash API
let count = 5
const apiKey = 'EU3mL6n4zr8-2MyDFIWQaQFjgHdgxqQbTfECbEdg-qw'
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`

function updateAPIURLWithNewCount (picCount) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++
  if (imagesLoaded === totalImages) {
    ready = true
    loader.hidden = true
  }
}

// Helper function to set attributes on DOM elements 
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}


// Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0
  totalImages = photosArray.length
  console.log('total images', totalImages)
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash 
    const item = document.createElement('a')
    // item.setAttribute('href', photo.links.html)
    // item.setAttribute('target', '_blank')
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    })
    // Create <img> for photo
    const img = document.createElement('img')
    // img.setAttribute('src', photo.urls.regular)
    // img.setAttribute('alt', photo.alt_description)
    // img.setAttribute('title', photo.alt_description)
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description, 
    })
    // Event listener, check when each is finished loading 
    img.addEventListener('load', imageLoaded)
    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img)
    imageContainer.appendChild(item)
  })
}


// Get Photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiURL) 
    photosArray = await response.json()
    displayPhotos()
    if (isInitialLoad) {
      updateAPIURLWithNewCount(30)
      isInitialLoad = false
    }
  } catch (error) {
    // error
  }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false 
    getPhotos()
  }
})

// On Load 
getPhotos() 