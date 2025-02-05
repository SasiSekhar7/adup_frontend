"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NPSScale } from "../NPScale"

const NPSLabels = [
  { value: 0, label: "Not at all likely" },
  { value: 10, label: "Extremely likely" },
]

export default function AdditionalInfoStep1({
  onNext,
  updateFormData,
}: { onNext: () => void; updateFormData: (data: { nps: number; visitFrequency: string }) => void }) {
  const [nps, setNps] = useState<number>(5)
  const [visitFrequency, setVisitFrequency] = useState("")

  const handleSubmit = () => {
    updateFormData({ nps, visitFrequency })
    onNext()
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-primary text-center">Your Mall Experience</h2>

      <div className="space-y-4">
        <Label className="text-center block">
          How likely are you to recommend this mall to your friends and family?
        </Label>
        <NPSScale value={nps} onChange={setNps} />
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
          {NPSLabels.map((label) => (
            <span key={label.value}>{label.label}</span>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="visit-frequency">How often do you visit this mall?</Label>
        <Select onValueChange={setVisitFrequency}>
          <SelectTrigger id="visit-frequency">
            <SelectValue placeholder="Select visit frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="first-time">First time here</SelectItem>
            <SelectItem value="monthly-or-less">Once a month or less</SelectItem>
            <SelectItem value="2-3-times-month">2-3 times a month</SelectItem>
            <SelectItem value="weekly-or-more">Once a week or more</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleSubmit} className="w-full" disabled={!visitFrequency}>
        Next
      </Button>
    </div>
  )
}

