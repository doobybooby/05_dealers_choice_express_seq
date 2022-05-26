const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/hw_4_db')

const Player = conn.define('player', {
  username: {
    type:Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  cumulativeWins: {
    type:Sequelize.INTEGER,
    defaultValue: 0
  },
  phoneNumber: {
    type: Sequelize.STRING,
    defaultValue: '917-123-654'
  }
})

const Room = conn.define('room', {
  roomName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull:false
  }
})



const syncAndSeed = async()=> {
  try{
    await conn.sync({ force:true })
    
    const lory = await Promise.all([Player.create({username:'lory'})])
    const [tom, bob, joe, moe] = await Promise.all(
      ['tom', 'bob', 'joe', 'moe'].map( n => {
        return Player.create({ username:n })
      })
    )
    
    const [room1, room2, room3, room4] = await Promise.all(
      ['room1', 'room2', 'room3', 'room4'].map( n => {
        return Room.create({ roomName:n })
      })
    )

  }
  catch(ex){
    console.log(ex)
  }
}

module.exports = {
  syncAndSeed,
  models:{
    Player,
    Room
  }
}