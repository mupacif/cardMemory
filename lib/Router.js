Router.configure({
    layoutTemplate: 'mainLayout'
});

Router.route('/', {
    name: 'main'
});

Router.route('/book', {
    name: 'book',
    template:'book'
});

Router.route('/books', {
    name: 'links',
    template:'links'
});