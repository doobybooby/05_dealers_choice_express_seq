const { syncAndSeed, models: { Player, Room } } = require('./database/db')
const express = require('express')
const app = express()
app.use(express.urlencoded())
app.use('/public', express.static('public'))

app.get('/', async(req,res,next)=> {
  const [ players, rooms ] = await Promise.all([
    Player.findAll(),
    Room.findAll()
  ])

  res.send(`
    <head>
      <link rel='stylesheet' href='/public/styles.css' />
    </head>
    <body>
        <nav>
          <a href='/' class='selected'> HOME </a>
          <a href='/players'> PLAYERS </a>
          <a href='/rooms'> ROOMS </a>
        </nav>
        <div class='mainDiv'>
          <h3>This is home </h3>
          <div>
            <h5>ACTIVE PLAYERS: ${players.length}<h5>
            <h5>AVAILABLE ROOMS: ${rooms.length}<h5>
          </div>
        </div>
    </body>
  `)
})

app.get('/players', async(req,res,next)=> {
  const [ players, rooms ] = await Promise.all([
    Player.findAll(),
    Room.findAll()
  ])

  res.send(`
    <head>
      <link rel='stylesheet' href='/public/styles.css' />
    </head>
    <body>
        <nav>
          <a href='/' > HOME </a>
          <a href='/players' class='selected'> PLAYERS </a>
          <a href='/rooms' > ROOMS </a>
        </nav>
        <div class='mainDiv'>
          <h3>Players List </h3>
          <div>
            <ul>${players.map(player => {
              return `
                <li>
                  <a href='/players/${player.id}'>${player.username}</a>
                </li>
              `
            }).join('')}<ul>
          </div>
        </div>
    </body>
  `)
})


app.get('/players/:id', async(req,res,next)=> {
  const id = req.params.id
  const [ player, rooms ] = await Promise.all([
    Player.findAll({
      where: {
        id:id
      }
    }),
    Room.findAll()
  ])

  res.send(`
    <head>
      <link rel='stylesheet' href='/public/styles.css' />
    </head>
    <body>
        <nav>
          <a href='/' > HOME </a>
          <a href='/players' class='selected'> PLAYERS </a>
          <a href='/rooms' > ROOMS </a>
        </nav>
        <div class='mainDiv'>
          <div>
            <h3>PLAYER ID: ${req.params.id} </h3>
            <ul>${player.map(p => {
              return `
                    <li>
                      ${JSON.stringify(p)}
                    </li>
                  `
                }).join('')}
            <ul>
          </div>
        </div>
    </body>
  `)
})


app.get('/rooms', async(req,res,next)=> {
  const [rooms] = await Promise.all(
    [Room.findAll()]
  )

  res.send(`
  <head>
      <link rel='stylesheet' href='/public/styles.css' />
    </head>
    <body>
      <nav>
        <a href='/' > HOME </a>
        <a href='/players' > PLAYERS </a>
        <a href='/rooms' class='selected'> ROOMS </a>
      </nav>
      <div class='mainDiv'>
        <ul>${rooms.map(room=> {
          return `
            <li><a href='/rooms/${room.id}'>${room.roomName}</a></li>
          `
        }).join('')}<ul>
      </div>
    </body>
  `)
})


app.get('/rooms/:id', async(req,res,next)=> {
  const id = req.params.id
  const [ players, room ] = await Promise.all([
    Player.findAll({
      where:{
        roomId:id
      }
    }),
    Room.findAll({
      where:{
        id:id
      }
    })
  ])

  res.send(`
    <head>
      <link rel='stylesheet' href='/public/styles.css' />
    </head>
    <body>
        <nav>
          <a href='/' > HOME </a>
          <a href='/players' class='selected'> PLAYERS </a>
          <a href='/rooms' > ROOMS </a>
        </nav>
        <div class='mainDiv'>
          <div>
            <h3>ROOM ID: ${req.params.id} </h3>
            <ul>${room.map(p => {
              return `
                    <li>
                      ${JSON.stringify(p)}
                    </li>
                  `
                }).join('')}
            <ul>
            <h3>PLAYER IN THE ROOM</h3>
            ${players.map(player=> {
              return `
                <li>${player.username}</li>
              `
            })}
          </div>
        </div>
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