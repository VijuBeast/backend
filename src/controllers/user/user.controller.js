import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import { User } from '../../models';
import { successResponse, errorResponse, uniqueId } from '../../helpers';
import { forEach } from 'lodash';
const Op = require('sequelize').Op;
require('dotenv');

// create transporter object with smtp server details
export const register = async (req, res) => {
  try {
    const {
      email, password, name, role,
    } = req.body;

    const user = await User.scope('withSecretColumns').findOne({
      where: { email },
    });
    if (user) {
      throw new Error('User already exists with same email');
    }
    const reqPass = crypto
      .createHash('md5')
      .update(password)
      .digest('hex');
    const payload = {
      email,
      name,
      role,
      password: reqPass,
      verifyToken: uniqueId(),
    };

    const newUser = await User.create(payload);
    // send mail with defined transport object

    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

// login controller and compare the role either admin or user then display the dashboard
export const login = async (req, res) => {
  try {
    const user = await User.scope('withSecretColumns').findOne({
      where: { email: req.body.email, role: req.body.role },
    });
    if (!user) {
      throw new Error('Role is incorrect');
    }
    const reqPass = crypto
      .createHash('md5')
      .update(req.body.password || '')
      .digest('hex');
    if (reqPass !== user.password) {
      throw new Error('Incorrect Email Id/Password');
    }
    const token = jwt.sign(
      {
        user: {
          userId: user.id,
          email: user.email,
          createdAt: new Date(),
        },
      },
      process.env.SECRET,
    );
    delete user.dataValues.password;
    return successResponse(req, res, { user, token });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

// Logout controller with the id of the user


// make a export to get all the users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.scope('withSecretColumns').findAll();
    return successResponse(req, res, { users });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
}

// make a export to get single user by id
export const getUserById = async (req, res) => {
  try {
    const user = await User.scope('withSecretColumns').findOne({
      where: { id: req.params.id },
    });
    return successResponse(req, res, { user });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
}


// make a export to delete a user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.scope('withSecretColumns').findOne({
      where: { id: req.params.id },
    });
    if (!user) {
      throw new Error('User not found');
    }
    await user.destroy();
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
}

// make a controller to update a user
export const updateUser = async (req, res) => {
  try {
    const user = await User.scope('withSecretColumns').findOne({
      where: { id: req.params.id },
    })
    if (!user) {
      throw new Error('User not found');
    }
    const { name, email, role } = req.body;
    await user.update({
      name,
      email,
      role,
    })
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
}

// make a controller to logout a user
export const logout = async (req, res) => {
  try {
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
}