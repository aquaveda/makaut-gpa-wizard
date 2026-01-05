import { TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ResultCardProps {
  cgpa: number | null;
  semestersFilled: number;
  totalSemesters: number;
}

const ResultCard = ({ cgpa, semestersFilled, totalSemesters }: ResultCardProps) => {
  if (cgpa === null) return null;

  const isComplete = semestersFilled === totalSemesters;
  const percentage = (cgpa / 10) * 100;

  // Get grade classification
  const getGradeClass = (cgpa: number) => {
    if (cgpa >= 9) return { label: "Outstanding", color: "text-emerald-600" };
    if (cgpa >= 8) return { label: "Excellent", color: "text-primary" };
    if (cgpa >= 7) return { label: "Very Good", color: "text-sky-600" };
    if (cgpa >= 6) return { label: "Good", color: "text-amber-600" };
    if (cgpa >= 5) return { label: "Average", color: "text-orange-600" };
    return { label: "Below Average", color: "text-destructive" };
  };

  const grade = getGradeClass(cgpa);

  return (
    <Card className="overflow-hidden border-0 shadow-card animate-fade-in">
      <div className="gradient-hero p-6 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium opacity-90">Your CGPA</p>
            <p className="text-5xl font-display font-bold mt-1">{cgpa.toFixed(2)}</p>
          </div>
          <div className="h-20 w-20 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <TrendingUp className="h-10 w-10" />
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4">
          <div className="h-2 w-full bg-primary-foreground/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-foreground rounded-full transition-all duration-700 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs opacity-80">
            <span>0</span>
            <span>10</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Performance</span>
          <span className={`font-semibold ${grade.color}`}>{grade.label}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Semesters Used</span>
          <span className="font-medium text-foreground">
            {semestersFilled} of {totalSemesters}
          </span>
        </div>

        {/* Status message */}
        <div className={`flex items-start gap-3 p-3 rounded-lg ${
          isComplete ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
        }`}>
          {isComplete ? (
            <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          )}
          <p className="text-sm">
            {isComplete
              ? "CGPA calculated using all semester results."
              : "Final CGPA may change after remaining semesters are added."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
