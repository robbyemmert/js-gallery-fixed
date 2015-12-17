var $ = window.$ || window.jQuery;
if (!$) {
    throw new Error('module js-gallery-fixed requires jQuery on the global scope');
}

$(document).ready(() => {
    $('gallery').each((i, elm) => {
        let gallery = new FixedGallery(elm);
    });
});

module.exports = $;
