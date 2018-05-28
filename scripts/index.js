var HOME = 'home',
TERMINAL = 'terminal',
GIT = 'git',
PYTHON = 'python',
JAVASCRIPT = 'javascript',
HTML = 'html',
EDITORS = 'editors',
POSTS = 'posts',
CSS_GENERAL = 'css_general',
CSS_EFFECTS = 'css_effects',
CSS_ICONS = 'css_icons',
CSS_FONTS = 'css_fonts',
CSS_SVGS = 'css_svgs',
CSS_GRADIENTS = 'css_gradients',
CSS_FRAMEWORKS = 'css_frameworks'

location_has_changed()

function location_has_changed(){

    var browser_location = location.hash.substr(1)

    switch(browser_location){

        case '':

            var html_page = new Page('home', null, 'Home')

            break

        case HOME:
    
            var home_page = new Page('home', null, 'Home')
            
            break
    
        case TERMINAL:

          
            var pdfs = {link_href: 'https://drive.google.com/drive/folders/1RZq96RQHPSHXlLWpojqvYbj-q70uaOnJ?usp=sharing', link_name: 'terminal' }
            var terminal_page = new Page('terminal', pdfs, 'Terminal')
            
            break
    
        case GIT:

            var pdfs = {link_href: 'https://drive.google.com/drive/folders/1R9Jva2pJ6eDXZapg9vREZ_2NepMmVoLd', link_name: 'git' }
            var git_page = new Page('git', pdfs, 'Git and Github')
    
            break
    
        case PYTHON:
    
            var pdfs = {link_href: 'https://drive.google.com/drive/u/0/folders/10LSb-wYQUDX9gvAgQ1wrQF-o3Wp_2yIY', link_name: 'python' }
            var python_page = new Page('python', pdfs, 'Python')

            break
        
        case JAVASCRIPT:

            var javascript_page = new Page('javascript', null, 'Javascript')

            break
        
        case HTML:

            var pdfs = {link_href: 'https://drive.google.com/drive/folders/1phgTaKD7SVr0GCybSHdgb9QbWlUqXnRy?usp=sharing', link_name: 'html' }
            var html_page = new Page('html', pdfs, 'HTML')

            break

        case EDITORS:

            var editors_page = new Page('editors', null, 'Editors')

            break

        case POSTS:

            var posts_page = new Page('posts', null, 'Posts')

            break
    
    }

    //css
    switch(browser_location){
        
        case CSS_GENERAL:

            var css_general_page = new Page(CSS_GENERAL, null, 'CSS')

            break

        case CSS_EFFECTS:

            var css_effects_page = new Page(CSS_EFFECTS, null, 'Effects')

            break

        case CSS_ICONS:

            var css_icons_page = new Page(CSS_ICONS, null, 'Icons')

            break

        case CSS_FONTS:

            var css_fonts_page = new Page(CSS_FONTS, null, 'Fonts')

            break

        case CSS_SVGS:

            var css_svgs_page = new Page(CSS_SVGS, null, 'SVGs')

            break

        case CSS_GRADIENTS:

            var css_gradients_page = new Page(CSS_GRADIENTS, null, 'Gradients')

            break

        case CSS_FRAMEWORKS:

            var css_frameworks_page = new Page(CSS_FRAMEWORKS, null, 'Frameworks')

            break

    }
}

window.onhashchange = location_has_changed;






