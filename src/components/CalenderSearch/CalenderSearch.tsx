import * as React from "react"
 
import { Calendar } from "@/components/ui/calendar"
 
export function CalenderSearch() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

 
  const highlightDate = new Date()
  highlightDate.setDate(highlightDate.getDate() + 5)
 
  console.log(highlightDate.setDate(highlightDate.getDate() + 5));
  
 
  return (
    <div className="mt-3">
      <label htmlFor="search" className="text-sm font-medium ">
        Search By Date
      </label>
      <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow w-fit"
      modifiers={{ highlighted: highlightDate }}
      modifiersStyles={{
        highlighted: {
          backgroundColor: "hsl(var(--primary))",
          color: "hsl(var(--primary-foreground))",
          fontWeight: "bold",
          borderRadius: "0.25rem",
        },
      }}
    />
    </div>
  
  )
}