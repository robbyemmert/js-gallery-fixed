var $ = require('./modules/jqueryLoader.js');

class FixedGallery {
    constructor(element){
        if (!(element instanceof $)) {
            element = $(element);
        }
    }
}
