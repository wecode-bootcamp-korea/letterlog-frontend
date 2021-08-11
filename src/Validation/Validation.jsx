export function chkPwd(pw) {
  var reg_pwd = /^[0-9]+$/;
  return !reg_pwd.test(pw) ? false : true;
}

export function chkDate(date) {
  const regDate = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;

  return date !== '' && date !== 'undefined' && regDate.test(date);
}

export function chkEmail(email) {
  var regEmail =
    /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

  return email !== '' && email !== 'undefined' && regEmail.test(email);
}
