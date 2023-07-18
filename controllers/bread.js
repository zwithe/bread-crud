const router = require('express').Router()
const Bread = require('../models/bread')

router.get('/', async (req, res) => {
    const breads = await Bread.find()
    res.render('index', { breads })
})
router.get('/new', (req, res) => {
    res.render('new')
})
//get bread by index
router.get('/:id', async (req, res) => {
    const { id } = req.params
    const bread = await Bread.findById(id)
    res.render('show', {
        bread 
    })
})


//post create a new bread
router.post('/', async (req, res) => {
    if (req.body.hasGluten === 'on'){
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    if(!req.body.image){
        req.body.image = undefined
    }
    await Bread.create(req.body)
    res.status(303).redirect('/breads')
})
// GET edit page
router.get('/:index/edit', (req, res) => {
    const { index } = req.params
    res.render('edit', {
        bread: Bread[index],
        index
    })
})
//PUT UPDATE by index
router.put('/:index', (req, res) => {
    const { index } = req.params
    if (req.body.hasGluten === 'on'){
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    if(!req.body.image){
        req.body.image = 'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
    }
    Bread[index] = req.body
    res.status(303).redirect(`/breads/${index}`)
})
//DELETE by index
router.delete('/:index', (req,res) => {
    const { index } = req.params
    Bread.splice(index, 1)
    res.status(303).redirect('/breads')
})

module.exports = router