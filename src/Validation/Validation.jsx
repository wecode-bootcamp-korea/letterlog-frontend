export function chkPwd(pw) {
  let reg_pwd1 = /^[a-zA-Z0-9]{8,15}$/;
  let reg_pwd2 = /[a-z]/g;
  let reg_pwd3 = /[0-9]/g;

  if (!reg_pwd1.test(pw)) return false;

  if (reg_pwd2.test(pw) && reg_pwd3.test(pw)) return true;
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
