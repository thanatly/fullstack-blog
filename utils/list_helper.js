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
  
  module.exports = {
    totalLikes
  }

