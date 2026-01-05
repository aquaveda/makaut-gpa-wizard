/**
 * CGPA Calculation Logic for MAKAUT University
 * 
 * The university uses a YGPA-based weighted system:
 * - YGPA (Year Grade Point Average) = Average of odd + even semester SGPAs
 * - Different degree programs have different weightage formulas
 */

export type DegreeType = 
  | "4-year"
  | "3-year"
  | "2-year"
  | "1-year"
  | "lateral-entry";

export interface DegreeConfig {
  label: string;
  semesters: number;
  description: string;
}

export const DEGREE_CONFIGS: Record<DegreeType, DegreeConfig> = {
  "4-year": {
    label: "4 Year Degree (B.Tech, B.Arch)",
    semesters: 8,
    description: "Standard 4-year engineering/architecture program",
  },
  "3-year": {
    label: "3 Year Degree (BCA, B.Sc)",
    semesters: 6,
    description: "Standard 3-year undergraduate program",
  },
  "2-year": {
    label: "2 Year Degree (M.Tech, MCA)",
    semesters: 4,
    description: "Standard 2-year postgraduate program",
  },
  "1-year": {
    label: "1 Year Degree (MBA, M.Sc)",
    semesters: 2,
    description: "1-year postgraduate program",
  },
  "lateral-entry": {
    label: "Lateral Entry (4 Year)",
    semesters: 6,
    description: "Diploma holders entering 2nd year directly",
  },
};

/**
 * Calculate YGPA (Year Grade Point Average)
 * YGPA = (SGPA_odd + SGPA_even) / 2
 * If one semester is missing, use available SGPA
 */
function calculateYGPA(oddSGPA: number | null, evenSGPA: number | null): number | null {
  if (oddSGPA !== null && evenSGPA !== null) {
    return (oddSGPA + evenSGPA) / 2;
  }
  if (oddSGPA !== null) return oddSGPA;
  if (evenSGPA !== null) return evenSGPA;
  return null;
}

/**
 * Main CGPA calculation function
 * Handles partial data - calculates using only available semesters
 */
export function calculateCGPA(
  degreeType: DegreeType,
  semesterSGPAs: (number | null)[]
): { cgpa: number | null; semestersFilled: number; totalSemesters: number } {
  const config = DEGREE_CONFIGS[degreeType];
  const totalSemesters = config.semesters;
  
  // Count filled semesters
  const semestersFilled = semesterSGPAs.filter(s => s !== null).length;
  
  if (semestersFilled === 0) {
    return { cgpa: null, semestersFilled: 0, totalSemesters };
  }

  // Calculate YGPAs based on semester pairs
  const ygpas: (number | null)[] = [];
  
  for (let i = 0; i < totalSemesters; i += 2) {
    const oddSGPA = semesterSGPAs[i] ?? null;
    const evenSGPA = semesterSGPAs[i + 1] ?? null;
    ygpas.push(calculateYGPA(oddSGPA, evenSGPA));
  }

  let cgpa: number | null = null;

  switch (degreeType) {
    case "4-year": {
      // CGPA = (YGPA1 + YGPA2 + 1.5×YGPA3 + 1.5×YGPA4) / 5
      const [y1, y2, y3, y4] = ygpas;
      const weights = [1, 1, 1.5, 1.5];
      let totalWeight = 0;
      let weightedSum = 0;
      
      [y1, y2, y3, y4].forEach((ygpa, idx) => {
        if (ygpa !== null) {
          weightedSum += ygpa * weights[idx];
          totalWeight += weights[idx];
        }
      });
      
      cgpa = totalWeight > 0 ? weightedSum / totalWeight : null;
      break;
    }
    
    case "lateral-entry": {
      // CGPA = (YGPA2 + 1.5×YGPA3 + 1.5×YGPA4) / 4
      // Semesters 1-2 = Year 2, 3-4 = Year 3, 5-6 = Year 4
      const [y2, y3, y4] = ygpas;
      const weights = [1, 1.5, 1.5];
      let totalWeight = 0;
      let weightedSum = 0;
      
      [y2, y3, y4].forEach((ygpa, idx) => {
        if (ygpa !== null) {
          weightedSum += ygpa * weights[idx];
          totalWeight += weights[idx];
        }
      });
      
      cgpa = totalWeight > 0 ? weightedSum / totalWeight : null;
      break;
    }
    
    case "3-year": {
      // CGPA = (YGPA1 + YGPA2 + YGPA3) / 3
      const [y1, y2, y3] = ygpas;
      const validYgpas = [y1, y2, y3].filter(y => y !== null) as number[];
      cgpa = validYgpas.length > 0 
        ? validYgpas.reduce((a, b) => a + b, 0) / validYgpas.length 
        : null;
      break;
    }
    
    case "2-year": {
      // CGPA = (YGPA1 + YGPA2) / 2
      const [y1, y2] = ygpas;
      const validYgpas = [y1, y2].filter(y => y !== null) as number[];
      cgpa = validYgpas.length > 0 
        ? validYgpas.reduce((a, b) => a + b, 0) / validYgpas.length 
        : null;
      break;
    }
    
    case "1-year": {
      // CGPA = YGPA1
      cgpa = ygpas[0];
      break;
    }
  }

  return { cgpa, semestersFilled, totalSemesters };
}

/**
 * Validate SGPA input
 */
export function validateSGPA(value: string): { valid: boolean; error?: string } {
  if (value === "") return { valid: true };
  
  const num = parseFloat(value);
  
  if (isNaN(num)) {
    return { valid: false, error: "Must be a valid number" };
  }
  
  if (num < 0 || num > 10) {
    return { valid: false, error: "SGPA must be between 0 and 10" };
  }
  
  return { valid: true };
}
