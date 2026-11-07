import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import apiClient from '../../lib/apiClient';
import { lora } from "@/lib/fonts";

import NavBar from '@/components/navbar/NavBar';
import Footer from '@/components/landing/Footer';
import OnboardingStepper from "@/components/tutor-flow/OnboardingStepper";

const VerifyPhone: NextPage = () => {
  const router = useRouter();
  const { phone, otp: serverOtp } = router.query;

  const [otp, setOtp] = useState<string>('');
  const [displayOtp, setDisplayOtp] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Router ready hone ke baad OTP set karo
  useEffect(() => {
    if (router.isReady && serverOtp) {
      setDisplayOtp(serverOtp as string);
    }
  }, [router.isReady, serverOtp]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\D/g, '');
    setOtp(v.slice(0, 6));
  };

  // Verify OTP
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!phone || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const response = await apiClient.post('/otp/verify', {
        phone: phone as string,
        otp: otp // STRING hi bhejna
      });

      if (response.data.success) {
        setSuccessMsg('OTP verified successfully!');
        router.push('/tutor-flow/application-received');
      } else {
        setError(response.data.message || 'OTP verification failed.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid or expired OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    if (!phone) return;

    setIsLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const response = await apiClient.post('/otp/send', {
        phone: phone as string
      });

      if (response.data.success) {
        setDisplayOtp(response.data.otp);
        setSuccessMsg('New OTP generated.');
        setOtp('');

        router.replace(
          `/tutor-flow/verify-phone?phone=${phone}&otp=${response.data.otp}`,
          undefined,
          { shallow: true }
        );
      } else {
        setError('Failed to resend OTP.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to resend OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F2E9]">
      <NavBar />

      <div className="mx-auto w-full max-w-3xl px-4 pt-6">
        <OnboardingStepper currentStep={2} />
      </div>

      <div className="flex flex-col items-center justify-center flex-1 px-4 py-12">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image src="/images/logo1.png" alt="Yattra Tutors logo" width={72} height={72} />
          <h1 className={`${lora.className} mt-4 text-2xl font-semibold text-[#1C2B22]`}>Yattra Tutors</h1>
          <p className="mt-2 max-w-md text-sm text-[#58646C]">Verify your phone number to continue.</p>
        </div>

        <div className="w-full max-w-md rounded-lg border border-[#1C2B22]/10 bg-white p-8">
          <h2 className={`${lora.className} mb-2 text-xl font-semibold text-[#1C2B22]`}>Verify your phone</h2>

          {/* TEMP OTP DISPLAY */}
          {displayOtp && (
            <p className="mb-4 text-center text-sm font-semibold text-[#3f8a5f]">Temporary OTP: {displayOtp}</p>
          )}

          <p className="mb-6 text-sm text-[#58646C]">
            Enter the 6-digit code for{' '}
            <span className="font-medium text-[#1C2B22]">{phone ? `+91-${phone}` : 'your phone'}</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              inputMode="numeric"
              pattern="\d*"
              value={otp}
              onChange={handleChange}
              placeholder="Enter OTP"
              maxLength={6}
              className="w-full rounded-md border border-[#1C2B22]/15 p-3 text-center text-lg tracking-widest text-[#1C2B22] outline-none focus:border-[#D79A2C]"
              required
              disabled={isLoading}
            />

            {error && <p className="text-center text-sm text-red-600">{error}</p>}
            {successMsg && <p className="text-center text-sm text-[#3f8a5f]">{successMsg}</p>}

            <button
              type="submit"
              className="w-full rounded-md bg-[#D79A2C] py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify & continue'}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-[#58646C]">
            Didn&rsquo;t receive the code?{' '}
            <button onClick={handleResend} className="font-medium text-[#8a5f18] underline" disabled={isLoading}>
              Resend OTP
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VerifyPhone;
