import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import WelcomeStep from './steps/WelcomeStep'
import RewardStep from './steps/RewardStep'
import PhoneVerificationStep from './steps/PhoneVerificationStep'
import AdditionalInfoStep from './steps/AdditionalInfoStep'

export default function RewardLandingPage() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    phoneNumber: '',
    age: '',
    sex: '',
  })

  const nextStep = () => setStep((prevStep) => prevStep + 1)
  const updateFormData = (data: Partial<typeof formData>) => setFormData((prev) => ({ ...prev, ...data }))

  const steps = [
    <WelcomeStep key="welcome" onNext={nextStep} />,
    <PhoneVerificationStep key="phone" onNext={nextStep} updateFormData={updateFormData} />,
    <AdditionalInfoStep key="info" onNext={nextStep} updateFormData={updateFormData} />,
    <RewardStep key="reward" formData={formData} />,
  ]

  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-6">
        {steps[step]}
      </CardContent>
    </Card>
  )
}

