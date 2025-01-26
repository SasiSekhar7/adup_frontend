import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function AdditionalInfoStep({ onNext, updateFormData }: { onNext: () => void, updateFormData: (data: { age: string, sex: string }) => void }) {
  const [age, setAge] = useState('')
  const [sex, setSex] = useState('')

  const handleSubmit = () => {
    updateFormData({ age, sex })
    onNext()
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-primary">Additional Information</h2>
      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          type="number"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="sex">Sex</Label>
        <Select onValueChange={setSex}>
          <SelectTrigger id="sex">
            <SelectValue placeholder="Select your sex" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={handleSubmit} className="w-full">Submit</Button>
    </div>
  )
}

