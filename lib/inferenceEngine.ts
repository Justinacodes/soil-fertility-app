import type { Rule, Recommendation } from './knowledgeBase';

// Define the type for the user-provided facts
interface Facts {
  [key: string]: string | number;
}

// The main function that runs the expert system
export function runInferenceEngine(facts: Facts, rules: Rule[]): Recommendation[] {
  const matchedRecommendations: Recommendation[] = [];
  
  // Sort rules by priority to handle conflicts
  const sortedRules = [...rules].sort((a, b) => b.priority - a.priority);

  for (const rule of sortedRules) {
    const isMatch = checkConditions(facts, rule.conditions);
    
    if (isMatch) {
      // Avoid adding duplicate recommendations if multiple rules point to the same one
      if (!matchedRecommendations.some(rec => rec.fertilityStatus === rule.recommendation.fertilityStatus)) {
          matchedRecommendations.push(rule.recommendation);
      }
    }
  }

  return matchedRecommendations;
}

// Helper function to check if all conditions for a rule are met
function checkConditions(facts: Facts, conditions: Rule['conditions']): boolean {
  for (const conditionKey in conditions) {
    const factValue = facts[conditionKey];
    const conditionValue = conditions[conditionKey];
    
    // If the fact doesn't exist, the condition can't be met
    if (factValue === undefined) {
      return false;
    }
    
    // The condition can be a direct value or an object with operators
    if (typeof conditionValue === 'object' && conditionValue !== null && !Array.isArray(conditionValue)) {
      // Handle operators like { lt: 5.5 } or { eq: 'Maize' }
      if (!evaluateOperator(factValue, conditionValue)) {
        return false; // One of the operators failed
      }
    } else {
      // Direct comparison if no operator is specified
      if (factValue !== conditionValue) {
        return false;
      }
    }
  }
  
  // If we looped through all conditions and none returned false, it's a match
  return true;
}

// Helper function to evaluate conditions with operators
function evaluateOperator(factValue: string | number, condition: { [operator: string]: any }): boolean {
  const operator = Object.keys(condition)[0];
  const value = condition[operator];
  
  switch (operator) {
    case 'eq': // equals
      return factValue === value;
    case 'neq': // not equals
      return factValue !== value;
    case 'lt': // less than
      return factValue < value;
    case 'gt': // greater than
      return factValue > value;
    case 'lte': // less than or equal to
      return factValue <= value;
    case 'gte': // greater than or equal to
      return factValue >= value;
    case 'in': // value is in array
      return Array.isArray(value) && value.includes(factValue);
    default:
      console.warn(`Unknown operator: ${operator}`);
      return false;
  }
}