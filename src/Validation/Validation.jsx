export function chkPwd(pw) {
  var reg_pwd = /^[0-9]+$/;
  return !reg_pwd.test(pw) ? false : true;
}
