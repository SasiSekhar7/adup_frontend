import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Input } from "@/components/ui/input";
import api from "@/api";
import { ClipLoader } from "react-spinners";

export default function PhoneVerificationStep({
  onNext,
  updateFormData,
}: {
  onNext: () => void;
  updateFormData: (data: { phoneNumber: string }) => void;
}) {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState("");
  const [ip, setIp] = useState();
  const [otpSent, setOtpSent] = useState(false);
  const [userAgent, setUserAgent] = useState("");
  const [error, setError] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Collect the user agent from the browser
    setUserAgent(navigator.userAgent);
    const fetchIp = async () => {
      try {
        const response = await api.get("https://api.ipify.org?format=json");
        setIp(response.ip);
        console.log(response.ip)
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    fetchIp();
  }, []);
  const sendOtp = async () => {
    setLoading(true);
    try {
      const response = await api.post("/send-otp", {
        phoneNumber,
        userAgent,
        ipAddress: ip,
      });
      console.log(response);
      const { verId } = response;
      console.log(verId);
      setVerificationId(verId);
      setError("");
      setOtpSent(true);
      setLoading(false);

      // onNext();
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);

    try {
      await api.post("/verify-otp", {
        otp,
        verificationId,
        phoneNumber,
      });
      setLoading(false);
      setError("");
      onNext();
    } catch (error) {
      console.log("-------------  `", error);
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="space-y-4 text-center">
      <div>
        <h2 className="text-lg font-semibold text-primary text-center mb-2">
          Claim Your Free Reward!
        </h2>

      </div>

      {!otpSent ? (
        <div>
          <div className="space-y-2 mb-4">
        {/* Subtitle */}
        <p className="text-sm text-gray-500 text-center mb-4">
        Enter your phone number to get verified and claim your reward.

        </p>      
        <Input
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={otpSent}
            />
            {error && <span className="text-sm text-destructive">{error}</span>}
          </div>

          <Button onClick={sendOtp} className="w-full" disabled={loading || phoneNumber.length !==10}>
            {loading ? <ClipLoader className="h-[50%] w-[50%]" /> : "Send OTP"}
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-2 ">
            <p className="text-sm text-gray-500 text-center mb-4">
              Enter the OTP sent to{" "}
              <span className="font-semibold">{phoneNumber}</span> to claim your
              reward.
            </p>
            <div className="flex items-center">
              <div className="mx-auto">
                <InputOTP maxLength={6} onChange={(value) => setOtp(value)}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
          </div>
          <Button
            onClick={verifyOtp}
            className="w-full"
            disabled={otp.length !== 4 || loading}
          >
            {loading ? (
              <ClipLoader className="h-[80%] w-[80%]" />
            ) : (
              "Verify OTP"
            )}
          </Button>
          {error && <span className="text-sm text-destructive">{error}</span>}
        </>
      )}
    </div>
  );
}
