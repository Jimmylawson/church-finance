import { useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type DatePickerProps = {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

function DatePicker({
  value,
  onChange,
  placeholder = "Select date",
  className,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  const selectedDate = useMemo(() => {
    if (!value) {
      return undefined;
    }

    try {
      return parseISO(value);
    } catch {
      return undefined;
    }
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "h-auto w-full justify-between rounded-2xl border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800",
            !selectedDate && "text-slate-400 dark:text-slate-500",
            className,
          )}
        >
          <span>
            {selectedDate ? format(selectedDate, "MMMM d, yyyy") : placeholder}
          </span>
          <CalendarIcon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-auto rounded-3xl border border-slate-200 bg-white p-3 shadow-[0_24px_80px_-48px_rgba(16,35,63,0.45)] dark:border-slate-800 dark:bg-slate-950"
      >
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            if (!date) {
              return;
            }

            onChange(format(date, "yyyy-MM-dd"));
            setOpen(false);
          }}
          className="rounded-2xl"
        />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
