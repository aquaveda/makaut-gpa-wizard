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
    // Allow empty string for clearing input
    if (val === "") {
      onChange(val);
      return;
    }
    // Parse and validate the number
    const numVal = parseFloat(val);
    if (!isNaN(numVal) && numVal >= 0 && numVal <= 10) {
      onChange(val);
    }
  };

  return (
    <div className="group animate-fade-in" style={{ animationDelay: `${semester * 50}ms` }}>
      <Label
        htmlFor={`semester-${semester}`}
        className="text-sm font-medium text-muted-foreground group-focus-within:text-primary transition-colors flex items-center justify-between"
      >
        <span>Semester {semester}</span>
        {value && !error && (
          <span className="text-xs text-primary font-normal">SGPA</span>
        )}
      </Label>
      <div className="mt-1.5">
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
      </div>
      {error && (
        <p className="mt-1 text-xs text-destructive animate-fade-in">{error}</p>
      )}
    </div>
  );
};

export default SemesterInput;
