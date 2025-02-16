"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import WelcomeStep from "./steps/WelcomeStep"
import PhoneVerificationStep from "./steps/PhoneVerificationStep"
// import AdditionalInfoStep1 from "./steps/AdditionalInfoStep"
// import AdditionalInfoStep2 from "./steps/AddStep2"
import RewardStep from "./steps/RewardStep"
import { useLocation, useSearchParams } from "react-router-dom"
import api from "@/api"
import { Url } from "url"
import ReactGA from "react-ga4";

export interface CampaignData {
  coupon_code: string,
  coupon_description: string,
  client_name: string,
  client_logo?: Url,
  phoneRequired: boolean
}
interface ApiResponse {
  campaign: CampaignData
}
export default function RewardLandingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [campaignData, setCampaignData] = useState<CampaignData>();
  // Get a specific query parameter
  const campaign_id = searchParams.get('campaign_id');
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const location = useLocation();
  ReactGA.initialize("G-EB9T1FG4VY");

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);


  const [step, setStep] = useState(0);
  useEffect(()=>{
    const fetchData = async () => {
      const isValidUUIDv4 = (uuid) => {
        const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return uuidV4Regex.test(uuid);
      };
      if(isValidUUIDv4(campaign_id)){
        const data = await api.get<ApiResponse>(`/campaign/${campaign_id}`)
        setCampaignData(data.campaign)
      }   
    }
   
    fetchData()
  },[campaign_id])


  const nextStep = () => setStep((prevStep) => prevStep + 1)

  const steps = [
    <WelcomeStep key="welcome" onNext={nextStep} />,
    <PhoneVerificationStep key="phone" onNext={nextStep} updateFormData={({ phoneNumber }) => setPhoneNumber(phoneNumber)}
    />,
    // <AdditionalInfoStep1 key="info1" onNext={nextStep} updateFormData={updateFormData} />,
    // <AdditionalInfoStep2 key="info2" onNext={nextStep} updateFormData={updateFormData} />,
    <RewardStep key="reward" couponData={campaignData} />,
  ]


  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-400 to-indigo-600  flex items-center justify-center p-4">
    <Card className="w-full max-w-md">
      <CardContent className="p-6">{steps[step]}</CardContent>
    </Card>
 </main>
 
  )
}

