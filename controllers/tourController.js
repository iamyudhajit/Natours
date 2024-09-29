const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);

exports.checkID = (req, res, next, val) => {
  if (val > tours.length) {
    return res.status(404).json({ status: 'Failed', message: 'Invalid ID' });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  // console.log(`Checking Tour Body `);
  if (!req.body.name || !req.body.price) {
    return res
      .status(404)
      .json({ status: 'Failed', message: 'No Name Or Body Found' });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res
    .status(200)
    .json({ status: 'succes', numOfResults: tours.length, data: { tours } });
};

exports.getTour = (req, res) => {
  //   console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({ status: 'succes', data: tour });
};

exports.createTour = (req, res) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(201).json({ status: 'succes', data: { tour: newTour } });
    },
  );
};

exports.updateTour = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', data: { tour: '<Updated Tour></Updated>' } });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({ status: 'success', data: null });
};
