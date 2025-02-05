"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import WelcomeStep from "./steps/WelcomeStep"
import PhoneVerificationStep from "./steps/PhoneVerificationStep"
import AdditionalInfoStep1 from "./steps/AdditionalInfoStep"
import AdditionalInfoStep2 from "./steps/AddStep2"
import RewardStep from "./steps/RewardStep"

export default function RewardLandingPage() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    phoneNumber: "",
    nps: 0,
    visitFrequency: "",
    likes: [],
    improvement: "",
  })

  const nextStep = () => setStep((prevStep) => prevStep + 1)
  const updateFormData = (data: Partial<typeof formData>) => setFormData((prev) => ({ ...prev, ...data }))

  const steps = [
    <WelcomeStep key="welcome" onNext={nextStep} />,
    <PhoneVerificationStep key="phone" onNext={nextStep} updateFormData={updateFormData} />,
    <AdditionalInfoStep1 key="info1" onNext={nextStep} updateFormData={updateFormData} />,
    <AdditionalInfoStep2 key="info2" onNext={nextStep} updateFormData={updateFormData} />,
    <RewardStep key="reward" formData={formData} />,
  ]

  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-6">{steps[step]}</CardContent>
    </Card>
  )
}

