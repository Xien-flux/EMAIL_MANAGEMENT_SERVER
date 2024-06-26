const {User} = require('../../database/repositories/user.repo');
const UserService = require('../auth/index');
const OTPValidator = require('../../utils/otpValidator');
const { hashString, generateJwt } = require('../../utils/index');
const { generateToken } = require('../../utils/tokenGeneration');
const { OTPSTATUS, TokenFlag } = require('../../enums');
const { ResourceConflictError, ServiceError } = require('../../libs/exceptions/index');
const { APIMailer } = require('../../libs/mailer/adaptee/mailTrap');

module.exports = async (signupDto) => {
  const { email, password } = signupDto;
  
  const user  = await User.getByEmail(email);
  if (user) throw new ResourceConflictError('User already exist');

  const hashedPassword = await hashString(password);

  const otpToken = await generateToken();
  const hashedOtp = await hashString(otpToken);
  
  const otpExpiryTime = OTPValidator.generateOTPExpiryTime(30)

  //send otp mail
  const subject = "Interactro Email Verifcaton link";
	const body = `click http://localhost:8084/api/v1/user/auth/email/verify?token=${otpToken} to verify you email`;

  const mailResponse = await APIMailer.send({ to: email, subject, text: body});

  if (!mailResponse.success) throw new ServiceError('Error in sending mail');
   
  const createdUser = await UserService.createUser({email, password: hashedPassword, otp: hashedOtp, otp_status: OTPSTATUS.PENDING, otp_expiry_date: otpExpiryTime});
 
  const token = await generateJwt({
    userEmail: email,
    flag: TokenFlag.AUTH,
    timestamp: Date.now()
  });

  return {
    message: 'Created user with pending otp status!',
    data: { createdUser: { ...createdUser._doc, password: 'hidden'}, body,
    token: { 
      flag: TokenFlag.AUTH,
      value: token
    }}
  }
}