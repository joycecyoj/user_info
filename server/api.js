const router = require('express').Router()
module.exports = router;

router.post('/api/info', (req, res, next) => {
  // console.log('req.body', req.body)
  try {
    const inputData = req.body.data;         // JSON data
    const inputDataFormat = req.body.format; // JSON, plain text, XML



    const newCampus = await Campus.create({
      name: req.body.name,
      address: req.body.address,
      imageUrl: req.body.imageUrl,
      description: req.body.description
    })

    const campusWithStudents = Campus.findById(newCampus.id, {
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
