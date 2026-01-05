import { BookOpen, GraduationCap, Award, Calculator, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HowCGPAWorks = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <BookOpen className="h-4 w-4" />
            <span>Understanding the System</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">
            How CGPA is Calculated
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            A complete guide to MAKAUT's grading system and CGPA calculation formulas
          </p>
        </div>

        <div className="space-y-6">
          {/* Grade Point Table */}
          <Card className="shadow-card border-0 animate-fade-in overflow-hidden">
            <CardHeader className="gradient-primary text-primary-foreground">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Award className="h-5 w-5" />
                Letter Grade to Grade Point Conversion
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                {[
                  { grade: "O", point: 10, label: "Outstanding" },
                  { grade: "E", point: 9, label: "Excellent" },
                  { grade: "A", point: 8, label: "Very Good" },
                  { grade: "B", point: 7, label: "Good" },
                  { grade: "C", point: 6, label: "Average" },
                  { grade: "D", point: 5, label: "Below Avg" },
                  { grade: "F", point: 2, label: "Fail" },
                  { grade: "I", point: 2, label: "Incomplete" },
                ].map(({ grade, point, label }) => (
                  <div
                    key={grade}
                    className="text-center p-3 rounded-xl bg-secondary hover:bg-primary/10 transition-colors group"
                  >
                    <div className="text-2xl font-display font-bold text-primary group-hover:scale-110 transition-transform">
                      {grade}
                    </div>
                    <div className="text-lg font-semibold text-foreground">{point}</div>
                    <div className="text-xs text-muted-foreground mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* SGPA Formula */}
          <Card className="shadow-card border-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Calculator className="h-5 w-5 text-primary" />
                SGPA (Semester Grade Point Average)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-secondary">
                <p className="text-sm text-muted-foreground mb-2">Formula:</p>
                <p className="text-lg font-mono font-semibold text-foreground">
                  SGPA = Σ(Credit Points × Grade Points) / Σ(Credit Points)
                </p>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
                <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Credit Points</strong> are assigned to each subject based on its weightage. The SGPA is calculated at the end of each semester.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* YGPA Formula */}
          <Card className="shadow-card border-0 animate-fade-in" style={{ animationDelay: "150ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <GraduationCap className="h-5 w-5 text-primary" />
                YGPA (Year Grade Point Average)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-secondary">
                <p className="text-sm text-muted-foreground mb-2">Formula:</p>
                <p className="text-lg font-mono font-semibold text-foreground">
                  YGPA = (Credit Index of Odd Sem + Credit Index of Even Sem) / Total Credits
                </p>
              </div>
              <div className="p-4 rounded-xl bg-muted">
                <p className="text-sm text-muted-foreground mb-2">Simplified:</p>
                <p className="text-lg font-mono font-semibold text-foreground">
                  YGPA ≈ (SGPA_Odd + SGPA_Even) / 2
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CGPA Formulas by Degree */}
          <Card className="shadow-card border-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <CardHeader className="gradient-hero text-primary-foreground">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Award className="h-5 w-5" />
                CGPA / DGPA Formulas by Degree Type
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* 4 Year Degree */}
              <div className="p-4 rounded-xl border-2 border-border hover:border-primary/30 transition-colors">
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  4 Year Degree (B.Tech, B.Arch)
                </h3>
                <div className="p-3 rounded-lg bg-secondary font-mono text-sm sm:text-base">
                  CGPA = (YGPA₁ + YGPA₂ + 1.5×YGPA₃ + 1.5×YGPA₄) / 5
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Higher weightage for 3rd and 4th year performance
                </p>
              </div>

              {/* Lateral Entry */}
              <div className="p-4 rounded-xl border-2 border-border hover:border-primary/30 transition-colors">
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  Lateral Entry (4 Year)
                </h3>
                <div className="p-3 rounded-lg bg-secondary font-mono text-sm sm:text-base">
                  CGPA = (YGPA₂ + 1.5×YGPA₃ + 1.5×YGPA₄) / 4
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Excludes 1st year as students enter directly in 2nd year
                </p>
              </div>

              {/* 3 Year Degree */}
              <div className="p-4 rounded-xl border-2 border-border hover:border-primary/30 transition-colors">
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  3 Year Degree (BCA, B.Sc)
                </h3>
                <div className="p-3 rounded-lg bg-secondary font-mono text-sm sm:text-base">
                  CGPA = (YGPA₁ + YGPA₂ + YGPA₃) / 3
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Equal weightage for all three years
                </p>
              </div>

              {/* 2 Year Degree */}
              <div className="p-4 rounded-xl border-2 border-border hover:border-primary/30 transition-colors">
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  2 Year Degree (M.Tech, MCA)
                </h3>
                <div className="p-3 rounded-lg bg-secondary font-mono text-sm sm:text-base">
                  CGPA = (YGPA₁ + YGPA₂) / 2
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Average of both year performances
                </p>
              </div>

              {/* 1 Year Degree */}
              <div className="p-4 rounded-xl border-2 border-border hover:border-primary/30 transition-colors">
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  1 Year Degree (MBA, M.Sc)
                </h3>
                <div className="p-3 rounded-lg bg-secondary font-mono text-sm sm:text-base">
                  CGPA = YGPA₁
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Single year performance determines CGPA
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Important Notes */}
          <Card className="shadow-card border-0 animate-fade-in" style={{ animationDelay: "250ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Info className="h-5 w-5 text-primary" />
                Important Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "CGPA is calculated using only available semester results. Missing semesters are excluded from the calculation.",
                  "The final CGPA may change after all semesters are completed.",
                  "3rd and 4th year have 1.5x weightage in 4-year programs, reflecting the importance of specialization courses.",
                  "SGPA must be between 0 and 10 for valid calculation.",
                  "For lateral entry students, only semesters 3-8 are considered.",
                ].map((note, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {idx + 1}
                    </span>
                    <span className="text-muted-foreground">{note}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HowCGPAWorks;
