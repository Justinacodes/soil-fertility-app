export interface Recommendation {
  fertilityStatus: string;
  recommendations: string[];
  bestPractices?: string[];
}

export interface Rule {
  id: string; // Unique ID for debugging
  priority: number; // To resolve conflicts, higher number = higher priority
  conditions: {
    [key: string]: any; // e.g., { pH: { lt: 5.5 }, crop: 'maize' }
  };
  recommendation: Recommendation;
}

export const rules: Rule[] = [
  {
    id: 'R1_ACIDIC_MAIZE',
    priority: 10,
    conditions: {
      pH: { lt: 5.5 }, // lt = less than
      crop: { eq: 'Maize' } // eq = equals
    },
    recommendation: {
      fertilityStatus: "Very Acidic Soil",
      recommendations: [
        "Apply agricultural lime at a rate of 2-3 tons per hectare to raise pH.",
      ],
      bestPractices: [
        "Incorporate the lime into the soil 2-3 months before planting for best results."
      ]
    }
  },
  {
    id: 'R2_LOW_N_SANDY',
    priority: 10,
    conditions: {
      nitrogen: { eq: 'Low' },
      soilTexture: { eq: 'Sandy' }
    },
    recommendation: {
      fertilityStatus: "Nitrogen Deficient",
      recommendations: [
        "Apply a nitrogen-rich fertilizer like Urea (46-0-0) at 120kg/ha.",
        "Split the application: apply 1/3 at planting and the rest 30-45 days later to prevent leaching in sandy soil."
      ],
    }
  },
  {
    id: 'R3_LOW_P_GENERAL',
    priority: 8,
    conditions: {
      phosphorus: { eq: 'Low' }
    },
    recommendation: {
      fertilityStatus: "Phosphorus Deficient",
      recommendations: [
        "Apply a phosphate fertilizer like DAP (18-46-0) or bone meal.",
      ],
      bestPractices: [
        "Phosphorus is immobile in soil. Ensure it's applied at the root zone during planting."
      ]
    }
  },
  {
    id: 'R4_HIGH_P_AVOID',
    priority: 10,
    conditions: {
      phosphorus: { eq: 'High' }
    },
    recommendation: {
      fertilityStatus: "High Phosphorus Levels",
      recommendations: [
        "Avoid adding phosphorus-heavy fertilizers like DAP. This can lead to runoff and is a waste of money.",
        "Focus on Nitrogen and Potassium needs. Consider using Potassium Nitrate or Urea."
      ]
    }
  },
  {
    id: 'R5_ORGANIC_FOCUS',
    priority: 5, // Lower priority, general advice
    conditions: {
      soilTexture: { in: ['Sandy', 'Clay'] } // in = value is in the array
    },
    recommendation: {
      fertilityStatus: "Soil Structure Improvement Needed",
      recommendations: [
        "Incorporate well-decomposed compost or manure (5-10 tons/ha) to improve soil structure, water retention (sandy), and drainage (clay)."
      ],
    }
  }
];