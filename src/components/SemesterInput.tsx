import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SemesterInputProps {
  semester: number;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const SemesterInput = ({ semester, value, onChange, error }: SemesterInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow empty or valid numbers between 0-10
    if (val === "" || (parseFloat(val) >= 0 && parseFloat(val) <= 10)) {
      onChange(val);
    }
  };

  return (
    <div className="group animate-fade-in" style={{ animationDelay: `${semester * 50}ms` }}>
      <Label
        htmlFor={`semester-${semester}`}
        className="text-sm font-medium text-muted-foreground group-focus-within:text-primary transition-colors"
      >
        Semester {semester}
      </Label>
      <div className="relative mt-1.5">
        <Input
          id={`semester-${semester}`}
          type="number"
          step="0.01"
          min="0"
          max="10"
          placeholder="0.00 - 10.00"
          value={value}
          onChange={handleChange}
          className={`h-11 bg-background border-2 transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 ${
            error ? "border-destructive" : "border-border hover:border-primary/50"
          }`}
        />
        {value && !error && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            SGPA
          </span>
        )}
      </div>
      {error && (
        <p className="mt-1 text-xs text-destructive animate-fade-in">{error}</p>
      )}
    </div>
  );
};

export default SemesterInput;
