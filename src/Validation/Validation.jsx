export function chkPwd(pw) {
  let reg_pwd = /^[a-zA-Z0-9]{8,15}$/;
  return !reg_pwd.test(pw) ? false : true;
}
