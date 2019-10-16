import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 64,
  },
  createdAt: {
    type: Date,
    unique: true
  }
});

// pre hook:中间件中的前置钩子回调函数，在保存document之前进行密码
userSchema.pre('save', function() {
  // 原始密码12位加盐
  const hashedPassword = bcrypt.hashSync(this.password, 12);
  this.password = hashedPassword;
});

// 将schema编译为model,model是构造document的Class, 包含属性和行为
const user = mongoose.model('User', userSchema);

export default user;