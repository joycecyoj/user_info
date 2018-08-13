const router = require('express').Router()
module.exports = router;

router.post('/', async(req, res, next) => {
  // console.log('req.body', req.body)
  try {
    const newCampus = await Campus.create({
      name: req.body.name,
      address: req.body.address,
      imageUrl: req.body.imageUrl,
      description: req.body.description
    })

    const campusWithStudents = await Campus.findById(newCampus.id, {
      include: {all: true}
    })

    res.status(201).json(campusWithStudents);
  } catch (error) { next(error) }
})

router.use((req, res, next) => {
  const err = new Error('API route not found!')
  err.status = 404
  next(err)
})
