const api_key="7b7ef4bc991d4d9294016dd572b371b1";
const url="https://newsapi.org/v2/everything?q=";
window.addEventListener("load",()=>fetchNews("India"));
function reload(){
    window.location.reload();
}
async function fetchNews(query){
    const res=await fetch(`${url}${query}&apikey=${api_key}`);
    const data= await res.json();
    bindData(data.articles)
    console.log(data);
}
function bindData(articles){
    const cardscontainer=document.getElementById('cards-container');
    const newsCardtemplete=document.getElementById('templete-news-card')
    cardscontainer.innerHTML='';
    articles.forEach(article=> {
        if(!article.urlToImage) return;
        const cardclone=newsCardtemplete.content.cloneNode(true);
        fillDataInCard(cardclone,article);
        cardscontainer.appendChild(cardclone);
        
    });

}
function fillDataInCard(cardclone,article){
    const newsImg=cardclone.querySelector('#news-img');
    const newsTitle=cardclone.querySelector('#news-title');
    const newsSource=cardclone.querySelector('#news-sourse');
    const newsDesc=cardclone.querySelector('#news-desc');
    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;
    const data=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });
   newsSource.innerHTML=`${article.source.name} . ${data}`
   cardclone.firstElementChild.addEventListener("click",()=>{
    window.open(article.url,"_blank");
   })

}
let currentSelectedNav=null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav=navItem;
    currentSelectedNav.classList.add('active');
}

const searchbtn=document.getElementById('search-btn');
const searchText=document.getElementById('news-input');
searchbtn.addEventListener('click',()=>{
    const q=searchText.value;
    if(!q) return;
    fetchNews(q);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav=null;

})