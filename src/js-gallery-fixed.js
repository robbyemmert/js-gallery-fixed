var $ = require('./modules/jqueryLoader.js');

class FixedGallery {
    constructor(element){
        this.queuedImages = [];
        this.imageBlocks = [];

        if (!(element instanceof $)) {
            element = $(element);
        }

        element.wrapInner('<div class="image-wrapper aspect"></div>');
        this.wrapper = element.find('.image-wrapper');

        element.find('gallery-image').each((i, img) => {
            let galleryImage = new GalleryImage(img);
            galleryImage.element.detach();
            this.queuedImages.push(galleryImage);
            this.insertImage(galleryImage);
        });

        this.element = element;
    }

    insertImage(img) {
        let blocks = this.wrapper.find('.image-block');
        if (blocks.length <= 0) {
            this.addBlock(this.wrapper, img);
        }
    }

    addBlock(context, img) {
        let type = (context[0].offsetWidth > context[0].offsetHeight) ? 'col' : 'row';
        let block = $(`<div class="image-block"></div>`);
        block.append(img.element);
        context.append(block);
    }
}

class GalleryImage {
    constructor(element){
        if (!(element instanceof $)) {
            element = $(element);
        }

        element.css('background-image', `url("${ element.attr('src') }")`);
        this.element = element;
    }
}

window.FixedGallery = FixedGallery;
