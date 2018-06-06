/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {
    // set new global timeout to 10 seconds
    var originalTimeout;
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', ()=> {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', ()=> {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // each feed has a URL defined and it is not empty.
        it('url key is defined and it is not empty', ()=> {
            allFeeds.forEach( (key)=> {
                expect(key.url).toBeDefined();
            });
            // the url must not be empty
            expect(allFeeds).not.toContain(jasmine.objectContaining({url: '' }));
            // avoid containg a space as url
            expect(allFeeds).not.toContain(jasmine.objectContaining({url: ' ' }));
        });


        // each feed has a name defined and it is not empty.
        it('name key is defined and it is not empty', ()=> {
            allFeeds.forEach( (key)=> {
              expect(key.name).toBeDefined();
            });
            // the name must not be empty
            expect(allFeeds).not.toContain(jasmine.objectContaining({name: '' }));
            // avoid containg a space as name
            expect(allFeeds).not.toContain(jasmine.objectContaining({name: ' ' }));
        });
    });


    /* The menu section */
    describe('The menu', ()=> {

        // test if the menu element is hidden by default
        it('the menu element is hidden by default', ()=> {
            page = $(document.body);
            expect(page.hasClass('menu-hidden')).not.toBe(false);
        });

         // the menu changes visibility when clicked.
        it('menu changes visibility when clicked', ()=> {
            menu = $('a.menu-icon-link');
            page = $(document.body);

            // click on menu to open it
            menu.trigger('click');

            // the menu is not hidden
            expect(page.hasClass('menu-hidden')).toBe(false);

            // click on menu to close it
            menu.trigger('click');

            // the menu is hidden
            expect(page.hasClass('menu-hidden')).toBe(true);
        });
    });

    /* Initial Entries section */
    describe('Initial Entries', ()=> {
        // there is at least a single entry within each feed
        beforeEach( (done)=> {
            // calls Udacity Blog feed
            loadFeed(0, ()=> {} );
            // calls CSS Tricks feed
            loadFeed(1, ()=> {} );
            // calls HTML5 Rocks feed
            loadFeed(2, ()=> {} );
            // calls Linear Digressions feed
            loadFeed(3, ()=> { done(); } );
        });

        it("there is at least a single entry within each feed", ()=> {
          articles = $('.feed .entry').length;
          expect(articles).not.toBeLessThan(1);
        });
    });

    /* New Feed Selection section */
    describe('New Feed Selection', ()=> {

        // when a new feed is loaded the content changes.
        beforeEach( (done)=> {

            loadFeed (0, ()=> {
                udacityBlog = $('article.entry').text();
                loadFeed(1, ()=> {
                    cssTricks = $('article.entry').text();
                    loadFeed(2, ()=> {
                        html5Rocks = $('article.entry').text();
                        loadFeed(3, ()=> {
                            linearDigressions = $('article.entry').text();
                            done();
                        });
                    });
                });
            });
        });


        it('the content actually changes when any feed is loaded', ()=> {
            expect(cssTricks).not.toEqual(udacityBlog);
            expect(html5Rocks).not.toEqual(cssTricks);
            expect(linearDigressions).not.toEqual(html5Rocks);
        });
    });
}());
