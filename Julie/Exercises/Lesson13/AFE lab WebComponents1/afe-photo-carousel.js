class PhotoCarousel extends HTMLElement {
    connectedCallback() {
        this._photoIndex = 0;   //keep track of which photo is displayed
        this._photos = this.getAttribute('photos').split(',');  //array containing photos
        this.innerHTML = '<h2>' + this.getAttribute('title') + '</h2>' +
            '<h4>by ' + this.getAttribute('author') + '</h4>' +
            '<div class="image-container"></div>' +
            '<button class="back">&lt</button>' +
            '<button class="forward">&gt</button>'; // definint basic structure of the HTML, with authoer as header, image, back and forward buttons 

        this.showPhoto(); // display first photo

        this.querySelector('button.back').addEventListener('click', event =>
            this.onBackButtonClick(event)); // decrements _photoIndex to show previous image
        this.querySelector('button.forward').addEventListener('click', event =>
            this.onForwardButtonClick(event)); // increments _photoIndex to show next image
    }

    showPhoto() {
        this.querySelector('.image-container').style.backgroundImage = 'url(' +
            this._photos[this._photoIndex] + ')'
    }

    /**
     * handler for when user clicks the back button
     * @param event
     */
    onBackButtonClick(event) {
        this._photoIndex--;
        if (this._photoIndex < 0) {
            this._photoIndex = this._photos.length - 1;
        }
        this.showPhoto();
    }
    
    /**
     * handler for when user clicks the forward button
     * @param event
     */
    onForwardButtonClick(event) {
        this._photoIndex++;
        if (this._photoIndex >= this._photos.length) {
            this._photoIndex = 0;
        }
        this.showPhoto();
    }
}
if (!customElements.get('afe-photo-carousel')) {
    customElements.define('afe-photo-carousel', PhotoCarousel);
}