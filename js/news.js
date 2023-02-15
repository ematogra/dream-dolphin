
// query selector for carousel slideshow
const track = document.querySelector('.carousel__track')
const slides = Array.from(track.children)
const nextButton = document.querySelector('.carousel__button--right')
const prevButton = document.querySelector('.carousel__button--left')
const slideWidth = slides[0].getBoundingClientRect().width

// arrange slides next to each other
const setSlidePos = (slide, i) => {
    slide.style.left = `${(slideWidth*i)}px`
}

// set slide position for each image, so they're in a row
slides.forEach(setSlidePos)

// func to move slide, depending upon whether user clicks left or right button
const moveSlide = (track, currentSlide, targetSlide) => {
    const amountToMove = targetSlide.style.left
    // move to the next slide
    track.style.transform = `translateX(-${amountToMove})`
    // remove class from current slide
    currentSlide.classList.remove('current-slide')
    // add class to next slide
    targetSlide.classList.add('current-slide')
}

// func to hide arrows, depending upon whether user is at start or end of image slideshow
const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden')
        nextButton.classList.remove('is-hidden')
    } else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove('is-hidden')
        nextButton.classList.add('is-hidden')
    } else {
        prevButton.classList.remove('is-hidden')
        nextButton.classList.remove('is-hidden')
    }
}


// when i click left, move slides to left
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide')
    const prevSlide = currentSlide.previousElementSibling
    const prevIndex = slides.findIndex(slide => slide === prevSlide)

    moveSlide(track, currentSlide, prevSlide)
    hideShowArrows(slides, prevButton, nextButton, prevIndex)
})


// when i click right, move slides to right
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide')
    const nextSlide = currentSlide.nextElementSibling
    const nextIndex = slides.findIndex(slide => slide === nextSlide)

    moveSlide(track, currentSlide, nextSlide)
    hideShowArrows(slides, prevButton, nextButton, nextIndex)
})



// References:

// Powell, K. (2019) How to code a carousel with HTML, CSS and JavaScript - From Scratch (Part 2), YouTube. YouTube. Available at: https://www.youtube.com/watch?v=gBzsE0oieio (Accessed: February 9, 2023). 
