function amount(item){
return item.likes;
}

function sum(prev, next){
return prev + next;
}

const totalLikes = (blogs)  => {
    return blogs.length === 0
    ? 0
    : blogs.map(amount).reduce(sum);
}

const favoriteBlog = (blogs) => {
    let favBlog = null
    if (blogs.length != 0)
    {
        favBlog = blogs.reduce((max,blog)=> max.likes> blog.likes? max:blog)
        delete favBlog.__v
        delete favBlog._id
        delete favBlog.url  
    }
    return favBlog
}
  module.exports = {
    totalLikes,
    favoriteBlog
  }

