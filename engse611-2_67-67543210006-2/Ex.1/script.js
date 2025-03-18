document.addEventListener("DOMContentLoaded", function () {
    const mainImage = document.getElementById("mainImage");
    const thumbnails = document.querySelectorAll(".thumb");

    thumbnails.forEach(thumb => {
        thumb.addEventListener("click", function () {
            mainImage.src = this.src;  
        });
    });
});