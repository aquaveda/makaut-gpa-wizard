import { useState, useCallback } from "react";
import { Calculator as CalculatorIcon, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SemesterInput from "@/components/SemesterInput";
import ResultCard from "@/components/ResultCard";
import {
  DegreeType,
  DEGREE_CONFIGS,
  calculateCGPA,
  validateSGPA,
} from "@/lib/cgpa-calculator";

const Calculator = () => {
  const [degreeType, setDegreeType] = useState<DegreeType>("4-year");
  const [semesterInputs, setSemesterInputs] = useState<string[]>(
    Array(8).fill("")
  );
  const [errors, setErrors] = useState<(string | undefined)[]>(
    Array(8).fill(undefined)
  );
  const [result, setResult] = useState<{
    cgpa: number | null;
    semestersFilled: number;
    totalSemesters: number;
  } | null>(null);

  const config = DEGREE_CONFIGS[degreeType];

  const handleDegreeChange = useCallback((value: DegreeType) => {
    setDegreeType(value);
    setResult(null);
  }, []);

  const handleSemesterChange = useCallback((index: number, value: string) => {
    setSemesterInputs((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });

    // Validate input
    const validation = validateSGPA(value);
    setErrors((prev) => {
      const updated = [...prev];
      updated[index] = validation.error;
      return updated;
    });
  }, []);

  const handleCalculate = useCallback(() => {
    // Validate all inputs first
    const newErrors: (string | undefined)[] = [];
    let hasErrors = false;

    semesterInputs.slice(0, config.semesters).forEach((input, idx) => {
      const validation = validateSGPA(input);
      newErrors[idx] = validation.error;
      if (!validation.valid) hasErrors = true;
    });

    setErrors(newErrors);

    if (hasErrors) return;

    // Convert inputs to numbers (or null for empty)
    const sgpas = semesterInputs
      .slice(0, config.semesters)
      .map((input) => (input === "" ? null : parseFloat(input)));

    const calculationResult = calculateCGPA(degreeType, sgpas);
    setResult(calculationResult);
  }, [semesterInputs, degreeType, config.semesters]);

  const handleReset = useCallback(() => {
    setSemesterInputs(Array(8).fill(""));
    setErrors(Array(8).fill(undefined));
    setResult(null);
  }, []);

  // For lateral entry, show semesters 3-8 as 1-6
  const getSemesterLabel = (index: number) => {
    if (degreeType === "lateral-entry") {
      return index + 3; // Semester 3-8
    }
    return index + 1;
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            <span>MAKAUT University</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">
            CGPA Calculator
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Calculate your cumulative grade point average based on your semester results
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Input Card */}
          <Card className="lg:col-span-3 shadow-card border-0 animate-fade-in">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <CalculatorIcon className="h-5 w-5 text-primary" />
                Enter Your Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Degree Type Selector */}
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Degree Type
                </Label>
                <Select value={degreeType} onValueChange={handleDegreeChange}>
                  <SelectTrigger className="mt-1.5 h-12 border-2 hover:border-primary/50 focus:border-primary transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border shadow-lg">
                    {Object.entries(DEGREE_CONFIGS).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  {config.description}
                </p>
              </div>

              {/* Semester Inputs Grid */}
              <div>
                <Label className="text-sm font-medium text-muted-foreground mb-3 block">
                  Semester SGPAs{" "}
                  <span className="text-xs font-normal">(Leave empty if not available)</span>
                </Label>
                <div className="grid sm:grid-cols-2 gap-4">
                  {Array.from({ length: config.semesters }).map((_, idx) => (
                    <SemesterInput
                      key={idx}
                      semester={getSemesterLabel(idx)}
                      value={semesterInputs[idx]}
                      onChange={(value) => handleSemesterChange(idx, value)}
                      error={errors[idx]}
                    />
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  onClick={handleCalculate}
                  className="flex-1"
                  size="lg"
                >
                  <CalculatorIcon className="h-4 w-4" />
                  Calculate CGPA
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="lg"
                  className="sm:w-auto"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Result Card */}
          <div className="lg:col-span-2">
            {result ? (
              <ResultCard
                cgpa={result.cgpa}
                semestersFilled={result.semestersFilled}
                totalSemesters={result.totalSemesters}
              />
            ) : (
              <Card className="shadow-card border-0 h-full min-h-[280px] flex items-center justify-center animate-fade-in">
                <CardContent className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                    <CalculatorIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">
                    Enter your semester SGPAs and click{" "}
                    <span className="font-semibold text-foreground">Calculate</span> to see your CGPA
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
