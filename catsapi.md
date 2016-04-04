#cats api

##GET '/' or '/cats'

return all the cats

example rsponse:{
  cats:[{},{}]
}

##POST '/' or '/cats'

return one cat been created

example rsponse:{
  cats:[{}]
}

##GET '/cats/:id'

return one cat with the id

example rsponse:{
  cats:[{}]
}

##DELETE '/cats/:id'

return one cat with the id been deleted

example rsponse: 'deleted successfully'
