export const validateIdentity = (rule, value, callback, identityType, identity) => {
  if (value === '') {
    callback(new Error('登录名不能为空'))
  } else {
    if (identityType === 'username') {} else if (identityType === 'email') {
      const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
      if (!reg.test(identity)) {
        callback(new Error('请输入正确的邮箱地址'))
      }
    } else if (identityType === 'phone') {
      const reg = /^1[0-9]{10}$/
      if (!reg.test(identity)) {
        callback(new Error('请输入11位正确的手机号码'))
      }
    }
    callback()
  }
}
