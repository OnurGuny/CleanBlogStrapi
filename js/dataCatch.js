const postArea=document.querySelector(".addPosts")
const prefixUrl="http://localhost:1337/api/"
const postTitle=document.querySelector("#postTitle")
const slug=document.querySelector("#slug")

async function loadData(){
    let posts=await fetch(prefixUrl+"posts?populate=user").then(x=>x.json())
    renderData(posts.data)
}
function renderData(data){
    data.forEach(post => {
        postArea.innerHTML+=`
        <div class="post-preview">
            <a href="#/posts/${post.id}" >
                <h2 class="post-title" id="${post.id}">${post.attributes.title}</h2>
                <h3 class="post-subtitle">${post.attributes.summary}</h3>
                <p>Posted by ${post.attributes.user.data.attributes.username} on ${post.attributes.updatedAt.substr(0,10)} </p>
            </a>
        </div>
        `   
    });
    window.addEventListener("hashchange",()=>{
       let url=location.hash.substr(2)
       if(url===""){
            loadData()
       }else{
        fetch(prefixUrl+url)
            .then(response=>response.json())
            .then(result=>{
                postArea.innerHTML=`
                <div class="post-preview">
                    <p>${result.data.attributes.content} </p>
                </div>
                `
                postTitle.textContent=result.data.attributes.title
                slug.textContent=result.data.attributes.summary
            })
            
            
       }
    } )
}

loadData()