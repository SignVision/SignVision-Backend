const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const KEY = require('../config').KEY;
const User = require('../models/user').User;


const register = async (username, password, first_name, last_name) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username: username,
            password: hashedPassword,
            meetings: [],
            first_name: first_name,
            last_name: last_name,
            verified: false
        })

        return User.findOne({ "username": username }).then((user) => {
            if (user) {
                return 1;
            }
            else {
                newUser.save();
                return 0;
            }
        })
        
    } catch (error) {
        return 2;
    }
       
}


const login = async (username, password) => {
    return User.findOne({ "username": username }).then((user) => {
        if (user) {
            if (!user.verified) {
                return { accessToken: null, err: 3 };
            }

            return bcrypt.compare(password, user.password).then((result) => {
                if (result) {
                    const accessToken = jwt.sign({ username: username }, KEY, {expiresIn: "24h"});
                    return { accessToken: accessToken, err: 0 };
                }
                else {
                    return { accessToken: null, err: 2 };
                }
            });
        }
        else {
            return { accessToken: null, err: 1 };
        }
    })
}

const get_name = async (username) => {
    return User.findOne({ "username": username }).then((user) => {
        if (user) {
            return { first_name: user.first_name, last_name: user.last_name };
        }
        else {
            return { first_name: null, last_name: null};
        }
    })
}



const get_user_id = async (username) => {
    return User.findOne({ "username": username });
}

module.exports = {
    register: register,
    login: login,
    get_name: get_name,
    get_user_id: get_user_id
}