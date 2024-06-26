import { evaluate } from 'mathjs';

const evaluateFormula = (formula) => {
    try {
        return evaluate(formula);
    } catch {
        return 'Invalid formula';
    }
};

export { evaluateFormula };
