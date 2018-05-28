
class Page {

    constructor(category, pdfs, page_title) {

        this.category = category
        this.posts_url = 'https://coding-resources-api.herokuapp.com/items/filter'
        this.page_title = page_title

        if(pdfs){
            this.pdfs = pdfs
        }
        else{
            this.pdfs = ""
        }
        
        this.add_nav_bar()
        this.add_posts_section()
        
    }

    add_nav_bar(){

        console.log(this.category)

        page_wrapper.innerHTML =  `

            <div class="container">

                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav">

                            <li class="nav-item ${this.category == 'home'? 'active' : '' }">
                                <a class="nav-link" href="#home">home <span class="sr-only">(current)</span></a>
                            </li>

                            <li class="nav-item ${this.category == 'terminal'? 'active' : '' }">
                                <a class="nav-link" href="#terminal">terminal <span class="sr-only">(current)</span></a>
                            </li>

                            <li class="nav-item ${this.category == 'git'? 'active' : '' }">
                                <a class="nav-link" href="#git">git <span class="sr-only">(current)</span></a>
                            </li>

                            <li class="nav-item ${this.category == 'python'? 'active' : '' }">
                                <a class="nav-link" href="#python">python <span class="sr-only">(current)</span></a>
                            </li>

                            <li class="nav-item ${this.category == 'javascript'? 'active' : '' }">
                                <a class="nav-link" href="#javascript">javascript <span class="sr-only">(current)</span></a>
                            </li>

                            <li class="nav-item ${this.category == 'html'? 'active' : '' }">
                                <a class="nav-link" href="#html">HTML <span class="sr-only">(current)</span></a>
                            </li>

                            <li class="nav-item ${this.category == 'editors'? 'active' : '' }">
                                <a class="nav-link" href="#editors">editors <span class="sr-only">(current)</span></a>
                            </li>

                            <li class="nav-item ${this.category == 'posts'? 'active' : '' }">
                                <a class="nav-link" href="#posts">posts <span class="sr-only">(current)</span></a>
                            </li>

                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    CSS
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <a class="dropdown-item ${this.category == 'css_general'? 'active' : '' }" href="#css_general">general</a>
                                    <a class="dropdown-item ${this.category == 'css_effects'? 'active' : '' }" href="#css_effects">effects</a>
                                    <a class="dropdown-item ${this.category == 'css_icons'? 'active' : '' }" href="#css_icons">icons</a>
                                    <a class="dropdown-item ${this.category == 'css_fonts'? 'active' : '' }" href="#css_fonts">fonts</a>
                                    <a class="dropdown-item ${this.category == 'css_svgs'? 'active' : '' }" href="#css_svgs">svgs</a>
                                    <a class="dropdown-item ${this.category == 'css_gradients'? 'active' : '' }" href="#css_gradients">gradients</a>
                                    <a class="dropdown-item ${this.category == 'css_frameworks'? 'active' : '' }" href="#css_frameworks">frameworks</a>
                                </div>
                            </li>
                        
                        </ul>
                    </div>
                </nav>

                <hr class="my-4">
                <h2>${this.page_title}</h2>
                <hr class="my-4">

                ${ this.pdfs? `<div class="row">
                    <div class="col">
                     
                        <div class="alert alert-primary" role="alert">
                            <a href="${this.pdfs.link_href}" class="alert-link"> download</a> ${this.page_title} pdfs, these are hosted on google drive
                        </div>
                         
                    </div>
                </div>` : ''}           

            </div>
        
        `

    }

    add_posts_section(){

        page_wrapper.innerHTML += `<div id="posts" class="container"></div>`

        this.get_posts()

    }

    get_posts(){


        var posts_wrapper = document.getElementById("posts")

        var posts_row = document.createElement("div")
        posts_row.id = "posts_row"
        posts_row.className = "row"

        posts_row.innerHTML = `
            <div class="container">

                <div class="">
                    <div class="loading_icon" style="100%;height:100%">
                    <div style="left:38px;top:38px;animation-delay:0s"></div>
                    <div style="left:80px;top:38px;animation-delay:0.125s"></div>
                    <div style="left:122px;top:38px;animation-delay:0.25s"></div>
                    <div style="left:38px;top:80px;animation-delay:0.875s"></div>
                    <div style="left:122px;top:80px;animation-delay:0.375s"></div>
                    <div style="left:38px;top:122px;animation-delay:0.75s"></div>
                    <div style="left:80px;top:122px;animation-delay:0.625s"></div>
                    <div style="left:122px;top:122px;animation-delay:0.5s"></div>
                </div> 
                <div><p>contacting the server, this may take a moment...</p></div>

            </div>
            
        `

        posts_wrapper.appendChild(posts_row)

        $.ajax({
            method: "POST",
            url: this.posts_url,
            data: {category: this.category},
            success: (response)=>{

                if(response){

                    if(response.length > 0 && response[0]){
                        if(response[0].title){

                            this.generate_posts(response, posts_wrapper, posts_row)

                            return

                        }
                    }

                }
                
                page_wrapper.innerHTML += `
                    <div class="container">
                        <p>no posts have been made to the ${this.page_title} page</p>
                    </div>
            
                `

                var posts_row_element = document.getElementById("posts_row")
                posts_row_element.innerHTML = ``

            },
            async: true
        })

    }

    generate_posts(posts_data, posts_wrapper, posts_row){

        posts_row.innerHTML = ''

        var posts_html = ''

        for(var post_index = 0; post_index < posts_data.length; post_index++){

            var post_data = posts_data[post_index]

            const { title, description, link_href, link_name } = post_data

            var post_element = `
            
                <div class="col">
                    
                    <div class="card m-1">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${description}</p>
                            ${link_href? `<a href="${link_href}" class="">${link_name}</a>` : ''}
                        </div>
                    </div>

                </div>
            
            `

            posts_row.innerHTML += post_element

        }

        posts_wrapper.appendChild(posts_row)

    }

}
