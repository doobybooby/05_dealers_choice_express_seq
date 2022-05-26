const { syncAndSeed } = require('./database/db')
const express = require('express')
const app = express()
app.use('/public', express.static('public'))

app.get('/', (req,res,next)=> {
  res.send(`
    <head>
      <link rel='stylesheet' href='/public/styles.css' />
    </head>
    <body>
      
    </body>
  `)
})




const init = async()=>{
  try{
    await syncAndSeed()
    const port = process.env.PORT || 3000
    app.listen(port, ()=> {console.log(`listening on port ${port}`)})
  }
  catch(ex) { next(ex) }
}
init()