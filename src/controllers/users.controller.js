router.get('/users', (req, res, next) => {
  const users = await User.findAll();

  return res.send(users);
})