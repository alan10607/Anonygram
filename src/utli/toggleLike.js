const toggleLike = (id, no, isUserLike) => {
  return () => {
    const data = {id, no};
    if(isUserLike){
      dispatch(unlikeContent(data));
    }else{
      dispatch(likeContent(data));
    }
  }
}