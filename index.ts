import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

let donuts = [
  { id: 1, name: 'Glazed', flavor: 'Vanilla', price: 1.99, quantity: 10 },
  { id: 2, name: 'Chocolate', flavor: 'Chocolate', price: 2.49, quantity: 5 },
];

app.get('/donuts', function (req, res) {
  res.json(donuts);
});

app.get('/donuts/:id', function (req, res) {
  const id = parseInt(req.params.id);
  const donut = donuts.find(d => d.id === id);

  if (!donut) {
    res.status(404).send('Donut non trouvé');
  } else {
    res.json(donut);
  }
});

app.post('/donuts', function (req, res) {
  const { name, flavor, price, quantity } = req.body;

  if (!name || !flavor || !price || !quantity) {
    res.status(400).send('Tous les champs (name, flavor, price, quantity) sont requis');
    return;
  }

  const newDonut = {
    id: donuts.length + 1,
    name,
    flavor,
    price,
    quantity,
  };

  donuts.push(newDonut);
  res.status(201).json(newDonut);
});

app.put('/donuts/:id', function (req, res) {
  const id = parseInt(req.params.id);
  const { name, flavor, price, quantity } = req.body;

  const donut = donuts.find(d => d.id === id);

  if (!donut) {
    res.status(404).send('Donut non trouvé');
    return;
  }

  if (name) donut.name = name;
  if (flavor) donut.flavor = flavor;
  if (price) donut.price = price;
  if (quantity) donut.quantity = quantity;

  res.json(donut);
});

app.delete('/donuts/:id', function (req, res) {
  const id = parseInt(req.params.id);
  const initialLength = donuts.length;

  donuts = donuts.filter(d => d.id !== id);

  if (donuts.length === initialLength) {
    res.status(404).send('Donut non trouvé');
  } else {
    res.status(204).send();
  }
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, function () {
      console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
    });
  }
  
  export { app };