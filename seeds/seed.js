const sequelize = require('../config/connection');
// const { User, Post } = require('../models');        Be sure you need user other than user. Possibly post, then make sure to add postdata.json

const userData = require('./userData.json');    
// const postData = require('./postData.json');      Be sure you need post data

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedDatabase();