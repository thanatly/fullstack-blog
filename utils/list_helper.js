const _ = require('lodash');

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

const mostBlogs = (blogs) => { 
const authorMostBlogs =
  _.chain(blogs)
  .map('author')
  .flatten()
  .countBy()
  .entries()
  .maxBy(_.last)
  .value()

const desiredFormat = {
  "author": authorMostBlogs[0],
  "blogs": authorMostBlogs[1]
}

return desiredFormat

}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostLikes,
  mostBlogs
}

