import { Button } from '@/components/ui/button'
import { IndianRupee } from 'lucide-react'

export default function RewardStep({ formData }: { formData: { phoneNumber: string, age: string, sex: string } }) {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-xl font-semibold text-primary">Congratulations!</h2>
      <p className="text-muted-foreground">Thank you for participating. Here's your reward:</p>
      <div className="bg-green-100 text-green-800 p-4 rounded-md">
        <div className="flex justify-center items-center font-bold text-lg">
          <span>FLAT 100</span>
          <IndianRupee className="ml-1" />
        </div>
        <p className="font-bold">OFF COUPON</p>
        <p>On ₹1000 shopping</p>
        <p>Use code: <span className="font-bold">REWARD50</span></p>
      </div>
      <Button className="w-full" onClick={() => window.print()}>Print Coupon</Button>
    </div>
  )
}