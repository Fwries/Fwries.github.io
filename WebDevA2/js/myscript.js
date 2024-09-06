// Menu Code
function MenuFunc() { // Check if normal size or smaller size
  var x = document.getElementById("myTopnav");
  if (x.className == "topnav") { x.className += " responsive"; }
  else { x.className = "topnav"; }
}
// End of Menu Code

// Carousel Code
let slideIndex = 1; // Start Carousel at slide 1
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

setInterval(function(){plusSlides(1)}, 3000); // Next slide every 3secs

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("Slide");
  if (n > slides.length) {slideIndex = 1} // If more than length of slide set to 1
  if (n < 1) {slideIndex = slides.length} // If less than 0 set to last slide
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"; // Hide Slide
  }
  slides[slideIndex-1].style.display = "block"; 
}
// End of Carousel Code