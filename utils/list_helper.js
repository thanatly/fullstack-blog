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

const mostLikes = (blogs) => blogs
  .reduce(({sums,most}, {likes, author}) => {
    sums[author] = likes = (sums[author] || 0) + likes;
    if (likes > most.likes) most = {author,likes};
    return {sums,most};
  }, {sums: {}, most: {likes:0} })
  .most;

module.exports = {
  totalLikes,
  favoriteBlog,
  mostLikes
}

