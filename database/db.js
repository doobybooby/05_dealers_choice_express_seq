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


const syncAndSeed = async()=> {
  try{
    await conn.sync({ force:true })
    const lory = await Promise.all([Player.create({username:'lory'})])
    const [tom, bob, joe, moe] = await Promise.all(
      ['tom', 'bob', 'joe', 'moe'].map( n => {
        return Player.create({ username:n })
      })
    )
  }
  catch(ex){
    console.log(ex)
  }
}

module.exports = {
  syncAndSeed
}