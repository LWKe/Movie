db.collection('movie_list').doc({}).get().then(res=>{
  // console.log(res.data.movieList[0]);
  this.setData({
    movie_list:res.data.movieList
  })
})