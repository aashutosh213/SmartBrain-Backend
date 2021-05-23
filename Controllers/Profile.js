const handleProfileGet =(req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})
    .then(user => {
      if(user.length){
        res.send(user)
      }else{
        res.status(400).send("User not found");
      }
    })
    .catch(err => res.status(400).send("error getting user"))
  }

  module.exports= {
      handleProfileGet
  };