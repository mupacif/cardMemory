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

/**
 * List of all history
 */
Router.route('/books/story', {
    name: 'history',
});


/**
 * List of local history
 */
Router.route('/books/localStory/:id', {
    name: 'LocalHistory',
    template: "LocalHistory",

    data: function(){
        return {id:this.params.id}
    }
});