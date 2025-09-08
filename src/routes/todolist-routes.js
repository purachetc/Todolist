const { Router } = require('express');
const ctrl = require('../controller/todolist-controller');

const router = Router();

router.get('/', ctrl.list);
router.get('/:id', ctrl.detail);
router.post('/', ctrl.create);
router.patch('/:id', ctrl.updatePartial);
router.put('/:id', ctrl.replace);
router.delete('/:id', ctrl.remove);

module.exports = router;