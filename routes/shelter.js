const express = require('express');
const router = express.Router();

let data = [
    {
        id: 1,
        title: 'Общество защиты животных "Верные друзья"',
        adress: '248001, г. Калуга, ул. Кирова, 15/41, оф. 1',
        phoneNumber: '+7 (910) 708-84-01',
        email:  'verniedruzy@yandex.ru',
        website: 'http://vk.com/true_friendskaluga',
        specialization: 'Собаки и кошки',
        animals: [],
    },
    {
        id: 2,
        title: 'Новый Ковчег',
        adress: ' 249030, Калужская обл., г. Обнинск, пр. Ленина, 131',
        phoneNumber: '+8 (48439) 5-79-69',
        email:  'info@novkovcheg.com',
        website: 'http://www.novkovcheg.com',
        specialization: 'Собаки',
        animals: [],
    },
    {
        id: 3,
        title: 'Остров надежды',
        adress: ' 248000, г. Калуга',
        phoneNumber: '+8 (903) 811-89-75',
        email:  'ostrovnadezhdy@yandex.ru',
        website: 'http://ostrov-nadezhdy.ru/',
        specialization: 'Собаки',
        animals: [],
    },
];

router.get('/', (req, res) => {
    res.status(200).json(data);
});

router.get('/:id', (req, res) => {
    const found = data.find((item) => item.id === parseInt(req.params.id));

    found
        ? res.status(200).json(found) 
        : res.sendStatus(404);
});

router.post('/', function (req, res) {
    const itemIds = data.map(item => item.id);

    const newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;

    const newItem = {
        id: newId,
        title: req.body.title || '',
        adress: req.body.adress || '',
        phoneNumber: req.body.phoneNumber || '',
        email:  req.body.email || '',
        website: req.body.website || '',
        specialization: req.body.specialization || '',
        animals: [] || '',
    };

    data.push(newItem);

    res.status(201).json(newItem);
});

router.put('/:id', function (req, res) {
    const found = data.find((item) => item.id === parseInt(req.params.id));

    if (found) {
        let updated = {
            id: found.id,
            title: req.body.title,
            adress: req.body.adress || '',
            phoneNumber: req.body.phoneNumber || '',
            email:  req.body.email || '',
            website: req.body.website || '',
            specialization: req.body.specialization || '',
            animals: [] || '',
        };

        data.splice(data.indexOf(found), 1, updated);

        console.log(data)
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

router.delete('/:id', function (req, res) {
    const found = data.find((item) => item.id === parseInt(req.params.id));

    if (found) {
        data.splice(data.indexOf(found), 1);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;