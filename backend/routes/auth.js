const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  const obj = {
        a: 'Thios',
        number: 35
  }
  res.json(obj)
})

module.exports = router