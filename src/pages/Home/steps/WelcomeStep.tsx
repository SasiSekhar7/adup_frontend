import { Button } from '@/components/ui/button'

export default function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="text-center space-y-4">
        <h2 className="text-lg font-semibold text-primary text-center mb-2">
Welcome to Your Exclusive Reward!</h2>
<p className="text-sm text-gray-500 text-center mb-4">
You're just a few steps away from claiming your special offer.</p>
      <Button onClick={onNext} className="w-full">Get Started</Button>
    </div>
  )
}

