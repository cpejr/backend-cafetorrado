exports.getBurn = (req, res, next) => {
  res.status(200).send({
    message: 'using get route',
  });
};

exports.postBurn = (req, res, next) => {
  const burn = {
    name: req.body.name,
  };
  res.status(201).send({
    message: 'Torra criada',
    burn_created: burn,
  });
};
