import { reCheckUsername, reCheckName } from 'network/user/register'
import { reCheckEmail } from 'network/user/passback'
import store from '../store/index.js'
//账号
export function validateUsername(rule, username, callback) {
  const regUsername = /^[a-zA-Z]([a-zA-Z0-9]{6,11})$/;
  const message = reCheckUsername(username);
  message.then(res => {
    if (!regUsername.test(username)) {
      callback(new Error('账号以字母开头,由数组字母组成,7-12位'));
    } else if (res.data.key) {
      callback(new Error('该账号已被注册！'));
    } else {
      callback();
    }
  });
}

//密码
export function validatePass(rule, pass, callback) {
  const regPass = /^[\+-._a-zA-Z0-9]{7,12}$/;
  if (!regPass.test(pass)) {
    callback(new Error('密码可包括数字字母下划线+-和.,7-12位'));
  } else {
    callback();
  }
}

//昵称
export function validateName(rule, name, callback) {
  const regName = /[\u4e00-\u9fa5a-zA-Z0-9]/;

  const reg = /[\u4E00-\u9FA5]/g
    // 汉字验证正则
  const reg2 = /[a-zA-Z0-9]/g
    // 字母数字验证正则
    // 汉字字符数
  let a = name.match(reg) ? name.match(reg).length : 0
    // 字母数字字符数
  let b = name.match(reg2) ? name.match(reg2).length : 0
  const message = reCheckName(name);
  message.then(res => {
    if (!regName.test(name) || (a * 2 + b) < 4 || (a * 2 + b) > 12) {
      callback(new Error('允许使用汉字、字母和数字，4-12个字符'))
    } else if (res.data.key && store.state.name != name) {
      callback(new Error('该昵称已被注册！'))
    } else {
      callback()
    }
  })
}

//年龄
export function validateAge(rule, age, callback) {
  if (age < 5 || age > 100) {
    callback(new Error('请输入您的正确的年龄'))
  } else {
    callback()
  }
}

//手机号
export function validateTel(rule, tel, callback) {
  const regTel = /^1[3456789]\d{9}$/;
  if (!regTel.test(tel)) {
    callback(new Error('请输入正确的手机号码'))
  } else {
    callback()
  }
}

//邮箱
export function validateEmail(rule, email, callback) {
  const regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (!regEmail.test(email.trim())) {
    callback(new Error('请输入正确的邮箱'))
  } else {
    callback()
  }
}

// 密码找回
export function checkUsername(val) {
  if (val == '') {
    return 1;
  } else {
    const message = reCheckUsername(val);
    return message.then(res => {
      if (!res.data.key) {
        return 2
      } else {
        return ''
      }
    });
  }
}

export function checkEmail(username, email) {
  if (email == '') {
    return 3;
  } else if (username && email) {
    const message = reCheckEmail(username, email);
    return message.then(res => {
      if (!res.data.key) {
        // 数据库查询 不存在时
        return 4;
      } else {
        return ''
      }
    });
  } else {
    return ''
  }
}

export function checkPass(val) {
  const regPass = /^[\+-._a-zA-Z0-9]{7,12}$/;
  if (val == '') {
    return 5;
  } else if (!regPass.test(val)) {
    return 6
  } else {
    return '';
  }
}

export function checkPass2(val1, val2) {
  if (val1 == '') {
    return 7
  } else if (val1 !== val2) {
    return 8;
  } else {
    return '';
  }
}