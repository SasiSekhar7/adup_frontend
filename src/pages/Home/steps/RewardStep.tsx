import { Button } from '@/components/ui/button'
import { IndianRupee, Share2 } from 'lucide-react'
import { CampaignData } from '..'
import { useEffect } from 'react';

export default function RewardStep({ couponData }: { couponData: CampaignData}) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Your Reward Coupon",
          text: `Use this coupon code: ${couponCode} and get your reward!`,
          url: window.location.href, // Optional: Share current page URL
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };
  return (
    <div className="text-center space-y-4">
      <h2 className="text-xl font-semibold text-primary">Congratulations!</h2>
      <p className="text-muted-foreground">Thank you for participating. Here's your reward:</p>
      <div className="bg-green-100 text-green-800 p-4 rounded-md">
        {/* <div className="flex justify-center items-center font-bold text-lg">
          
          <IndianRupee className="ml-1" />
        </div> */}
        {<p className="font-bold">{couponData?.coupon_description}</p>}
        <p>Use code: <span className="font-bold">{couponData?.coupon_code}</span>  at {couponData?.client_name}</p>
      </div>
      <Button className="w-full" onClick={() => window.print()}>Print Coupon</Button>
      <Button onClick={handleShare} className="w-full flex items-center justify-center">
      <Share2 className="mr-2" /> Share Coupon
    </Button>
    </div>
  )
}