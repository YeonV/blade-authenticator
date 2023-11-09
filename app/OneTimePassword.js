import React, { useCallback, useEffect, useState } from 'react';
import { verifyOtp } from './api';
import OtpInput from 'react-otp-input';

const OneTimePassword = ({ enabled }) => {
  const [otp, setOtp] = useState('');
  const [invalidCode, setInvalidCode] = useState(false);

  const handleSubmit = useCallback(async () => {
    const result = await verifyOtp(otp);
    if (result) return (window.location = '/');
    setInvalidCode(true);
  }, [otp]);

  useEffect(() => {
    if (otp.length === 6) handleSubmit({ preventDefault: () => {} });
  }, [otp]);

  return (
    <div>
      {!enabled && <img src="/mfa_qr_code" />}
      <form onSubmit={handleSubmit}>
        <OtpInput
          shouldAutoFocus
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderInput={(props, index) => (
            <>
              <input {...props} className="inputStyle" />
              {index !== 5 && <span style={{ marginRight: 20 }} />}
              {index === 2 && <span className="sep">-</span>}
            </>
          )}
        />
        {invalidCode && <p>Invalid verification code</p>}
      </form>
    </div>
  );
};

export default OneTimePassword;
