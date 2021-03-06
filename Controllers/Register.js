const handleRegister = (req, res, db, bcrypt) => {
  const { email, password, name } = req.body;
  if(!name || !email || !password){
      return res.status(400).json('Incorrect form submission');
  }
  const hash = bcrypt.hashSync(password, 10);
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date(),
          })
          .then((users) => {
            res.status(200).send(users[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).send("unable to register"));
};

module.exports = {
  handleRegister: handleRegister,
};
