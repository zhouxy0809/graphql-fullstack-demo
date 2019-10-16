import * as mongoose from 'mongoose';
import config from './config';

const env = process.env.NODE_ENV || 'development';

export default function () {
  const db = mongoose.connect(config[env].db, {useNewUrlParser: true});
  
  mongoose.connection.on('open', function () {
    console.log('Connection succeed with MongoDB');
  }).on('error', function (err) {
    console.log('Connection failed with MongoDB');
  });
  return db;
}