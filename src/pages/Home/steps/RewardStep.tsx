import { Button } from '@/components/ui/button'

export default function RewardStep({ formData }: { formData: { phoneNumber: string, age: string, sex: string } }) {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-xl font-semibold text-primary">Congratulations!</h2>
      <p className="text-muted-foreground">Thank you for participating. Here's your reward:</p>
      <div className="bg-green-100 text-green-800 p-4 rounded-md">
        <p className="font-bold">50% OFF COUPON</p>
        <p>Use code: REWARD50</p>
      </div>
      <Button className="w-full" onClick={() => window.print()}>Print Coupon</Button>
    </div>
  )
}

