const handlebars = window.handlebars || window.Handlebars;
const cache = {};

function get(name) {
    const promise = new Promise(function (resolve, reject) {

        // test if loaded in RAM already
        if (cache[name]) {
            resolve(cache[name]);
            return;
        }

        const url = `templates/${name}.handlebars`;

        $.get(url, function (html) {
            // use handlebars to convert objects to html
            const template = handlebars.compile(html);
            // load in RAM
            cache[name] = template;
            resolve(template);
        });
    });
    return promise;
}

export {
    get
};
