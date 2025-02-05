import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

const likeOptions = [
  { id: "shopping", label: "Variety of shopping options" },
  { id: "food", label: "Food court/restaurants" },
  { id: "movie", label: "Movie theater experience" },
  { id: "cleanliness", label: "Cleanliness & comfort" },
  { id: "parking", label: "Parking & convenience" },
  { id: "events", label: "Events & entertainment activities" },
]

export default function AdditionalInfoStep2({
  onNext,
  updateFormData,
}: { onNext: () => void; updateFormData: (data: { likes: string[]; improvement: string }) => void }) {
  const [likes, setLikes] = useState<string[]>([])
  const [improvement, setImprovement] = useState("")

  const handleSubmit = () => {
    updateFormData({ likes, improvement })
    onNext()
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-primary">Your Mall Preferences</h2>

      <div className="space-y-2">
        <Label>What do you like the most about this mall?</Label>
        {likeOptions.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <Checkbox
              id={option.id}
              checked={likes.includes(option.id)}
              onCheckedChange={(checked) => {
                setLikes((prev) => (checked ? [...prev, option.id] : prev.filter((id) => id !== option.id)))
              }}
            />
            <span className="text-sm text-muted-foreground" htmlFor={option.id}>{option.label}</span>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="improvement">What would you like to see improved in this mall?</Label>
        <Textarea
          id="improvement"
          placeholder="Share your thoughts..."
          value={improvement}
          onChange={(e) => setImprovement(e.target.value)}
        />
      </div>

      <Button onClick={handleSubmit} className="w-full">
        Submit
      </Button>
    </div>
  )
}

